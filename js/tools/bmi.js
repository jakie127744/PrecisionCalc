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
    <p>Body Mass Index (BMI) is the most widely used screening tool for categorizing body weight status across adult populations. Developed by Belgian statistician Adolphe Quetelet in the 1830s, it was originally designed as a population-level statistical measure — not a diagnostic tool for individual health. Nevertheless, it remains the international standard used by physicians, researchers, and health organizations around the world to identify potential weight-related health risks.</p>

    <h3>The BMI Formula</h3>
    <div class="formula-block">BMI = weight (kg) ÷ height² (m²)</div>
    <p>In imperial units: <strong>BMI = 703 × weight (lbs) ÷ height² (inches²)</strong>. For example, a person who is 5'10" (70 inches) and weighs 165 lbs has a BMI of: 703 × 165 ÷ (70²) = 703 × 165 ÷ 4900 ≈ <strong>23.7</strong> — within the Normal range.</p>

    <h3>WHO BMI Categories for Adults</h3>
    <ul>
      <li><strong>Below 18.5 — Underweight:</strong> May indicate malnutrition, eating disorders, or underlying illness. Associated with bone density loss and immune suppression.</li>
      <li><strong>18.5–24.9 — Normal (Healthy) Weight:</strong> Associated with the lowest risk for weight-related conditions, including type 2 diabetes and cardiovascular disease.</li>
      <li><strong>25.0–29.9 — Overweight:</strong> Elevated risk for hypertension, dyslipidemia, sleep apnea, and insulin resistance.</li>
      <li><strong>30.0–34.9 — Obese Class I:</strong> High risk. Moderate interventions (diet, exercise, behavioral therapy) are typically recommended.</li>
      <li><strong>35.0–39.9 — Obese Class II:</strong> Very high risk. Medical supervision and potentially pharmaceutical intervention are often advised.</li>
      <li><strong>40.0+ — Obese Class III (Severe/Morbid Obesity):</strong> Extremely high risk. Bariatric surgery may be considered.</li>
    </ul>

    <h3>Limitations of BMI</h3>
    <p>BMI is a useful screening tool, but it has significant well-documented limitations:</p>
    <ul>
      <li><strong>Muscle Mass vs. Fat:</strong> BMI does not distinguish between fat and lean muscle tissue. A competitive bodybuilder may have a BMI of 30+ while having very low body fat. Conversely, a sedentary person with low muscle mass may have a "normal" BMI with high body fat.</li>
      <li><strong>Fat Distribution:</strong> BMI says nothing about where fat is stored. Visceral fat (around organs in the abdomen) is far more dangerous than subcutaneous fat stored under the skin. A person with a normal BMI but high waist circumference may be at greater metabolic risk than their BMI suggests.</li>
      <li><strong>Ethnic Variations:</strong> Research shows that people of Asian descent have higher health risks at lower BMI thresholds. Some health organizations recommend adjusted BMI cutoffs (e.g., overweight starting at 23.0, not 25.0) for Asian populations.</li>
      <li><strong>Age:</strong> Older adults naturally lose muscle mass and gain fat, so the same BMI number represents different body compositions at age 25 vs. age 70.</li>
      <li><strong>Sex:</strong> Women naturally carry more body fat than men at the same BMI due to hormonal differences and reproductive physiology.</li>
    </ul>

    <h3>Better Alternatives and Complementary Measures</h3>
    <p>For a more complete picture of health, consider these additional metrics:</p>
    <ul>
      <li><strong>Waist Circumference:</strong> A waist above 35 inches (women) or 40 inches (men) indicates elevated cardiovascular risk regardless of BMI.</li>
      <li><strong>Waist-to-Hip Ratio (WHR):</strong> A WHR above 0.9 (men) or 0.85 (women) signals increased metabolic risk.</li>
      <li><strong>Body Fat Percentage:</strong> Measured via DEXA scan, hydrostatic weighing, or bioelectrical impedance (BIA). Most accurate but less accessible than BMI.</li>
      <li><strong>Waist-to-Height Ratio:</strong> A simple rule of thumb: your waist should be less than half your height. This metric has shown strong predictive value for cardiometabolic risk.</li>
    </ul>

    <details>
      <summary>❓ Is BMI the same for men and women?</summary>
      <p>The WHO uses the same BMI cutoffs for both sexes. However, women naturally carry approximately 5–8% more body fat than men at the same BMI due to hormonal differences, pregnancy storage, and breast tissue. Some researchers advocate for sex-specific cutoffs, but international clinical guidelines continue to use the universal scale for simplicity and comparability.</p>
    </details>
    <details>
      <summary>❓ How accurate is BMI for children and teens?</summary>
      <p>For children ages 2–19, BMI is interpreted with age- and sex-specific percentile charts (CDC growth charts), not the adult WHO thresholds. "Healthy weight" for a child is defined as BMI in the 5th–85th percentile. The same BMI number means different things at age 8 vs. age 16, because bodies change dramatically during growth and puberty.</p>
    </details>
    <details>
      <summary>❓ What is a healthy BMI for my age?</summary>
      <p>For adults 20 and older, the standard WHO ranges apply regardless of age. However, some clinicians adjust informally — a BMI of 25–27 may be acceptable for adults over 65, as slightly higher weight is associated with better outcomes in older populations (a phenomenon sometimes called the "obesity paradox" in geriatrics).</p>
    </details>
    <details>
      <summary>❓ How can I lower my BMI?</summary>
      <p>BMI decreases when you reduce body weight and/or increase lean muscle mass. Sustainable strategies include: a modest caloric deficit (250–500 calories/day for 0.5–1 lb weight loss per week), strength training to preserve/build muscle during weight loss, increased cardiovascular activity, improved sleep quality (poor sleep increases hunger hormones), and working with a registered dietitian for personalized guidance.</p>
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
