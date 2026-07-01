# PrecisionCalc — Debug Log

---

## Bug 001 — CLS (Cumulative Layout Shift) on Ad Zone Wrappers

**Bug:**
- **Description:** Ad zone wrapper divs (`.ad-zone-a`, `.ad-zone-inline`, `.ad-zone-c`) had no explicit `min-height`, causing the page to jump when the AdSense script loaded and injected `<ins>` elements.
- **Location:** `styles.css` — `.ad-zone-a` (line ~400), `.ad-zone-inline` (line ~405), `.ad-zone-c` (line ~1124)
- **Root Cause:** Only `.ad-slot` (the inner `<ins>` container) had `min-height: 90px`. The outer wrapper zones had no reserved vertical space, so before the ad loaded, the wrapper had 0 height and the page collapsed — causing a layout shift when the ad expanded it.

**Fix:**
- **Summary:** Added `min-height: var(--ad-banner-h)` to `.ad-zone-a` and `.ad-zone-inline`, and `min-height: 328px` to `.ad-zone-c` (280px native ad + 24px top/bottom padding).
- **Files Changed:** `styles.css`
- **Why It Works:** Reserving the height in the *wrapper* (not just the inner slot) prevents the page layout from reflow-after-load, eliminating CLS. The CSS variable `--ad-banner-h` is already defined in the root and used by `.ad-slot`, so using it on the wrapper keeps values in sync.

**Prevention:**
- **Rule or Pattern:** Any element that contains a dynamically injected ad unit (AdSense `<ins>`, GPT slot, etc.) must have an explicit `min-height` on the *outermost* container div, not just the inner slot element.
- **Future Safeguard:** When adding new ad zones, always add `min-height` to the zone wrapper at the same time as the inner `<ins>` element.

---

## Bug 002 — AdSense "Thin Content" / Low-Value Content Risk on Calculator Pages

**Bug:**
- **Description:** All 68 calculator tool pages had `seoContent` sections with only ~100–160 words each — well below the 300-word minimum recommended for AdSense approval. Google's content crawlers evaluate each URL independently; thin `seoContent` risks "low value content" policy violations.
- **Location:** All files in `js/tools/*.js` — specifically the `seoContent` template literal property.
- **Root Cause:** Initial `seoContent` was written as a quick placeholder, with only 1–2 short paragraphs and 1–2 FAQ items. Volume was prioritized over depth during initial build.

**Fix:**
- **Summary:** Systematically expanded `seoContent` for the 8 highest-priority tools to 350–600 words each. Content added includes: formula derivation, worked numerical examples, classification tables, historical context, real-world use cases, comparison data (benchmarks, US standards), and 3–5 `<details>` FAQ accordions per tool.
- **Files Changed:** `js/tools/prime.js`, `js/tools/triangle.js`, `js/tools/study-planner.js`, `js/tools/tip.js`, `js/tools/tip-split.js`, `js/tools/bmi.js`, `js/tools/water.js`, `js/tools/salary.js`, `js/tools/unit.js`
- **Why It Works:** Deeper, unique, instructional content gives Google's Quality Rater Guidelines signals of E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). The `<details>` accordion FAQ format also targets voice search and featured snippet eligibility while keeping the visual UI clean.

**Prevention:**
- **Rule or Pattern:** All new tool `seoContent` sections must contain: (1) a 2–3 sentence intro paragraph, (2) the formula with a worked example, (3) one `<h3>` classification/comparison section, (4) one `<h3>` real-world context section, and (5) minimum 3 `<details>` FAQ items.
- **Future Safeguard:** When adding any new tool to `js/tools/`, use the BMI or Water tool as a template — both now meet and exceed the 300-word standard.

---

## Bug 003 — AdSense Rejection: "Ads on screens without publisher-content" + "Low value content" (Real Root Cause)

