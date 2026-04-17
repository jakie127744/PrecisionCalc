/**
 * PrecisionCalc — Freelance Tax Estimator
 * Estimates self-employment tax for freelancers (US).
 */
registerTool({
  id:       'freelancetax',
  name:     'Freelance Tax Estimator',
  category: 'Finance',
  icon:         '\ud83d\udcb0',
  materialIcon: 'calculate',
  tagline:  'Estimate self-employment tax for freelancers (US).',
  keywords: ['freelance', 'tax', 'self-employment', 'income', 'us'],
  meta: {
    title:       'Freelance Tax Estimator — PrecisionCalc',
    description: 'Estimate self-employment tax for freelancers (US).' 
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"ft-income\">Net Income ($)</label><input type=\"number\" id=\"ft-income\" value=\"50000\" /></div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      const income = parseFloat(container.querySelector('#ft-income').value) || 0;
      if (income <= 0) return '';
      // 15.3% self-employment tax (Social Security + Medicare)
      const tax = income * 0.153;
      return `<div class=\"result-card\" style=\"font-size:2rem;text-align:center;\"><b>Tax: $${tax.toLocaleString(undefined, {maximumFractionDigits:2})}</b></div>`;
    };
    container.innerHTML += `<div id=\"result-card-freelancetax\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-freelancetax').innerHTML = calc();
    });
    container.querySelector('#result-card-freelancetax').innerHTML = calc();
  }
  ,
    seoContent: `
      <p>The Freelance Tax Estimator is a must-have tool for anyone who works as a freelancer, independent contractor, or self-employed professional in the United States. Unlike traditional employees, freelancers are responsible for calculating and paying their own self-employment taxes, which cover Social Security and Medicare contributions. This calculator helps you estimate your tax liability so you can plan ahead, avoid surprises, and stay compliant with IRS rules.</p>

      <h3>What Is Self-Employment Tax?</h3>
      <p>Self-employment tax is a combination of Social Security (12.4%) and Medicare (2.9%) taxes, totaling 15.3% of your net earnings. Employees split these taxes with their employers, but freelancers must pay the full amount themselves. This tax is in addition to regular income tax.</p>

      <h3>How the Calculator Works</h3>
      <ol>
        <li>Enter your net self-employment income (after business expenses).</li>
        <li>The calculator multiplies your income by 15.3% to estimate your self-employment tax.</li>
        <li>Use this estimate to set aside money for quarterly tax payments and avoid IRS penalties.</li>
      </ol>

      <h3>Why Planning for Taxes Matters</h3>
      <ul>
        <li><strong>Quarterly Payments:</strong> The IRS requires freelancers to pay estimated taxes four times a year. Missing payments can result in penalties and interest.</li>
        <li><strong>Budgeting:</strong> Setting aside tax money prevents cash flow problems and last-minute scrambles at tax time.</li>
        <li><strong>Compliance:</strong> Accurate tax payments keep you in good standing with the IRS and avoid audits.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>Do I have to pay self-employment tax on all my income?</summary>
        <p>Self-employment tax applies to net earnings from freelance work. W-2 wages from an employer are taxed separately.</p>
      </details>
      <details>
        <summary>Can I deduct business expenses?</summary>
        <p>Yes! Deducting legitimate business expenses lowers your net income and your tax bill. Keep good records and receipts.</p>
      </details>
      <details>
        <summary>What if I earn less than $400?</summary>
        <p>If your net self-employment income is less than $400 for the year, you generally do not owe self-employment tax.</p>
      </details>

      <h3>Tips for Freelancers</h3>
      <ul>
        <li>Open a separate savings account for taxes and transfer a portion of each payment you receive.</li>
        <li>Work with a tax professional or use tax software to maximize deductions and credits.</li>
        <li>Stay organized with invoices, receipts, and mileage logs to support your tax filings.</li>
      </ul>

      <p>With the Freelance Tax Estimator, you can take control of your tax obligations, avoid costly mistakes, and focus on growing your business with confidence!</p>
    `
});
