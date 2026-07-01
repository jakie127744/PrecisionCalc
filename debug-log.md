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