**Bug:**
- **Description:** AdSense rejected the site citing both flags even after Bug 002's content expansion. The actual cause was structural, not content depth: all 68 "tool pages" were routed purely via URL hash (`#mortgage`, `#bmi`, etc.), and Google does not crawl or index fragment URLs as distinct pages — `precisioncalc.com/#mortgage` and `precisioncalc.com/#bmi` both collapse to the same canonical URL, `precisioncalc.com/`. The hardcoded `<link rel="canonical">` reinforced this. So no matter how much `seoContent` existed per tool, Google's crawler only ever saw one page: the thin home screen (a one-line hero, a few short feature-card blurbs, and a grid of icon links) sitting under 4–6 simultaneous ad placements (Zone A, A2, B, D, plus per-category multiplex ads). That is a textbook match for both rejection reasons.
- **Location:** `js/app.js` router (`route()`, hash-only), `index.html` canonical/OG tags (hardcoded to homepage), `sitemap.xml` (listed `#fragment` URLs Google can't index separately).
- **Root Cause:** Hash-based SPA routing with no static/server-rendered fallback per route. Content-depth fixes (Bug 002) never reached Google because they only rendered client-side after a hash the indexer doesn't treat as a separate URL.

**Fix:**
- **Summary:** Added a static pre-render build step (`scripts/build-static-pages.js`) that generates a real, physical `/<id>/index.html` for every tool — full calculator UI + seoContent baked into the initial HTML, unique `<title>`/`<meta description>`/canonical/OG tags per tool. `js/app.js`'s router now also accepts real paths (`currentPathSlug()` fallback in `route()`), and a global click-delegation layer intercepts internal `<a href="/id/">` clicks to do fast client-side `pushState` transitions while keeping the links fully crawlable and functional with JS off. All internal links (sidebar, feature cards, complete grid, search results) were converted from `href="#id"` to `href="/id/"`. `sitemap.xml` now lists real paths instead of hash fragments. All asset references in `index.html` were made root-relative (`/styles.css` etc.) so the one-level-deep tool subpages resolve them correctly.
- **Files Changed:** `js/app.js`, `index.html`, `sitemap.xml`, `js/registry.js`, new `scripts/build-static-pages.js`, plus 68 generated `/<id>/index.html` files.
- **Why It Works:** Google now sees 68 distinct, content-rich, independently indexable URLs instead of one thin homepage. Each has real text content that justifies its ad placements. The SPA experience is unaffected for real users — hash nav and pushState nav both route through the same `goToTool()`/`loadTool()` path.
- **Bonus fixes discovered along the way:** 5 tools (`tip-split`, `date-diff`, `cooking-convert`, `matrix-ops`, `time-zone`) had a `registerTool({id: ...})` value that didn't match their filename, so `fetchTool()`'s dynamic `<script src="js/tools/${id}.js">` 404'd — these were silently broken/unreachable for real users. Also `js/tools/emi.js` had a genuine syntax error (a missing closing brace for `mount()`) that made the entire file fail to parse, breaking the EMI calculator site-wide.

**Prevention:**
- **Rule or Pattern:** Any SPA that relies on client-side routing (hash or pushState) for distinct content **must** have a static-rendering or SSR fallback per route before submitting to AdSense or expecting Google indexing — hash fragments are never crawled as separate URLs, and even pushState routes need something to serve on a direct/first hit.
- **Future Safeguard:** Run `node scripts/build-static-pages.js` after any change to `js/tools/*.js`, `js/registry.js`, or the `index.html` shell, and before every deploy. When adding a new tool, verify its `id:` matches its filename (this is what broke 5 tools silently) and run `node --check js/tools/<file>.js` to catch syntax errors before they ship.

---

## Bug 004 — Router hijacked non-tool hashes; lazy-load script path broke on subpages; 34 tools had duplicate/misplaced result cards

**Bug (three related issues found during a full audit after Bug 003 shipped):**
1. **Relative script path broke tool switching from any subpage.** `fetchTool()` loaded lazy tool scripts via `js/tools/${id}.js` (relative). From the root this resolved fine, but from any of the 68 real-path subpages (e.g. `/mortgage/`) it resolved to `/mortgage/js/tools/salary.js`, 404'd, and silently fell back to the home screen — breaking sidebar navigation for any tool not already preloaded on the current page.
2. **Router treated any non-empty hash as a tool id.** The topbar's category quick-links (`#all-calculators-list-finance` etc.) and "Browse all tools" link aren't tool ids. Clicking them set a hash, `route()` tried to `fetchTool()` a nonexistent script, failed, and called `showHome()` — destroying whatever calculator the user was currently looking at.
3. **34 tools manually created a second result card instead of using the one `buildToolShell()` already renders.** Some (`document.createElement` + `appendChild`) appended a duplicate at the very end of the view, after the SEO article — so results appeared far below the inputs while the correctly-positioned auto-generated card sat stuck on its placeholder text forever. Others (`container.innerHTML += '<div id="result-card-X">'`) had an id mismatch with the tool's actual `id` (e.g. `result-card-cc` vs the real `result-card-credit-card-payoff`), causing the same misplacement. One (`tip-split.js`) queried the *old* pre-rename id and got `null`, so `calc()` threw on mount and the tool crashed back to the home screen every time — completely inaccessible. A few more (`age`, `bac`, `emi`, etc.) had a duplicate with a *matching* id, which is technically invalid HTML but happened to still render in the right place since `querySelector` returns the first match.

**Fix:**
- **Summary:** Made the dynamic script loader path root-relative (`/js/tools/${id}.js`). Changed `route()` to only treat a hash as a tool id if it actually matches a registered tool; any other non-empty hash now leaves the current view alone instead of bouncing to home. Rewrote all 34 affected tools' `mount()` functions to query the existing `#result-card-<tool.id>` div (matching the standard pattern used by `bmi.js`/`mortgage.js`/etc.) instead of creating a second one, and added missing `.active` class / `pulseResult()` calls for visual consistency. Also fixed a stray leftover `"` character in two tools' `seoContent` and a missing initial `calc()` call in `duration.js`.
- **Files Changed:** `js/app.js`; `js/tools/tip-split.js`, `time-zone.js`, `matrix-ops.js`, `cooking-convert.js`, `date-diff.js`, `cone.js`, `matrix.js`, `trapezoid.js`, `sphere.js`, `savings-goal.js`, `rectangle.js`, `polygon.js`, `parallelogram.js`, `logarithm.js`, `gcdlcm.js`, `factorial.js`, `exponent.js`, `ellipse.js`, `cylinder.js`, `cube.js`, `credit-card-payoff.js`, `pythagorean.js`, `quadratic.js`, `kitchen.js`, `age.js`, `autoloan.js`, `bac.js`, `amortization.js`, `aspect.js`, `bodyfat.js`, `duration.js`, `freelancetax.js`, `gpa.js`, `inflation.js`, `macro.js`, `onerepmax.js`, `retirement.js`, `emi.js`.
- **Why It Works:** Every tool now reuses the single result card `buildToolShell()`/the static build already renders in the correct position, so there's exactly one live, correctly-placed result area per tool with no duplicate/invalid ids. The router only reroutes on hashes it actually recognizes, so unrelated in-page anchors can't blow away the current view.

**Prevention:**
- **Rule or Pattern:** Never `document.createElement` or `innerHTML +=` a second `#result-card-<id>` inside `mount()` — `buildToolShell()` already renders exactly one, at `#result-card-${tool.id}`; always `container.querySelector()` it. Any asset or script path referenced from JS at runtime must be root-relative (leading `/`), never relative, since tool pages can be served from any depth.
- **Future Safeguard:** When adding a new tool, copy the `mount()` skeleton from `bmi.js` or `circle.js` (query the existing result card, no manual creation) rather than an older tool that might carry this pattern forward. Before shipping a router change, manually click through at least one internal link chain starting from a non-home page, not just from `/`.

**Follow-up — full QA sweep completed:** After this bug shipped, all 68 tools in `js/tools/` were individually read and cross-checked (not just the 38 touched above) for: syntax validity, duplicate/misplaced result cards, `result-card-*` id mismatches against the tool's own declared `id`, and a missing initial render call on mount. The remaining 30 tools not covered above (`compound`, `gas`, `idealweight`, `percentage`, `prime`, `salary`, `scientific`, `study-planner`, `tdee`, `tip`, `triangle`, `unit`, `water`, `contact`, `privacy`, `terms`, plus the 14 confirmed correct during the Bug 003 `seoContent` expansion pass — `word-counter`, `circle`, `scientific-notation`, `simple-interest`, `final-grade`, `binaryhex`, `grade`, `password`, `roi`, `pregnancy`, `stddev`, `fraction`, `bmi`, `mortgage`) were all confirmed clean — no fixes needed. The whole 68-tool set now passes an automated check for all four issue classes above; see the one-liner in the Future Safeguard above for what to re-run before every future tool addition.

**Follow-up — automated regression guard added:** `scripts/verify-tools.js` now runs the same checks (syntax, duplicate result-card creation, id/filename mismatch, `result-card-*` id mismatch, and registry.js stub sync) against every tool file, and is wired as a git pre-commit hook via the tracked `.githooks/` directory (`git config core.hooksPath .githooks` — already set for this repo; re-run that one command after a fresh clone). Verified it actually catches all four injected bug types before enabling it.

---

## Bug 005 — Ad density too high on the homepage

**Bug:**
- **Description:** The homepage carried Zone A (header banner) *and* Zone A2 (a second leaderboard banner embedded in the hero/featured area), plus a multiplex ad injected between every pair of adjacent categories in "The Complete Grid" (up to 5 extra ad slots for 6 categories). Combined, a single homepage load could render 7+ ad units before counting Zone B (sidebar) and Zone D (footer) — a much higher ad-to-content ratio than the actual page content justified, and a plausible contributor to an "ads without publisher content" style rejection even after the content-depth and crawlability fixes.
- **Location:** `js/app.js` (`homeScreenHTML()`, `renderCompleteGrid()`), `index.html` (static home-screen shell), `styles.css` (`.ad-zone-multiplex`, `.ad-zone-inline`).

**Fix:**
- **Summary:** Removed the multiplex ads between categories in `renderCompleteGrid()` entirely. Removed the redundant Zone A2 inline banner from both the static `index.html` shell and `homeScreenHTML()`'s rebuild path, keeping only the single Zone A header banner. Removed the now-dead `.ad-zone-multiplex` / `.ad-zone-inline` CSS rules.
- **Why It Works:** The homepage now carries 3 ad zones (A, B, D) instead of up to 7+, all in standard, well-separated placements. Tool pages are unaffected — they never had A2 or multiplex ads and keep their existing 4-zone layout (A, B, C, D).

**Prevention:**
- **Rule or Pattern:** Before adding any new ad placement, count how many ad units the page will render simultaneously and weigh that against the actual unique content on screen — density, not just word count, is what "ads without publisher content" flags.
