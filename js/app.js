/**
 * CALC-GRID — App.js
 * © 2026 Molave Labs
 * Core SPA engine: routing, search, localStorage, SEO, sidebar, mobile nav.
 */

/* ─── State ─────────────────────────────────────────────────── */
const RECENT_KEY = 'calcgrid_recent';
const MAX_RECENT = 3;
let currentTool  = null;

/* ─── Share Tool ────────────────────────────────────────────── */
window.shareTool = function(id, name) {
    const url = window.location.origin + window.location.pathname + '#' + id;
    if (navigator.share) {
        navigator.share({
            title: name + ' — PrecisionCalc',
            text: 'Check out this ' + name + ' on PrecisionCalc!',
            url: url
        }).catch(() => {});
    } else {
        // Fallback to copy link
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = url;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Link copied to clipboard!');
    }
};

/* ─── DOM Refs ──────────────────────────────────────────────── */
const stage          = document.getElementById('tool-stage');
const homeScreen     = document.getElementById('home-screen');
const recentNav      = document.getElementById('recent-tools');
const completeGrid   = document.getElementById('complete-grid');

// Search inputs (3 locations: topbar, hero, mobile overlay)
const mainSearch     = document.getElementById('main-search');
const heroSearch     = document.getElementById('hero-search');
const mobileSearch   = document.getElementById('mobile-search-input');

// Search dropdowns
const mainDropdown   = document.getElementById('search-dropdown');
const heroDropdown   = document.getElementById('hero-search-dropdown');
const mobileDropdown = document.getElementById('mobile-search-dropdown');

// Sidebar
const sidebar        = document.getElementById('sidebar');
const sidebarBdrop   = document.getElementById('sidebar-backdrop');
const menuBtn        = document.getElementById('mobile-menu-btn');

// Mobile search overlay
const mobileOverlay  = document.getElementById('mobile-search-overlay');
const mobileSearchBtn= document.getElementById('mobile-search-btn');
const mobileSearchClose = document.getElementById('mobile-search-close');

/* ─── Boot ──────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  renderCompleteGrid();
  renderRecentNav();
  wireSearch(mainSearch, mainDropdown);
  wireSearch(heroSearch, heroDropdown);
  wireSearch(mobileSearch, mobileDropdown);
  wireSidebar();
  wireMobileSearch();
  route();
});

window.addEventListener('hashchange', route);

/* ─── Router ────────────────────────────────────────────────── */
function route() {
  const hash   = window.location.hash.replace('#', '').trim();
  const toolId = hash || null;

  if (!toolId || toolId === 'home') {
    showHome();
    return;
  }

  const tool = window.PrecisionCalcRegistry?.[toolId];
  if (!tool) { showHome(); return; }

  loadTool(tool);
}

/* ─── Home Screen ───────────────────────────────────────────── */
function showHome() {
  currentTool = null;
  setActiveNav(null);
  setBottomNav('featured');
  updateSEO({
    title: 'PrecisionCalc — Free Online Calculators | Molave Labs',
    description: 'Free professional calculator hub for finance, health, math & conversions. Real-time results, zero fluff.'
  });

  // Restore home screen (or rebuild if tool was active)
  let home = document.getElementById('home-screen');
  if (!home) {
    stage.innerHTML = '';
    const div = document.createElement('section');
    div.id = 'home-screen';
    div.className = 'home-screen fade-in';
    div.innerHTML = homeScreenHTML();
    stage.appendChild(div);
    // Re-wire hero search after rebuild
    const hs = document.getElementById('hero-search');
    const hd = document.getElementById('hero-search-dropdown');
    if (hs) wireSearch(hs, hd);
  } else {
    home.style.display = '';
  }

  renderCompleteGrid(document.getElementById('complete-grid'));
  renderRecentNav();
  closeSidebar();
}

