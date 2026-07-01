/**
 * PrecisionCalc — Fraction to Decimal Calculator
 */
registerTool({
  id:       'fraction',
  name:     'Fraction Calculator',
  category: 'Math',
  icon:         '½',
  materialIcon: 'calculate',
  tagline:  'Convert fractions to decimals, simplify fractions, and find percentages.',
  keywords: ['fraction', 'decimal', 'simplify', 'fraction to decimal', 'gcd', 'numerator', 'denominator'],
  meta: {
    title:       'Fraction to Decimal Calculator — PrecisionCalc',
    description: 'Convert any fraction to a decimal and percentage. Simplify fractions to lowest terms automatically. Free online fraction calculator.'
  },

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="frac-num">Numerator</label>
        <input type="number" id="frac-num" placeholder="3" value="3" />
      </div>
      <div class="field" style="display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:8px;">
        <div style="height:2px;background:var(--border-glass);border-radius:1px;"></div>
      </div>
      <div class="field">
        <label for="frac-den">Denominator</label>
        <input type="number" id="frac-den" placeholder="4" value="4" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-fraction');

    const calc = () => {
      const num = parseInt(container.querySelector('#frac-num')?.value) || 0;
      const den = parseInt(container.querySelector('#frac-den')?.value) || 0;

      if (den === 0) {
        resultCard.innerHTML = `<div class="result-placeholder">⚠️ Denominator cannot be zero.</div>`;
        return;
      }

      const decimal    = num / den;
      const percentage = decimal * 100;
      const gcdVal     = gcd(Math.abs(num), Math.abs(den));
      const simpNum    = num / gcdVal;
      const simpDen    = den / gcdVal;
      const isSimplest = gcdVal === 1;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Decimal</span>
            <span class="result-value large">
              ${fmt.number(decimal, 6).replace(/\.?0+$/, '')}
              <button class="copy-btn" onclick="copyValue(this,'${decimal}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Percentage</span>
            <span class="result-value">${fmt.number(percentage, 4).replace(/\.?0+$/, '')}%</span>
          </div>
          <div class="result-item">
            <span class="result-label">Simplified Fraction</span>
            <span class="result-value" style="font-size:1.1rem;">
              ${isSimplest ? `${num}/${den} (already simplest)` : `${simpNum}/${simpDen}`}
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Mixed Number</span>
            <span class="result-value" style="font-size:1.1rem;">
              ${toMixedNumber(num, den)}
            </span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('fraction');
    };

    container.querySelectorAll('input').forEach(el => el.addEventListener('input', calc));
    calc();
  },

  seoContent: `
    <p>A fraction represents a part of a whole, written as a numerator (top number) over a denominator (bottom number). Converting fractions to decimals — and simplifying them to their lowest terms — is a fundamental math skill used constantly in cooking, carpentry, finance, engineering, and virtually every STEM field.</p>

    <h3>Fraction to Decimal Conversion</h3>
    <div class="formula-block">Decimal = Numerator ÷ Denominator</div>
    <p>For example, ¾ = 3 ÷ 4 = 0.75. Some fractions produce terminating decimals (like ½ = 0.5), while others produce repeating decimals that never end (like ⅓ = 0.3333...). To convert a decimal to a percentage, simply multiply by 100 — so ¾ becomes 75%.</p>

    <h3>Simplifying Fractions</h3>
    <p>A fraction is in its simplest form when the numerator and denominator share no common factors other than 1. To simplify, divide both numbers by their Greatest Common Divisor (GCD). For example, 12/16: the GCD of 12 and 16 is 4, so dividing both by 4 gives 12/16 = 3/4 — the simplest equivalent fraction.</p>

    <div class="formula-block">GCD(a, b) — Euclidean Algorithm: gcd(a, 0) = a; gcd(a, b) = gcd(b, a mod b)</div>
    <p>This recursive algorithm, one of the oldest known algorithms in mathematics, finds the greatest common divisor by repeatedly replacing the larger number with the remainder of dividing it by the smaller number, until the remainder reaches zero.</p>

    <h3>Improper Fractions and Mixed Numbers</h3>
    <p>When the numerator is larger than the denominator (like 7/4), the fraction is called "improper" and can be rewritten as a mixed number combining a whole number and a proper fraction. Dividing 7 by 4 gives a quotient of 1 with a remainder of 3, so 7/4 = 1¾ (one and three-quarters).</p>

    <h3>Where Fraction-to-Decimal Conversion Matters</h3>
    <ul>
      <li><b>Cooking and baking:</b> Recipe measurements like ⅔ cup often need converting for scaling or substitution.</li>
      <li><b>Carpentry and construction:</b> Tape measures are marked in fractions of an inch (⅛, ¼, ½), which sometimes need decimal equivalents for calculations.</li>
      <li><b>Finance:</b> Interest rates and stock prices have historically been quoted in fractions before decimalization.</li>
      <li><b>Engineering and machining:</b> Precise tolerances often require converting fractional dimensions to decimal form.</li>
    </ul>

    <details>
      <summary>❓ What is a mixed number?</summary>
      <p>A mixed number combines a whole number and a proper fraction. For example, 7/4 = 1¾ (one and three-quarters). To convert an improper fraction to a mixed number: divide the numerator by the denominator — the quotient becomes the whole number, and the remainder becomes the new numerator over the original denominator.</p>
    </details>
    <details>
      <summary>❓ What are the most common fractions and their decimal equivalents?</summary>
      <p>½ = 0.5, ⅓ ≈ 0.333, ¼ = 0.25, ⅕ = 0.2, ⅛ = 0.125, ¾ = 0.75, ⅔ ≈ 0.667, ⅜ = 0.375, ⅝ = 0.625, ⅞ = 0.875. These are especially common in cooking measurements and woodworking/construction dimensions, so memorizing them speeds up everyday mental math.</p>
    </details>
    <details>
      <summary>❓ Why do some fractions produce repeating decimals?</summary>
      <p>A fraction produces a terminating decimal only if, after simplifying, its denominator's prime factors are limited to 2s and 5s (since our number system is base 10). Any other prime factor in the denominator — like 3, 7, or 11 — produces a repeating decimal, such as ⅓ = 0.333... or ⅐ = 0.142857142857...</p>
    </details>
  `
});

/* ─── Math Helpers ────────────────────────────────────────── */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function toMixedNumber(num, den) {
  if (Math.abs(num) < Math.abs(den)) return `${num}/${den}`;
  const whole   = Math.trunc(num / den);
  const rem     = Math.abs(num % den);
  if (rem === 0) return `${whole}`;
  const g       = gcd(rem, Math.abs(den));
  return `${whole} ${rem / g}/${Math.abs(den) / g}`;
}
