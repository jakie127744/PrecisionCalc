/**
 * PrecisionCalc — Auto Loan Calculator (with Lease vs. Buy)
 * Calculates monthly payments and compares lease vs. buy.
 */
registerTool({
  id:       'autoloan',
  name:     'Auto Loan & Lease',
  category: 'Finance',
  icon:         '\ud83d\ude97',
  materialIcon: 'directions_car',
  tagline:  'Compare auto loan vs. lease payments and costs.',
  keywords: ['auto loan', 'car loan', 'lease', 'buy', 'monthly payment', 'vehicle', 'comparison'],
  meta: {
    title:       'Auto Loan & Lease Calculator — PrecisionCalc',
    description: 'Calculate monthly payments and compare lease vs. buy for vehicles.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"auto-price\">Car Price ($)</label><input type=\"number\" id=\"auto-price\" value=\"30000\" /></div>
      <div class=\"field\"><label for=\"auto-down\">Down Payment ($)</label><input type=\"number\" id=\"auto-down\" value=\"3000\" /></div>
      <div class=\"field\"><label for=\"auto-rate\">Interest Rate (%)</label><input type=\"number\" id=\"auto-rate\" value=\"5\" /></div>
      <div class=\"field\"><label for=\"auto-years\">Loan Term (Years)</label><input type=\"number\" id=\"auto-years\" value=\"5\" /></div>
    </div>
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"lease-months\">Lease Term (Months)</label><input type=\"number\" id=\"lease-months\" value=\"36\" /></div>
      <div class=\"field\"><label for=\"lease-down\">Lease Down ($)</label><input type=\"number\" id=\"lease-down\" value=\"2000\" /></div>
      <div class=\"field\"><label for=\"lease-monthly\">Lease Monthly ($)</label><input type=\"number\" id=\"lease-monthly\" value=\"350\" /></div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      // Loan
      const price = parseFloat(container.querySelector('#auto-price').value) || 0;
      const down = parseFloat(container.querySelector('#auto-down').value) || 0;
      const rate = parseFloat(container.querySelector('#auto-rate').value) / 100 / 12 || 0;
      const years = parseInt(container.querySelector('#auto-years').value) || 0;
      const n = years * 12;
      const principal = price - down;
      let loanMonthly = 0;
      if (rate > 0 && n > 0) {
        loanMonthly = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
      } else if (n > 0) {
        loanMonthly = principal / n;
      }
      // Lease
      const leaseMonths = parseInt(container.querySelector('#lease-months').value) || 0;
      const leaseDown = parseFloat(container.querySelector('#lease-down').value) || 0;
      const leaseMonthly = parseFloat(container.querySelector('#lease-monthly').value) || 0;
      const leaseTotal = leaseDown + leaseMonthly * leaseMonths;
      // Output
      return `<div class=\"result-card\" style=\"font-size:2rem;text-align:center;\"><b>Loan Monthly:</b> $${loanMonthly.toFixed(2)}<br/><b>Lease Total:</b> $${leaseTotal.toFixed(2)}</div>`;
    };
    container.innerHTML += `<div id=\"result-card-autoloan\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-autoloan').innerHTML = calc();
    });
    container.querySelector('#result-card-autoloan').innerHTML = calc();
  }
  ,
    seoContent: `
      <h2>Auto Loan & Lease Calculator</h2>
      <p>The Auto Loan & Lease Calculator is a valuable tool for anyone considering a new or used vehicle. It helps you compare the true costs of buying versus leasing a car, so you can make an informed financial decision. Understanding the differences between auto loans and leases is crucial for budgeting, negotiating with dealers, and planning your long-term transportation expenses.</p>

      <h3>Auto Loan vs. Lease: What’s the Difference?</h3>
      <ul>
        <li><b>Auto Loan:</b> You borrow money to buy the car and make monthly payments until the loan is paid off. Once complete, you own the vehicle outright and can keep, sell, or trade it as you wish.</li>
        <li><b>Lease:</b> You pay to use the car for a set period (usually 2–4 years) and mileage limit. At the end of the lease, you return the car or have the option to buy it for a predetermined price.</li>
      </ul>

      <h3>How the Calculator Works</h3>
      <ol>
        <li>Enter the car price, down payment, interest rate, and loan term to see your estimated monthly loan payment.</li>
        <li>For leasing, enter the lease term, down payment, and monthly payment to see your total lease cost.</li>
        <li>Compare the results to understand which option fits your budget and driving needs.</li>
      </ol>

      <h3>Factors to Consider</h3>
      <ul>
        <li><b>Mileage:</b> Leases have mileage limits (e.g., 12,000 miles/year). Exceeding them can result in costly penalties.</li>
        <li><b>Wear & Tear:</b> You may be charged for excess wear and tear when returning a leased vehicle.</li>
        <li><b>Equity:</b> With a loan, you build equity in the car. With a lease, you do not own the vehicle at the end of the term unless you buy it.</li>
        <li><b>Customization:</b> Owners can modify their cars; leased vehicles must be returned in original condition.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <ul>
        <li><b>Is it better to lease or buy a car?</b><br>Leasing often has lower monthly payments and lets you drive a new car every few years, but buying is usually cheaper in the long run and gives you ownership. The best choice depends on your budget, driving habits, and preferences.</li>
        <li><b>What happens at the end of a lease?</b><br>You return the car to the dealer. You may have the option to buy it for a set price, start a new lease, or walk away. Be prepared for possible fees for excess mileage or wear.</li>
        <li><b>Can I pay off my auto loan early?</b><br>Most auto loans allow early payoff without penalty, which can save you money on interest. Check your loan agreement for details.</li>
      </ul>

      <h3>Tips for Getting the Best Deal</h3>"
      <ul>
        <li>Shop around for the lowest interest rates and best lease terms.</li>
        <li>Negotiate the car price before discussing financing or leasing options.</li>
        <li>Consider total cost of ownership, including insurance, maintenance, and taxes.</li>
        <li>Read the fine print on lease agreements for fees and restrictions.</li>
      </ul>

      <p>Use this calculator to run the numbers and see which option makes the most sense for your situation. Whether you choose to lease or buy, understanding your costs up front helps you drive away with confidence!</p>
    `
});
