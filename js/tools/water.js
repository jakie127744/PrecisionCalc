/**
 * PrecisionCalc — Water Intake Calculator
 */
registerTool({
  id:       'water',
  name:     'Water Intake',
  category: 'Health',
  icon:         '💧',
  materialIcon: 'water_drop',
  tagline:  'Find your personalized daily water intake recommendation.',
  keywords: ['water intake', 'hydration', 'daily water', 'how much water to drink', 'water calculator'],
  meta: {
    title:       'Daily Water Intake Calculator — PrecisionCalc',
    description: 'Calculate how much water you should drink per day based on your weight, activity level, and climate. Get results in ounces and liters.'
  },

  template: () => `
    <div class="toggle-row">
      <span>Units:</span>
      <div class="toggle-btn">
        <button id="water-lbs-btn" class="active" onclick="waterSetUnit('lbs')">lbs</button>
        <button id="water-kg-btn" onclick="waterSetUnit('kg')">kg</button>
      </div>
    </div>
    <div class="form-row">
      <div class="field">
        <label for="water-weight">Body Weight</label>
        <input type="number" id="water-weight" placeholder="165" min="0" value="165" />
      </div>
      <div class="field">
        <label for="water-activity">Activity Level</label>
        <select id="water-activity">
          <option value="1.0">Sedentary</option>
          <option value="1.1" selected>Lightly Active</option>
          <option value="1.2">Moderately Active</option>
          <option value="1.35">Very Active</option>
          <option value="1.5">Athlete</option>
        </select>
      </div>
    </div>
    <div class="form-row single">
      <div class="field">
        <label for="water-climate">Climate</label>
        <select id="water-climate">
          <option value="1.0" selected>Temperate (normal)</option>
          <option value="1.1">Hot / Humid</option>
          <option value="0.9">Cold / Low humidity</option>
        </select>
      </div>
    </div>
  `,

  mount(container) {
    window.waterUnit = 'lbs';
    window.waterSetUnit = (unit) => {
      window.waterUnit = unit;
      container.querySelector('#water-lbs-btn').classList.toggle('active', unit === 'lbs');
      container.querySelector('#water-kg-btn').classList.toggle('active',  unit === 'kg');
      container.querySelector('#water-weight').placeholder = unit === 'lbs' ? '165' : '75';
      waterCalc();
    };

    const resultCard = container.querySelector('#result-card-water');

    const waterCalc = () => {
      let weightLbs = parseFloat(container.querySelector('#water-weight')?.value) || 0;
      if (window.waterUnit === 'kg') weightLbs = weightLbs * 2.20462;

      const actMult     = parseFloat(container.querySelector('#water-activity')?.value)  || 1.1;
      const climateMult = parseFloat(container.querySelector('#water-climate')?.value)   || 1.0;

      // Base: ~0.5 oz per lb of body weight (Mayo Clinic guideline)
      const baseOz = weightLbs * 0.5;
      const totalOz = baseOz * actMult * climateMult;
      const totalL  = totalOz * 0.0295735;
      const cups    = totalOz / 8;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Daily Water Intake</span>
            <span class="result-value large">
              ${fmt.number(totalL, 1)} <span style="font-size:1rem;color:var(--text-muted)">L/day</span>
              <button class="copy-btn" onclick="copyValue(this,'${fmt.number(totalL,1)} L')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">In Ounces</span>
            <span class="result-value">${Math.round(totalOz)} oz/day</span>
          </div>
          <div class="result-item">
            <span class="result-label">8oz Cups</span>
            <span class="result-value">${Math.round(cups)} cups/day</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('water');
    };

    window.waterCalc = waterCalc;
    container.querySelectorAll('input, select').forEach(el => el.addEventListener('input', waterCalc));
    waterCalc();
  },

  seoContent: `
    <p>Staying properly hydrated is one of the simplest and most impactful things you can do for your health. Water regulates body temperature, lubricates joints, flushes waste, and delivers nutrients to cells. Yet most people are in a chronic state of mild dehydration.</p>

    <h3>The Hydration Formula</h3>
    <div class="formula-block">Daily Water (oz) = Body Weight (lbs) × 0.5 × Activity Multiplier × Climate Factor</div>
    <p>The Mayo Clinic recommends approximately 3.7 liters (125 oz) per day for men and 2.7 liters (91 oz) for women from all sources — including food, which contributes about 20% of daily intake. This calculator focuses on drinking water needs.</p>

    <h3>Signs of Dehydration</h3>
    <p>Mild dehydration (1–2% of body weight) can impair cognitive performance, mood, and physical endurance. Common signs include dark yellow urine, fatigue, headaches, and reduced concentration. The goal is pale yellow urine throughout the day.</p>

    <details>
      <summary>❓ Does coffee or tea count toward water intake?</summary>
      <p>Yes — contrary to popular belief, caffeinated beverages like coffee and tea do count toward your daily fluid intake. While caffeine has mild diuretic effects, the net fluid contribution is still positive. However, plain water remains the best source.</p>
    </details>
    <details>
      <summary>❓ Can you drink too much water?</summary>
      <p>Yes. Hyponatremia (water intoxication) occurs when excessive water consumption dilutes sodium levels in the blood. This is rare in normal circumstances but a real risk for endurance athletes who drink large volumes without electrolyte replacement.</p>
    </details>
  `
});
