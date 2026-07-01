/**
 * PrecisionCalc — Cooking Measurement Converter
 * Converts between common kitchen units
 */
registerTool({
  id: 'cooking-convert',
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
    <p>Recipes rarely agree on units — a British cookbook might call for milliliters, an American one for cups and tablespoons, and a nutrition label for ounces. This converter handles the five most common kitchen volume units instantly, so you can follow any recipe without reaching for a conversion chart taped inside a cabinet door.</p>

    <h3>Standard Kitchen Conversion Factors</h3>
    <div class="formula-block">1 cup = 16 tbsp = 48 tsp ≈ 236.6 mL ≈ 8 fl oz</div>
    <p>These U.S. customary measurements are what this calculator uses. For example, if a recipe calls for ¾ cup of milk and you only have a tablespoon on hand, ¾ × 16 = 12 tablespoons. Converting the other direction, 30 mL of oil is roughly 2 tablespoons (30 ÷ 14.79 ≈ 2.03).</p>

    <h3>Quick Reference Table</h3>
    <ul>
      <li><b>1 teaspoon (tsp):</b> ≈ 4.93 mL</li>
      <li><b>1 tablespoon (tbsp):</b> ≈ 14.79 mL = 3 teaspoons</li>
      <li><b>1 fluid ounce (oz):</b> ≈ 29.57 mL = 2 tablespoons</li>
      <li><b>1 cup:</b> ≈ 236.59 mL = 16 tablespoons = 8 fluid ounces</li>
    </ul>

    <h3>Why Kitchen Units Get Confusing</h3>
    <p>The biggest trap is that "ounce" can mean either a unit of volume (fluid ounce, used for liquids) or a unit of weight (used for solids like flour or sugar) — and the two are only equivalent for water-like liquids. A cup of flour weighs far less than a cup of honey, even though both fill the same 236.6 mL of space. This calculator converts volume-to-volume only, so for ingredients denser or lighter than water, a kitchen scale is more accurate than volume conversion alone.</p>

    <h3>Tips for Accurate Measuring</h3>
    <ul>
      <li>Use dry measuring cups for solids (flour, sugar) and liquid measuring cups (with a pour spout) for liquids — they're calibrated differently.</li>
      <li>Level off dry ingredients with a flat edge rather than packing them, unless a recipe specifically calls for "packed" measurement (common with brown sugar).</li>
      <li>For small volumes like teaspoons, use standardized measuring spoons rather than flatware, which vary in actual size.</li>
    </ul>

    <details>
      <summary>❓ Is a US cup the same as a metric cup?</summary>
      <p>No. A US cup is 236.59 mL, while a metric cup (used in Australia, for example) is exactly 250 mL. The difference is small but can matter in precise baking — this calculator uses US customary units.</p>
    </details>
    <details>
      <summary>❓ Why does my converted ounce value look off for flour?</summary>
      <p>Because "ounce" here refers to fluid ounces (volume), not weight ounces. One cup of all-purpose flour weighs about 4.5 weight-ounces (125g), even though it equals 8 fluid ounces by volume. For weight-sensitive baking, always use a kitchen scale.</p>
    </details>
    <details>
      <summary>❓ How many tablespoons are in a stick of butter?</summary>
      <p>A standard US stick of butter is ½ cup, which equals 8 tablespoons — a fact worth memorizing since butter is usually measured by the stick rather than poured.</p>
    </details>
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
    const resultCard = container.querySelector('#result-card-cooking-convert');
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
      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Converted</span>
            <span class="result-value large">
              ${result.toFixed(4)} ${toUnit}
              <button class="copy-btn" onclick="copyValue(this,'${result.toFixed(4)}')" title="Copy">📋</button>
            </span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('cooking-convert');
    }
    container.addEventListener('input', cookCalc);
    cookCalc();
  }
});
