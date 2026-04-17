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
    <p>A fraction represents a part of a whole, written as a numerator (top number) over a denominator (bottom number). Converting fractions to decimals is a fundamental math skill used in cooking, carpentry, finance, and virtually every STEM field.</p>

    <h3>Fraction to Decimal Conversion</h3>
    <div class="formula-block">Decimal = Numerator ÷ Denominator</div>
    <p>For example, ¾ = 3 ÷ 4 = 0.75. Some fractions produce terminating decimals (like ½ = 0.5), while others produce repeating decimals (like ⅓ = 0.3333...). To convert to a percentage, multiply the decimal by 100.</p>

    <h3>Simplifying Fractions</h3>
    <p>A fraction is in its simplest form when the numerator and denominator share no common factors other than 1. To simplify, divide both by their Greatest Common Divisor (GCD). For example, 12/16: GCD(12,16) = 4, so 12/16 = 3/4.</p>

    <div class="formula-block">
      GCD(a, b) — Euclidean Algorithm:
      gcd(a, 0) = a
      gcd(a, b) = gcd(b, a mod b)
    </div>

    <details>
      <summary>❓ What is a mixed number?</summary>
      <p>A mixed number combines a whole number and a proper fraction. For example, 7/4 = 1¾ (one and three-quarters). To convert an improper fraction to a mixed number: divide the numerator by the denominator. The quotient is the whole number; the remainder becomes the new numerator.</p>
    </details>
    <details>
      <summary>❓ What are the most common fractions?</summary>
      <p>½ = 0.5, ⅓ ≈ 0.333, ¼ = 0.25, ⅕ = 0.2, ⅛ = 0.125, ¾ = 0.75, ⅔ ≈ 0.667, ⅜ = 0.375, ⅝ = 0.625, ⅞ = 0.875. These are especially common in cooking measurements and woodworking dimensions.</p>
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
