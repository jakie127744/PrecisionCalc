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
    <p>A tip calculator is an essential everyday tool for anyone dining at a restaurant, using a rideshare service, getting a haircut, or ordering food delivery. Rather than doing mental math after a satisfying meal, this tool instantly tells you how much to tip based on your bill size and desired percentage — and can even split the final total among multiple people at the table.</p>

    <h3>US Tipping Standards by Service Type</h3>
    <ul>
      <li><strong>Sit-Down Restaurant:</strong> 15–18% is the traditional baseline. 20% or more is standard for good to excellent service. Anything below 10% signals dissatisfaction.</li>
      <li><strong>Counter Service / Casual Ordering:</strong> 10–15%, or $1–2 for simpler orders. Tipping at counter service has become more common since the rise of tablet-based checkout systems.</li>
      <li><strong>Food Delivery (DoorDash, Uber Eats, Grubhub):</strong> At least 15–20%, with a $3–5 minimum recommended for short distances. Delivery workers often rely on tips as a primary part of their income.</li>
      <li><strong>Rideshare (Uber, Lyft):</strong> 15–20% is appreciated, especially for longer rides, help with luggage, or exceptional service.</li>
      <li><strong>Bar Service:</strong> $1–2 per drink for simple orders; 15–20% on a tab. Cash tips at bars are often preferred over card tips.</li>
      <li><strong>Hair Stylist / Barber:</strong> 15–20% of the service cost is standard. Many stylists split tips with assistants who shampoo or style.</li>
      <li><strong>Hotel Housekeeping:</strong> $2–5 per night, ideally left each day since different staff may clean on different days.</li>
      <li><strong>Taxi / Cab:</strong> 15–20% of the fare; round up to the nearest dollar for shorter trips.</li>
    </ul>

    <h3>How Tip Is Calculated</h3>
    <p>The formula is straightforward: <strong>Tip Amount = Bill × (Tip% / 100)</strong>. The Total Bill is then the original amount plus the tip. For group dining, the Per Person amount is the Total ÷ Number of Guests.</p>
    <p>Example: A $85 dinner for 3 people, with an 18% tip:</p>
    <ul>
      <li>Tip = $85 × 0.18 = <strong>$15.30</strong></li>
      <li>Total = $85 + $15.30 = <strong>$100.30</strong></li>
      <li>Per Person = $100.30 ÷ 3 = <strong>$33.43</strong></li>
    </ul>

    <h3>The Quick Mental Math Shortcut</h3>
    <p>To calculate a 20% tip without a calculator: move the decimal point one place to the left to get 10%, then double it. For a $64 bill — 10% is $6.40, doubled is <strong>$12.80</strong>. For a 15% tip: take 10% and add half. For the $64 bill: $6.40 + $3.20 = <strong>$9.60</strong>.</p>

    <h3>Tipping Culture Around the World</h3>
    <p>Tipping customs vary dramatically by country. In the United States, tipping is a cultural expectation and a significant portion of service workers' income. In Japan and South Korea, tipping is largely considered rude and unnecessary — excellent service is the default standard, not something requiring monetary recognition. In Europe, rounding up the bill or leaving small change is common but a 20% tip is unusual. In Australia, tipping is appreciated but not expected; service staff receive minimum wage.</p>
    <p>When traveling internationally, researching local norms before tipping can prevent awkward situations and show cultural respect.</p>

    <details>
      <summary>❓ Should I tip on the pre-tax or post-tax total?</summary>
      <p>Etiquette experts traditionally suggest tipping on the pre-tax subtotal, since tips are meant to reward service — not subsidize the government. However, many people simply tip on the full post-tax total because it's easier. If the service was exceptional, tipping on the full total is a generous and appreciated gesture.</p>
    </details>
    <details>
      <summary>❓ What is "Gratuity Included" or "Auto-Gratuity"?</summary>
      <p>Many restaurants automatically add an 18–20% gratuity for parties of 6 or more. Always check your receipt before adding an additional tip. Auto-gratuity is legal in the US and is typically disclosed on the menu. Leaving a second tip on top of an automatic gratuity is unnecessary, though some diners do so for exceptional service.</p>
    </details>
    <details>
      <summary>❓ Do I tip on alcohol separately?</summary>
      <p>Industry norms say yes — tip on the entire bill, including drinks. However, at a restaurant where you're ordering expensive wine, some diners apply the standard tip percentage to food and a lower percentage to expensive bottles. There's no strict rule; tip based on what feels appropriate for the service received.</p>
    </details>
    <details>
      <summary>❓ Is it okay to lower the tip for bad service?</summary>
      <p>Yes. A tip is meant to reflect your satisfaction with service. If service was genuinely poor — not because the kitchen was slow, but because your server was rude or inattentive — reducing the tip to 10–12% communicates your experience. However, consider that servers sometimes have factors outside their control (kitchen errors, understaffing).</p>
    </details>
  `
});

