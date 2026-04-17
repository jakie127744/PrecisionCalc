/**
 * PrecisionCalc — BMI Calculator
 * Formula: BMI = kg / m²
 * WHO Categories verified.
 */
registerTool({
  id:       'bmi',
  name:     'BMI Calculator',
  category: 'Health',
  icon:         '⚖️',
  materialIcon: 'monitor_weight',
  tagline:  'Calculate your Body Mass Index (BMI) and see your healthy weight range.',
  keywords: ['bmi', 'body mass index', 'weight', 'height', 'healthy weight', 'obesity', 'underweight'],
  meta: {
    title:       'BMI Calculator — PrecisionCalc',
    description: 'Calculate your Body Mass Index (BMI) instantly. Supports imperial and metric. See WHO category and healthy weight range for your height.'
  },

  template: () => `
    <div class="toggle-row">
      <span>Unit System:</span>
      <div class="toggle-btn" id="bmi-unit-toggle">
        <button id="bmi-imperial" class="active" onclick="bmiSetUnit('imperial')">Imperial (lbs/in)</button>
        <button id="bmi-metric"   onclick="bmiSetUnit('metric')">Metric (kg/cm)</button>
      </div>
    </div>

    <div id="bmi-imperial-fields">
      <div class="form-row">
        <div class="field">
          <label for="bmi-weight-lbs">Weight (lbs)</label>
          <input type="number" id="bmi-weight-lbs" placeholder="165" min="0" value="165" />
        </div>
        <div class="field">
          <label>Height</label>
          <div style="display:flex;gap:8px;">
            <input type="number" id="bmi-feet" placeholder="5" min="0" max="9" value="5" style="flex:1" aria-label="Feet"/>
            <input type="number" id="bmi-inches" placeholder="10" min="0" max="11" value="10" style="flex:1" aria-label="Inches"/>
          </div>
          <span style="font-size:0.72rem;color:var(--text-muted)">ft &nbsp;&nbsp;&nbsp; in</span>
        </div>
      </div>
    </div>

    <div id="bmi-metric-fields" style="display:none">
      <div class="form-row">
        <div class="field">
          <label for="bmi-weight-kg">Weight (kg)</label>
          <input type="number" id="bmi-weight-kg" placeholder="75" min="0" value="75" />
        </div>
        <div class="field">
          <label for="bmi-height-cm">Height (cm)</label>
          <input type="number" id="bmi-height-cm" placeholder="178" min="0" value="178" />
        </div>
      </div>
    </div>
  `,

  mount(container) {
    window.bmiUnit = 'imperial';

    window.bmiSetUnit = (unit) => {
      window.bmiUnit = unit;
      container.querySelector('#bmi-imperial-fields').style.display = unit === 'imperial' ? '' : 'none';
      container.querySelector('#bmi-metric-fields').style.display   = unit === 'metric'   ? '' : 'none';
      container.querySelector('#bmi-imperial').classList.toggle('active', unit === 'imperial');
      container.querySelector('#bmi-metric').classList.toggle('active',   unit === 'metric');
      bmiCalc();
    };

    const resultCard = container.querySelector('#result-card-bmi');

    const bmiCalc = () => {
      let weightKg, heightM;

      if (window.bmiUnit === 'imperial') {
        const lbs    = parseFloat(container.querySelector('#bmi-weight-lbs')?.value) || 0;
        const ft     = parseFloat(container.querySelector('#bmi-feet')?.value)        || 0;
        const inches = parseFloat(container.querySelector('#bmi-inches')?.value)      || 0;
        weightKg     = lbs * 0.453592;
        heightM      = (ft * 12 + inches) * 0.0254;
      } else {
        weightKg     = parseFloat(container.querySelector('#bmi-weight-kg')?.value)   || 0;
        heightM      = (parseFloat(container.querySelector('#bmi-height-cm')?.value)  || 0) / 100;
      }

      if (weightKg <= 0 || heightM <= 0) {
        resultCard.innerHTML = `<div class="result-placeholder">Enter your weight and height.</div>`;
        return;
      }

      const bmi = weightKg / (heightM * heightM);
      const { cat, badge, minW, maxW } = bmiCategory(bmi, heightM);

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Your BMI</span>
            <span class="result-value large">
              ${fmt.number(bmi, 1)}
              <button class="copy-btn" onclick="copyValue(this,'${fmt.number(bmi,1)}')" title="Copy">📋</button>
            </span>
            <span class="result-sub"><span class="badge badge-${badge}">${cat}</span></span>
          </div>
          <div class="result-item">
            <span class="result-label">Healthy Weight Range</span>
            <span class="result-value" style="font-size:1rem;">
              ${fmt.number(minW, 1)}–${fmt.number(maxW, 1)} ${window.bmiUnit === 'imperial' ? 'lbs' : 'kg'}
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Weight Status</span>
            <span class="result-value" style="font-size:1rem;">${bmi < 18.5 ? '📉 Underweight' : bmi < 25 ? '✅ Normal' : bmi < 30 ? '📈 Overweight' : '⚠️ Obese'}</span>
          </div>
        </div>
        <div style="margin-top:20px;">
          ${bmiBar(bmi)}
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('bmi');
      recordCalculation('bmi', 'Body Mass Index', fmt.number(bmi, 1));
    };

    window.bmiCalc = bmiCalc;
    container.querySelectorAll('input').forEach(el => el.addEventListener('input', bmiCalc));
    bmiCalc();
  },

  seoContent: `
    <p>Body Mass Index (BMI) is a simple screening tool used by healthcare professionals to estimate whether a person has a healthy body weight relative to their height. It was developed by Belgian statistician Adolphe Quetelet in the 1830s and remains the most widely used weight classification tool worldwide.</p>

    <h3>The BMI Formula</h3>
    <div class="formula-block">BMI = weight (kg) ÷ height² (m²)</div>
    <p>In imperial units: BMI = 703 × weight (lbs) ÷ height² (in²).</p>

    <h3>WHO BMI Categories</h3>
    <p><strong>Underweight:</strong> BMI below 18.5 — may indicate malnutrition or eating disorders. <strong>Normal weight:</strong> 18.5–24.9 — associated with lowest health risks. <strong>Overweight:</strong> 25–29.9 — increased risk for certain conditions. <strong>Obese (Class I):</strong> 30–34.9. <strong>Obese (Class II):</strong> 35–39.9. <strong>Obese (Class III):</strong> 40 and above.</p>

    <h3>BMI Limitations</h3>
    <p>BMI does not distinguish between muscle and fat mass. A muscular athlete may have a high BMI while having very low body fat — and vice versa. For a more complete picture, consider waist-to-hip ratio, body fat percentage (measured via DEXA scan or bioelectrical impedance), and visceral fat assessment.</p>

    <details>
      <summary>❓ Is BMI the same for men and women?</summary>
      <p>The same BMI thresholds apply to both sexes in standard WHO guidelines, though women naturally carry more body fat than men at the same BMI. Some researchers argue for sex-specific cutoffs, but international clinical practice still uses the universal WHO scale.</p>
    </details>
    <details>
      <summary>❓ How accurate is BMI for children?</summary>
      <p>For children and teens (ages 2–19), BMI is interpreted using age- and sex-specific percentile charts from the CDC, not the adult WHO cutoffs. "Healthy weight" for children is defined as BMI in the 5th–85th percentile for their age group.</p>
    </details>
  `
});

