/**
 * PrecisionCalc — Cooking Measurement Converter
 * Converts between common kitchen units
 */
registerTool({
  id: 'cookingconvert',
  name: 'Cooking Measurement Converter',
  category: 'Daily Life',
  icon: '🥄',
  materialIcon: 'kitchen',
  tagline: 'Convert between kitchen units.',
  keywords: ['cooking', 'measurement', 'convert', 'kitchen', 'cup', 'tablespoon', 'teaspoon', 'ml', 'oz'],
  meta: {
    title: 'Cooking Measurement Converter — PrecisionCalc',
    description: 'Convert between cups, tablespoons, teaspoons, milliliters, and ounces.'
  },

  seoContent: `
    <h2>Cooking Measurement Converter</h2>
    <p>Convert between cups, tablespoons, teaspoons, milliliters, and ounces. Enter your value and select units for instant conversion. Useful for cooking, baking, and kitchen tasks.</p>
    <ul>
      <li><b>Supported Units:</b> Cup, Tablespoon, Teaspoon, mL, Ounce</li>
      <li><b>Instant Conversion:</b> Accurate and easy to use</li>
    </ul>
    <p>This free online cooking converter is perfect for home cooks and chefs.</p>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="cook-from">From</label>
        <input type="number" id="cook-from" placeholder="1" value="1" />
      </div>
      <div class="field">
        <label for="cook-from-unit">From Unit</label>
        <select id="cook-from-unit">
          <option value="cup">Cup</option>
          <option value="tbsp">Tablespoon</option>
          <option value="tsp">Teaspoon</option>
          <option value="ml">Milliliter</option>
          <option value="oz">Ounce</option>
        </select>
      </div>
      <div class="field">
        <label for="cook-to-unit">To Unit</label>
        <select id="cook-to-unit">
          <option value="cup">Cup</option>
          <option value="tbsp">Tablespoon</option>
          <option value="tsp">Teaspoon</option>
          <option value="ml">Milliliter</option>
          <option value="oz">Ounce</option>
        </select>
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-cookingconvert';
    container.appendChild(resultCard);
    const factors = {
      cup:      { cup: 1, tbsp: 16, tsp: 48, ml: 236.588, oz: 8 },
      tbsp:     { cup: 1/16, tbsp: 1, tsp: 3, ml: 14.7868, oz: 0.5 },
      tsp:      { cup: 1/48, tbsp: 1/3, tsp: 1, ml: 4.92892, oz: 1/6 },
      ml:       { cup: 1/236.588, tbsp: 1/14.7868, tsp: 1/4.92892, ml: 1, oz: 1/29.5735 },
      oz:       { cup: 1/8, tbsp: 2, tsp: 6, ml: 29.5735, oz: 1 }
    };
    function cookCalc() {
      const fromVal = parseFloat(container.querySelector('#cook-from').value) || 0;
      const fromUnit = container.querySelector('#cook-from-unit').value;
      const toUnit = container.querySelector('#cook-to-unit').value;
      const result = fromVal * factors[fromUnit][toUnit];
      resultCard.innerHTML = `<div class=\"result-card\"><div><b>Converted:</b> ${result.toFixed(4)} ${toUnit}</div></div>`;
    }
    container.addEventListener('input', cookCalc);
    cookCalc();
  }
});
