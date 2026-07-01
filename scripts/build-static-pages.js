#!/usr/bin/env node
/**
 * Generates a real, crawlable static HTML page per calculator at /<id>/index.html.
 *
 * Why this exists: the live app routes tools via JS (hash or pushState), so a
 * crawler hitting a bare URL only ever sees the thin homepage shell. This script
 * pre-renders each tool's full UI + seoContent into its own physical HTML file so
 * Google (and AdSense review) can index real, content-rich, ad-justified pages.
 * The JS app still hydrates these pages normally for interactivity — see the
 * pathname fallback in js/app.js's route().
 *
 * Run after editing js/tools/*.js, js/registry.js, or the index.html shell:
 *   node scripts/build-static-pages.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'js', 'tools');
const SHELL_PATH = path.join(ROOT, 'index.html');
const SITE_URL = 'https://precisioncalc.com';

function loadToolDef(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  let captured = null;
  const sandbox = {
    registerTool: (def) => { captured = def; },
    console, Date, Math, JSON, parseInt, parseFloat, isFinite, isNaN,
    String, Number, Array, Object, RegExp,
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  try {
    vm.runInContext(code, sandbox, { filename: filePath, timeout: 5000 });
  } catch (e) {
    console.warn(`  [skip] ${path.basename(filePath)}: ${e.message}`);
    return null;
  }
  return captured;
}

// Mirrors buildToolShell() in js/app.js — keep the two in sync if that function changes.
function buildToolShell(tool) {
  const iconEl = tool.materialIcon
    ? `<span class="material-symbols-outlined" aria-hidden="true">${tool.materialIcon}</span>`
    : `<span aria-hidden="true">${tool.icon || ''}</span>`;

  return `
    <div class="tool-header">
      <div class="tool-header-main">
        <div class="tool-header-icon">${iconEl}</div>
        <div class="tool-header-info">
          <h1>${tool.name}</h1>
          <p>${tool.tagline || ''}</p>
        </div>
      </div>
      <div class="tool-header-actions">
        ${tool.allowPrint ? `
          <button class="action-btn" onclick="window.print()" title="Download PDF / Print Report">
            <span class="material-symbols-outlined">picture_as_pdf</span>
          </button>
        ` : ''}
        <button class="action-btn" onclick="shareTool('${tool.id}', '${tool.name}')" title="Share Tool">
            <span class="material-symbols-outlined">share</span>
        </button>
      </div>
    </div>

    <div class="tool-content-wrap">
      <div class="${tool.category === 'Legal' ? '' : 'input-card'}" id="input-card-${tool.id}">
        ${typeof tool.template === 'function' ? tool.template() : (tool.template || '')}
      </div>

      ${tool.category !== 'Legal' ? `
        <!-- Zone C: 24px buffer -->
        <div class="ad-zone ad-zone-c" role="complementary" aria-label="Advertisement">
          <span class="ad-label">Advertisement</span>
          <div class="ad-slot ad-slot-native" id="ad-zone-c-${tool.id}">
            <ins class="adsbygoogle" style="display:block"
              data-ad-client="ca-pub-9907028021598445"
              data-ad-slot="7781234567"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </div>
        </div>

        <div class="result-card" id="result-card-${tool.id}">
          <div class="result-placeholder">Enter values above to see results ✦</div>
        </div>
        <div id="extra-${tool.id}"></div>
      ` : ''}

      ${tool.seoContent ? `
        <article class="seo-card" aria-label="How ${tool.name} works">
          <h2>📖 How ${tool.name} Works</h2>
          ${tool.seoContent}
        </article>
      ` : ''}
    </div>
  `;
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Pulls question/answer pairs out of a tool's <details><summary>...</summary>...</details>
// FAQ blocks so they can be re-published as FAQPage structured data.
function extractFaqItems(seoContent) {
  if (!seoContent) return [];
  const items = [];
  const detailsRe = /<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g;
  const stripTags = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  let m;
  while ((m = detailsRe.exec(seoContent))) {
    const question = stripTags(m[1]).replace(/^[❓\s]+/, '');
    const answer = stripTags(m[2]);
    if (question && answer) items.push({ question, answer });
  }
  return items;
}

const APPLICATION_CATEGORY = {
  Finance: 'FinanceApplication',
  Health: 'HealthApplication',
  Education: 'EducationalApplication',
};

// Schema.org JSON-LD requires escaping "</" so an embedded value can never
// prematurely close the surrounding <script> tag.
function jsonLdScript(obj) {
  return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/<\//g, '<\\/')}\n</script>`;
}

function buildJsonLd(tool, canonicalUrl, title, description) {
  if (tool.category === 'Legal') return '';

  const blocks = [
    jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      url: canonicalUrl,
      description,
      operatingSystem: 'Any',
      applicationCategory: APPLICATION_CATEGORY[tool.category] || 'UtilityApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }),
  ];

  const faqItems = extractFaqItems(tool.seoContent);
  if (faqItems.length) {
    blocks.push(jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    }));
  }

  return blocks.join('\n  ');
}

function replaceBetween(html, startMarker, endMarker, replacement) {
  const start = html.indexOf(startMarker);
  if (start === -1) throw new Error(`Marker not found: ${startMarker.slice(0, 40)}...`);
  const end = html.indexOf(endMarker, start);
  if (end === -1) throw new Error(`End marker not found after start: ${endMarker.slice(0, 40)}...`);
  return html.slice(0, start) + replacement + html.slice(end + endMarker.length);
}

function replaceTag(html, regex, value, label) {
  if (!regex.test(html)) throw new Error(`Tag not found for ${label}`);
  return html.replace(regex, (full, pre, post) => pre + value + post);
}

function renderPage(shellTemplate, tool) {
  const title = tool.meta?.title || `${tool.name} — PrecisionCalc`;
  const description = tool.meta?.description || tool.tagline || `Free online ${tool.name} — fast, accurate, and easy to use.`;
  const canonicalUrl = `${SITE_URL}/${tool.id}/`;
  const titleEsc = escapeAttr(title);
  const descEsc = escapeAttr(description);

  let html = shellTemplate;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${titleEsc}</title>`);
  html = replaceTag(html, /(<meta name="description" content=")[^"]*(")/, descEsc, 'meta description');
  html = replaceTag(html, /(<link rel="canonical" href=")[^"]*(")/, canonicalUrl, 'canonical');
  html = replaceTag(html, /(<meta property="og:url" content=")[^"]*(")/, canonicalUrl, 'og:url');
  html = replaceTag(html, /(<meta property="og:title" content=")[^"]*(")/, titleEsc, 'og:title');
  html = replaceTag(html, /(<meta property="og:description" content=")[^"]*(")/, descEsc, 'og:description');
  html = replaceTag(html, /(<meta property="twitter:url" content=")[^"]*(")/, canonicalUrl, 'twitter:url');
  html = replaceTag(html, /(<meta property="twitter:title" content=")[^"]*(")/, titleEsc, 'twitter:title');
  html = replaceTag(html, /(<meta property="twitter:description" content=")[^"]*(")/, descEsc, 'twitter:description');

  // Per-tool structured data (SoftwareApplication + FAQPage from the seoContent FAQ items).
  const jsonLd = buildJsonLd(tool, canonicalUrl, title, description);
  if (jsonLd) {
    html = html.replace(
      '<!-- Per-tool structured data (SoftwareApplication + FAQPage) is injected here\n       at build time by scripts/build-static-pages.js for each generated page. -->',
      `${jsonLd}`
    );
  }

  // Swap the dynamic home-screen stage for the statically rendered tool shell.
  const shellHtml = buildToolShell(tool);
  html = replaceBetween(
    html,
    '<div id="tool-stage" aria-live="polite" aria-label="Calculator area">',
    '\n  </div>\n</main>',
    `<div id="tool-stage" aria-live="polite" aria-label="Calculator area">
        <div id="active-tool-view" class="tool-container">${shellHtml}</div>
      </div>
    </main>`
  );

  // Preload only this tool's script (instead of the homepage's default 4) for fast hydration.
  html = html.replace(
    `<script src="/js/tools/mortgage.js" defer></script>
  <script src="/js/tools/compound.js" defer></script>
  <script src="/js/tools/bmi.js" defer></script>
  <script src="/js/tools/kitchen.js" defer></script>`,
    `<script src="/js/tools/${tool.id}.js" defer></script>`
  );

  return html;
}

function main() {
  // Normalize CRLF -> LF so string markers below match regardless of git/editor line-ending settings.
  const shellTemplate = fs.readFileSync(SHELL_PATH, 'utf8').replace(/\r\n/g, '\n');
  const files = fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.js'));

  let built = 0, skipped = 0;
  for (const file of files) {
    const def = loadToolDef(path.join(TOOLS_DIR, file));
    if (!def || !def.id || !def.template) {
      console.warn(`  [skip] ${file}: no registerTool() with id+template found`);
      skipped++;
      continue;
    }
    try {
      const html = renderPage(shellTemplate, def);
      const outDir = path.join(ROOT, def.id);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), html);
      built++;
    } catch (e) {
      console.warn(`  [skip] ${file} (id: ${def.id}): ${e.message}`);
      skipped++;
    }
  }

  console.log(`\nBuilt ${built} static pages, skipped ${skipped}.`);
}

main();
