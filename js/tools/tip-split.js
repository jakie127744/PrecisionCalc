/**
 * PrecisionCalc — Tip Splitter
 * Calculates tip and splits bill among people
 */
registerTool({
  id: 'tip-split',
  name: 'Tip Splitter',
  category: 'Daily Life',
  icon: '💵',
  materialIcon: 'payments',
  tagline: 'Calculate tip and split the bill among people.',
  keywords: ['tip', 'split', 'bill', 'restaurant', 'daily life'],
  meta: {
    title: 'Tip Splitter — PrecisionCalc',
    description: 'Calculate tip and split the bill among people instantly. Free online restaurant bill calculator.'
  },

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="ts-bill">Bill Amount ($)</label>
        <input type="number" id="ts-bill" placeholder="100.00" min="0" value="100.00" />
      </div>
      <div class="field">
        <label for="ts-tip">Tip (%)</label>
        <input type="number" id="ts-tip" placeholder="18" min="0" value="18" />
      </div>
      <div class="field">
        <label for="ts-people">People</label>
        <input type="number" id="ts-people" placeholder="2" min="1" value="2" />
      </div>
    </div>
  `,

  mount(container) {
    const ids = ['ts-bill', 'ts-tip', 'ts-people'];
    const els = ids.map(id => container.querySelector(`#${id}`));
    const resultCard = container.querySelector('#result-card-tip-split');

    const calc = () => {
      const bill = parseFloat(els[0].value) || 0;
      const tipPct = parseFloat(els[1].value) || 0;
      const people = parseInt(els[2].value) || 1;

      if (bill <= 0) {
        resultCard.innerHTML = `<div class="result-placeholder">Enter bill amount ✦</div>`;
        return;
      }

      const tipAmt = bill * (tipPct / 100);
      const total = bill + tipAmt;
      const perPerson = total / people;
      const tipPerPerson = tipAmt / people;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Per Person</span>
            <span class="result-value large">
                ${fmt.currency(perPerson)}
                <button class="copy-btn" onclick="copyValue(this,'${fmt.currency(perPerson)}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Total Bill</span>
            <span class="result-value">${fmt.currency(total)}</span>
            <span class="result-sub">Includes ${fmt.currency(tipAmt)} tip</span>
          </div>
          <div class="result-item">
            <span class="result-label">Tip / Person</span>
            <span class="result-value">${fmt.currency(tipPerPerson)}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('tip-split');
    };

    els.forEach(el => el.addEventListener('input', calc));
    calc();
  },

  seoContent: `
    <p>Splitting a dinner bill with friends should be the easiest part of the evening. The Tip Splitter eliminates the confusion by calculating both the gratuity and each person's fair share in one step. Whether you're at a birthday dinner for ten or a casual lunch for two, this tool ensures everyone pays the right amount — tip included — without awkward negotiations or mental math errors.</p>

    <h3>How the Bill Split Calculation Works</h3>
    <p>The math behind equal splitting is simple but easy to fumble when you're full and distracted:</p>
    <ul>
      <li><strong>Step 1 — Calculate Tip:</strong> Tip Amount = Bill × (Tip Percentage / 100)</li>
      <li><strong>Step 2 — Find Total:</strong> Total = Bill + Tip Amount</li>
      <li><strong>Step 3 — Divide:</strong> Per Person = Total ÷ Number of People</li>
    </ul>
    <p>Example: $150 dinner bill, 20% tip, 4 people → Tip = $30 → Total = $180 → Each person owes <strong>$45.00</strong>.</p>

    <h3>US Tipping Standards for Groups</h3>
    <ul>
      <li><strong>15%:</strong> Adequate/standard service — use for meals that were fine but unremarkable.</li>
      <li><strong>18%:</strong> Good service — a common default at many restaurants and often the auto-gratuity threshold.</li>
      <li><strong>20%:</strong> Great service — the new cultural norm in most US cities. Easy to calculate (10% × 2).</li>
      <li><strong>22–25%+:</strong> Exceptional service, difficult or large orders, food allergies handled perfectly, or a server who went above and beyond.</li>
    </ul>

    <h3>Auto-Gratuity: What to Watch For</h3>
    <p>Most US restaurants automatically add a mandatory gratuity of 18–20% for parties of 6 or more. This will appear as "Service Charge," "Gratuity," or "Auto-Grat" on your bill. If you see this charge, you do <em>not</em> need to add another tip on the credit card slip — though leaving a small additional cash tip for particularly outstanding service is always appreciated. Always read your receipt carefully before signing.</p>

    <h3>Strategies for Unequal Splits</h3>
    <p>This tool assumes everyone splits the bill equally. In practice, group dinners often involve unequal ordering. Here are fair approaches:</p>
    <ul>
      <li><strong>Itemized Split:</strong> Each person pays for exactly what they ordered, including a proportional share of the tip. Best for large groups with very different orders.</li>
      <li><strong>Weighted Split:</strong> Divide the bill proportionally. If Alice's food was 40% of the total, she pays 40% of the bill.</li>
      <li><strong>Round Up and Donate the Difference:</strong> Have everyone round their share up to the nearest $5 or $10. The extra goes to the tip, often resulting in a very generous gratuity with minimal friction.</li>
      <li><strong>Apps:</strong> Venmo, Splitwise, and Tab apps can track individual purchases and send payment requests automatically — ideal for recurring group dining.</li>
    </ul>

    <h3>Tipping Etiquette Globally</h3>
    <p>Group tipping norms vary drastically worldwide. In the USA and Canada, splitting the bill and tipping 18–20% is standard. In the UK, 10–12.5% is typical, and service charge is often included. In France, a small "pourboire" (tip) of 5–10% is polite but not obligatory. In Germany, rounding up to a convenient amount is standard — a €47 bill might be paid with €52. In Japan, China, and South Korea, tipping is traditionally not practiced and can sometimes cause offense. When traveling internationally, always research local norms to show cultural respect.</p>

    <details>
      <summary>❓ Should we tip on the pre-tax or post-tax amount?</summary>
      <p>Traditional etiquette suggests tipping on the pre-tax subtotal. In practice, most people in the US tip on the full total (including tax) because it's simpler. The difference is typically small — on a $100 pre-tax bill with 8% tax, tipping 20% on pre-tax ($20) vs. post-tax ($21.60) is only $1.60 different.</p>
    </details>
    <details>
      <summary>❓ What if one person doesn't drink alcohol?</summary>
      <p>If some guests ordered alcohol (which significantly inflates a bill) and others didn't, an equal split can feel unfair. A common courtesy is for drinkers to offer to cover a larger share. Alternatively, separate the alcohol costs first, then split the food equally and add tip proportionally.</p>
    </details>
    <details>
      <summary>❓ Is it rude to split the bill in a restaurant?</summary>
      <p>In the US, splitting is entirely normal and most servers are used to it. Simply ask your server before ordering or at the start of the meal. Most modern POS systems can split a bill by seat or by any amount. In some European countries, separate checks are less common and may require advance notice.</p>
    </details>
    <details>
      <summary>❓ How do I handle it when someone "forgets" their share?</summary>
      <p>Apps like Splitwise or Venmo make it easy to log who owes what and send automatic reminders without an awkward in-person conversation. For recurring group situations (work lunches, friend groups), these tools dramatically reduce friction around money.</p>
    </details>
  `
});
