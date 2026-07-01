/**
 * PrecisionCalc — Date Difference Calculator
 * Calculates the difference between two dates
 */
registerTool({
  id: 'date-diff',
  name: 'Date Difference Calculator',
  category: 'Daily Life',
  icon: '📅',
  materialIcon: 'event',
  tagline: 'Find the difference between two dates.',
  keywords: ['date', 'difference', 'days', 'calendar', 'life'],
  meta: {
    title: 'Date Difference Calculator — PrecisionCalc',
    description: 'Calculate the number of days, months, and years between two dates.'
  },

  seoContent: `
    <p>Whether you're counting down to a deadline, figuring out how many days are left until an event, or calculating someone's exact age in days, manually counting across months (with their uneven lengths and leap years) is tedious and error-prone. This calculator finds the exact difference between any two dates instantly.</p>

    <h3>How the Calculation Works</h3>
    <div class="formula-block">Days = (End Date − Start Date) ÷ 86,400,000 ms</div>
    <p>The calculator converts both dates to milliseconds since the Unix epoch, subtracts them, and converts back to whole days. From there, months are estimated by dividing days by the average month length (30.4375 days, which accounts for the mix of 28, 29, 30, and 31-day months across a year), and years by dividing months by 12.</p>

    <h3>Why "Months Between Dates" Is Approximate</h3>
    <p>Unlike days, which are a fixed, unambiguous unit, "months" don't have a single consistent length — February has 28 or 29 days while January has 31. Because of this, any date-difference calculator showing months is necessarily using an average or calendar-based approximation rather than an exact count. For legal or financial contexts where exact month boundaries matter (like a one-month notice period), always cross-check against a calendar rather than relying purely on the averaged figure.</p>

    <h3>Common Use Cases</h3>
    <ul>
      <li><b>Project deadlines:</b> Count exactly how many days remain until a due date.</li>
      <li><b>Contract terms:</b> Calculate the length of a lease, warranty, or service agreement.</li>
      <li><b>Pregnancy and medical tracking:</b> Determine days since a specific milestone or event.</li>
      <li><b>Anniversaries and milestones:</b> Find out how many days you've been together, employed, or sober.</li>
      <li><b>Billing and invoicing:</b> Calculate the exact number of days in a billing period for prorated charges.</li>
    </ul>

    <h3>Leap Years and Edge Cases</h3>
    <p>Because the calculator works directly with JavaScript's native Date object and raw millisecond differences, leap years are handled automatically and correctly — February 29th in a leap year is counted like any other calendar day, so no manual adjustment is needed.</p>

    <details>
      <summary>❓ Does this calculator count the start and end dates as full days?</summary>
      <p>The result reflects the number of complete 24-hour periods between midnight of the start date and midnight of the end date. If you need an "inclusive" count (counting both the first and last day as full days), add 1 to the result.</p>
    </details>
    <details>
      <summary>❓ Why do days and months not always divide evenly?</summary>
      <p>Because months vary in length (28–31 days), a whole number of days rarely maps to a whole number of months. The calculator uses the average month length across a year to give the closest practical approximation.</p>
    </details>
    <details>
      <summary>❓ Can I use this to calculate age in days instead of years?</summary>
      <p>Yes — enter your birth date as the start date and today's date as the end date. The "Days" result gives your exact age in days, which is often more precise than age in years for tracking things like infant development milestones.</p>
    </details>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="dd-from">From</label>
        <input type="date" id="dd-from" />
      </div>
      <div class="field">
        <label for="dd-to">To</label>
        <input type="date" id="dd-to" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-date-diff');
    function ddCalc() {
      const from = new Date(container.querySelector('#dd-from').value);
      const to = new Date(container.querySelector('#dd-to').value);
      if (isNaN(from) || isNaN(to) || to < from) {
        resultCard.innerHTML = '<div class="result-placeholder">Enter both dates (to date must be after from date) ✦</div>';
        return;
      }
      const ms = to - from;
      const days = Math.floor(ms / 86400000);
      const months = Math.floor(days / 30.4375);
      const years = Math.floor(months / 12);
      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Days</span>
            <span class="result-value large">
              ${days}
              <button class="copy-btn" onclick="copyValue(this,'${days}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Months</span>
            <span class="result-value">${months}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Years</span>
            <span class="result-value">${years}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('date-diff');
    }
    container.addEventListener('input', ddCalc);
    container.addEventListener('change', ddCalc);
    ddCalc();
  }
});
