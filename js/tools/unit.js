/**
 * PrecisionCalc — Smart Unit Converter
 * One UI, multiple category conversion maps.
 */
registerTool({
  id:       'unit',
  name:     'Unit Converter',
  category: 'Daily Life',
  icon:         '🔄',
  materialIcon: 'straighten',
  tagline:  'Convert length, weight, temperature, data, speed, and area with one tool.',
  keywords: ['unit converter', 'length', 'weight', 'temperature', 'km to miles', 'kg to lbs', 'celsius to fahrenheit', 'data storage', 'speed', 'area', 'convert'],
  meta: {
    title:       'Unit Converter — PrecisionCalc',
    description: 'Free online unit converter. Convert length, weight, temperature, data storage, speed, and area instantly. Supports metric and imperial units.'
  },

  template: () => `
    <div class="form-row single">
      <div class="field">
        <label for="unit-category">Convert Category</label>
        <select id="unit-category">
          <option value="length">📏 Length</option>
          <option value="mass">⚖️ Mass / Weight</option>
          <option value="temp">🌡️ Temperature</option>
          <option value="data">💾 Data Storage</option>
          <option value="speed">🚀 Speed</option>
          <option value="area">🗺️ Area</option>
        </select>
      </div>
    </div>
    <div class="unit-converter-layout">
      <div>
        <div class="field">
          <label for="unit-from-val">From</label>
          <input type="number" id="unit-from-val" placeholder="1" value="1" />
        </div>
        <div class="field" style="margin-top:8px;">
          <label for="unit-from-unit">Unit</label>
          <select id="unit-from-unit"></select>
        </div>
      </div>

      <button class="swap-btn" id="unit-swap-btn" title="Swap units" aria-label="Swap units">⇄</button>

      <div>
        <div class="field">
          <label for="unit-to-val">To</label>
          <input type="number" id="unit-to-val" placeholder="—" readonly style="cursor:default;background:rgba(124,110,255,0.06);font-family:var(--font-mono);" />
        </div>
        <div class="field" style="margin-top:8px;">
          <label for="unit-to-unit">Unit</label>
          <select id="unit-to-unit"></select>
        </div>
      </div>
    </div>
  `,

  mount(container) {
    const UNITS = {
      length: {
        units: ['Millimeter (mm)', 'Centimeter (cm)', 'Meter (m)', 'Kilometer (km)', 'Inch (in)', 'Foot (ft)', 'Yard (yd)', 'Mile (mi)', 'Nautical Mile (nmi)'],
        // All conversion factors: unit → meters
        toBase: [0.001, 0.01, 1, 1000, 0.0254, 0.3048, 0.9144, 1609.344, 1852],
      },
      mass: {
        units: ['Milligram (mg)', 'Gram (g)', 'Kilogram (kg)', 'Metric Ton (t)', 'Ounce (oz)', 'Pound (lb)', 'Stone (st)', 'US Ton (short ton)'],
        toBase: [0.000001, 0.001, 1, 1000, 0.028349523, 0.45359237, 6.35029318, 907.18474],
      },
      temp: {
        units: ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)'],
        // Special handling — not linear, handled separately
        toBase: null,
      },
      data: {
        units: ['Bit (b)', 'Byte (B)', 'Kilobyte (KB)', 'Megabyte (MB)', 'Gigabyte (GB)', 'Terabyte (TB)', 'Petabyte (PB)'],
        toBase: [0.125, 1, 1024, 1048576, 1073741824, 1099511627776, 1125899906842624],
      },
      speed: {
        units: ['m/s', 'km/h', 'mph', 'ft/s', 'Knot (kn)', 'Mach (at sea level)'],
        toBase: [1, 0.27778, 0.44704, 0.3048, 0.51444, 340.29],
      },
      area: {
        units: ['mm²', 'cm²', 'm²', 'km²', 'in²', 'ft²', 'yd²', 'Acre', 'Hectare', 'mi²'],
        toBase: [0.000001, 0.0001, 1, 1000000, 0.00064516, 0.09290304, 0.83612736, 4046.856, 10000, 2589988.11],
      }
    };

    const catSel   = container.querySelector('#unit-category');
    const fromVal  = container.querySelector('#unit-from-val');
    const toVal    = container.querySelector('#unit-to-val');
    const fromSel  = container.querySelector('#unit-from-unit');
    const toSel    = container.querySelector('#unit-to-unit');
    const swapBtn  = container.querySelector('#unit-swap-btn');
    const resultCard = container.querySelector('#result-card-unit');

    const populateUnits = (cat) => {
      const { units } = UNITS[cat];
      const opts = units.map((u, i) => `<option value="${i}">${u}</option>`).join('');
      fromSel.innerHTML = opts;
      toSel.innerHTML   = opts;
      // Default to sensible pairs
      const defaults = { length: [3,4], mass: [2,5], temp: [0,1], data: [4,5], speed: [1,2], area: [2,5] };
      fromSel.value = defaults[cat]?.[0] ?? 0;
      toSel.value   = defaults[cat]?.[1] ?? 1;
    };

    const convertTemp = (val, fromIdx, toIdx) => {
      // Convert to Celsius first
      let c;
      if (fromIdx === 0) c = val;
      else if (fromIdx === 1) c = (val - 32) * 5 / 9;
      else c = val - 273.15;
      // Celsius to target
      if (toIdx === 0) return c;
      if (toIdx === 1) return c * 9 / 5 + 32;
      return c + 273.15;
    };

    const doConvert = () => {
      const cat     = catSel.value;
      const val     = parseFloat(fromVal.value);
      const fromIdx = parseInt(fromSel.value);
      const toIdx   = parseInt(toSel.value);

      if (!isFinite(val)) { toVal.value = ''; return; }

      let result;
      if (cat === 'temp') {
        result = convertTemp(val, fromIdx, toIdx);
      } else {
        const { toBase } = UNITS[cat];
        const inBase = val * toBase[fromIdx];
        result = inBase / toBase[toIdx];
      }

      const formatted = Math.abs(result) < 0.0001 || Math.abs(result) > 1e12
        ? result.toExponential(6)
        : parseFloat(result.toPrecision(10)).toString();

      toVal.value = formatted;

      // Update inline result card
      const fromLabel = UNITS[cat].units[fromIdx];
      const toLabel   = UNITS[cat].units[toIdx];
      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Result</span>
            <span class="result-value large">
              ${formatted} <span style="font-size:0.9rem;color:var(--text-muted)">${toLabel.split(' ')[0]}</span>
              <button class="copy-btn" onclick="copyValue(this,'${formatted}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Formula</span>
            <span class="result-value" style="font-size:0.85rem;font-family:var(--font-mono);">
              ${val} ${fromLabel.split(' ')[0]} = ${formatted} ${toLabel.split(' ')[0]}
            </span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('unit');
    };

    // Swap
    swapBtn.addEventListener('click', () => {
      const tmp     = fromSel.value;
      fromSel.value = toSel.value;
      toSel.value   = tmp;
      doConvert();
    });

    // Bidirectional: typing in toVal updates fromVal
    toVal.removeAttribute('readonly');
    toVal.style.cursor = '';
    let lockDir = false;
    fromVal.addEventListener('input', () => { if (!lockDir) doConvert(); });
    toVal.addEventListener('input', () => {
      lockDir = true;
      // Reverse convert
      const cat = catSel.value;
      const val = parseFloat(toVal.value);
      const fromIdx = parseInt(fromSel.value);
      const toIdx   = parseInt(toSel.value);
      if (!isFinite(val)) { lockDir = false; return; }
      let result;
      if (cat === 'temp') {
        result = convertTemp(val, toIdx, fromIdx);
      } else {
        const { toBase } = UNITS[cat];
        const inBase = val * toBase[toIdx];
        result = inBase / toBase[fromIdx];
      }
      fromVal.value = parseFloat(result.toPrecision(10));
      lockDir = false;
    });

    catSel.addEventListener('change', () => { populateUnits(catSel.value); doConvert(); });
    fromSel.addEventListener('change', doConvert);
    toSel.addEventListener('change', doConvert);

    populateUnits('length');
    doConvert();
  },

  seoContent: `
    <p>Unit conversion is a fundamental skill across science, engineering, cooking, travel, and everyday life. Whether you're converting kilometers to miles for a road trip, kilograms to pounds for a recipe, or Celsius to Fahrenheit to understand the weather, having a fast, reliable converter saves time and prevents costly mistakes.</p>

    <h3>How Unit Conversion Works</h3>
    <div class="formula-block">
      Converted Value = Input Value × (From Unit Factor ÷ To Unit Factor)
    </div>
    <p>Every unit is expressed relative to a "base" unit. For length, the base is meters. To convert kilometers to miles: 5 km × 1000 (m/km) ÷ 1609.344 (m/mi) = 3.107 miles.</p>

    <h3>Temperature: The Special Case</h3>
    <p>Temperature conversion is not a simple multiplication — it requires both scaling and offsetting. Fahrenheit = (Celsius × 9/5) + 32. Kelvin = Celsius + 273.15. Kelvin is the SI base unit of temperature and the only scale with a true "absolute zero."</p>

    <h3>Data Storage Units</h3>
    <p>Digital data uses binary prefixes: 1 Kilobyte (KB) = 1,024 Bytes (not 1,000). This distinction matters — a 256 GB SSD in binary gigabytes is actually 256 × 1,073,741,824 = 274.9 billion bytes. This is why "real" storage capacity appears slightly less than advertised (which uses decimal prefixes).</p>

    <details>
      <summary>❓ What is the metric system?</summary>
      <p>The International System of Units (SI) uses base-10 prefixes (milli = ×0.001, centi = ×0.01, kilo = ×1,000, mega = ×1,000,000). It is the standard in 95% of the world. The United States is one of only three countries still primarily using imperial units.</p>
    </details>
    <details>
      <summary>❓ What is a nautical mile?</summary>
      <p>A nautical mile (1,852 meters) is defined as one minute of arc of latitude along a meridian of the Earth. It is used in maritime and air navigation worldwide. A "knot" is one nautical mile per hour.</p>
    </details>
  `
});
