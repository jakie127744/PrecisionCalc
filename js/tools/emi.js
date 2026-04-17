/**
 * PrecisionCalc — Loan/EMI Calculator
 * Formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
 */
registerTool({
  id:       'emi',
  name:     'Loan/EMI Calculator',
  category: 'Finance',
  icon:         '\ud83d\udcb0',
  materialIcon: 'payments',
  tagline:  'Calculate your loan EMI, total interest, and total payment.',
  keywords: ['emi', 'loan', 'car loan', 'personal loan', 'monthly payment', 'interest', 'principal'],
  meta: {
    title:       'Loan EMI Calculator — PrecisionCalc',
    description: 'Calculate your monthly loan EMI, total interest, and total payment for car, personal, or home loans.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\">
        <label for=\"emi-principal\">Loan Amount ($)</label>
        <input type=\"number\" id=\"emi-principal\" placeholder=\"10,000\" min=\"0\" value=\"10000\" />
      </div>
      <div class=\"field\">
        <label for=\"emi-rate\">Annual Interest Rate (%)</label>
        <input type=\"number\" id=\"emi-rate\" placeholder=\"8\" min=\"0\" step=\"0.01\" value=\"8\" />
      </div>
    </div>
    <div class=\"form-row\">
      <div class=\"field\">
        <label for=\"emi-tenure\">Loan Tenure (Years)</label>
        <input type=\"number\" id=\"emi-tenure\" placeholder=\"5\" min=\"1\" value=\"5\" />
      </div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      const P = parseFloat(container.querySelector('#emi-principal').value) || 0;
      const annualRate = parseFloat(container.querySelector('#emi-rate').value) || 0;
      const N = (parseInt(container.querySelector('#emi-tenure').value) || 0) * 12;
      const R = annualRate / 12 / 100;
      if (P <= 0 || annualRate <= 0 || N <= 0) return '';
      const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
      const totalPayment = emi * N;
      const totalInterest = totalPayment - P;
      return `
        <div class=\"result-card\">
          <div><b>Monthly EMI:</b> $${emi.toFixed(2)}</div>
          <div><b>Total Interest:</b> $${totalInterest.toFixed(2)}</div>
          <div><b>Total Payment:</b> $${totalPayment.toFixed(2)}</div>
        </div>
      `;
    };
    container.innerHTML += `<div id=\"result-card-emi\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-emi').innerHTML = calc();
    });
    container.querySelector('#result-card-emi').innerHTML = calc();
  ,
    seoContent: `
      <h2>Loan/EMI Calculator</h2>
      <p>The Loan/EMI Calculator is an essential tool for anyone considering a loan—whether for a car, home, education, or personal needs. EMI stands for Equated Monthly Installment, which is the fixed payment you make each month to repay your loan, including both principal and interest. Understanding your EMI helps you plan your budget, compare loan offers, and avoid surprises down the road.</p>

      <h3>How EMI Is Calculated</h3>
      <p>The EMI formula is: <b>EMI = [P × R × (1+R)<sup>N</sup>] / [(1+R)<sup>N</sup> - 1]</b>, where:</p>
      <ul>
        <li><b>P</b> = Principal (loan amount)</li>
        <li><b>R</b> = Monthly interest rate (annual rate ÷ 12 ÷ 100)</li>
        <li><b>N</b> = Number of monthly payments (years × 12)</li>
      </ul>
      <p>This formula ensures that each payment is the same, but the portion going to interest vs. principal changes over time. Early payments are mostly interest; later payments reduce the principal faster.</p>

      <h3>Why Use an EMI Calculator?</h3>
      <ul>
        <li><b>Budget Planning:</b> Know your monthly commitment before taking a loan.</li>
        <li><b>Loan Comparison:</b> Compare different loan amounts, interest rates, and tenures to find the best fit.</li>
        <li><b>Interest Awareness:</b> See how much interest you’ll pay over the life of the loan.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <ul>
        <li><b>Can I reduce my EMI?</b><br>You can lower your EMI by choosing a longer tenure, negotiating a lower interest rate, or making a larger down payment. However, longer tenures mean more total interest paid.</li>
        <li><b>What happens if I prepay my loan?</b><br>Prepaying reduces your outstanding principal, which lowers future interest and may shorten your loan term. Check for prepayment penalties in your loan agreement.</li>
        <li><b>Is EMI the same every month?</b><br>For fixed-rate loans, yes. For floating-rate loans, EMI may change if the interest rate changes.</li>
      </ul>

      <h3>Tips for Smart Borrowing</h3>
      <ul>
        <li>Use the calculator to experiment with different scenarios before committing to a loan.</li>
        <li>Try to keep your total EMIs below 40% of your monthly income for financial safety.</li>
        <li>Read the fine print on loan offers, including fees, penalties, and insurance requirements.</li>
      </ul>"

      <p>With the Loan/EMI Calculator, you can make informed decisions, avoid debt traps, and manage your finances with confidence. Try different combinations and find the loan that works best for you!</p>
    `
  }
});
