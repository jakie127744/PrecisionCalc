/**
 * PrecisionCalc — Credit Card Payoff Calculator
 * Calculates months to pay off and total interest for a credit card balance.
 */
registerTool({
  id:       'credit-card-payoff',
  name:     'Credit Card Payoff',
  category: 'Finance',
  icon:         '\ud83d\udcb3',
  materialIcon: 'credit_card',
  tagline:  'See how long it takes to pay off your credit card and how much interest you’ll pay.',
  keywords: ['credit card', 'debt', 'payoff', 'interest', 'balance', 'minimum payment'],
  meta: {
    title:       'Credit Card Payoff Calculator — PrecisionCalc',
    description: 'Calculate how long it will take to pay off your credit card and how much interest you’ll pay based on your balance, APR, and monthly payment.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\">
        <label for=\"cc-balance\">Card Balance ($)</label>
        <input type=\"number\" id=\"cc-balance\" placeholder=\"5,000\" min=\"0\" value=\"5000\" />
      </div>
      <div class=\"field\">
        <label for=\"cc-rate\">APR (%)</label>
        <input type=\"number\" id=\"cc-rate\" placeholder=\"20\" min=\"0\" step=\"0.01\" value=\"20\" />
      </div>
      <div class=\"field\">
        <label for=\"cc-payment\">Monthly Payment ($)</label>
        <input type=\"number\" id=\"cc-payment\" placeholder=\"200\" min=\"0\" value=\"200\" />
      </div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      let balance = parseFloat(container.querySelector('#cc-balance').value) || 0;
      const rate = parseFloat(container.querySelector('#cc-rate').value) / 100 / 12 || 0;
      const payment = parseFloat(container.querySelector('#cc-payment').value) || 0;
      if (balance <= 0 || rate <= 0 || payment <= 0) return '';
      let months = 0, totalInterest = 0;
      while (balance > 0 && months < 600) {
        const interest = balance * rate;
        totalInterest += interest;
        balance += interest - payment;
        months++;
        if (balance < 0) balance = 0;
      }
      return `
        <div class=\"result-card\" style=\"font-size:2rem;text-align:center;\">
          <div><b>Months to Payoff:</b> ${months}</div>
          <div><b>Total Interest:</b> $${totalInterest.toFixed(2)}</div>
        </div>
      `;
    };
    container.innerHTML += `<div id=\"result-card-cc\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-cc').innerHTML = calc();
    });
    container.querySelector('#result-card-cc').innerHTML = calc();
  }
  ,
    seoContent: `
      <h2>Credit Card Payoff Calculator</h2>
      <p>The Credit Card Payoff Calculator is a powerful tool for anyone looking to get out of debt and take control of their finances. Credit card debt can be overwhelming due to high interest rates and minimum payment traps. This calculator helps you see exactly how long it will take to pay off your balance and how much interest you’ll pay based on your current payment plan.</p>

      <h3>How the Calculator Works</h3>
      <p>Enter your current card balance, the annual percentage rate (APR), and your planned monthly payment. The calculator simulates each month’s payment, subtracting interest and reducing your balance until it’s paid off. It shows you the total number of months required and the total interest paid over the life of the debt.</p>

      <h3>Why Paying Off Credit Cards Matters</h3>
      <ul>
        <li><b>High Interest Costs:</b> Credit cards often charge 15–25% APR. Carrying a balance means you pay much more than you borrowed.</li>
        <li><b>Financial Freedom:</b> Paying off debt frees up money for savings, investments, and life goals.</li>
        <li><b>Credit Score:</b> Lower balances improve your credit utilization ratio, a key factor in your credit score.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <ul>
        <li><b>What’s the best way to pay off credit card debt?</b><br>Pay more than the minimum each month. Consider the avalanche method (paying highest-interest cards first) or the snowball method (paying smallest balances first for motivation).</li>
        <li><b>How much interest will I pay?</b><br>The calculator shows your total interest based on your payment plan. Increasing your monthly payment reduces both the payoff time and total interest paid.</li>
        <li><b>What if I make extra payments?</b><br>Extra payments go directly to the principal, reducing interest and shortening the payoff period. Use the calculator to experiment with different payment amounts.</li>
      </ul>

      <h3>Tips for Getting Out of Debt Faster</h3>
      <ul>
        <li>Cut unnecessary expenses and redirect the savings to your card payments.</li>
        <li>Look for balance transfer offers with lower interest rates, but watch for fees and terms.</li>
        <li>Set up automatic payments to avoid missed payments and late fees.</li>
        <li>Track your progress and celebrate milestones to stay motivated.</li>
      </ul>

      <p>Use the Credit Card Payoff Calculator to create a realistic plan and see the impact of your payments. <b>Taking action today</b> can save you thousands in interest and help you achieve financial freedom sooner!</p>
    `
});
