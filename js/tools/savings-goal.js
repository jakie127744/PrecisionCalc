/**
 * PrecisionCalc — Savings Goal Calculator
 * Calculates how much to save per month to reach a goal
 */
registerTool({
  id: 'savings-goal',
  name: 'Savings Goal Calculator',
  category: 'Finance',
  icon: '💰',
  materialIcon: 'savings',
  tagline: 'Plan your savings to reach a goal.',
  keywords: ['savings', 'goal', 'finance', 'monthly', 'future value'],
  meta: {
    title: 'Savings Goal Calculator — PrecisionCalc',
    description: 'Calculate how much you need to save each month to reach your savings goal.'
  },

  seoContent: `
    <h2>Savings Goal Calculator</h2>
    <p>The Savings Goal Calculator is a powerful tool for anyone who wants to take control of their financial future. Whether you are saving for a vacation, a new car, a home down payment, or simply building an emergency fund, this calculator helps you determine exactly how much you need to set aside each month to reach your target. By factoring in your goal amount, time frame, and expected interest rate, you can create a realistic and actionable savings plan.</p>

    <h3>Why Use a Savings Goal Calculator?</h3>
    <ul>
      <li><b>Clarity:</b> Know the exact monthly amount required to reach your goal on time.</li>
      <li><b>Motivation:</b> Seeing your progress and having a clear plan can keep you motivated to save consistently.</li>
      <li><b>Flexibility:</b> Adjust your goal, time frame, or interest rate to see how your plan changes and find the best strategy for your needs.</li>
      <li><b>Financial Confidence:</b> Avoid guesswork and make informed decisions about your savings journey.</li>
    </ul>

    <h3>How the Calculator Works</h3>
    <ol>
      <li>Enter your total savings goal, the number of months you want to save, and the expected annual interest rate (if any).</li>
      <li>The calculator computes the required monthly deposit, taking into account the compounding effect of interest if provided.</li>
      <li>It displays the monthly savings needed, helping you plan your budget and track your progress.</li>
    </ol>

    <h3>Frequently Asked Questions</h3>
    <ul>
      <li><b>What if I want to reach my goal faster?</b><br>Try shortening the number of months in the calculator. It will show you the higher monthly savings required to meet your new timeline.</li>
      <li><b>How does interest affect my savings plan?</b><br>If you save in an account that earns interest, your money grows faster, so you may need to save less each month. The calculator factors in compound interest for more accurate results.</li>
      <li><b>Can I use this for multiple goals?</b><br>Yes! Run the calculator for each goal (e.g., vacation, emergency fund, car) to create separate savings plans.</li>
    </ul>

    <h3>Tips for Reaching Your Savings Goal</h3>
    <ul>
      <li>Set up automatic transfers to your savings account each month to stay on track.</li>
      <li>Review your budget and cut unnecessary expenses to free up more money for savings.</li>
      <li>Consider high-yield savings accounts or certificates of deposit (CDs) for better interest rates.</li>
      <li>Track your progress regularly and celebrate milestones along the way.</li>
      <li>Adjust your plan as needed if your financial situation changes.</li>
    </ul>

    <p>Start using the Savings Goal Calculator today to turn your dreams into achievable plans. With a clear savings strategy, you can reach your goals faster and with greater confidence. <b>Take the first step toward financial success</b> and make your savings work for you!</p>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="sg-goal">Goal Amount ($)</label>
        <input type="number" id="sg-goal" placeholder="10000" min="0" value="10000" />
      </div>
      <div class="field">
        <label for="sg-months">Months</label>
        <input type="number" id="sg-months" placeholder="24" min="1" value="24" />
      </div>
      <div class="field">
        <label for="sg-rate">Annual Interest Rate (%)</label>
        <input type="number" id="sg-rate" placeholder="3" min="0" step="0.01" value="3" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-savings-goal';
    container.appendChild(resultCard);
    function sgCalc() {
      const FV = parseFloat(container.querySelector('#sg-goal').value) || 0;
      const n = parseInt(container.querySelector('#sg-months').value) || 0;
      const r = (parseFloat(container.querySelector('#sg-rate').value) || 0) / 100 / 12;
      let pmt = 0;
      if (r > 0) {
        pmt = FV * r / (Math.pow(1 + r, n) - 1);
      } else {
        pmt = FV / n;
      }
      const valid = FV > 0 && n > 0;
      resultCard.innerHTML = valid ? `<div class=\"result-card\"><div><b>Monthly Savings Needed:</b> $${pmt.toFixed(2)}</div></div>` : '';
    }
    container.addEventListener('input', sgCalc);
    sgCalc();
  }
});
