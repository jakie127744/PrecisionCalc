/**
 * PrecisionCalc — Body Fat Calculator (Navy Method)
 * Estimates body fat percentage using circumference measurements.
 */
registerTool({
  id:       'bodyfat',
  name:     'Body Fat % (Navy)',
  category: 'Health',
  icon:         '\ud83d\udcaa',
  materialIcon: 'fitness_center',
  tagline:  'Estimate your body fat percentage using the Navy Method.',
  keywords: ['body fat', 'navy method', 'circumference', 'waist', 'neck', 'hip', 'body composition'],
  meta: {
    title:       'Body Fat Calculator — PrecisionCalc',
    description: 'Estimate your body fat percentage using the Navy Method (waist, neck, height, hip for women).'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\">
        <label for=\"bf-sex\">Sex</label>
        <select id=\"bf-sex\">
          <option value=\"male\">Male</option>
          <option value=\"female\">Female</option>
        </select>
      </div>
      <div class=\"field\">
        <label for=\"bf-height\">Height (cm)</label>
        <input type=\"number\" id=\"bf-height\" placeholder=\"175\" min=\"0\" value=\"175\" />
      </div>
      <div class=\"field\">
        <label for=\"bf-neck\">Neck (cm)</label>
        <input type=\"number\" id=\"bf-neck\" placeholder=\"40\" min=\"0\" value=\"40\" />
      </div>
      <div class=\"field\">
        <label for=\"bf-waist\">Waist (cm)</label>
        <input type=\"number\" id=\"bf-waist\" placeholder=\"80\" min=\"0\" value=\"80\" />
      </div>
      <div class=\"field\" id=\"bf-hip-field\" style=\"display:none;\">
        <label for=\"bf-hip\">Hip (cm, women only)</label>
        <input type=\"number\" id=\"bf-hip\" placeholder=\"95\" min=\"0\" value=\"95\" />
      </div>
    </div>
  `,

  mount(container) {
    const sexEl = container.querySelector('#bf-sex');
    const hipField = container.querySelector('#bf-hip-field');
    sexEl.addEventListener('change', () => {
      hipField.style.display = sexEl.value === 'female' ? '' : 'none';
    });
    const calc = () => {
      const sex = sexEl.value;
      const height = parseFloat(container.querySelector('#bf-height').value) || 0;
      const neck = parseFloat(container.querySelector('#bf-neck').value) || 0;
      const waist = parseFloat(container.querySelector('#bf-waist').value) || 0;
      const hip = parseFloat(container.querySelector('#bf-hip').value) || 0;
      if (height <= 0 || neck <= 0 || waist <= 0 || (sex === 'female' && hip <= 0)) return '';
      let bf = 0;
      if (sex === 'male') {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      } else {
        bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
      }
      return `
        <div class=\"result-card\" style=\"font-size:2rem;text-align:center;\">
          <div><b>Body Fat %:</b> ${bf.toFixed(2)}%</div>
        </div>
      `;
    };
    container.innerHTML += `<div id=\"result-card-bodyfat\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-bodyfat').innerHTML = calc();
    });
    container.querySelector('#result-card-bodyfat').innerHTML = calc();
  }
  ,
    seoContent: `
      <p>The Body Fat Calculator (Navy Method) is a practical tool for estimating your body fat percentage using simple circumference measurements. Body fat percentage is a key indicator of health, fitness, and body composition, providing more insight than weight or BMI alone. This calculator is especially useful for those tracking fitness progress, setting health goals, or monitoring changes over time.</p>

      <h3>What Is Body Fat Percentage?</h3>
      <p>Body fat percentage is the proportion of your body made up of fat tissue, as opposed to muscle, bone, and other components. Healthy ranges vary by age and sex, but generally, men should aim for 10–20% and women for 18–28%. Athletes often have lower percentages, while higher values may indicate increased health risks.</p>

      <h3>How the Navy Method Works</h3>
      <p>The Navy Method estimates body fat using measurements of the neck, waist, and height for men, and neck, waist, hip, and height for women. The formulas were developed by the U.S. Navy for quick, non-invasive assessments. While not as precise as DEXA scans or hydrostatic weighing, the Navy Method is accurate enough for most practical purposes and requires only a tape measure.</p>

      <h3>Why Track Body Fat?</h3>
      <ul>
        <li><strong>Health Assessment:</strong> High body fat is linked to increased risk of heart disease, diabetes, and other conditions.</li>
        <li><strong>Fitness Progress:</strong> Muscle gain and fat loss can offset each other on the scale. Body fat percentage reveals true changes in composition.</li>
        <li><strong>Goal Setting:</strong> Athletes and those on weight loss journeys use body fat percentage to set and track realistic goals.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>How accurate is the Navy Method?</summary>
        <p>It’s generally accurate within 3–4% for most people. For clinical accuracy, use DEXA, BodPod, or hydrostatic weighing, but these are less accessible and more expensive.</p>
      </details>
      <details>
        <summary>How often should I measure body fat?</summary>
        <p>Monthly measurements are ideal for tracking trends. Daily or weekly changes are often due to water retention or measurement error.</p>
      </details>
      <details>
        <summary>What’s the difference between body fat and BMI?</summary>
        <p>BMI is a general indicator based on height and weight, but it can’t distinguish between muscle and fat. Body fat percentage gives a clearer picture of health and fitness.</p>
      </details>

      <h3>Tips for Accurate Measurement</h3>
      <ul>
        <li>Measure at the same time of day, ideally in the morning before eating or exercising.</li>
        <li>Use a flexible tape measure and record the average of three measurements for each site.</li>
        <li>Track your results over time to see real progress, not just day-to-day fluctuations.</li>
      </ul>

      <p>Use the Body Fat Calculator to take control of your health and fitness journey. Understanding your body composition is the first step toward achieving your goals!</p>
    `
});
