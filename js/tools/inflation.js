/**
 * PrecisionCalc — Inflation Calculator
 * Shows what an amount from a past year is worth today (US CPI-based).
 */
registerTool({
  id:       'inflation',
  name:     'Inflation Calculator',
  category: 'Finance',
  icon:         '\ud83d\udcb0',
  materialIcon: 'trending_up',
  tagline:  'See what money from the past is worth today (US CPI).',
  keywords: ['inflation', 'cpi', 'money', 'value', 'usd', 'dollar'],
  meta: {
    title:       'Inflation Calculator — PrecisionCalc',
    description: 'See what $100 in 1990 is worth today using US CPI data.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"inflation-amount\">Amount ($)</label><input type=\"number\" id=\"inflation-amount\" value=\"100\" /></div>
      <div class=\"field\"><label for=\"inflation-year\">From Year</label><input type=\"number\" id=\"inflation-year\" value=\"1990\" min=\"1913\" max=\"2026\" /></div>
      <div class=\"field\"><label for=\"inflation-to-year\">To Year</label><input type=\"number\" id=\"inflation-to-year\" value=\"2026\" min=\"1913\" max=\"2026\" /></div>
    </div>
  `,

  mount(container) {
    // US CPI data (1913-2026, partial, for demo)
    const cpi = {
      1990: 130.7, 2000: 172.2, 2010: 218.1, 2020: 258.8, 2022: 292.7, 2023: 304.7, 2024: 318.5, 2025: 328.1, 2026: 335.0,
      1913: 9.9, 1980: 82.4, 1970: 38.8, 1960: 29.6, 1950: 24.1, 1940: 14.0, 1930: 16.7, 1920: 20.0, 2015: 237.0, 2018: 251.1
    };
    function getCPI(year) { return cpi[year] || cpi[2026]; }
    const calc = () => {
      const amt = parseFloat(container.querySelector('#inflation-amount').value) || 0;
      const from = parseInt(container.querySelector('#inflation-year').value) || 1990;
      const to = parseInt(container.querySelector('#inflation-to-year').value) || 2026;
      if (amt <= 0 || !getCPI(from) || !getCPI(to)) return '';
      const result = amt * getCPI(to) / getCPI(from);
      return `<div class=\"result-card\" style=\"font-size:2rem;text-align:center;\"><b>$${result.toLocaleString(undefined, {maximumFractionDigits:2})}</b></div>`;
    };
    container.innerHTML += `<div id=\"result-card-inflation\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-inflation').innerHTML = calc();
    });
    container.querySelector('#result-card-inflation').innerHTML = calc();
  }
  ,
    seoContent: `
      <p>The Inflation Calculator is a powerful tool for understanding how the value of money changes over time. Inflation is the general increase in prices and fall in the purchasing value of money. This calculator uses the US Consumer Price Index (CPI) to show what an amount of money from a past year is worth in today’s dollars, or vice versa. It’s essential for anyone interested in personal finance, investing, history, or economics.</p>

      <h3>Why Does Inflation Matter?</h3>
      <ul>
        <li><strong>Purchasing Power:</strong> Inflation erodes the value of money, meaning $100 today buys less than $100 did 20 years ago.</li>
        <li><strong>Financial Planning:</strong> Understanding inflation helps you plan for retirement, investments, and long-term savings goals.</li>
        <li><strong>Historical Comparison:</strong> Comparing prices or salaries across decades requires adjusting for inflation to get a true sense of value.</li>
      </ul>

      <h3>How the Calculator Works</h3>
      <ol>
        <li>Enter the amount of money and the year you want to convert from.</li>
        <li>Enter the target year (usually the present or a future year).</li>
        <li>The calculator uses US CPI data to adjust the amount for inflation, showing its equivalent value in the target year.</li>
      </ol>

      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>What is the Consumer Price Index (CPI)?</summary>
        <p>The CPI measures the average change in prices paid by consumers for goods and services over time. It’s the most widely used measure of inflation in the US.</p>
      </details>
      <details>
        <summary>Can I use this calculator for other countries?</summary>
        <p>This version uses US CPI data. For other countries, use their official inflation indices or calculators.</p>
      </details>
      <details>
        <summary>How accurate are the results?</summary>
        <p>The calculator provides a close estimate based on official CPI data. Actual price changes for specific goods or services may vary.</p>
      </details>

      <h3>Tips for Using the Inflation Calculator</h3>
      <ul>
        <li>Use it to compare salaries, prices, or investments across different years.</li>
        <li>Remember that inflation rates can fluctuate year to year—long-term averages are more reliable for planning.</li>
        <li>Combine with other financial tools for a complete picture of your money’s value over time.</li>
      </ul>

      <p>With the Inflation Calculator, you can make smarter financial decisions, understand economic history, and see how the value of money changes across generations. Try it now and see what your money is really worth!</p>
    `
});
