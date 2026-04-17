/**
 * PrecisionCalc — Quadratic Equation Solver
 * Solves ax^2 + bx + c = 0 for x.
 */
registerTool({
    seoContent: `
      <h2>Quadratic Equation Solver</h2>
      <p>The Quadratic Equation Solver is a powerful tool for students, teachers, and anyone working with algebra. Quadratic equations are equations of the form <b>ax² + bx + c = 0</b>, and they appear in countless math, science, and engineering problems. This calculator instantly finds the real or complex roots of any quadratic equation, showing you step-by-step results and explanations.</p>

      <h3>Why Use a Quadratic Solver?</h3>
      <ul>
        <li><b>Instant Solutions:</b> Quickly solve any quadratic equation without manual calculation.</li>
        <li><b>Handles All Cases:</b> Finds real and complex roots, including double roots when the discriminant is zero.</li>
        <li><b>Educational Value:</b> See how the discriminant determines the nature of the roots and learn the quadratic formula in action.</li>
        <li><b>Time Saver:</b> Great for homework, test prep, or checking your work.</li>
      </ul>

      <h3>How the Calculator Works</h3>
      <ol>
        <li>Enter the coefficients <b>a</b>, <b>b</b>, and <b>c</b> for your equation <b>ax² + bx + c = 0</b>.</li>
        <li>The calculator computes the discriminant <b>D = b² - 4ac</b> to determine the type of roots.</li>
        <li>It applies the quadratic formula: <b>x = [-b ± √(b²-4ac)] / 2a</b> to find the solutions.</li>
        <li>Results are displayed instantly, including complex roots if needed.</li>
      </ol>

      <h3>Frequently Asked Questions</h3>
      <ul>
        <li><b>What is a quadratic equation?</b><br>An equation of the form <b>ax² + bx + c = 0</b>, where <b>a ≠ 0</b>.</li>
        <li><b>What are real and complex roots?</b><br>Real roots are solutions on the number line; complex roots involve the imaginary unit <b>i</b> when the discriminant is negative.</li>
        <li><b>What if a = 0?</b><br>The equation becomes linear, not quadratic. The calculator will prompt you to enter <b>a ≠ 0</b>.</li>
        <li><b>Can I use decimals or negative numbers?</b><br>Yes! The solver handles all real numbers for <b>a</b>, <b>b</b>, and <b>c</b>.</li>
      </ul>

      <h3>Tips for Solving Quadratics</h3>
      <ul>
        <li>Double-check your coefficients before solving.</li>
        <li>Use the calculator to explore how changing <b>a</b>, <b>b</b>, or <b>c</b> affects the roots.</li>
        <li>Remember: If the discriminant is positive, you get two real roots; if zero, one real root; if negative, two complex roots.</li>
        <li>Practice factoring simple quadratics by hand to build algebra skills.</li>
      </ul>

      <p>Use this Quadratic Equation Solver to master algebra, check your homework, or tackle advanced math problems with confidence. <b>Start solving now</b> and make quadratic equations easy!</p>
    `,
  id:       'quadratic',
  name:     'Quadratic Solver',
  category: 'Math',
  icon:         '\u221a',
  materialIcon: 'calculate',
  tagline:  'Solve quadratic equations and see real/complex roots.',
  keywords: ['quadratic', 'equation', 'solver', 'roots', 'math'],
  meta: {
    title:       'Quadratic Equation Solver — PrecisionCalc',
    description: 'Solve ax^2 + bx + c = 0 for real and complex roots.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"quad-a\">a</label><input type=\"number\" id=\"quad-a\" value=\"1\" /></div>
      <div class=\"field\"><label for=\"quad-b\">b</label><input type=\"number\" id=\"quad-b\" value=\"0\" /></div>
      <div class=\"field\"><label for=\"quad-c\">c</label><input type=\"number\" id=\"quad-c\" value=\"0\" /></div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      const a = parseFloat(container.querySelector('#quad-a').value) || 0;
      const b = parseFloat(container.querySelector('#quad-b').value) || 0;
      const c = parseFloat(container.querySelector('#quad-c').value) || 0;
      if (a === 0) return '<div style=\"color:red\">a ≠ 0 required</div>';
      const D = b * b - 4 * a * c;
      let x1, x2;
      if (D > 0) {
        x1 = (-b + Math.sqrt(D)) / (2 * a);
        x2 = (-b - Math.sqrt(D)) / (2 * a);
        return `<div class=\"result-card\" style=\"font-size:2rem;text-align:center;\"><b>Roots:</b> x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}</div>`;
      } else if (D === 0) {
        x1 = -b / (2 * a);
        return `<div class=\"result-card\" style=\"font-size:2rem;text-align:center;\"><b>Root:</b> x = ${x1.toFixed(4)}</div>`;
      } else {
        const real = -b / (2 * a);
        const imag = Math.sqrt(-D) / (2 * a);
        return `<div class=\"result-card\" style=\"font-size:2rem;text-align:center;\"><b>Complex Roots:</b> x₁ = ${real.toFixed(4)} + ${imag.toFixed(4)}i, x₂ = ${real.toFixed(4)} - ${imag.toFixed(4)}i</div>`;
      }
    };
    container.innerHTML += `<div id=\"result-card-quad\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-quad').innerHTML = calc();
    });
    container.querySelector('#result-card-quad').innerHTML = calc();
  }
});