function homeScreenHTML() {
  return `
    <div class="hero">
      <div class="hero-glow"></div>
      <div class="hero-text">
        <h1 class="hero-title">Built for <span class="hero-accent">Precision.</span></h1>
        <p class="hero-sub">The definitive free calculator hub for finance, health, math & conversions.</p>
      </div>
      <div class="hero-search" role="search">
        <span class="material-symbols-outlined hero-search-icon">terminal</span>
        <input type="search" id="hero-search" class="search-input hero-search-input"
          placeholder="Search calculators…" autocomplete="off" aria-label="Search calculators" />
        <div id="hero-search-dropdown" class="search-dropdown" role="listbox" hidden></div>
      </div>
    </div>

    <div class="section-header">
      <div>
        <span class="section-eyebrow">Top Rated</span>
        <h2 class="section-title">Popular Calculators</h2>
      </div>
    </div>

    <div class="featured-grid">
      <a href="#mortgage" class="feature-card-large" aria-label="Mortgage Calculator">
        <div class="feature-card-accent-bar"></div>
        <span class="feature-card-bg-icon material-symbols-outlined" aria-hidden="true">home</span>
        <div class="feature-card-content">
          <span class="feature-badge">FINANCE</span>
          <h3 class="feature-card-title">Mortgage &amp; Amortization</h3>
          <p class="feature-card-desc">Monthly payments, total interest & year-by-year repayment schedule.</p>
          <span class="feature-cta">Launch Tool <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:-3px;">arrow_forward</span></span>
        </div>
      </a>
      <div class="feature-side-grid">
        <a href="#compound" class="feature-side-card">
          <div class="feature-side-left-bar"></div>
          <span class="material-symbols-outlined feature-side-icon">monitoring</span>
          <div><h4 class="feature-side-title">Compound Interest</h4><p class="feature-side-desc">Visualize long-term wealth growth.</p></div>
        </a>
        <a href="#bmi" class="feature-side-card">
          <div class="feature-side-left-bar"></div>
          <span class="material-symbols-outlined feature-side-icon">monitor_weight</span>
          <div><h4 class="feature-side-title">Precision BMI &amp; TDEE</h4><p class="feature-side-desc">Accurate metabolic health metrics.</p></div>
        </a>
        <a href="#kitchen" class="feature-side-card">
          <div class="feature-side-left-bar"></div>
          <span class="material-symbols-outlined feature-side-icon">cooking</span>
          <div><h4 class="feature-side-title">Kitchen Master Converter</h4><p class="feature-side-desc">Volume, weight & temp for baking.</p></div>
        </a>
      </div>
    </div>

    <div class="ad-zone ad-zone-inline" role="complementary" aria-label="Advertisement">
      <span class="ad-label">Advertisement</span>
      <div class="ad-slot ad-slot-leaderboard" id="ad-zone-a2" aria-label="Advertisement">
        <ins class="adsbygoogle" style="display:block"
          data-ad-client="ca-pub-9907028021598445"
          data-ad-slot="SLOT_ID_ZONE_A2"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>
    </div>

    <div class="section-header">
      <div>
        <h2 class="section-title">The Complete Grid</h2>
        <p class="section-sub">All calculators, ready to use</p>
      </div>
    </div>
    <div class="complete-grid" id="complete-grid"></div>
  `;
}

