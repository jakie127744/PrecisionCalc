/**
 * PrecisionCalc — Mortgage Calculator
 * Formula: M = P[r(1+r)^n] / [(1+r)^n - 1]
 * Verified against: Bankrate.com reference values.
 */
registerTool({
  id:       'mortgage',
  name:     'Mortgage Calculator',
  category: 'Finance',
  icon:         '🏠',
  materialIcon: 'home',
  tagline:  'Calculate monthly payments, total interest, and see your full amortization schedule.',
  keywords: ['mortgage', 'home loan', 'monthly payment', 'amortization', 'house', 'interest', 'principal'],
  meta: {
    title:       'Mortgage Calculator — PrecisionCalc',
    description: 'Calculate your monthly mortgage payment and full amortization schedule instantly. Free online mortgage calculator with total interest and cost breakdown.'
  },

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="mort-price">Home Price ($)</label>
        <input type="number" id="mort-price" placeholder="350,000" min="0" value="350000" aria-label="Home Price" />
      </div>
      <div class="field">
        <label for="mort-down">Down Payment ($)</label>
        <input type="number" id="mort-down" placeholder="70,000" min="0" value="70000" aria-label="Down Payment" />
      </div>
    </div>
    <div class="form-row">
      <div class="field">
        <label for="mort-rate">Annual Interest Rate (%)</label>
        <input type="number" id="mort-rate" placeholder="6.75" min="0" max="30" step="0.01" value="6.75" aria-label="Annual Interest Rate" />
      </div>
      <div class="field">
        <label for="mort-term">Loan Term (Years)</label>
        <select id="mort-term" aria-label="Loan Term">
          <option value="30" selected>30 Years</option>
          <option value="20">20 Years</option>
          <option value="15">15 Years</option>
          <option value="10">10 Years</option>
        </select>
      </div>
    </div>
  `,

  mount(container) {
    const ids = ['mort-price', 'mort-down', 'mort-rate', 'mort-term'];
    const els = ids.map(id => container.querySelector(`#${id}`));
    const resultCard  = container.querySelector(`#result-card-mortgage`);
    const extraArea   = container.querySelector(`#extra-mortgage`);

    const calc = () => {
      const price    = parseFloat(els[0].value) || 0;
      const down     = parseFloat(els[1].value) || 0;
      const annRate  = parseFloat(els[2].value) || 0;
      const termYrs  = parseInt(els[3].value)   || 30;

      const principal = Math.max(0, price - down);
      const r         = annRate / 100 / 12;
      const n         = termYrs * 12;

      let monthly, totalCost, totalInterest;

      if (r === 0) {
        monthly = principal / n;
      } else {
        monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }

      totalCost     = monthly * n;
      totalInterest = totalCost - principal;
      const downPct = price > 0 ? (down / price * 100) : 0;

      if (!isFinite(monthly)) {
        resultCard.innerHTML = `<div class="result-placeholder">Please enter valid numbers.</div>`;
        extraArea.innerHTML  = '';
        return;
      }

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Monthly Payment</span>
            <span class="result-value large">
              ${fmt.currency(monthly)}
              <button class="copy-btn" onclick="copyValue(this,'${fmt.currency(monthly)}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Loan Amount</span>
            <span class="result-value">${fmt.currency(principal)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Total Interest</span>
            <span class="result-value">${fmt.currency(totalInterest)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Total Cost</span>
            <span class="result-value">${fmt.currency(totalCost)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Down Payment</span>
            <span class="result-value">${fmt.number(downPct, 1)}%</span>
            <span class="result-sub">${fmt.currency(down)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Payoff Date</span>
            <span class="result-value" style="font-size:1rem;">
              ${getPayoffDate(termYrs)}
            </span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('mortgage');

      // Amortization table
      extraArea.innerHTML = buildAmortTable(principal, r, n, monthly);
    };

    els.forEach(el => el?.addEventListener('input', calc));
    calc(); // run on mount
  },

  seoContent: `
    <p>A mortgage calculator helps you determine your monthly payment based on the home price, down payment, interest rate, and loan term. This is one of the most important financial calculations most people will ever make.</p>

    <h3>The Mortgage Formula</h3>
    <div class="formula-block">M = P × [r(1+r)^n] / [(1+r)^n − 1]</div>
    <p>Where <strong>M</strong> = Monthly payment, <strong>P</strong> = Principal (loan amount), <strong>r</strong> = Monthly interest rate (annual rate ÷ 12), and <strong>n</strong> = Total number of payments (years × 12).</p>

    <h3>Understanding Amortization</h3>
    <p>In the early years of a mortgage, the majority of your monthly payment goes to interest, not principal. This is called amortization. Over time, this ratio flips — more of each payment reduces your actual loan balance. The amortization schedule below shows exactly how this works month by month.</p>

    <h3>Tips to Save Money on Your Mortgage</h3>
    <p>Making even one extra payment per year can knock years off a 30-year mortgage and save tens of thousands of dollars in interest. Other strategies include making bi-weekly payments, refinancing when rates drop significantly, or increasing your down payment to avoid PMI (Private Mortgage Insurance), which is typically required if your down payment is less than 20%.</p>

    <h3>Fixed vs. Adjustable Rate Mortgages</h3>
    <p>A fixed-rate mortgage keeps your interest rate the same for the entire loan term, providing predictability. An adjustable-rate mortgage (ARM) starts at a lower rate but can change periodically based on market indices. For long-term homeowners, fixed rates are generally safer.</p>

    <details>
      <summary>❓ What is a good debt-to-income ratio for a mortgage?</summary>
      <p>Most lenders prefer a DTI (total monthly debts ÷ gross monthly income) of 43% or lower. Your housing costs specifically (PITI: Principal, Interest, Taxes, Insurance) should ideally be below 28% of your gross monthly income.</p>
    </details>
    <details>
      <summary>❓ How much does a 1% difference in rate matter?</summary>
      <p>On a $300,000 30-year mortgage, a 1% higher rate adds approximately $57,000 in total interest over the life of the loan and increases monthly payments by about $160.</p>
    </details>
    <details>
      <summary>❓ What is PMI?</summary>
      <p>Private Mortgage Insurance is required by most lenders if your down payment is less than 20%. It typically costs 0.5–1.5% of the loan amount annually ($125–$375/month on a $300k loan) and can be removed once you reach 20% equity.</p>
    </details>
  `
});

/* ─── Helpers ─────────────────────────────────────────────── */
function getPayoffDate(termYrs) {
  const d = new Date();
  d.setFullYear(d.getFullYear() + termYrs);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function buildAmortTable(principal, r, n, monthly) {
  let balance = principal;
  let rows = '';
  const totalYrs = Math.ceil(n / 12);

  for (let yr = 1; yr <= totalYrs; yr++) {
    let yearInterest   = 0;
    let yearPrincipal  = 0;
    const monthsInYear = Math.min(12, n - (yr - 1) * 12);

    for (let m = 0; m < monthsInYear; m++) {
      const intPmt  = balance * r;
      const prinPmt = Math.min(monthly - intPmt, balance);
      yearInterest  += intPmt;
      yearPrincipal += prinPmt;
      balance        = Math.max(0, balance - prinPmt);
    }

    rows += `<tr>
      <td>${yr}</td>
      <td>${fmt.currency(yearPrincipal)}</td>
      <td>${fmt.currency(yearInterest)}</td>
      <td>${fmt.currency(Math.max(0, balance))}</td>
    </tr>`;
  }

  return `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">📊 Amortization Schedule (Year-by-Year)</span>
        <button class="print-btn" onclick="window.print()">🖨️ Print / Save</button>
      </div>
      <div class="table-scroll">
        <table>
          <thead><tr>
            <th>Year</th>
            <th>Principal Paid</th>
            <th>Interest Paid</th>
            <th>Remaining Balance</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}
