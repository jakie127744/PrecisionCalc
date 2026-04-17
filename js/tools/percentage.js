/**
 * PrecisionCalc — Percentage Change Calculator
 * The #1 most searched math term globally.
 */
registerTool({
  id:       'percentage',
  name:     'Percentage Calculator',
  category: 'Math',
  icon:         '%',
  materialIcon: 'percent',
  tagline:  'Calculate percentage change, what percent of a number is, and more.',
  keywords: ['percentage', 'percent', 'percentage change', 'percent of', 'increase', 'decrease', 'discount', 'tip'],
  meta: {
    title:       'Percentage Calculator — PrecisionCalc',
    description: 'Calculate percentage change, percent of a number, percentage increase/decrease, and tip. Free online percentage calculator — real-time results.'
  },

  template: () => `
    <!-- Mode Tabs -->
    <div class="toggle-row" style="flex-wrap:wrap;gap:6px;">
      <span>Mode:</span>
      <div class="toggle-btn" id="pct-mode-toggle" style="border-radius:8px;overflow:hidden;">
        <button id="pct-mode-change" class="active" onclick="pctSetMode('change')">% Change</button>
        <button id="pct-mode-of"     onclick="pctSetMode('of')">% Of</button>
        <button id="pct-mode-tip"    onclick="pctSetMode('tip')">Tip</button>
        <button id="pct-mode-disc"   onclick="pctSetMode('discount')">Discount</button>
      </div>
    </div>

    <!-- Mode: % Change -->
    <div id="pct-fields-change">
      <div class="form-row">
        <div class="field">
          <label for="pct-orig">Original Value</label>
          <input type="number" id="pct-orig" placeholder="100" value="100" />
        </div>
        <div class="field">
          <label for="pct-new">New Value</label>
          <input type="number" id="pct-new" placeholder="125" value="125" />
        </div>
      </div>
    </div>

    <!-- Mode: % Of -->
    <div id="pct-fields-of" style="display:none">
      <div class="form-row">
        <div class="field">
          <label for="pct-pct">Percentage (%)</label>
          <input type="number" id="pct-pct" placeholder="15" value="15" />
        </div>
        <div class="field">
          <label for="pct-total">Of What Number?</label>
          <input type="number" id="pct-total" placeholder="200" value="200" />
        </div>
      </div>
    </div>

    <!-- Mode: Tip -->
    <div id="pct-fields-tip" style="display:none">
      <div class="form-row">
        <div class="field">
          <label for="tip-bill">Bill Amount ($)</label>
          <input type="number" id="tip-bill" placeholder="85.00" value="85" />
        </div>
        <div class="field">
          <label for="tip-pct">Tip Percentage (%)</label>
          <input type="number" id="tip-pct" placeholder="18" value="18" />
        </div>
      </div>
      <div class="form-row single">
        <div class="field">
          <label for="tip-people">Split Between (people)</label>
          <input type="number" id="tip-people" placeholder="2" value="2" min="1" />
        </div>
      </div>
    </div>

    <!-- Mode: Discount -->
    <div id="pct-fields-discount" style="display:none">
      <div class="form-row">
        <div class="field">
          <label for="disc-price">Original Price ($)</label>
          <input type="number" id="disc-price" placeholder="120" value="120" />
        </div>
        <div class="field">
          <label for="disc-pct">Discount (%)</label>
          <input type="number" id="disc-pct" placeholder="25" value="25" />
        </div>
      </div>
    </div>
  `,

  mount(container) {
    window.pctMode = 'change';
    window.pctSetMode = (mode) => {
      window.pctMode = mode;
      ['change', 'of', 'tip', 'discount'].forEach(m => {
        container.querySelector(`#pct-fields-${m}`).style.display = m === mode ? '' : 'none';
        container.querySelector(`#pct-mode-${m}`).classList.toggle('active', m === mode);
      });
      pctCalc();
    };

    const resultCard = container.querySelector('#result-card-percentage');

    const pctCalc = () => {
      let html = '';

      if (window.pctMode === 'change') {
        const orig = parseFloat(container.querySelector('#pct-orig')?.value) || 0;
        const newV = parseFloat(container.querySelector('#pct-new')?.value)  || 0;
        const change     = newV - orig;
        const pctChange  = orig !== 0 ? (change / orig) * 100 : 0;
        const dir        = pctChange >= 0 ? '▲' : '▼';
        const color      = pctChange >= 0 ? 'var(--success)' : 'var(--danger)';
        html = `
          <div class="result-grid">
            <div class="result-item">
              <span class="result-label">Percentage Change</span>
              <span class="result-value large" style="color:${color}">
                ${dir} ${fmt.number(Math.abs(pctChange), 2)}%
                <button class="copy-btn" onclick="copyValue(this,'${fmt.number(pctChange,2)}%')" title="Copy">📋</button>
              </span>
            </div>
            <div class="result-item">
              <span class="result-label">Absolute Change</span>
              <span class="result-value" style="color:${color}">${change >= 0 ? '+' : ''}${fmt.number(change, 2)}</span>
            </div>
          </div>`;

      } else if (window.pctMode === 'of') {
        const pct   = parseFloat(container.querySelector('#pct-pct')?.value)   || 0;
        const total = parseFloat(container.querySelector('#pct-total')?.value) || 0;
        const result = (pct / 100) * total;
        const what   = total !== 0 ? (result / total * 100) : 0;
        html = `
          <div class="result-grid">
            <div class="result-item">
              <span class="result-label">${pct}% of ${total}</span>
              <span class="result-value large">
                ${fmt.number(result, 2)}
                <button class="copy-btn" onclick="copyValue(this,'${fmt.number(result,2)}')" title="Copy">📋</button>
              </span>
            </div>
            <div class="result-item">
              <span class="result-label">${fmt.number(result,2)} is what % of ${total}?</span>
              <span class="result-value">${fmt.number(what, 2)}%</span>
            </div>
          </div>`;

      } else if (window.pctMode === 'tip') {
        const bill   = parseFloat(container.querySelector('#tip-bill')?.value)   || 0;
        const tipPct = parseFloat(container.querySelector('#tip-pct')?.value)    || 0;
        const people = parseInt(container.querySelector('#tip-people')?.value)   || 1;
        const tipAmt = bill * (tipPct / 100);
        const total  = bill + tipAmt;
        const perPerson = total / people;
        html = `
          <div class="result-grid">
            <div class="result-item">
              <span class="result-label">Tip Amount</span>
              <span class="result-value large">${fmt.currency(tipAmt)}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Total Bill</span>
              <span class="result-value">${fmt.currency(total)}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Per Person</span>
              <span class="result-value">
                ${fmt.currency(perPerson)}
                <button class="copy-btn" onclick="copyValue(this,'${fmt.currency(perPerson)}')" title="Copy">📋</button>
              </span>
            </div>
          </div>`;

      } else if (window.pctMode === 'discount') {
        const price    = parseFloat(container.querySelector('#disc-price')?.value) || 0;
        const discPct  = parseFloat(container.querySelector('#disc-pct')?.value)   || 0;
        const savings  = price * (discPct / 100);
        const final    = price - savings;
        html = `
          <div class="result-grid">
            <div class="result-item">
              <span class="result-label">Sale Price</span>
              <span class="result-value large">
                ${fmt.currency(final)}
                <button class="copy-btn" onclick="copyValue(this,'${fmt.currency(final)}')" title="Copy">📋</button>
              </span>
            </div>
            <div class="result-item">
              <span class="result-label">You Save</span>
              <span class="result-value" style="color:var(--success)">${fmt.currency(savings)}</span>
            </div>
          </div>`;
      }

      resultCard.innerHTML = html || `<div class="result-placeholder">Enter values above.</div>`;
      if (html) resultCard.classList.add('active');
      pulseResult('percentage');
    };

    window.pctCalc = pctCalc;
    container.querySelectorAll('input').forEach(el => el.addEventListener('input', pctCalc));
    pctCalc();
  },

  seoContent: `
    <p>Percentage calculations are among the most common math operations used in everyday life — from calculating discounts while shopping to understanding financial returns, tip calculations at restaurants, and grade scores in school. Understanding how percentages work gives you a significant advantage in making fast, smart decisions.</p>

    <h3>Key Percentage Formulas</h3>
    <div class="formula-block">
      % Change = ((New − Old) ÷ Old) × 100
      % Of     = (Percentage ÷ 100) × Total
      Discount = Original Price × (Discount% ÷ 100)
      Tip      = Bill × (Tip% ÷ 100)
    </div>

    <h3>Percentage Change in Finance</h3>
    <p>Percentage change is fundamental to finance. A stock that moves from $50 to $60 has gained 20% ((60−50)÷50×100). A portfolio that drops from $100,000 to $85,000 has fallen 15%. Understanding these calculations instantly helps you evaluate investment performance, salary increases, and inflation impact.</p>

    <h3>Tip Calculation Guide</h3>
    <p>Standard restaurant tipping in the U.S.: 15% for adequate service, 18–20% for good service, 22–25% for exceptional service. A quick mental trick: Find 10% (move the decimal left), then add half for 15%, or double for 20%.</p>

    <details>
      <summary>❓ What is the difference between percentage points and percent?</summary>
      <p>If an interest rate rises from 4% to 5%, it increased by 1 percentage point but by 25% (in relative terms). This distinction is critical in finance, economics, and polling — a politician who says rates rose "25%" vs. "1 percentage point" is technically correct but creates very different impressions.</p>
    </details>
    <details>
      <summary>❓ How do I calculate a percentage increase back to the original?</summary>
      <p>If a price is $120 after a 20% increase, the original was $120 ÷ 1.20 = $100. Do NOT subtract 20% from the final price (that gives $96, which is wrong). Always divide by (1 + rate).</p>
    </details>
  `
});
