/**
 * PrecisionCalc — Logarithm Calculator
 * Calculates log base b of x, ln(x), log10(x)
 */
registerTool({
  id: 'logarithm',
  name: 'Logarithm Calculator',
  category: 'Math',
  icon: 'log',
  materialIcon: 'calculate',
  tagline: 'Calculate logarithms with any base.',
  keywords: ['logarithm', 'log', 'ln', 'log10', 'base', 'math'],
  meta: {
    title: 'Logarithm Calculator — PrecisionCalc',
    description: 'Calculate logarithms with any base, including natural log (ln) and common log (log10).'
  },

  seoContent: `
    <p>An earthquake measuring 7.0 on the Richter scale isn't 40% stronger than one measuring 5.0 — it releases roughly 1,000 times more energy. Decibels, pH, and star brightness (magnitude) all work the same deceptive way. Logarithms are the reason: they compress enormous ranges of values into small, manageable numbers, which is exactly why scientists reach for them whenever a quantity spans many orders of magnitude.</p>

    <h3>What a Logarithm Actually Asks</h3>
    <div class="formula-block">log_b(x) = y &nbsp;means&nbsp; b^y = x</div>
    <p>A logarithm answers the question: "what power do I need to raise the base to, to get this number?" With the default value 8 and base 2: log₂(8) = 3, because 2³ = 8. This calculator also shows the natural logarithm ln(8) ≈ 2.079 (base e ≈ 2.71828) and the common logarithm log₁₀(8) ≈ 0.903 (base 10) for the same input, so you can compare across bases instantly.</p>

    <h3>Converting Between Bases</h3>
    <p>Any logarithm can be rewritten in terms of any other base using the change-of-base formula: log_b(x) = ln(x) / ln(b). This is exactly how calculators (and this tool) compute log base 2 or log base 7 even though most built-in math libraries only provide natural log and log base 10 directly.</p>

    <h3>Why Scientists Use Logarithmic Scales</h3>
    <ul>
      <li><b>Richter scale (earthquakes):</b> Each whole-number increase represents roughly 32 times more released energy, not a linear jump.</li>
      <li><b>Decibels (sound):</b> A logarithmic scale because human hearing perceives loudness roughly logarithmically — a linear scale would be either useless at quiet volumes or unmanageable at loud ones.</li>
      <li><b>pH (acidity):</b> Each whole pH unit represents a tenfold change in hydrogen ion concentration; a pH of 3 is 10 times more acidic than a pH of 4.</li>
    </ul>

    <details>
      <summary>❓ Why can't you take the logarithm of a negative number or zero?</summary>
      <p>Because no real exponent applied to a positive base can ever produce a negative result or exactly zero — bˣ is always positive for a positive base b. Logarithms of negative numbers exist in complex number theory but fall outside standard real-number calculators.</p>
    </details>
    <details>
      <summary>❓ What's the difference between "log" and "ln" on a calculator?</summary>
      <p>By convention, "log" (without a subscript) usually means base 10 (the common logarithm), while "ln" specifically means the natural logarithm, base e. Some fields (like computer science) sometimes use unadorned "log" to mean base 2 instead, so it's worth checking context.</p>
    </details>
    <details>
      <summary>❓ Why is e (≈2.71828) considered the "natural" base?</summary>
      <p>e arises naturally from continuous growth processes — it's defined as the limit of (1 + 1/n)ⁿ as n approaches infinity, which is exactly the mathematical limit of compound interest compounded infinitely often. Because of this, e-based logarithms and exponentials simplify calculus operations (derivatives and integrals) far more elegantly than any other base.</p>
    </details>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="log-x">Value (x)</label>
        <input type="number" id="log-x" placeholder="8" min="0" value="8" />
      </div>
      <div class="field">
        <label for="log-base">Base (b)</label>
        <input type="number" id="log-base" placeholder="2" min="0" value="2" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-logarithm');

    function logCalc() {
      const x = parseFloat(container.querySelector('#log-x').value) || 0;
      const b = parseFloat(container.querySelector('#log-base').value) || 0;
      const valid = x > 0 && b > 0 && b !== 1;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter a positive value and base (base ≠ 1) ✦</div>'; return; }
      const logb = Math.log(x) / Math.log(b);
      const ln = Math.log(x);
      const log10 = Math.log10(x);
      resultCard.innerHTML = `<div><b>log<sub>${b}</sub>(${x}) =</b> ${logb}</div><div><b>ln(${x}) =</b> ${ln}</div><div><b>log<sub>10</sub>(${x}) =</b> ${log10}</div>`;
      resultCard.classList.add('active');
      pulseResult('logarithm');
    }
    container.addEventListener('input', logCalc);
    logCalc();
  }
});