/* ─── Tool Loader ───────────────────────────────────────────── */
function loadTool(tool) {
  currentTool = tool;
  setActiveNav(tool.id);
  setBottomNavForTool(tool);
  updateSEO(tool.meta);
  pushRecent(tool.id);
  renderRecentNav();
  closeSidebar();

  // Hide home screen (don't destroy it)
  const home = document.getElementById('home-screen');
  if (home) home.style.display = 'none';

  // Remove any previous tool view
  const prevTool = document.getElementById('active-tool-view');
  if (prevTool) prevTool.remove();

  // Build tool view
  const wrap = document.createElement('div');
  wrap.id = 'active-tool-view';
  wrap.className = 'tool-container fade-in';
  wrap.innerHTML = buildToolShell(tool);
  stage.appendChild(wrap);

  if (typeof tool.mount === 'function') {
    tool.mount(wrap);
  }

  wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ─── Tool Shell ────────────────────────────────────────────── */
function buildToolShell(tool) {
  // Icon: prefer material icon name, fall back to emoji
  const iconEl = tool.materialIcon
    ? `<span class="material-symbols-outlined" aria-hidden="true">${tool.materialIcon}</span>`
    : `<span aria-hidden="true">${tool.icon}</span>`;

  return `
    <div class="tool-header">
      <div class="tool-header-main">
        <div class="tool-header-icon">${iconEl}</div>
        <div class="tool-header-info">
          <h1>${tool.name}</h1>
          <p>${tool.tagline}</p>
        </div>
      </div>
      <div class="tool-header-actions">
        <button class="action-btn" onclick="shareTool('${tool.id}', '${tool.name}')" title="Share Tool">
            <span class="material-symbols-outlined">share</span>
        </button>
      </div>
    </div>


    <div class="input-card" id="input-card-${tool.id}">
      ${typeof tool.template === 'function' ? tool.template() : tool.template}
    </div>

    <!-- Zone C: 24px buffer enforced by .ad-zone-c padding -->
    <div class="ad-zone ad-zone-c" role="complementary" aria-label="Advertisement">
      <span class="ad-label">Advertisement</span>
      <div class="ad-slot ad-slot-native" id="ad-zone-c-${tool.id}" aria-label="Advertisement">
        <ins class="adsbygoogle" style="display:block"
          data-ad-client="ca-pub-9907028021598445"
          data-ad-slot="7781234567"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>
    </div>
    <!-- result card -->
    <div class="result-card" id="result-card-${tool.id}">
      <div class="result-placeholder">Enter values above to see results ✦</div>
    </div>



    <div class="result-card" id="result-card-${tool.id}">
      <div class="result-placeholder">Enter values above to see results ✦</div>
    </div>

    <div id="extra-${tool.id}"></div>

    <article class="seo-card" aria-label="How ${tool.name} works">
      <h2>📖 How ${tool.name} Works</h2>
      ${tool.seoContent}
    </article>
  `;
}

/* ─── SEO Updater ───────────────────────────────────────────── */
function updateSEO({ title, description }) {
  document.title = title;
  const m = document.querySelector('meta[name="description"]');
  if (m) m.setAttribute('content', description);
}

/* ─── Active Nav ────────────────────────────────────────────── */
function setActiveNav(toolId) {
  document.querySelectorAll('.sidebar-item[data-tool]').forEach(el =>
    el.classList.toggle('active', el.dataset.tool === toolId)
  );
  document.querySelectorAll('.recent-item[data-tool]').forEach(el =>
    el.classList.toggle('active', el.dataset.tool === toolId)
  );
}

/* ─── Bottom Nav Active State ───────────────────────────────── */
function setBottomNav(id) {
  ['featured','finance','health','math','units'].forEach(n => {
    document.getElementById(`bn-${n}`)?.classList.remove('active');
  });
  document.getElementById(`bn-${id}`)?.classList.add('active');
}

function setBottomNavForTool(tool) {
  const catMap = { 'Finance': 'finance', 'Daily Life': 'featured', Health: 'health', Math: 'math', Education: 'featured' };
  setBottomNav(catMap[tool.category] || 'featured');
}



/* ─── Complete Grid ─────────────────────────────────────────── */
const TOOL_ICONS = {
  mortgage:   'home',
  compound:   'monitoring',
  salary:     'payments',
  bmi:        'monitor_weight',
  tdee:       'local_fire_department',
  water:      'water_drop',
  percentage: 'percent',
  fraction:   'calculate',
  scientific: 'science',
  unit:       'straighten',
  age:        'calendar_today',
  duration:   'schedule',
  tip:        'receipt_long',
  password:   'password',
  gpa:        'school',
  kitchen:    'kitchen',
  emi:        'payments',
  roi:        'trending_up',
  retirement: 'savings',
  amortization: 'table_chart',
  autoloan:   'directions_car',
  freelancetax: 'calculate',
  inflation:  'trending_up',
  'simple-interest': 'savings',
  bodyfat:    'fitness_center',
  bac:        'local_bar',
  pregnancy:  'pregnant_woman',
  onerepmax:  'fitness_center',
  prime:      '123',
  quadratic:  'calculate',
  pythagorean:'square_foot',
  stddev:     'functions',
  aspect:     'aspect_ratio',
  binaryhex:  '123',
  gas:        'local_gas_station',
  idealweight:'monitor_weight',
};

const CATEGORY_ICONS = {
    'Finance': 'payments',
    'Health': 'monitor_heart',
    'Math': 'calculate',
    'Daily Life': 'self_improvement',
    'Education': 'school'
};



function renderCompleteGrid(container) {
  const grid = container || document.getElementById('complete-grid');
  if (!grid) return;
  const tools = window.getAllTools ? window.getAllTools() : [];
  
  // Group by category
  const categories = {};
  tools.forEach(t => {
      const cat = t.category || 'Other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(t);
  });

  // Sort categories
  const order = ['Finance', 'Daily Life', 'Health', 'Math', 'Education'];
  const sortedCats = Object.keys(categories).sort((a,b) => {
      let ia = order.indexOf(a);
      let ib = order.indexOf(b);
      if (ia === -1) ia = 99;
      if (ib === -1) ib = 99;
      return ia - ib;
  });



  grid.innerHTML = sortedCats.map((cat, idx) => `
    <div class="category-header">
      <span class="material-symbols-outlined category-header-icon">${CATEGORY_ICONS[cat] || 'grid_view'}</span>
      <h3 class="category-header-title">${cat}</h3>
    </div>
    <div class="all-calculators-grid">
      ${categories[cat].map(t => `
        <a href="#${t.id}" class="calculator-grid-item" aria-label="${t.name}" data-tool="${t.id}">
          <span class="material-symbols-outlined calculator-grid-item-icon">${t.materialIcon || TOOL_ICONS[t.id] || 'calculate'}</span>
          <span class="calculator-grid-item-name">${t.name}</span>
          <span class="calculator-grid-item-tagline">${t.tagline || ""}</span>
        </a>
      `).join('')}
    </div>
    ${idx < sortedCats.length - 1 ? `
      <div class="ad-zone ad-zone-multiplex" style="margin: 32px 0;">
        <span class="ad-label">Recommended Content</span>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-format="autorelaxed"
             data-ad-client="ca-pub-9907028021598445"
             data-ad-slot="7781234567"></ins>
      </div>
    ` : ''}
  `).join('');

  // Push ads into the newly created slots
  try {
    const slots = grid.querySelectorAll('.ad-zone-multiplex .adsbygoogle:not([data-adsbygoogle-status])');
    slots.forEach(() => (window.adsbygoogle = window.adsbygoogle || []).push({}));
  } catch (e) { console.error('Ads error', e); }
}



/* ─── Recent Tools ──────────────────────────────────────────── */
function getRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }
  catch { return []; }
}
function pushRecent(toolId) {
  let r = getRecent().filter(id => id !== toolId);
  r.unshift(toolId);
  localStorage.setItem(RECENT_KEY, JSON.stringify(r.slice(0, MAX_RECENT)));
}
function renderRecentNav() {
  if (!recentNav) return;
  const recent = getRecent();
  if (!recent.length) {
    recentNav.innerHTML = '<span class="sidebar-empty">No recent tools yet</span>';
    return;
  }
  recentNav.innerHTML = recent.map(id => {
    const tool = window.CalcyRegistry?.[id];
    if (!tool) return '';
    return `<a href="#${tool.id}" class="sidebar-item recent-item" data-tool="${tool.id}">
      <span class="material-symbols-outlined sidebar-item-icon">${TOOL_ICONS[tool.id] || 'calculate'}</span>
      ${tool.name}
    </a>`;
  }).join('');
}

