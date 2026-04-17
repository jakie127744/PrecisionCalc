/**
 * PrecisionCalc — ROI Calculator
 * Calculates Return on Investment (ROI) as a percentage and value.
 */
registerTool({
  id:       'roi',
  name:     'ROI Calculator',
  category: 'Finance',
  icon:         '\ud83d\udcb5',
  materialIcon: 'trending_up',
  tagline:  'Calculate your return on investment (ROI) for stocks, crypto, or business.',
  keywords: ['roi', 'return on investment', 'profit', 'gain', 'investment'],
  meta: {
    title:       'ROI Calculator — PrecisionCalc',
    description: 'Calculate your return on investment (ROI) as a percentage and value. Useful for stocks, crypto, and business.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\">
        <label for=\"roi-invested\">Amount Invested ($)</label>
        <input type=\"number\" id=\"roi-invested\" placeholder=\"1,000\" min=\"0\" value=\"1000\" />
      </div>
      <div class=\"field\">
        <label for=\"roi-returned\">Amount Returned ($)</label>
        <input type=\"number\" id=\"roi-returned\" placeholder=\"1,500\" min=\"0\" value=\"1500\" />
      </div>
    </div>
  `,

  mount(container) {
    const ids = ['roi-invested', 'roi-returned'];
    const els = ids.map(id => container.querySelector(`#${id}`));
    const resultCard = container.querySelector('#result-card-roi');

    const calc = () => {
      const invested = parseFloat(els[0].value) || 0;
      const returned = parseFloat(els[1].value) || 0;

      if (invested <= 0) {
          resultCard.innerHTML = `<div class="result-placeholder">Enter investment amount ✦</div>`;
          return;
      }

      const profit = returned - invested;
      const roi = (profit / invested) * 100;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Return on Investment</span>
            <span class="result-value large ${roi >= 0 ? 'success' : 'danger'}">
                ${fmt.number(roi, 2)}%
                <button class="copy-btn" onclick="copyValue(this,'${fmt.number(roi, 2)}%')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Total Profit/Loss</span>
            <span class="result-value ${profit >= 0 ? 'success' : 'danger'}">${fmt.currency(profit)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Investment Multiple</span>
            <span class="result-value">${fmt.number(returned / invested, 2)}x</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('roi');
    };

    els.forEach(el => el?.addEventListener('input', calc));
    calc();
  },

  seoContent: `
    <p>Return on Investment (ROI) is a popular profitability ratio used to evaluate the efficiency of an investment or compare the efficiencies of several different investments. ROI tries to directly measure the amount of return on a particular investment, relative to the investment’s cost.</p>

    <h3>How to Calculate ROI</h3>
    <div class="formula-block">
      ROI (%) = [(Current Value - Initial Cost) / Initial Cost] × 100
    </div>
    <p>A positive ROI means the investment has earned more than it cost, while a negative ROI means the investment resulted in a loss.</p>

    <h3>What is a "Good" ROI?</h3>
    <p>What qualifies as a good ROI depends entirely on the asset class and the time horizon. Traditionally, the S&P 500 averages about 10% annually. In VC or high-risk crypto investments, investors may look for 10x (900% ROI) or more to offset other losses.</p>

    <details>
      <summary>❓ Does ROI include inflation?</summary>
      <p>Standard ROI calculations (Nominal ROI) do not account for inflation. To find the "Real ROI," you must subtract the inflation rate from your nominal return percentage.</p>
    </details>
    <details>
      <summary>❓ What is Annualized ROI?</summary>
      <p>If an investment lasted 5 years, the total ROI doesn't tell the whole story. Annualized ROI calculates the geometric mean of the return per year, allowing you to compare a 1-year stock gain to a 5-year real estate gain fairly.</p>
    </details>
  `
});

