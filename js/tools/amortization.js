/**
 * PrecisionCalc — Amortization Table Generator
 * Generates a detailed amortization table for any fixed loan.
 */
registerTool({
  id:       'amortization',
  name:     'Amortization Table',
  category: 'Finance',
  icon:         '\ud83d\udcc8',
  materialIcon: 'table_chart',
  tagline:  'See a detailed amortization table for any loan.',
  keywords: ['amortization', 'loan', 'table', 'schedule', 'principal', 'interest', 'balance'],
  meta: {
    title:       'Amortization Table Generator — PrecisionCalc',
    description: 'Generate a detailed amortization table for any fixed loan.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"amort-principal\">Loan Amount ($)</label><input type=\"number\" id=\"amort-principal\" value=\"100000\" /></div>
      <div class=\"field\"><label for=\"amort-rate\">Annual Interest Rate (%)</label><input type=\"number\" id=\"amort-rate\" value=\"5\" /></div>
      <div class=\"field\"><label for=\"amort-years\">Loan Term (Years)</label><input type=\"number\" id=\"amort-years\" value=\"30\" /></div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      const P = parseFloat(container.querySelector('#amort-principal').value) || 0;
      const r = parseFloat(container.querySelector('#amort-rate').value) / 100 / 12 || 0;
      const n = (parseInt(container.querySelector('#amort-years').value) || 0) * 12;
      if (P <= 0 || r <= 0 || n <= 0) return '';
      let balance = P;
      let rows = '';
      for (let i = 1; i <= n; i++) {
        const interest = balance * r;
        const principal = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) - interest;
        balance -= principal;
        rows += `<tr><td>${i}</td><td>${principal.toFixed(2)}</td><td>${interest.toFixed(2)}</td><td>${balance > 0 ? balance.toFixed(2) : '0.00'}</td></tr>`;
        if (balance < 0) balance = 0;
      }
      return `<div class=\"table-card\"><table><thead><tr><th>Month</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    };
    container.innerHTML += `<div id=\"result-card-amortization\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-amortization').innerHTML = calc();
    });
    container.querySelector('#result-card-amortization').innerHTML = calc();
  }
  ,
    seoContent: `
      <h2>Amortization Table Calculator</h2>
      <p>An amortization table is a powerful financial tool that breaks down each payment on a loan over time, showing exactly how much goes toward interest and how much reduces the principal balance. Whether you’re considering a mortgage, car loan, or any other fixed-term loan, understanding amortization helps you make smarter borrowing decisions and plan your finances with confidence.</p>

      <h3>What Is Amortization?</h3>
      <p>Amortization is the process of spreading out a loan into a series of fixed payments over time. Each payment covers both the interest due for that period and a portion of the principal. Early in the loan, a larger share of each payment goes toward interest, while later payments contribute more to reducing the principal. This shift is clearly illustrated in an amortization table.</p>

      <h3>How to Read an Amortization Table</h3>
      <ul>
        <li><b>Month:</b> The payment number in the loan schedule.</li>
        <li><b>Principal:</b> The amount of your payment that reduces the loan balance.</li>
        <li><b>Interest:</b> The amount of your payment that goes to the lender as interest.</li>
        <li><b>Balance:</b> The remaining loan balance after each payment.</li>
      </ul>
      <p>By reviewing the table, you can see how your loan balance decreases over time and how much interest you’ll pay in total.</p>

      <h3>Why Amortization Matters</h3>
      <ul>
        <li><b>Transparency:</b> See exactly where your money goes each month.</li>
        <li><b>Planning:</b> Know when your loan will be paid off and how extra payments can reduce interest costs.</li>
        <li><b>Comparison:</b> Compare different loan offers by total interest paid and payoff timelines.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <ul>
        <li><b>What types of loans use amortization tables?</b><br>Most mortgages, auto loans, personal loans, and student loans use amortization schedules. Credit cards and lines of credit typically do not.</li>
        <li><b>How can I pay off my loan faster?</b><br>Making extra payments toward the principal reduces the total interest paid and shortens the loan term. Even small additional payments can make a big difference over time.</li>
        <li><b>Why do early payments go mostly to interest?</b><br>Because interest is calculated on the remaining balance, and the balance is highest at the start of the loan. As you pay down the principal, interest charges decrease and more of your payment goes to principal.</li>
      </ul>

      <h3>Tips for Using the Amortization Table</h3>
      <ul>
        <li>Use the table to experiment with different loan amounts, interest rates, and terms to see how your payments change.</li>
        <li>Check how much interest you’ll save by making one extra payment per year or rounding up your monthly payment.</li>
        <li>Print or save your amortization schedule for your records or to discuss with your lender.</li>
      </ul>

      <p>Understanding your amortization schedule empowers you to take control of your debt and make informed financial decisions. Use this calculator to visualize your loan payoff journey and optimize your repayment strategy!</p>
    `
});