/* ─── Sidebar (mobile toggle) ───────────────────────────────── */
function wireSidebar() {
  menuBtn?.addEventListener('click', () => {
    const open = sidebar?.classList.toggle('open');
    sidebarBdrop.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  sidebarBdrop?.addEventListener('click', closeSidebar);
}
function closeSidebar() {
  sidebar?.classList.remove('open');
  if (sidebarBdrop) sidebarBdrop.hidden = true;
  menuBtn?.setAttribute('aria-expanded', 'false');
}

/* ─── Mobile Search Overlay ─────────────────────────────────── */
function wireMobileSearch() {
  mobileSearchBtn?.addEventListener('click', () => {
    mobileOverlay.hidden = false;
    mobileSearch?.focus();
  });
  mobileSearchClose?.addEventListener('click', () => {
    mobileOverlay.hidden = true;
    if (mobileDropdown) mobileDropdown.hidden = true;
    if (mobileSearch) mobileSearch.value = '';
  });
}

/* ─── Search Engine ─────────────────────────────────────────── */
function wireSearch(input, dropdown) {
  if (!input || !dropdown) return;
  let focusIdx = -1;

  input.addEventListener('input', () => {
    const q = input.value.trim();
    focusIdx = -1;
    if (!q) { dropdown.hidden = true; dropdown.innerHTML = ''; return; }
    const results = window.searchTools ? window.searchTools(q) : [];
    renderDropdown(results, input, dropdown);
  });

  input.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.search-result-item[data-tool]');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusIdx = Math.min(focusIdx + 1, items.length - 1);
      updateFocus(items, focusIdx);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusIdx = Math.max(focusIdx - 1, -1);
      updateFocus(items, focusIdx);
    } else if (e.key === 'Enter') {
      if (focusIdx >= 0 && items[focusIdx]) { items[focusIdx].click(); }
      else if (items.length === 1) { items[0].click(); }
    } else if (e.key === 'Escape') {
      dropdown.hidden = true;
      input.blur();
    }
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.hidden = true;
    }
  });
}

