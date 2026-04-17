/**
 * PrecisionCalc — Kitchen Master Converter
 * Converts between cooking volume, weight, and temperature units. Large, easy-to-read results for kitchen use.
 */
registerTool({
  id:       'kitchen',
  name:     'Kitchen Converter',
  category: 'Daily Life',
  icon:         '🍳',
  materialIcon: 'kitchen',
  tagline:  'Convert cooking volume, weight, and temperature. Big results for easy reading! ',
  keywords: ['kitchen', 'cooking', 'volume', 'weight', 'temperature', 'cups', 'ml', 'grams', 'ounces', 'fahrenheit', 'celsius'],
  meta: {
    title:       'Kitchen Converter — PrecisionCalc',
    description: 'Convert between cups, tablespoons, ml, grams, ounces, and kitchen temperatures. Results are large and easy to read for cooks.'
  },

  template: () => `
    <div class="form-row" style="flex-wrap:wrap;gap:12px;">
      <div class="field">
        <label for="kitchen-type">Type</label>
        <select id="kitchen-type">
          <option value="volume">Volume</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>
      </div>
      <div class="field">
        <label for="kitchen-from">From</label>
        <input type="number" id="kitchen-from" placeholder="1" value="1" />
      </div>
      <div class="field">
        <label for="kitchen-from-unit">Unit</label>
        <select id="kitchen-from-unit"></select>
      </div>
      <div class="field">
        <label for="kitchen-to-unit">To</label>
        <select id="kitchen-to-unit"></select>
      </div>
    </div>
    <div id="result-card-kitchen" class="result-card" style="margin-top:24px;"></div>
  `,

  seoContent: `
    <p>The Kitchen Converter is a must-have tool for home cooks, bakers, chefs, and anyone who loves spending time in the kitchen. It makes converting between common cooking units—volume, weight, and temperature—fast, accurate, and stress-free.</p>

    <h3>Why Use a Kitchen Converter?</h3>
    <ul>
      <li><strong>Recipe Scaling:</strong> Double or halve recipes with confidence by converting ingredient amounts precisely.</li>
      <li><strong>International Cooking:</strong> Easily switch between metric and US customary units.</li>
      <li><strong>Oven Temperatures:</strong> Convert between Celsius and Fahrenheit for baking and roasting success.</li>
    </ul>

    <h3>How to Use</h3>
    <ol>
      <li>Select the conversion type (Volume, Weight, or Temp).</li>
      <li>Enter your value and select the specific units.</li>
      <li>The result updates instantly in the large display area.</li>
    </ol>
  `,

  mount(container) {
    const typeEl = container.querySelector('#kitchen-type');
    const fromUnitEl = container.querySelector('#kitchen-from-unit');
    const toUnitEl = container.querySelector('#kitchen-to-unit');
    const fromValEl = container.querySelector('#kitchen-from');
    const resultBox = container.querySelector('#result-card-kitchen');
    
    const units = {
      volume: [
        { name: 'Cups', value: 'cup', factor: 240 },
        { name: 'Tablespoons', value: 'tbsp', factor: 15 },
        { name: 'Teaspoons', value: 'tsp', factor: 5 },
        { name: 'Milliliters', value: 'ml', factor: 1 },
        { name: 'Liters', value: 'l', factor: 1000 },
        { name: 'Fluid Ounces', value: 'floz', factor: 29.5735 },
        { name: 'Pints', value: 'pt', factor: 473.176 },
        { name: 'Quarts', value: 'qt', factor: 946.353 },
        { name: 'Gallons', value: 'gal', factor: 3785.41 }
      ],
      weight: [
        { name: 'Grams', value: 'g', factor: 1 },
        { name: 'Kilograms', value: 'kg', factor: 1000 },
        { name: 'Ounces', value: 'oz', factor: 28.3495 },
        { name: 'Pounds', value: 'lb', factor: 453.592 },
      ],
      temperature: [
        { name: 'Celsius', value: 'c' },
        { name: 'Fahrenheit', value: 'f' },
        { name: 'Kelvin', value: 'k' }
      ]
    };

    function populateUnits(type) {
      fromUnitEl.innerHTML = '';
      toUnitEl.innerHTML = '';
      units[type].forEach(u => {
        fromUnitEl.innerHTML += `<option value="${u.value}">${u.name}</option>`;
        toUnitEl.innerHTML += `<option value="${u.value}">${u.name}</option>`;
      });
    }

    function calc() {
      const type = typeEl.value;
      const from = fromUnitEl.value;
      const to = toUnitEl.value;
      const val = parseFloat(fromValEl.value) || 0;
      let result = 0;

      if (type === 'volume') {
        const fromF = units.volume.find(u => u.value === from).factor;
        const toF = units.volume.find(u => u.value === to).factor;
        result = val * fromF / toF;
      } else if (type === 'weight') {
        const fromF = units.weight.find(u => u.value === from).factor;
        const toF = units.weight.find(u => u.value === to).factor;
        result = val * fromF / toF;
      } else if (type === 'temperature') {
        if (from === to) result = val;
        else if (from === 'c') result = to === 'f' ? val * 9/5 + 32 : val + 273.15;
        else if (from === 'f') result = to === 'c' ? (val - 32) * 5/9 : (val - 32) * 5/9 + 273.15;
        else if (from === 'k') result = to === 'c' ? val - 273.15 : (val - 273.15) * 9/5 + 32;
      }

      resultBox.innerHTML = `
        <div class="result-glow" style="padding: 32px; text-align: center; background: var(--surface-container-high); border-radius: var(--radius-xl); border: 2px solid var(--primary-glow);">
           <div style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary); margin-bottom: 8px; font-weight: 700;">Converted Value</div>
           <div style="font-size: 3.5rem; font-weight: 800; color: var(--on-surface); line-height: 1;">
              ${result.toLocaleString(undefined, {maximumFractionDigits: 4})}
           </div>
           <div style="margin-top: 12px; font-weight: 600; color: var(--on-surface-variant); font-size: 1.1rem;">${units[type].find(u => u.value === to).name}</div>
        </div>
      `;
    }

    typeEl.addEventListener('change', () => {
      populateUnits(typeEl.value);
      calc();
    });
    fromUnitEl.addEventListener('change', calc);
    toUnitEl.addEventListener('change', calc);
    fromValEl.addEventListener('input', calc);

    populateUnits('volume');
    calc();
  }
});
