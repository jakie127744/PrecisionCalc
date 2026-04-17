/**
 * PrecisionCalc — Date Difference Calculator
 * Calculates the difference between two dates
 */
registerTool({
  id: 'datediff',
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
    <h2>Date Difference Calculator</h2>
    <p>Calculate the number of days, months, and years between two dates. Enter your dates to get instant results. Useful for planning, scheduling, and time management.</p>
    <ul>
      <li><b>Days:</b> Total days between dates</li>
      <li><b>Months:</b> Approximate months between dates</li>
      <li><b>Years:</b> Approximate years between dates</li>
    </ul>
    <p>This free online date difference calculator is easy to use and accurate.</p>
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
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-datediff';
    container.appendChild(resultCard);
    function ddCalc() {
      const from = new Date(container.querySelector('#dd-from').value);
      const to = new Date(container.querySelector('#dd-to').value);
      if (isNaN(from) || isNaN(to) || to < from) {
        resultCard.innerHTML = '';
        return;
      }
      const ms = to - from;
      const days = Math.floor(ms / 86400000);
      const months = Math.floor(days / 30.4375);
      const years = Math.floor(months / 12);
      resultCard.innerHTML = `<div class=\"result-card\"><div><b>Days:</b> ${days}</div><div><b>Months:</b> ${months}</div><div><b>Years:</b> ${years}</div></div>`;
    }
    container.addEventListener('input', ddCalc);
    container.addEventListener('change', ddCalc);
    ddCalc();
  }
});
