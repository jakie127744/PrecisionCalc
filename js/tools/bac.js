/**
 * PrecisionCalc — BAC Calculator
 * Estimates Blood Alcohol Content (Widmark formula).
 */
registerTool({
  id:       'bac',
  name:     'BAC Calculator',
  category: 'Health',
  icon:         '\ud83c\udf77',
  materialIcon: 'local_bar',
  tagline:  'Estimate your Blood Alcohol Content (BAC) for safety.',
  keywords: ['bac', 'blood alcohol', 'alcohol', 'drunk', 'widmark', 'safety'],
  meta: {
    title:       'BAC Calculator — PrecisionCalc',
    description: 'Estimate your Blood Alcohol Content (BAC) using the Widmark formula.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"bac-weight\">Weight (lbs)</label><input type=\"number\" id=\"bac-weight\" value=\"160\" /></div>
      <div class=\"field\"><label for=\"bac-sex\">Sex</label><select id=\"bac-sex\"><option value=\"male\">Male</option><option value=\"female\">Female</option></select></div>
      <div class=\"field\"><label for=\"bac-drinks\">Drinks</label><input type=\"number\" id=\"bac-drinks\" value=\"3\" /></div>
      <div class=\"field\"><label for=\"bac-hours\">Hours Since First Drink</label><input type=\"number\" id=\"bac-hours\" value=\"2\" /></div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      const weight = parseFloat(container.querySelector('#bac-weight').value) || 0;
      const sex = container.querySelector('#bac-sex').value;
      const drinks = parseFloat(container.querySelector('#bac-drinks').value) || 0;
      const hours = parseFloat(container.querySelector('#bac-hours').value) || 0;
      if (weight <= 0 || drinks <= 0) return '';
      const r = sex === 'male' ? 0.68 : 0.55;
      const bac = ((drinks * 14) / (weight * r) * 100) - (0.015 * hours);
      return `<div class=\"result-card\" style=\"font-size:2rem;text-align:center;\"><b>BAC:</b> ${bac.toFixed(4)}</div>`;
    };
    container.innerHTML += `<div id=\"result-card-bac\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-bac').innerHTML = calc();
    });
    container.querySelector('#result-card-bac').innerHTML = calc();
  }
  ,
    seoContent: `
      <p>The Blood Alcohol Content (BAC) Calculator is a vital tool for anyone who wants to understand how alcohol consumption affects their body and legal status. BAC is a measure of the concentration of alcohol in your bloodstream, expressed as a percentage. For example, a BAC of 0.08% means there are 0.08 grams of alcohol per 100 milliliters of blood. Knowing your BAC can help you make safer decisions about driving, operating machinery, or engaging in activities that require alertness and coordination.</p>

      <h3>How BAC Is Calculated</h3>
      <p>This calculator uses the Widmark formula, which estimates BAC based on the number of standard drinks consumed, your body weight, biological sex, and the time elapsed since you started drinking. A standard drink in the U.S. contains about 14 grams of pure alcohol (roughly one 12 oz beer, 5 oz wine, or 1.5 oz shot of spirits). The formula also accounts for the body’s natural ability to metabolize alcohol over time, typically at a rate of about 0.015% BAC per hour.</p>

      <h3>Why BAC Matters</h3>
      <ul>
        <li><strong>Legal Limits:</strong> Most countries set a legal BAC limit for drivers (e.g., 0.08% in the U.S.). Exceeding this limit can result in fines, license suspension, or even jail time.</li>
        <li><strong>Impairment:</strong> Even at low BAC levels, alcohol can impair judgment, reaction time, and motor skills. Higher levels increase the risk of accidents and injuries.</li>
        <li><strong>Health Risks:</strong> High BAC can lead to alcohol poisoning, unconsciousness, or death. Chronic high BAC levels are linked to long-term health problems.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>How accurate is the BAC Calculator?</summary>
        <p>The calculator provides an estimate. Actual BAC can vary based on metabolism, food intake, medications, and individual differences. For legal or medical purposes, only a blood or breath test is definitive.</p>
      </details>
      <details>
        <summary>How long does it take to sober up?</summary>
        <p>The body metabolizes alcohol at about 0.015% BAC per hour. Drinking coffee, taking cold showers, or other tricks do not speed up this process. Only time lowers BAC.</p>
      </details>
      <details>
        <summary>What are the signs of dangerous BAC levels?</summary>
        <p>Confusion, vomiting, seizures, slow breathing, or unconsciousness are signs of alcohol poisoning. Seek medical help immediately if these occur.</p>
      </details>

      <h3>Tips for Responsible Drinking</h3>
      <ul>
        <li>Know your limits and pace yourself—one drink per hour is a safe guideline for most adults.</li>
        <li>Eat food while drinking to slow alcohol absorption.</li>
        <li>Never drive or operate machinery after drinking. Use a designated driver or rideshare service.</li>
        <li>Remember that factors like fatigue, illness, or medication can increase alcohol’s effects.</li>
      </ul>

      <p>This BAC Calculator is for informational purposes only. Always err on the side of caution and prioritize safety for yourself and others. If in doubt, don’t drive!</p>
    `
});
