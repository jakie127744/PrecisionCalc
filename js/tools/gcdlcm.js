/**
 * PrecisionCalc — GCD/LCM Calculator
 * Calculates GCD and LCM for two integers
 */
registerTool({
  id: 'gcdlcm',
  name: 'GCD/LCM Calculator',
  category: 'Math',
  icon: 'gcd',
  materialIcon: 'calculate',
  tagline: 'Calculate GCD and LCM of two numbers.',
  keywords: ['gcd', 'lcm', 'greatest common divisor', 'least common multiple', 'math'],
  meta: {
    title: 'GCD/LCM Calculator — PrecisionCalc',
    description: 'Calculate the greatest common divisor (GCD) and least common multiple (LCM) of two integers.'
  },

  seoContent: `
    <p>Two buses leave the same station — one returns every 12 minutes, the other every 18. How long until they're both back at the station at the same time? The answer is their least common multiple (36 minutes) — one of the most immediately practical uses of a concept most people only remember from simplifying fractions in school.</p>

    <h3>Two Related but Opposite Ideas</h3>
    <div class="formula-block">GCD(a,b) × LCM(a,b) = a × b</div>
    <p>The <b>greatest common divisor (GCD)</b> is the largest number that divides both a and b evenly. The <b>least common multiple (LCM)</b> is the smallest number that both a and b divide into evenly. They're mathematical opposites, but elegantly connected: their product always equals the product of the original two numbers. For the default values 12 and 18: GCD(12,18) = 6, and LCM(12,18) = (12 × 18) / 6 = 36 — matching the bus example above.</p>

    <h3>How the Computer Actually Finds the GCD</h3>
    <p>This calculator uses the <b>Euclidean algorithm</b>, one of the oldest algorithms still in everyday use (documented by Euclid around 300 BC). It repeatedly replaces the larger number with the remainder of dividing it by the smaller one, until the remainder hits zero: GCD(18,12) → GCD(12,6) → GCD(6,0) = 6. This converges far faster than checking every possible divisor, especially for large numbers — it's still the standard method used inside calculators, cryptography libraries, and computer algebra systems today.</p>

    <h3>Where This Actually Gets Used</h3>
    <ul>
      <li><b>Simplifying fractions:</b> Dividing a fraction's numerator and denominator by their GCD reduces it to lowest terms — 12/18 divided by their GCD of 6 becomes 2/3.</li>
      <li><b>Common denominators:</b> Adding fractions with different denominators requires finding their LCM first, so all fractions share the same base.</li>
      <li><b>Scheduling and cycles:</b> Any recurring-event problem (traffic lights, gear rotations, recurring shifts) that asks "when do these all line up again?" is really an LCM problem in disguise.</li>
    </ul>

    <details>
      <summary>❓ What if the two numbers share no common factors except 1?</summary>
      <p>Then their GCD is 1, and they're called "coprime" or "relatively prime." In that case, their LCM is simply the product of the two numbers, since nothing smaller could be a multiple of both.</p>
    </details>
    <details>
      <summary>❓ Why is the Euclidean algorithm faster than checking every divisor?</summary>
      <p>Checking every number up to the smaller value to test divisibility takes time proportional to the size of the numbers themselves. The Euclidean algorithm instead shrinks the problem by at least half with every couple of steps (a property tied to the golden ratio, in the worst case), making it dramatically faster for large numbers used in real cryptographic systems.</p>
    </details>
    <details>
      <summary>❓ Does this work for negative numbers?</summary>
      <p>GCD and LCM are conventionally defined for positive integers; this calculator takes the absolute value of any input, since "greatest common divisor" and "least common multiple" are typically reported as positive values regardless of the sign of the original numbers.</p>
    </details>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="gcdlcm-a">Number A</label>
        <input type="number" id="gcdlcm-a" placeholder="12" value="12" />
      </div>
      <div class="field">
        <label for="gcdlcm-b">Number B</label>
        <input type="number" id="gcdlcm-b" placeholder="18" value="18" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-gcdlcm');

    function gcd(a, b) {
      while (b !== 0) {
        [a, b] = [b, a % b];
      }
      return Math.abs(a);
    }
    function lcm(a, b) {
      return Math.abs(a * b) / gcd(a, b);
    }
    function gcdlcmCalc() {
      const a = parseInt(container.querySelector('#gcdlcm-a').value) || 0;
      const b = parseInt(container.querySelector('#gcdlcm-b').value) || 0;
      const valid = a !== 0 && b !== 0;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter two non-zero numbers ✦</div>'; return; }
      resultCard.innerHTML = `<div><b>GCD:</b> ${gcd(a, b)}</div><div><b>LCM:</b> ${lcm(a, b)}</div>`;
      resultCard.classList.add('active');
      pulseResult('gcdlcm');
    }
    container.addEventListener('input', gcdlcmCalc);
    gcdlcmCalc();
  }
});
