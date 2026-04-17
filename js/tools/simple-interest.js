/**
 * PrecisionCalc — Simple Interest Calculator
 * Formula: SI = (P × R × T) / 100
 */
registerTool({
  id:       'simple-interest',
  name:     'Simple Interest',
  category: 'Finance',
  icon:         '$',
  materialIcon: 'savings',
  tagline:  'Calculate simple interest, total amount, and interest earned.',
  keywords: ['simple interest', 'principal', 'rate', 'time', 'interest'],
  meta: {
    title:       'Simple Interest Calculator — PrecisionCalc',
    description: 'Calculate simple interest, total amount, and interest earned for any principal, rate, and time.'
  },

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="si-principal">Principal ($)</label>
        <input type="number" id="si-principal" placeholder="1,000" min="0" value="1000" />
      </div>
      <div class="field">
        <label for="si-rate">Annual Interest Rate (%)</label>
        <input type="number" id="si-rate" placeholder="5" min="0" step="0.01" value="5" />
      </div>
      <div class="field">
        <label for="si-time">Time (Years)</label>
        <input type="number" id="si-time" placeholder="3" min="0" value="3" />
      </div>
    </div>
  `,

  mount(container) {
    const ids = ['si-principal', 'si-rate', 'si-time'];
    const els = ids.map(id => container.querySelector(`#${id}`));
    const resultCard = container.querySelector('#result-card-simple-interest');

    const calc = () => {
      const P = parseFloat(els[0].value) || 0;
      const R = parseFloat(els[1].value) || 0;
      const T = parseFloat(els[2].value) || 0;

      if (P <= 0) {
          resultCard.innerHTML = `<div class="result-placeholder">Enter principal amount ✦</div>`;
          return;
      }

      const interest = (P * R * T) / 100;
      const total = P + interest;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Total Interest</span>
            <span class="result-value">
                ${fmt.currency(interest)}
                <button class="copy-btn" onclick="copyValue(this,'${fmt.currency(interest)}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Final Balance</span>
            <span class="result-value large">${fmt.currency(total)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Monthly Interest</span>
            <span class="result-value">${fmt.currency(interest / (T * 12))}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('simple-interest');
    };

    els.forEach(el => el?.addEventListener('input', calc));
    calc();
  },

  seoContent: `
    <p>Simple interest is a quick and easy method of calculating the interest charge on a loan. It is determined by multiplying the daily interest rate by the principal by the number of days that elapse between payments.</p>

    <h3>The Simple Interest Formula</h3>
    <div class="formula-block">
      Interest = Principal × Rate × Time
    </div>
    <p>Where "Principal" is the initial amount, "Rate" is the annual interest rate (as a decimal), and "Time" is the duration in years.</p>

    <h3>Simple vs. Compound Interest</h3>
    <p>Unlike compound interest—where interest is earned on both the principal and previously earned interest—simple interest only applies to the original principal. This makes it a preferred calculation for short-term loans and some consumer credit products.</p>

    <details>
      <summary>❓ When is simple interest used?</summary>
      <p>Simple interest is commonly used for auto loans, short-term personal loans, and certain types of mortgages.</p>
    </details>
    <details>
      <summary>❓ How do I convert months to years for the formula?</summary>
      <p>Divide the number of months by 12. For example, 6 months is 0.5 years.</p>
    </details>
  `
});
