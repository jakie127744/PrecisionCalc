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
    <p>Unit conversion is an essential skill across science, engineering, cooking, travel, fitness, and everyday life. Whether you're converting kilometers to miles for a road trip abroad, kilograms to pounds for a recipe, or Celsius to Fahrenheit to understand a foreign weather report, having a fast, accurate, and multi-category converter prevents errors and saves time. This converter handles six distinct categories — length, mass, temperature, data storage, speed, and area — all in one unified interface.</p>

    <h3>How Unit Conversion Works</h3>
    <div class="formula-block">
      Result = Input × (From Unit Factor ÷ To Unit Factor)
    </div>
    <p>Each unit is expressed as a conversion factor relative to a shared base unit. For length, the base is <strong>meters</strong>. To convert 5 km to miles: 5 × 1,000 (m/km) ÷ 1,609.344 (m/mi) = <strong>3.107 miles</strong>. This same pattern works for mass (base: kg), speed (base: m/s), area (base: m²), and data (base: bytes).</p>

    <h3>Quick Conversion Reference</h3>
    <ul>
      <li><strong>Length:</strong> 1 mile = 1.609 km | 1 inch = 2.54 cm | 1 foot = 0.3048 m | 1 yard = 0.914 m</li>
      <li><strong>Mass:</strong> 1 lb = 0.4536 kg | 1 oz = 28.35 g | 1 stone = 6.35 kg | 1 metric ton = 2,205 lbs</li>
      <li><strong>Speed:</strong> 60 mph = 96.56 km/h | 1 m/s = 3.6 km/h | 1 knot = 1.852 km/h</li>
      <li><strong>Area:</strong> 1 acre = 4,047 m² | 1 hectare = 2.471 acres | 1 mi² = 640 acres</li>
    </ul>

    <h3>Temperature: The Special Case</h3>
    <p>Temperature conversion is unique — it requires both multiplication and offset because the three scales (Celsius, Fahrenheit, Kelvin) have different zero points:</p>
    <ul>
      <li><strong>°C to °F:</strong> (°C × 9/5) + 32 |  e.g., 100°C = 212°F (boiling water)</li>
      <li><strong>°F to °C:</strong> (°F − 32) × 5/9 | e.g., 72°F ≈ 22.2°C (room temperature)</li>
      <li><strong>°C to K:</strong> °C + 273.15 | e.g., 0°C = 273.15 K (freezing point)</li>
      <li><strong>Absolute Zero:</strong> 0 K = −273.15°C = −459.67°F — the lowest physically possible temperature.</li>
    </ul>
    <p>Kelvin is the SI base unit of temperature. It is used in scientific and engineering contexts (e.g., the Ideal Gas Law, blackbody radiation calculations) because it never goes negative, making mathematical relationships cleaner.</p>

    <h3>Data Storage: Binary vs. Decimal Prefixes</h3>
    <p>Digital data uses <strong>binary prefixes</strong>: 1 Kilobyte (KB) = 1,024 Bytes. This matters practically — hard drive and SSD manufacturers advertise storage using <em>decimal</em> prefixes (1 KB = 1,000 B), while operating systems display it in <em>binary</em>. A 1 TB hard drive marketed by the manufacturer contains 1,000,000,000,000 bytes, but your OS reports it as ~931 GiB. This is why "usable" storage always seems less than advertised — not a manufacturer trick, just a unit mismatch.</p>

    <h3>Metric vs. Imperial: A Brief History</h3>
    <p>The metric system was developed during the French Revolution in the 1790s to replace the chaotic tangle of local units used across Europe. By the late 20th century, it had been adopted by essentially every country in the world as the standard for science, trade, and everyday life — with three notable exceptions: the United States, Myanmar, and Liberia, which still primarily use customary/imperial units for everyday life. The US officially adopted the metric system as legal in 1866 and signed the Metre Convention in 1875, but consumer adoption has remained slow due to cultural inertia.</p>

    <h3>Speed Units in Context</h3>
    <ul>
      <li><strong>mph (miles per hour):</strong> Standard in the US and UK for road speeds.</li>
      <li><strong>km/h (kilometers per hour):</strong> Standard in most of the world for road speeds.</li>
      <li><strong>Knots (nautical miles/hr):</strong> Used in aviation and maritime navigation worldwide.</li>
      <li><strong>Mach:</strong> Ratio of speed to the local speed of sound (~340.29 m/s at sea level). Mach 1 ≈ 767 mph. Used for aircraft and projectiles.</li>
      <li><strong>m/s:</strong> The SI base unit for speed, used in physics and engineering.</li>
    </ul>

    <details>
      <summary>❓ What is the metric system?</summary>
      <p>The International System of Units (SI) uses base-10 prefixes for straightforward scaling: milli (×0.001), centi (×0.01), kilo (×1,000), mega (×1,000,000), giga (×1,000,000,000). It is the official measurement system for 194 countries and all scientific disciplines. The US uses metric exclusively in science, medicine, the military, and international trade.</p>
    </details>
    <details>
      <summary>❓ What is a nautical mile?</summary>
      <p>A nautical mile (1,852 meters) is defined as one minute (1/60 of a degree) of arc of latitude along any meridian. Since the Earth's circumference is divided into 360 degrees of latitude × 60 minutes each = 21,600 nautical miles, this gives navigators a direct relationship between angle and distance on the globe. A "knot" is one nautical mile per hour.</p>
    </details>
    <details>
      <summary>❓ Why does 1 km not equal exactly 0.6 miles?</summary>
      <p>One kilometer = exactly 0.621371192 miles. The conversion is not a round number because the mile was defined historically (1 mile = 5,280 feet; 1 foot = 0.3048 meters exactly) without any intention to align with the metric system. The conversion factor is irrational relative to the metric base units.</p>
    </details>
    <details>
      <summary>❓ How many square feet are in an acre?</summary>
      <p>Exactly 43,560 square feet (or 4,840 sq yd, or 4,047 m²). An acre was historically defined as the amount of land a yoke of oxen could plow in one day. A "square acre" would be approximately 208.7 ft × 208.7 ft. A US football field (including end zones) is about 1.32 acres.</p>
    </details>
    <details>
      <summary>❓ What's the difference between a US ton and a metric ton?</summary>
      <p>A US short ton = 2,000 lbs (907.2 kg). A metric ton (tonne) = 1,000 kg = 2,204.6 lbs. A British long ton = 2,240 lbs (1,016 kg). When purchasing materials in bulk or interpreting shipping weights, it's important to confirm which "ton" is meant — the difference can be 10% or more.</p>
    </details>
  `
});
