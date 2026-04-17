/**
 * PrecisionCalc — Tip Splitter
 * Calculates tip and splits bill among people
 */
registerTool({
  id: 'tipsplit',
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
    const resultCard = container.querySelector('#result-card-tipsplit');

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
      pulseResult('tipsplit');
    };

    els.forEach(el => el.addEventListener('input', calc));
    calc();
  },

  seoContent: `
    <p>Splitting a restaurant bill shouldn't require a math degree. The Tip Splitter tool helps you quickly calculate the gratuity and divide the total amount among friends, ensuring everyone pays their fair share.</p>

    <h3>What is a Standard Tip?</h3>
    <p>Tipping etiquette varies by region, but in the United States, the following is generally observed:</p>
    <ul>
      <li><strong>15%:</strong> Good/Standard service.</li>
      <li><strong>18-20%:</strong> Great service.</li>
      <li><strong>20%+:</strong> Exceptional service.</li>
    </ul>

    <h3>How the Math Works</h3>
    <p>The tool first calculates the tip amount (Bill × Tip %), then adds it to the original bill. Finally, it divides that grand total by the number of people in your group.</p>

    <details>
      <summary>❓ Should I tip on the pre-tax or post-tax amount?</summary>
      <p>Etiquette experts usually suggest tipping on the pre-tax amount. However, many people find it easier to tip on the total, especially when service is excellent.</p>
    </details>
    <details>
      <summary>❓ What if we aren't splitting equally?</summary>
      <p>This tool assumes an equal split. If individuals ordered significantly different amounts, it's often better to calculate the tip percentage and apply it to each person's individual subtotal.</p>
    </details>
  `
});