/* ─── BMI Helpers ─────────────────────────────────────────── */
function bmiCategory(bmi, heightM) {
  const minKg = 18.5 * heightM * heightM;
  const maxKg = 24.9 * heightM * heightM;
  const imperial = window.bmiUnit === 'imperial';
  const conv = imperial ? 2.20462 : 1;

  let cat, badge;
  if      (bmi < 18.5) { cat = 'Underweight'; badge = 'warning'; }
  else if (bmi < 25)   { cat = 'Normal';       badge = 'success'; }
  else if (bmi < 30)   { cat = 'Overweight';   badge = 'warning'; }
  else                 { cat = 'Obese';         badge = 'danger';  }

  return { cat, badge, minW: minKg * conv, maxW: maxKg * conv };
}

function bmiBar(bmi) {
  const clamped = Math.min(Math.max(bmi, 10), 45);
  const pct = ((clamped - 10) / 35) * 100;
  return `
    <div style="position:relative;margin-top:4px;">
      <div style="height:10px;border-radius:5px;background:linear-gradient(90deg,#60a5fa 0%,#34d399 28%,#fbbf24 56%,#f87171 80%,#991b1b 100%);overflow:hidden;">
        <div style="position:absolute;left:${pct}%;top:-4px;transform:translateX(-50%);width:18px;height:18px;border-radius:50%;background:var(--accent);border:2px solid #fff;box-shadow:0 0 8px var(--accent-glow);"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:0.68rem;color:var(--text-muted);">
        <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
      </div>
    </div>`;
}