function renderDropdown(results, input, dropdown) {
  if (!results.length) {
    dropdown.innerHTML = `<div class="search-result-item" style="color:var(--on-surface-variant);cursor:default;">No results for "${input.value}"</div>`;
    dropdown.hidden = false;
    return;
  }
  // Highlight matches in name, category, and keywords
  function highlight(text, q) {
    if (!q) return text;
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
    return text.replace(re, '<mark>$1</mark>');
  }
  const q = input.value.trim();
  dropdown.innerHTML = results.map(t => {
    const tags = (t.keywords || []).map(k => `<span class="search-tag">${highlight(k, q)}</span>`).join(' ');
    return `
      <div class="search-result-item" data-tool="${t.id}" role="option" tabindex="-1">
        <span class="result-icon material-symbols-outlined" style="font-size:1.1rem;">${TOOL_ICONS[t.id] || 'calculate'}</span>
        <span>${highlight(t.name, q)}</span>
        <span class="search-result-cat">${highlight(t.category, q)}</span>
        <div class="search-result-tags">${tags}</div>
      </div>
    `;
  }).join('');
  dropdown.hidden = false;
  dropdown.querySelectorAll('.search-result-item[data-tool]').forEach(item => {
    item.addEventListener('click', () => {
      window.location.hash = item.dataset.tool;
      input.value = '';
      dropdown.hidden = true;
      // Close mobile overlay if applicable
      if (mobileOverlay && !mobileOverlay.hidden) {
        mobileOverlay.hidden = true;
      }
    });
  });
}

function updateFocus(items, idx) {
  items.forEach((el, i) => el.classList.toggle('focused', i === idx));
}

/* ─── navigate() (used by bottom nav onclick & logo) ───────── */
window.navigate = function(id) {
  window.location.hash = (id === 'home' || !id) ? '' : id;
  if (!id || id === 'home') {
    // Force route to home in case hash was already empty
    showHome();
  }
};

/* ─── Utility: Copy to Clipboard ───────────────────────────── */
window.copyValue = function(btn, value) {
  navigator.clipboard.writeText(String(value)).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✅';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1500);
  });
};

/* ─── Utility: Pulse result card ───────────────────────────── */
window.pulseResult = function(toolId) {
  const card = document.getElementById(`result-card-${toolId}`);
  if (!card) return;
  card.classList.add('active', 'result-glow');
  setTimeout(() => card.classList.remove('result-glow'), 400);
};

/* ─── Utility: Format numbers ──────────────────────────────── */
window.fmt = {
  currency: (n, decimals = 2) => {
    if (!isFinite(n)) return '—';
    return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  },
  number: (n, decimals = 2) => {
    if (!isFinite(n)) return '—';
    return Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  },
  round: (n, dp = 2) => {
    if (!isFinite(n)) return NaN;
    return Math.round(n * Math.pow(10, dp)) / Math.pow(10, dp);
  }
};
