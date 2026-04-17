/**
 * PrecisionCalc — Pythagorean Theorem Solver
 * Solves a² + b² = c² and visualizes the triangle.
 */
registerTool({
    seoContent: `
      <h2>Pythagorean Theorem Calculator</h2>
      <p>The Pythagorean Theorem Calculator is a must-have tool for students, teachers, and anyone working with right triangles. The Pythagorean theorem states that in a right triangle, the sum of the squares of the two shorter sides (<b>a</b> and <b>b</b>) equals the square of the hypotenuse (<b>c</b>): <b>a² + b² = c²</b>. This calculator instantly finds the missing side and visualizes the triangle, making geometry easy and interactive.</p>

      <h3>Why Use a Pythagorean Theorem Calculator?</h3>
      <ul>
        <li><b>Instant Results:</b> Quickly solve for the hypotenuse or a missing leg of any right triangle.</li>
        <li><b>Visual Learning:</b> See a diagram of your triangle with side lengths labeled for better understanding.</li>
        <li><b>Educational Value:</b> Reinforces the relationship between the sides of a right triangle and helps with homework or test prep.</li>
        <li><b>Practical Applications:</b> Useful for construction, navigation, design, and any field involving right angles.</li>
      </ul>

      <h3>How the Calculator Works</h3>
      <ol>
        <li>Enter the lengths of sides <b>a</b> and <b>b</b> (the legs of the triangle).</li>
        <li>The calculator computes the hypotenuse <b>c</b> using <b>c = √(a² + b²)</b>.</li>
        <li>It displays the value of <b>c</b> and a diagram of the triangle with all sides labeled.</li>
      </ol>

      <h3>Frequently Asked Questions</h3>
      <ul>
        <li><b>What is the Pythagorean theorem?</b><br>It’s a fundamental rule in geometry: <b>a² + b² = c²</b> for right triangles.</li>
        <li><b>Can I solve for a or b instead of c?</b><br>This calculator is designed for finding <b>c</b>, but you can rearrange the formula: <b>a = √(c² - b²)</b> or <b>b = √(c² - a²)</b> if you know the hypotenuse and one leg.</li>
        <li><b>What if I enter negative or zero values?</b><br>The calculator requires positive numbers for both <b>a</b> and <b>b</b>.</li>
        <li><b>Where is the Pythagorean theorem used?</b><br>It’s used in math, physics, engineering, architecture, and many real-world problems involving right angles.</li>
      </ul>

      <h3>Tips for Using the Pythagorean Theorem</h3>
      <ul>
        <li>Always check that your triangle is a right triangle before applying the theorem.</li>
        <li>Use the calculator to explore how changing <b>a</b> or <b>b</b> affects the hypotenuse.</li>
        <li>Remember: The hypotenuse is always the longest side and opposite the right angle.</li>
        <li>Try using the calculator for real-world projects like measuring distances or building structures.</li>
      </ul>

      <p>Use this Pythagorean Theorem Calculator to make geometry simple, visualize your results, and solve right triangle problems with confidence. <b>Start exploring now</b> and unlock the power of the Pythagorean theorem!</p>
    `,
  id:       'pythagorean',
  name:     'Pythagorean Theorem',
  category: 'Math',
  icon:         '\u25b3',
  materialIcon: 'square_foot',
  tagline:  'Solve a² + b² = c² and see a triangle.',
  keywords: ['pythagorean', 'theorem', 'triangle', 'math', 'geometry'],
  meta: {
    title:       'Pythagorean Theorem Solver — PrecisionCalc',
    description: 'Solve a² + b² = c² and visualize the right triangle.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"pyth-a\">a</label><input type=\"number\" id=\"pyth-a\" value=\"3\" /></div>
      <div class=\"field\"><label for=\"pyth-b\">b</label><input type=\"number\" id=\"pyth-b\" value=\"4\" /></div>
    </div>
    <div id=\"pyth-triangle\" style=\"text-align:center;margin:16px 0;\"></div>
  `,

  mount(container) {
    const calc = () => {
      const a = parseFloat(container.querySelector('#pyth-a').value) || 0;
      const b = parseFloat(container.querySelector('#pyth-b').value) || 0;
      if (a <= 0 || b <= 0) return '';
      const c = Math.sqrt(a * a + b * b);
      container.querySelector('#pyth-triangle').innerHTML = `<svg width=\"120\" height=\"80\" viewBox=\"0 0 120 80\"><polygon points=\"10,70 110,70 110,10\" fill=\"#e0e0e0\" stroke=\"#333\" stroke-width=\"2\"/><text x=\"60\" y=\"78\" text-anchor=\"middle\" font-size=\"14\">a=${a}</text><text x=\"112\" y=\"40\" font-size=\"14\">b=${b}</text><text x=\"60\" y=\"18\" text-anchor=\"middle\" font-size=\"14\">c=${c.toFixed(2)}</text></svg>`;
      return `<div class=\"result-card\" style=\"font-size:2rem;text-align:center;\"><b>c = ${c.toFixed(4)}</b></div>`;
    };
    container.innerHTML += `<div id=\"result-card-pyth\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-pyth').innerHTML = calc();
    });
    container.querySelector('#result-card-pyth').innerHTML = calc();
  }
});
