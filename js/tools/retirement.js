/**
 * PrecisionCalc — 401k/Retirement Planner
 * Projects future value of retirement savings with contributions and growth.
 */
registerTool({
  id:       'retirement',
  name:     '401k/Retirement Planner',
  category: 'Finance',
  icon:         '\ud83d\udc65',
  materialIcon: 'savings',
  tagline:  'Project your retirement nest egg with contributions and growth.',
  keywords: ['401k', 'retirement', 'nest egg', 'future value', 'investment', 'savings', 'ira', 'pension'],
  meta: {
    title:       '401k/Retirement Planner — PrecisionCalc',
    description: 'Project your retirement savings with regular contributions and investment growth.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"ret-age\">Current Age</label><input type=\"number\" id=\"ret-age\" value=\"30\" /></div>
      <div class=\"field\"><label for=\"ret-retire\">Retirement Age</label><input type=\"number\" id=\"ret-retire\" value=\"65\" /></div>
      <div class=\"field\"><label for=\"ret-balance\">Current Balance ($)</label><input type=\"number\" id=\"ret-balance\" value=\"50000\" /></div>
      <div class=\"field\"><label for=\"ret-contrib\">Annual Contribution ($)</label><input type=\"number\" id=\"ret-contrib\" value=\"6000\" /></div>
      <div class=\"field\"><label for=\"ret-growth\">Expected Growth Rate (%)</label><input type=\"number\" id=\"ret-growth\" value=\"7\" /></div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      const age = parseInt(container.querySelector('#ret-age').value) || 0;
      const retire = parseInt(container.querySelector('#ret-retire').value) || 0;
      const years = retire - age;
      const balance = parseFloat(container.querySelector('#ret-balance').value) || 0;
      const contrib = parseFloat(container.querySelector('#ret-contrib').value) || 0;
      const growth = parseFloat(container.querySelector('#ret-growth').value) / 100 || 0;
      if (years <= 0 || balance < 0 || contrib < 0 || growth < 0) return '';
      let fv = balance * Math.pow(1 + growth, years);
      for (let i = 1; i <= years; i++) {
        fv += contrib * Math.pow(1 + growth, years - i);
      }
      return `<div class=\"result-card\" style=\"font-size:2rem;text-align:center;\"><b>$${fv.toLocaleString(undefined, {maximumFractionDigits:2})}</b></div>`;
    };
    container.innerHTML += `<div id=\"result-card-retirement\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-retirement').innerHTML = calc();
    });
    container.querySelector('#result-card-retirement').innerHTML = calc();
  }
  ,
  seoContent: `
    <h2>401k/Retirement Planner</h2>
    <p>The 401k/Retirement Planner is an essential tool for anyone looking to secure their financial future and achieve a comfortable retirement. Planning for retirement can feel overwhelming, but with the right information and a clear projection of your savings growth, you can make informed decisions that will benefit you for decades to come. This calculator helps you estimate the future value of your retirement savings by factoring in your current balance, annual contributions, expected growth rate, and the number of years until retirement.</p>

    <h3>Why Use a 401k/Retirement Planner?</h3>
    <ul>
      <li><b>Visualize Your Nest Egg:</b> See how your savings accumulate with regular contributions and compounding growth.</li>
      <li><b>Set Realistic Goals:</b> Adjust your contributions or retirement age to meet your desired retirement target.</li>
      <li><b>Understand the Power of Compounding:</b> Learn how even small increases in contributions or growth rate can have a big impact over time.</li>
      <li><b>Plan for the Unexpected:</b> Experiment with different scenarios, such as early retirement or increased contributions, to see how they affect your outcome.</li>
    </ul>

    <h3>How the Calculator Works</h3>
    <ol>
      <li>Enter your current age, planned retirement age, current savings balance, annual contribution, and expected annual growth rate.</li>
      <li>The calculator projects your savings forward, adding your annual contributions and applying the growth rate each year until retirement.</li>
      <li>It displays the estimated value of your retirement account at your chosen retirement age, helping you assess whether you are on track.</li>
    </ol>

    <h3>Frequently Asked Questions</h3>
    <ul>
      <li><b>What is a 401k?</b><br>A 401k is a tax-advantaged retirement savings plan offered by many employers in the United States. Contributions are often made pre-tax, and investments grow tax-deferred until withdrawal at retirement.</li>
      <li><b>How much should I contribute to my retirement?</b><br>Financial experts often recommend saving at least 10-15% of your income for retirement, but the right amount depends on your goals, age, and other sources of retirement income.</li>
      <li><b>What growth rate should I use?</b><br>Historically, a balanced portfolio might average 5-8% annual growth, but actual returns vary. It's wise to use a conservative estimate for planning.</li>
      <li><b>Can I include employer matching?</b><br>Yes! Add your employer's annual match to your own contributions for a more accurate projection.</li>
    </ul>

    <h3>Tips for Successful Retirement Planning</h3>
    <ul>
      <li>Start saving as early as possible to maximize the benefits of compounding.</li>
      <li>Increase your contributions whenever you get a raise or bonus.</li>
      <li>Review your investment strategy regularly and adjust as needed.</li>
      <li>Consider consulting a financial advisor for personalized advice.</li>
    </ul>

    <p>Use this 401k/Retirement Planner to take control of your financial future. By understanding how your savings grow and making informed decisions, you can work toward a secure and enjoyable retirement. <b>Start planning today</b> and give yourself the peace of mind that comes with financial preparedness!</p>
  `
});
