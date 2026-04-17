/**
 * PrecisionCalc — Compound Interest Calculator
 * Formula: A = P(1 + r/n)^(nt)
 */
registerTool({
    seoContent: `
      <h2>Compound Interest Calculator</h2>
      <p>The Compound Interest Calculator is a must-have tool for anyone looking to grow their savings or investments over time. Compound interest is the process where your money earns interest, and then that interest also earns interest, creating a powerful snowball effect. This calculator helps you visualize how your initial investment, regular contributions, interest rate, and compounding frequency work together to build wealth.</p>

      <h3>Why Use a Compound Interest Calculator?</h3>
      <ul>
        <li><b>See the Power of Compounding:</b> Understand how your money grows faster when interest is added to your balance and then earns more interest itself.</li>
        <li><b>Plan for the Future:</b> Set savings or investment goals and see how much you need to contribute to reach them.</li>
        <li><b>Compare Scenarios:</b> Experiment with different interest rates, time periods, and contribution amounts to find the best strategy for your needs.</li>
        <li><b>Make Informed Decisions:</b> Use real numbers to guide your financial planning, whether for retirement, education, or major purchases.</li>
      </ul>

      <h3>How the Calculator Works</h3>
      <ol>
        <li>Enter your initial investment, annual interest rate, time period, compounding frequency, and optional monthly contribution.</li>
        <li>The calculator computes the future value of your investment, total contributed, interest earned, and growth multiple.</li>
        <li>Results update instantly, helping you visualize the impact of each variable.</li>
      </ol>

      <h3>Frequently Asked Questions</h3>
      <ul>
        <li><b>What is compound interest?</b><br>Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This leads to exponential growth over time.</li>
        <li><b>How often should I compound?</b><br>The more frequently interest is compounded (monthly, daily, etc.), the faster your money grows. This calculator lets you compare different frequencies.</li>
        <li><b>What if I make regular contributions?</b><br>Adding money each month accelerates your growth. The calculator factors in recurring contributions for a more accurate projection.</li>
        <li><b>Is compound interest better than simple interest?</b><br>Yes—compound interest grows your money faster because you earn interest on interest, not just on your original deposit.</li>
      </ul>

      <h3>Tips for Maximizing Compound Growth</h3>
      <ul>
        <li>Start investing or saving as early as possible to maximize the time your money can grow.</li>
        <li>Increase your contributions whenever possible, even small amounts make a big difference over time.</li>
        <li>Choose accounts or investments with higher compounding frequencies and competitive interest rates.</li>
        <li>Reinvest your earnings to keep the compounding effect going strong.</li>
      </ul>

      <p>Use this Compound Interest Calculator to take control of your financial future. By understanding and harnessing the power of compounding, you can achieve your savings and investment goals faster and with greater confidence. <b>Start planning today</b> and watch your money grow!</p>
    `,
  id:       'compound',
  name:     'Compound Interest',
  allowPrint: true,
  category: 'Finance',
  icon:         '📈',
  materialIcon: 'monitoring',
  tagline:  'See how your money grows over time with the power of compounding.',
  keywords: ['compound interest', 'savings', 'investment', 'future value', 'growth', 'interest', 'APY'],
  meta: {
    title:       'Compound Interest Calculator — PrecisionCalc',
    description: 'Calculate the future value of your investment with compound interest. See total growth and interest earned instantly.'
  },

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="ci-principal">Initial Investment ($)</label>
        <input type="number" id="ci-principal" placeholder="10,000" min="0" value="10000" />
      </div>
      <div class="field">
        <label for="ci-rate">Annual Interest Rate (%)</label>
        <input type="number" id="ci-rate" placeholder="7" min="0" step="0.01" value="7" />
      </div>
    </div>
    <div class="form-row">
      <div class="field">
        <label for="ci-time">Time Period (Years)</label>
        <input type="number" id="ci-time" placeholder="10" min="0" value="10" />
      </div>
      <div class="field">
        <label for="ci-freq">Compounding Frequency</label>
        <select id="ci-freq">
          <option value="1">Annually (1x/yr)</option>
          <option value="2">Semi-Annually (2x/yr)</option>
          <option value="4">Quarterly (4x/yr)</option>
          <option value="12" selected>Monthly (12x/yr)</option>
          <option value="365">Daily (365x/yr)</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="field">
        <label for="ci-monthly">Monthly Contribution ($)</label>
        <input type="number" id="ci-monthly" placeholder="0" min="0" value="0" />
      </div>
    </div>
  `,

  mount(container) {
    const inputs = ['ci-principal', 'ci-rate', 'ci-time', 'ci-freq', 'ci-monthly']
      .map(id => container.querySelector(`#${id}`));
    const resultCard = container.querySelector('#result-card-compound');

    const calc = () => {
      const P    = parseFloat(inputs[0].value) || 0;
      const r    = parseFloat(inputs[1].value) / 100 || 0;
      const t    = parseFloat(inputs[2].value) || 0;
      const n    = parseInt(inputs[3].value) || 12;
      const pmt  = parseFloat(inputs[4].value) || 0;

      // Lump sum future value
      const A = P * Math.pow(1 + r / n, n * t);

      // Future value of recurring contributions (annuity)
      let annuity = 0;
      if (pmt > 0 && r > 0) {
        annuity = pmt * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
      } else if (pmt > 0) {
        annuity = pmt * n * t;
      }

      const total       = A + annuity;
      const totalPaid   = P + pmt * n * t;
      const earned      = total - totalPaid;
      const growthMult  = totalPaid > 0 ? total / totalPaid : 0;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Future Value</span>
            <span class="result-value large">
              ${fmt.currency(total)}
              <button class="copy-btn" onclick="copyValue(this,'${fmt.currency(total)}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Total Contributed</span>
            <span class="result-value">${fmt.currency(totalPaid)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Interest Earned</span>
            <span class="result-value">${fmt.currency(earned)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Growth Multiple</span>
            <span class="result-value">${fmt.number(growthMult, 2)}×</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('compound');
    };

    inputs.forEach(el => el?.addEventListener('input', calc));
    calc();
  },

  seoContent: `
    <p>Compound interest is often called the "eighth wonder of the world." Unlike simple interest, which is calculated only on the principal, compound interest is calculated on the principal <em>and</em> the accumulated interest. This means your money earns interest on its interest — creating an exponential growth effect over time.</p>

    <h3>The Compound Interest Formula</h3>
    <div class="formula-block">A = P(1 + r/n)^(nt)</div>
    <p>Where <strong>A</strong> = Final amount, <strong>P</strong> = Principal, <strong>r</strong> = Annual interest rate (decimal), <strong>n</strong> = Compounding periods per year, <strong>t</strong> = Time in years.</p>

    <h3>How Compounding Frequency Affects Growth</h3>
    <p>The more frequently interest compounds, the faster your money grows. Daily compounding yields slightly more than monthly, which beats quarterly or annual compounding. For a $10,000 investment at 7% over 10 years: annually yields ~$19,672, while daily compounding yields ~$20,137 — a meaningful difference at scale.</p>

    <h3>The Rule of 72</h3>
    <p>A mental shortcut: divide 72 by your annual interest rate to estimate how many years it takes to double your money. At 7% interest, your money doubles approximately every 10.3 years (72 ÷ 7 = 10.3). At 10%, it doubles every 7.2 years.</p>

    <details>
      <summary>❓ What is APY vs. APR?</summary>
      <p>APR (Annual Percentage Rate) is the stated interest rate without accounting for compounding. APY (Annual Percentage Yield) reflects the actual rate of return after compounding. APY is always equal to or greater than APR — this is the number to compare when shopping for savings accounts.</p>
    </details>
    <details>
      <summary>❓ How does inflation affect compound interest?</summary>
      <p>To find your "real" return after inflation, use the Fisher equation: Real Rate ≈ Nominal Rate − Inflation Rate. If your investment earns 7% and inflation is 3%, your real purchasing-power growth is approximately 4% per year.</p>
    </details>
  `
});
