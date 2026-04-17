/**
 * PrecisionCalc — Tip Calculator
 * Calculates tip, total, and split bill for groups.
 */
registerTool({
  id:       'tip',
  name:     'Tip Calculator',
  category: 'Daily Life',
  icon:         '\ud83d\udcb8',
  materialIcon: 'percent',
  tagline:  'Calculate tip, total bill, and split for groups.',
  keywords: ['tip', 'bill', 'split', 'restaurant', 'gratuity'],
  meta: {
    title:       'Tip Calculator — PrecisionCalc',
    description: 'Calculate tip, total bill, and split for groups. Perfect for restaurants and group dining.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\">
        <label for=\"tip-bill\">Bill Amount ($)</label>
        <input type=\"number\" id=\"tip-bill\" placeholder=\"100\" min=\"0\" value=\"100\" />
      </div>
      <div class=\"field\">
        <label for=\"tip-percent\">Tip (%)</label>
        <input type=\"number\" id=\"tip-percent\" placeholder=\"15\" min=\"0\" value=\"15\" />
      </div>
      <div class=\"field\">
        <label for=\"tip-people\">People</label>
        <input type=\"number\" id=\"tip-people\" placeholder=\"1\" min=\"1\" value=\"1\" />
      </div>
    </div>
  `,

  mount(container) {
    const ids = ['tip-bill', 'tip-percent', 'tip-people'];
    const els = ids.map(id => container.querySelector(`#${id}`));
    const resultCard = container.querySelector('#result-card-tip');

    const calc = () => {
      const bill = parseFloat(els[0].value) || 0;
      const percent = parseFloat(els[1].value) || 0;
      const people = parseInt(els[2].value) || 1;

      if (bill <= 0 || percent < 0 || people <= 0) {
        resultCard.innerHTML = `<div class="result-placeholder">Enter bill amount to see results ✦</div>`;
        return;
      }

      const tip = bill * percent / 100;
      const total = bill + tip;
      const perPerson = total / people;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Tip Amount</span>
            <span class="result-value">
              ${fmt.currency(tip)}
              <button class="copy-btn" onclick="copyValue(this,'${fmt.currency(tip)}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Total Bill</span>
            <span class="result-value">${fmt.currency(total)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Per Person</span>
            <span class="result-value large">${fmt.currency(perPerson)}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('tip');
    };

    els.forEach(el => el?.addEventListener('input', calc));
    calc();
  },

  seoContent: `
    <p>A tip calculator is an essential tool for dining out, travel, and personal services. It takes the guesswork out of gratitude by calculating the exact tip amount based on your bill and desired percentage, and can even split the final total among a group of people.</p>

    <h3>Tipping Standards (US)</h3>
    <ul>
      <li><strong>Standard Service:</strong> 15-18% is traditionally considered the baseline.</li>
      <li><strong>Excellent Service:</strong> 20% or more is common for high-quality service.</li>
      <li><strong>Delivery:</strong> 10-15% or a flat $3-5 minimum is often recommended.</li>
      <li><strong>Bar Service:</strong> $1-2 per drink or 15-20% of the tab.</li>
    </ul>

    <h3>How to Calculate Tip Manually</h3>
    <p>To calculate a 20% tip, take 10% of the bill (move the decimal one place to the left) and double it. For a $64.50 bill, 10% is $6.45. Double that is $12.90.</p>

    <details>
      <summary>❓ Should I tip on the pre-tax or post-tax total?</summary>
      <p>Standard etiquette suggests tipping on the pre-tax amount. However, many people find it easier to tip on the final total. If the service was exceptional, tipping on the post-tax total is a nice gesture.</p>
    </details>
    <details>
      <summary>❓ What is "Gratuity Included"?</summary>
      <p>Many restaurants automatically add a gratuity (often 18%) for groups of 6 or more. Always check your receipt before adding an additional tip.</p>
    </details>
  `
});

