/**
 * PrecisionCalc — Macro Calculator
 * Calculates daily protein, carb, and fat needs based on calories and goals.
 */
registerTool({
  id:       'macro',
  name:     'Macro Calculator',
  category: 'Health',
  icon:         '\ud83c\udf4e',
  materialIcon: 'restaurant',
  tagline:  'Calculate your daily protein, carb, and fat needs based on your goals.',
  keywords: ['macro', 'macronutrient', 'protein', 'carb', 'fat', 'calories', 'diet'],
  meta: {
    title:       'Macro Calculator — PrecisionCalc',
    description: 'Calculate your daily protein, carb, and fat needs based on your calorie target and fitness goal.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\">
        <label for=\"macro-calories\">Daily Calories</label>
        <input type=\"number\" id=\"macro-calories\" placeholder=\"2000\" min=\"0\" value=\"2000\" />
      </div>
      <div class=\"field\">
        <label for=\"macro-goal\">Goal</label>
        <select id=\"macro-goal\">
          <option value=\"balanced\">Balanced</option>
          <option value=\"weight-loss\">Weight Loss</option>
          <option value=\"muscle-gain\">Muscle Gain</option>
          <option value=\"keto\">Keto</option>
        </select>
      </div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      const calories = parseFloat(container.querySelector('#macro-calories').value) || 0;
      const goal = container.querySelector('#macro-goal').value;
      if (calories <= 0) return '';
      let proteinPct = 0.3, carbPct = 0.4, fatPct = 0.3;
      if (goal === 'weight-loss') { proteinPct = 0.35; carbPct = 0.35; fatPct = 0.3; }
      if (goal === 'muscle-gain') { proteinPct = 0.3; carbPct = 0.5; fatPct = 0.2; }
      if (goal === 'keto') { proteinPct = 0.2; carbPct = 0.05; fatPct = 0.75; }
      const protein = (calories * proteinPct) / 4;
      const carbs = (calories * carbPct) / 4;
      const fat = (calories * fatPct) / 9;
      return `
        <div class=\"result-card\" style=\"font-size:2rem;text-align:center;\">
          <div><b>Protein:</b> ${protein.toFixed(0)}g</div>
          <div><b>Carbs:</b> ${carbs.toFixed(0)}g</div>
          <div><b>Fat:</b> ${fat.toFixed(0)}g</div>
        </div>
      `;
    };
    container.innerHTML += `<div id=\"result-card-macro\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-macro').innerHTML = calc();
    });
    container.querySelector('#result-card-macro').innerHTML = calc();
  }
  ,
    seoContent: `
      <p>The Macro Calculator is a powerful tool for anyone interested in nutrition, fitness, or healthy eating. It helps you determine your daily needs for the three main macronutrients: protein, carbohydrates, and fat. By customizing your macro targets based on your calorie intake and fitness goals, you can optimize your diet for weight loss, muscle gain, or balanced health.</p>

      <h3>What Are Macronutrients?</h3>
      <ul>
        <li><strong>Protein:</strong> Essential for building and repairing muscle, supporting immune function, and keeping you full.</li>
        <li><strong>Carbohydrates:</strong> The body’s main energy source, fueling your brain, muscles, and daily activities.</li>
        <li><strong>Fat:</strong> Important for hormone production, cell health, and absorbing fat-soluble vitamins (A, D, E, K).</li>
      </ul>

      <h3>How the Calculator Works</h3>
      <ol>
        <li>Enter your daily calorie target (e.g., 2000 calories).</li>
        <li>Select your goal: Balanced, Weight Loss, Muscle Gain, or Keto.</li>
        <li>The calculator uses evidence-based macro ratios for each goal and converts calories into grams of protein, carbs, and fat.</li>
      </ol>

      <h3>Why Track Macros?</h3>
      <ul>
        <li><strong>Personalization:</strong> Tailor your diet to your body, activity level, and goals for better results.</li>
        <li><strong>Flexibility:</strong> Enjoy a variety of foods while staying on track with your nutrition plan.</li>
        <li><strong>Performance:</strong> Support muscle growth, fat loss, or athletic performance with the right macro balance.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>How do I know my calorie needs?</summary>
        <p>Use a TDEE calculator to estimate your daily calorie burn, then adjust based on your goal (deficit for weight loss, surplus for muscle gain).</p>
      </details>
      <details>
        <summary>Can I change the macro ratios?</summary>
        <p>Yes! These are standard starting points. You can adjust based on your preferences, dietary needs, or advice from a nutritionist.</p>
      </details>
      <details>
        <summary>What foods fit each macro?</summary>
        <p>Protein: meat, fish, eggs, dairy, legumes. Carbs: grains, fruits, vegetables. Fat: oils, nuts, seeds, avocado.</p>
      </details>

      <h3>Tips for Macro Success</h3>
      <ul>
        <li>Track your food intake with a nutrition app for accuracy.</li>
        <li>Plan meals ahead to hit your macro targets consistently.</li>
        <li>Focus on whole, nutrient-dense foods for best results.</li>
      </ul>

      <p>With the Macro Calculator, you can take control of your nutrition, reach your fitness goals, and build healthy habits for life. Start tracking your macros today!</p>
    `
});
