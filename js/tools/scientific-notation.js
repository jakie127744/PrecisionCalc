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
    <p>Scientific notation is a way of expressing numbers that are too large or too small to be conveniently written in decimal form. It is widely used by scientists, mathematicians, and engineers to simplify complex calculations and comparisons.</p>

    <h3>How to Read Scientific Notation</h3>
    <p>In the form <b>m × 10<sup>n</sup></b>:</p>
    <ul>
      <li><b>m:</b> The coefficient (a number between 1 and 10).</li>
      <li><b>n:</b> The exponent (an integer representing the power of ten).</li>
    </ul>
    <p>A positive exponent means the number is large (greater than 1), while a negative exponent means the number is small (between 0 and 1).</p>

    <h3>E-Notation</h3>
    <p>In calculators and computer programming, scientific notation often appears as "E-notation" (e.g., 1.5e8). The 'e' stands for "exponential" and represents "times ten to the power of."</p>

    <details>
      <summary>❓ Why do we use scientific notation?</summary>
      <p>Imagine writing the mass of the Earth (5,970,000,000,000,000,000,000,000 kg) or the size of a cell. Scientific notation makes these numbers readable and allows for much easier multiplication and division.</p>
    </details>
  `
});
