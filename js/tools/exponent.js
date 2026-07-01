/**
 * PrecisionCalc — Exponent/Power Calculator
 * Calculates x^y
 */
registerTool({
  id: 'exponent',
  name: 'Exponent/Power Calculator',
  category: 'Math',
  icon: '^',
  materialIcon: 'superscript',
  tagline: 'Calculate exponents and powers.',
  keywords: ['exponent', 'power', 'math', 'x^y', 'base', 'math'],
  meta: {
    title: 'Exponent/Power Calculator — PrecisionCalc',
    description: 'Calculate exponents and powers (x^y) for any real numbers.'
  },

  seoContent: `
    <p>A grain of rice on the first square of a chessboard, doubled on every subsequent square, reaches over 18 quintillion grains by square 64 — more rice than has ever been harvested in human history. That's the essence of exponents: repeated multiplication grows far faster than intuition expects, which is exactly why they show up everywhere from compound interest to viral spread to computer memory sizes.</p>

    <h3>Reading x<sup>y</sup></h3>
    <div class="formula-block">xʸ = x × x × x × ... (y times)</div>
    <p>With the default base 2 and exponent 3: 2³ = 2 × 2 × 2 = 8. But exponents aren't limited to positive whole numbers — this calculator also handles negative exponents (x⁻ⁿ = 1/xⁿ, so 2⁻³ = 1/8 = 0.125) and fractional exponents (x^(1/2) is the same as √x, so 9^0.5 = 3).</p>

    <h3>The Rules That Make Exponents Work</h3>
    <ul>
      <li><b>Product rule:</b> xᵃ × xᵇ = x^(a+b) — multiplying same-base powers adds the exponents.</li>
      <li><b>Power rule:</b> (xᵃ)ᵇ = x^(a×b) — raising a power to another power multiplies the exponents.</li>
      <li><b>Zero rule:</b> Any nonzero number raised to the power of 0 equals 1 (x⁰ = 1), including negative or fractional bases.</li>
      <li><b>Negative exponent rule:</b> x⁻ⁿ = 1/xⁿ — a negative exponent means "take the reciprocal," not "make the result negative."</li>
    </ul>

    <h3>Why Exponential Growth Fools Our Intuition</h3>
    <p>Human intuition is naturally linear — we expect quantities to grow by roughly the same amount each step. Exponential growth instead grows by the same <em>factor</em> each step, which starts slow and then explodes. This is why early warnings about compounding phenomena (pandemics, viral content, compound debt) often get dismissed — the early numbers look small right up until they suddenly aren't.</p>

    <details>
      <summary>❓ Why does any number to the power of 0 equal 1?</summary>
      <p>Following the product rule, xⁿ ÷ xⁿ = x^(n−n) = x⁰. Since anything divided by itself equals 1 (except zero), x⁰ must equal 1 for the exponent rules to stay internally consistent.</p>
    </details>
    <details>
      <summary>❓ What does a negative exponent actually mean?</summary>
      <p>It means "take the reciprocal of the positive-exponent version." x⁻² is not negative x squared — it's 1 divided by x². For example, 4⁻² = 1/16 = 0.0625, a small positive number, not −16.</p>
    </details>
    <details>
      <summary>❓ How is a fractional exponent related to roots?</summary>
      <p>x^(1/n) is defined as the nth root of x. So x^(1/2) = √x, x^(1/3) = ∛x, and more generally x^(m/n) = (the nth root of x) raised to the m power. This unifies roots and powers into a single consistent system.</p>
    </details>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="exp-base">Base (x)</label>
        <input type="number" id="exp-base" placeholder="2" value="2" />
      </div>
      <div class="field">
        <label for="exp-exp">Exponent (y)</label>
        <input type="number" id="exp-exp" placeholder="3" value="3" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-exponent');

    function expCalc() {
      const x = parseFloat(container.querySelector('#exp-base').value) || 0;
      const y = parseFloat(container.querySelector('#exp-exp').value) || 0;
      const result = Math.pow(x, y);
      resultCard.innerHTML = `<div><b>${x}<sup>${y}</sup> =</b> ${result}</div>`;
      resultCard.classList.add('active');
      pulseResult('exponent');
    }
    container.addEventListener('input', expCalc);
    expCalc();
  }
});
