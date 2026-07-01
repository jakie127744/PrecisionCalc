/**
 * PrecisionCalc — Scientific Notation Converter
 * Converts between standard numbers and scientific notation.
 */
registerTool({
  id:       'scientific-notation',
  name:     'Scientific Notation',
  category: 'Education',
  icon:         '🔬',
  materialIcon: 'auto_fix',
  tagline:  'Convert numbers to scientific notation.',
  keywords: ['scientific notation', 'standard notation', 'exponent', 'math', 'science', 'education'],
  meta: {
    title:       'Scientific Notation Converter — PrecisionCalc',
    description: 'Quickly convert large or small numbers into scientific notation (e x 10^n) and back again.'
  },

  template: () => `
    <div class="form-row">
      <div class="field" style="flex:1;">
        <label for="sn-num">Number (Standard or Scientific)</label>
        <input type="text" id="sn-num" placeholder="0.000001 or 6.022e23" value="150000000" />
      </div>
    </div>
  `,

  mount(container) {
    const input = container.querySelector('#sn-num');
    const resultCard = container.querySelector('#result-card-scientific-notation');

    const calc = () => {
      let val = input.value.trim().toLowerCase();
      if (!val) {
          resultCard.innerHTML = `<div class="result-placeholder">Enter a number ✦</div>`;
          return;
      }

      const n = Number(val);
      if (isNaN(n)) {
          resultCard.innerHTML = `<div class="result-placeholder">Invalid number format. Use 1.2e5 or 120000 ✦</div>`;
          return;
      }

      const sci = n.toExponential();
      const parts = sci.split('e');
      const base = parseFloat(parts[0]).toFixed(3);
      const exp = parts[1];

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Scientific Notation</span>
            <span class="result-value large">
                ${base} × 10<sup>${exp.replace('+','')}</sup>
                <button class="copy-btn" onclick="copyValue(this,'${sci}')" title="Copy Raw">📋</button>
            </span>
            <span class="result-sub">E-notation: ${sci}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Standard Form</span>
            <span class="result-value" style="font-size:1rem; word-break: break-all;">${n.toLocaleString(undefined, {maximumFractionDigits: 20})}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Significant Figures</span>
            <span class="result-value">${val.replace(/^[0. ]+|[ .]+$/g, '').length}</span>
            <span class="result-sub">Estimate based on input</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('scientific-notation');
    };

    input.addEventListener('input', calc);
    calc();
  },

  seoContent: `
    <p>Scientific notation is a way of expressing numbers that are too large or too small to be conveniently written in decimal form. It is widely used by scientists, mathematicians, engineers, and programmers to simplify complex calculations, comparisons, and storage of extreme values.</p>

    <h3>How to Read Scientific Notation</h3>
    <div class="formula-block">Standard Form = m × 10ⁿ</div>
    <p>In the form <b>m × 10<sup>n</sup></b>: <b>m</b> is the coefficient (a number between 1 and 10), and <b>n</b> is the exponent, an integer representing the power of ten. A positive exponent means the number is large (greater than 1) — for example, 150,000,000 becomes 1.5 × 10⁸. A negative exponent means the number is small (between 0 and 1) — for example, 0.000001 becomes 1.0 × 10⁻⁶.</p>

    <h3>Worked Example</h3>
    <p>Convert 6,022,000,000,000,000,000,000,000 (Avogadro's number, roughly) to scientific notation: move the decimal point left until only one non-zero digit remains before it — that takes 23 places — giving 6.022 × 10²³. Converting back, you'd move the decimal point 23 places to the right.</p>

    <h3>E-Notation</h3>
    <p>In calculators and computer programming, scientific notation often appears as "E-notation" (e.g., 1.5e8, meaning 1.5 × 10⁸). The letter "e" stands for "exponential" and represents "times ten to the power of." This format lets software display and store extremely large or small numbers without running out of readable digits.</p>

    <h3>Why Scientific Notation Matters</h3>
    <ul>
      <li><b>Astronomy:</b> Distances like light-years (9.46 × 10¹⁵ meters) would be unreadable in full decimal form.</li>
      <li><b>Chemistry:</b> Atomic and molecular quantities, like Avogadro's number (6.022 × 10²³), are always expressed this way.</li>
      <li><b>Computing:</b> Floating-point numbers in programming languages are stored internally using a form of scientific notation.</li>
      <li><b>Engineering:</b> Tolerances and measurements at the micro or nano scale (10⁻⁶, 10⁻⁹) are far easier to compare in exponential form.</li>
    </ul>

    <details>
      <summary>❓ Why do we use scientific notation?</summary>
      <p>Imagine writing the mass of the Earth (5,970,000,000,000,000,000,000,000 kg) or the diameter of a human cell (0.00001 meters). Scientific notation makes these numbers readable and allows for much easier multiplication, division, and comparison of magnitude.</p>
    </details>
    <details>
      <summary>❓ What's the difference between scientific notation and engineering notation?</summary>
      <p>Scientific notation always keeps the coefficient between 1 and 10. Engineering notation restricts the exponent to multiples of 3 (matching metric prefixes like kilo, mega, micro), so the coefficient can range from 1 to 999 — useful when working with SI units.</p>
    </details>
    <details>
      <summary>❓ How do I know how many significant figures to keep?</summary>
      <p>Significant figures reflect the precision of your original measurement or data. If a value was measured to three significant figures, the scientific-notation coefficient should also be rounded to three significant figures rather than showing false precision.</p>
    </details>
  `
});
