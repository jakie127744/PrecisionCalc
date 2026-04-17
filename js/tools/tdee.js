/**
 * PrecisionCalc — TDEE Calculator
 * Formula: Mifflin-St Jeor BMR × Activity Multiplier
 */
registerTool({
  id:       'tdee',
  name:     'TDEE Calculator',
  category: 'Health',
  icon:         '🔥',
  materialIcon: 'local_fire_department',
  tagline:  'Find your Total Daily Energy Expenditure and calorie targets for weight goals.',
  keywords: ['tdee', 'calories', 'bmr', 'basal metabolic rate', 'weight loss', 'calorie deficit', 'energy expenditure', 'diet'],
  meta: {
    title:       'TDEE Calculator — PrecisionCalc',
    description: 'Calculate your Total Daily Energy Expenditure (TDEE) and BMR using the Mifflin-St Jeor equation. Get calorie targets for weight loss, maintenance, and muscle gain.'
  },

  template: () => `
    <div class="toggle-row">
      <span>Units:</span>
      <div class="toggle-btn">
        <button id="tdee-imperial" class="active" onclick="tdeeSetUnit('imperial')">Imperial</button>
        <button id="tdee-metric" onclick="tdeeSetUnit('metric')">Metric</button>
      </div>
    </div>
    <div class="form-row">
      <div class="field">
        <label for="tdee-age">Age (years)</label>
        <input type="number" id="tdee-age" placeholder="30" min="15" max="100" value="30" />
      </div>
      <div class="field">
        <label for="tdee-sex">Biological Sex</label>
        <select id="tdee-sex">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
    <div class="form-row" id="tdee-imperial-fields">
      <div class="field">
        <label for="tdee-weight-lbs">Weight (lbs)</label>
        <input type="number" id="tdee-weight-lbs" placeholder="175" min="0" value="175" />
      </div>
      <div class="field">
        <label>Height</label>
        <div style="display:flex;gap:8px;">
          <input type="number" id="tdee-feet" placeholder="5" min="0" max="9" value="5" aria-label="Feet" style="flex:1"/>
          <input type="number" id="tdee-in" placeholder="10" min="0" max="11" value="10" aria-label="Inches" style="flex:1"/>
        </div>
        <span style="font-size:0.72rem;color:var(--text-muted)">ft &nbsp;&nbsp;&nbsp; in</span>
      </div>
    </div>
    <div class="form-row" id="tdee-metric-fields" style="display:none">
      <div class="field">
        <label for="tdee-weight-kg">Weight (kg)</label>
        <input type="number" id="tdee-weight-kg" placeholder="80" min="0" value="80" />
      </div>
      <div class="field">
        <label for="tdee-height-cm">Height (cm)</label>
        <input type="number" id="tdee-height-cm" placeholder="178" min="0" value="178" />
      </div>
    </div>
    <div class="form-row single">
      <div class="field">
        <label for="tdee-activity">Activity Level</label>
        <select id="tdee-activity">
          <option value="1.2">Sedentary (desk job, little/no exercise)</option>
          <option value="1.375">Lightly Active (light exercise 1–3 days/wk)</option>
          <option value="1.55" selected>Moderately Active (moderate exercise 3–5 days/wk)</option>
          <option value="1.725">Very Active (hard exercise 6–7 days/wk)</option>
          <option value="1.9">Extra Active (athlete, physical job + daily training)</option>
        </select>
      </div>
    </div>
  `,

  mount(container) {
    window.tdeeUnit = 'imperial';

    window.tdeeSetUnit = (unit) => {
      window.tdeeUnit = unit;
      container.querySelector('#tdee-imperial-fields').style.display = unit === 'imperial' ? '' : 'none';
      container.querySelector('#tdee-metric-fields').style.display   = unit === 'metric'   ? '' : 'none';
      container.querySelector('#tdee-imperial').classList.toggle('active', unit === 'imperial');
      container.querySelector('#tdee-metric').classList.toggle('active',   unit === 'metric');
      tdeeCalc();
    };

    const resultCard = container.querySelector('#result-card-tdee');

    const tdeeCalc = () => {
      const age    = parseFloat(container.querySelector('#tdee-age')?.value)       || 0;
      const sex    = container.querySelector('#tdee-sex')?.value;
      const mult   = parseFloat(container.querySelector('#tdee-activity')?.value)  || 1.55;

      let weightKg, heightCm;
      if (window.tdeeUnit === 'imperial') {
        const lbs = parseFloat(container.querySelector('#tdee-weight-lbs')?.value) || 0;
        const ft  = parseFloat(container.querySelector('#tdee-feet')?.value)        || 0;
        const ins = parseFloat(container.querySelector('#tdee-in')?.value)          || 0;
        weightKg  = lbs * 0.453592;
        heightCm  = (ft * 12 + ins) * 2.54;
      } else {
        weightKg  = parseFloat(container.querySelector('#tdee-weight-kg')?.value)  || 0;
        heightCm  = parseFloat(container.querySelector('#tdee-height-cm')?.value)  || 0;
      }

      if (weightKg <= 0 || heightCm <= 0 || age <= 0) {
        resultCard.innerHTML = `<div class="result-placeholder">Enter your details above.</div>`;
        return;
      }

      // Mifflin-St Jeor
      let bmr;
      if (sex === 'male') {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
      } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
      }

      const tdee     = bmr * mult;
      const cut      = tdee - 500;
      const mildCut  = tdee - 250;
      const bulk     = tdee + 300;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">TDEE (Maintenance)</span>
            <span class="result-value large">
              ${Math.round(tdee)} <span style="font-size:1rem;color:var(--text-muted)">cal/day</span>
              <button class="copy-btn" onclick="copyValue(this,'${Math.round(tdee)} cal/day')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">BMR (Base Rate)</span>
            <span class="result-value">${Math.round(bmr)} cal/day</span>
            <span class="result-sub">Calories at complete rest</span>
          </div>
          <div class="result-item">
            <span class="result-label">Weight Loss (−500 cal)</span>
            <span class="result-value">${Math.round(cut)} cal/day</span>
            <span class="result-sub">~1 lb/week loss</span>
          </div>
          <div class="result-item">
            <span class="result-label">Mild Deficit (−250 cal)</span>
            <span class="result-value">${Math.round(mildCut)} cal/day</span>
            <span class="result-sub">~0.5 lb/week loss</span>
          </div>
          <div class="result-item">
            <span class="result-label">Muscle Gain (+300 cal)</span>
            <span class="result-value">${Math.round(bulk)} cal/day</span>
            <span class="result-sub">Lean bulk target</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('tdee');
    };

    window.tdeeCalc = tdeeCalc;
    container.querySelectorAll('input, select').forEach(el => el.addEventListener('input', tdeeCalc));
    tdeeCalc();
  },

  seoContent: `
    <p>Total Daily Energy Expenditure (TDEE) represents the total number of calories your body burns in a 24-hour period, including your basal metabolic rate (BMR) plus all physical activity. Knowing your TDEE is the single most important number for any diet or fitness goal.</p>

    <h3>The Mifflin-St Jeor Formula (Most Accurate)</h3>
    <div class="formula-block">
      Male BMR   = 10×weight(kg) + 6.25×height(cm) − 5×age + 5
      Female BMR = 10×weight(kg) + 6.25×height(cm) − 5×age − 161
      TDEE = BMR × Activity Multiplier
    </div>
    <p>The Mifflin-St Jeor equation (1990) is considered the most accurate for the general population, outperforming the older Harris-Benedict equation in clinical studies.</p>

    <h3>Activity Multipliers Explained</h3>
    <p>Sedentary (1.2): Office job, minimal movement. Lightly active (1.375): Walking, light gym 1–3 days/week. Moderately active (1.55): Consistent gym 3–5 days/week. Very active (1.725): Daily intense training or physical labor. Extra active (1.9): Athletes training twice daily or extremely demanding physical jobs.</p>

    <h3>Creating a Calorie Deficit</h3>
    <p>One pound of fat contains approximately 3,500 calories. A deficit of 500 calories per day creates a 3,500-calorie/week deficit — theoretically resulting in 1 lb of fat loss per week. In practice, metabolic adaptation means the actual result is slightly less, but this remains the gold-standard guideline used by dietitians worldwide.</p>

    <details>
      <summary>❓ How accurate is TDEE?</summary>
      <p>TDEE calculators provide estimates with a margin of error of around 10–15%. Your actual TDEE can vary based on non-exercise activity thermogenesis (NEAT), hormonal status, gut biome, and metabolic adaptation. The best approach is to track calories and weight for 2–4 weeks and adjust accordingly.</p>
    </details>
    <details>
      <summary>❓ Should I eat back exercise calories?</summary>
      <p>If you've used an accurate activity multiplier (e.g., "Very Active"), your workout calories are already built into your TDEE. Only add extra calories back if you significantly underestimated your activity level.</p>
    </details>
  `
});
