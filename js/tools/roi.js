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
    <p>Return on Investment (ROI) is one of the most widely used profitability ratios for evaluating how efficiently money was put to work — whether in stocks, real estate, a small business, or cryptocurrency. ROI directly measures the return on an investment relative to its cost, expressed as a simple, comparable percentage.</p>

    <h3>How to Calculate ROI</h3>
    <div class="formula-block">ROI (%) = [(Amount Returned − Amount Invested) ÷ Amount Invested] × 100</div>
    <p>For example, investing $1,000 and later selling for $1,500 gives a profit of $500, so ROI = (500 ÷ 1000) × 100 = 50%. A positive ROI means the investment earned more than it cost; a negative ROI means it resulted in a net loss. A 0% ROI means you broke exactly even.</p>

    <h3>What Counts as a "Good" ROI?</h3>
    <p>What qualifies as a good ROI depends entirely on the asset class, risk level, and time horizon involved. Historically, the S&P 500 stock index has averaged around 10% annually before inflation. Real estate investors often target ROI in the range of 8–12% annually including rental income and appreciation. In venture capital or high-risk crypto investing, investors may look for 10x (900% ROI) or more on individual bets, specifically because most such investments are expected to fail entirely.</p>

    <h3>ROI vs. Other Investment Metrics</h3>
    <ul>
      <li><b>ROI:</b> Simple total return over the life of the investment, ignoring the time period involved.</li>
      <li><b>Annualized ROI:</b> Normalizes total ROI into a per-year rate, making investments of different durations comparable.</li>
      <li><b>IRR (Internal Rate of Return):</b> Accounts for the timing of multiple cash flows in and out, useful for investments with several contributions or withdrawals over time.</li>
      <li><b>CAGR (Compound Annual Growth Rate):</b> Similar to annualized ROI, commonly used for investments that compound over multiple years.</li>
    </ul>

    <details>
      <summary>❓ Does ROI include inflation?</summary>
      <p>Standard ROI calculations (nominal ROI) do not account for inflation. To find the "real ROI" — your actual gain in purchasing power — subtract the inflation rate over the same period from your nominal return percentage.</p>
    </details>
    <details>
      <summary>❓ What is Annualized ROI, and why does it matter?</summary>
      <p>If an investment lasted 5 years, the total ROI alone doesn't tell the whole story — a 50% return over 5 years is very different from a 50% return in 1 year. Annualized ROI calculates the equivalent yearly rate of return, allowing you to compare a 1-year stock gain to a 5-year real estate gain on equal footing.</p>
    </details>
    <details>
      <summary>❓ Should I use ROI to compare investments with different risk levels?</summary>
      <p>ROI alone doesn't capture risk, so a fair comparison should also weigh volatility and the probability of loss. A 20% ROI from a stable index fund and a 20% ROI from a speculative asset are not equivalent in practice, even though the percentage looks identical.</p>
    </details>
  `
});

