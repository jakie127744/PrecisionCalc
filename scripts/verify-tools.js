#!/usr/bin/env node
/**
 * Regression guard for js/tools/*.js.
 *
 * Catches the exact bug classes found during the AdSense remediation audit
 * (see debug-log.md Bug 003 / Bug 004) before they ship again:
 *   1. Syntax errors (a missing brace silently broke emi.js entirely).
 *   2. Manually creating a second result card instead of querying the one
 *      buildToolShell() already renders (broke 34 tools' result placement).
 *   3. A tool's `id:` not matching its filename (fetchTool() loads by
 *      filename — a mismatch 404s and makes the tool unreachable).
 *   4. `result-card-*` references that don't match the tool's own id
 *      (renders into the wrong element, or a nonexistent one).
 *   5. A registry.js stub whose id doesn't match any real tool file (the
 *      root cause of 5 orphaned/unreachable tools before Bug 003).
 *
 * Run manually:  node scripts/verify-tools.js
 * Also runs automatically as a git pre-commit hook — see .git/hooks/pre-commit.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'js', 'tools');
const REGISTRY_PATH = path.join(ROOT, 'js', 'registry.js');

const errors = [];

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
  vm.runInContext(code, sandbox, { filename: filePath, timeout: 5000 });
  return captured;
}

const files = fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.js'));
const toolIds = new Set();

for (const file of files) {
  const filePath = path.join(TOOLS_DIR, file);
  const rel = path.join('js', 'tools', file).replace(/\\/g, '/');
  const code = fs.readFileSync(filePath, 'utf8');
  const slug = file.replace(/\.js$/, '');

  // 1. Syntax check
  try {
    execFileSync(process.execPath, ['--check', filePath], { stdio: 'pipe' });
  } catch (e) {
    const msg = (e.stderr || e.stdout || e.message).toString().trim().split('\n').slice(0, 2).join(' ');
    errors.push(`${rel}: SYNTAX ERROR — ${msg}`);
    continue; // can't safely check further if it doesn't parse
  }

  // 2. Duplicate result-card creation patterns
  if (/document\.createElement\(\s*['"]div['"]\s*\)/.test(code)) {
    errors.push(`${rel}: uses document.createElement('div') — likely creating a duplicate result card instead of querying the one buildToolShell() already renders (container.querySelector('#result-card-${slug}')).`);
  }
  if (/innerHTML\s*\+=[^;]*result-card/.test(code)) {
    errors.push(`${rel}: uses innerHTML += with a result-card div — likely appending a duplicate instead of querying the existing one.`);
  }

  // 3. id vs filename match
  let def;
  try {
    def = loadToolDef(filePath);
  } catch (e) {
    errors.push(`${rel}: failed to evaluate registerTool() call — ${e.message}`);
    continue;
  }
  if (!def || !def.id) {
    errors.push(`${rel}: no registerTool({id: ...}) call found.`);
    continue;
  }
  toolIds.add(def.id);
  if (def.id !== slug) {
    errors.push(`${rel}: id '${def.id}' does not match filename '${slug}' — fetchTool() loads js/tools/${slug}.js by filename, so this mismatch silently 404s and makes the tool unreachable.`);
  }

  // 4. result-card-* references must all match the tool's own id
  const cardRefs = [...code.matchAll(/result-card-([a-zA-Z0-9-]+)/g)].map(m => m[1]);
  const badRefs = [...new Set(cardRefs.filter(r => r !== def.id))];
  if (badRefs.length) {
    errors.push(`${rel}: references result-card-{${badRefs.join(', ')}} but this tool's id is '${def.id}' — will render into the wrong or a nonexistent element.`);
  }
}

// 5. registry.js stub ids must correspond to a real tool file's id
if (fs.existsSync(REGISTRY_PATH)) {
  const registrySrc = fs.readFileSync(REGISTRY_PATH, 'utf8');
  const stubIds = [...registrySrc.matchAll(/^\s*'([a-zA-Z0-9_-]+)':\s*\{\s*id:\s*'([a-zA-Z0-9_-]+)'/gm)]
    .map(m => m[2]);
  for (const stubId of stubIds) {
    if (!toolIds.has(stubId)) {
      errors.push(`js/registry.js: stub id '${stubId}' has no matching js/tools/*.js file with that id — this tool can never load (fetchTool() has nothing to fetch).`);
    }
  }
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} issue(s) found in js/tools/:\n`);
  errors.forEach(e => console.error('  - ' + e));
  console.error('\nFix these before committing. See debug-log.md Bug 003 / Bug 004 for context.\n');
  process.exit(1);
} else {
  console.log(`✓ All ${files.length} tool files passed verification (syntax, result-card wiring, id consistency, registry sync).`);
}
