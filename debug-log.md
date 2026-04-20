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
