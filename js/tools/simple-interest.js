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
    <p>Simple interest is the most straightforward method of calculating the interest charge on a loan or investment. Unlike compound interest, it grows in a perfectly straight line — the same dollar amount is added every period, making it easy to predict and easy to reason about.</p>

    <h3>The Simple Interest Formula</h3>
    <div class="formula-block">Interest = Principal × Rate × Time ÷ 100</div>
    <p>Where "Principal" is the initial amount, "Rate" is the annual interest rate (as a percentage), and "Time" is the duration in years. For example, $1,000 at 5% for 3 years earns (1000 × 5 × 3) ÷ 100 = $150 in total interest, for a final balance of $1,150 — regardless of how that interest is paid out or timed.</p>

    <h3>Simple vs. Compound Interest</h3>
    <p>With compound interest, interest is earned on both the principal <em>and</em> previously earned interest, so growth accelerates over time. Simple interest only ever applies to the original principal, so the interest earned each year stays exactly the same. Over short periods the difference is small, but over many years compound interest pulls noticeably ahead — which is why long-term savings and investment products almost always use compounding, while simple interest is reserved for shorter, more predictable arrangements.</p>

    <h3>Where Simple Interest Is Used</h3>
    <ul>
      <li><b>Auto loans:</b> Many car loans use simple interest calculated on the remaining principal.</li>
      <li><b>Short-term personal loans:</b> Loans under a year or two often use simple interest for easy transparency.</li>
      <li><b>Some certificates of deposit (CDs):</b> Certain short-term CDs pay simple interest rather than compounding.</li>
      <li><b>Late fee and penalty calculations:</b> Many contracts specify simple interest for calculating overdue balances.</li>
    </ul>

    <details>
      <summary>❓ When is simple interest used instead of compound?</summary>
      <p>Simple interest is commonly used for auto loans, short-term personal loans, and certain types of consumer credit where lenders want a transparent, easy-to-verify interest calculation that doesn't compound over the loan term.</p>
    </details>
    <details>
      <summary>❓ How do I convert months to years for the formula?</summary>
      <p>Divide the number of months by 12. For example, 6 months is 0.5 years, and 18 months is 1.5 years — plug that decimal directly into the Time field.</p>
    </details>
    <details>
      <summary>❓ Does simple interest ever beat compound interest?</summary>
      <p>Only from a borrower's perspective on longer loans — since compound interest accrues interest-on-interest, a borrower generally pays less total interest under a simple-interest agreement than an equivalent compound-interest one over the same term and rate.</p>
    </details>
  `
});
