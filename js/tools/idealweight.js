/**
 * PrecisionCalc — Ideal Weight Calculator
 * Calculates ideal body weight using Devine, Robinson, and Miller formulas.
 */
registerTool({
  id:       'idealweight',
  name:     'Ideal Weight',
  category: 'Health',
  icon:         '\ud83c\udfcb',
  materialIcon: 'monitor_weight',
  tagline:  'Calculate your ideal body weight using multiple formulas.',
  keywords: ['ideal weight', 'devine', 'robinson', 'miller', 'body weight', 'health'],
  meta: {
    title:       'Ideal Weight Calculator — PrecisionCalc',
    description: 'Calculate your ideal body weight using Devine, Robinson, and Miller formulas.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"iw-sex\">Sex</label><select id=\"iw-sex\"><option value=\"male\">Male</option><option value=\"female\">Female</option></select></div>
      <div class=\"field\"><label for=\"iw-height\">Height (cm)</label><input type=\"number\" id=\"iw-height\" value=\"170\" /></div>
    </div>
  `,

  mount(container) {
    const ids = ['iw-sex', 'iw-height'];
    const els = ids.map(id => container.querySelector(`#${id}`));
    const resultCard = container.querySelector('#result-card-idealweight');

    const calc = () => {
      const sex = els[0].value;
      const height = parseFloat(els[1].value) || 0;

      if (height <= 0) {
          resultCard.innerHTML = `<div class="result-placeholder">Enter your height to see results ✦</div>`;
          return;
      }

      // Devine
      const devine = sex === 'male' ? 50 + 0.9 * (height - 152.4) : 45.5 + 0.9 * (height - 152.4);
      // Robinson
      const robinson = sex === 'male' ? 52 + 0.748 * (height - 152.4) : 49 + 0.669 * (height - 152.4);
      // Miller
      const miller = sex === 'male' ? 56.2 + 0.56 * (height - 152.4) : 53.1 + 0.535 * (height - 152.4);

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Devine IBW</span>
            <span class="result-value">
                ${fmt.number(devine, 1)} kg
                <button class="copy-btn" onclick="copyValue(this,'${fmt.number(devine, 1)}')" title="Copy">📋</button>
            </span>
            <span class="result-sub">${fmt.number(devine * 2.20462, 1)} lbs</span>
          </div>
          <div class="result-item">
            <span class="result-label">Robinson IBW</span>
            <span class="result-value">${fmt.number(robinson, 1)} kg</span>
            <span class="result-sub">${fmt.number(robinson * 2.20462, 1)} lbs</span>
          </div>
          <div class="result-item">
            <span class="result-label">Miller IBW</span>
            <span class="result-value">${fmt.number(miller, 1)} kg</span>
            <span class="result-sub">${fmt.number(miller * 2.20462, 1)} lbs</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('idealweight');
    };

    els.forEach(el => el?.addEventListener('input', calc));
    calc();
  }
  ,
    seoContent: `
      <p>The Ideal Weight Calculator is a valuable tool for anyone interested in health, fitness, or medical guidance. It estimates your ideal body weight using three respected formulas: Devine, Robinson, and Miller. These formulas are widely used by healthcare professionals to suggest a healthy weight range based on your height and sex. Understanding your ideal weight can help you set realistic goals, monitor your health, and discuss your wellness plan with your doctor or nutritionist.</p>

      <h3>What Is Ideal Body Weight?</h3>
      <p>Ideal body weight (IBW) is an estimate of the healthiest weight for a person, based primarily on height and sex. It is not a strict target, but rather a guideline for optimal health, longevity, and reduced risk of chronic diseases. IBW is often used in clinical settings to calculate medication dosages, assess nutritional status, and guide weight management plans.</p>

      <h3>How the Calculator Works</h3>
      <ul>
        <li><strong>Devine Formula (1974):</strong> Originally developed to calculate drug dosages, it is still widely used for clinical purposes.</li>
        <li><strong>Robinson Formula (1983):</strong> Offers a slightly lower weight estimate, adjusting for modern populations.</li>
        <li><strong>Miller Formula (1983):</strong> Provides another perspective, with its own adjustment factors for height and sex.</li>
      </ul>
      <p>All three formulas use your height (in centimeters) and sex to estimate IBW in kilograms. The calculator displays all three results for comparison.</p>

      <h3>Why Know Your Ideal Weight?</h3>
      <ul>
        <li><strong>Health Monitoring:</strong> Staying near your ideal weight reduces the risk of heart disease, diabetes, and other chronic conditions.</li>
        <li><strong>Goal Setting:</strong> Use IBW as a reference point for weight loss or muscle gain goals.</li>
        <li><strong>Medical Guidance:</strong> Doctors use IBW to tailor treatments, nutrition plans, and medication dosages.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>Is ideal weight the same for everyone?</summary>
        <p>No. IBW is a guideline. Genetics, body composition, age, and activity level all influence your healthiest weight. Always consult a healthcare provider for personalized advice.</p>
      </details>
      <details>
        <summary>Can I be healthy above or below my ideal weight?</summary>
        <p>Yes. Many people are healthy outside the IBW range, especially athletes with high muscle mass. Focus on overall wellness, not just the scale.</p>
      </details>
      <details>
        <summary>How should I use these results?</summary>
        <p>Use IBW as a starting point for conversations with your doctor or nutritionist. Combine it with other measures like BMI, waist circumference, and body fat percentage for a complete picture of health.</p>
      </details>

      <h3>Tips for Healthy Weight Management</h3>
      <ul>
        <li>Set realistic, gradual goals for weight change—1–2 pounds (0.5–1 kg) per week is safe and sustainable.</li>
        <li>Combine healthy eating, regular physical activity, and behavioral strategies for best results.</li>
        <li>Track your progress and celebrate non-scale victories, like improved energy or fitness.</li>
      </ul>

      <p>The Ideal Weight Calculator empowers you to make informed decisions about your health. Use it as a guide, not a rule, and always prioritize your overall well-being!</p>
    `
});
