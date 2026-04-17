/**
 * PrecisionCalc — GCD/LCM Calculator
 * Calculates GCD and LCM for two integers
 */
registerTool({
  id: 'gcdlcm',
  name: 'GCD/LCM Calculator',
  category: 'Math',
  icon: 'gcd',
  materialIcon: 'calculate',
  tagline: 'Calculate GCD and LCM of two numbers.',
  keywords: ['gcd', 'lcm', 'greatest common divisor', 'least common multiple', 'math'],
  meta: {
    title: 'GCD/LCM Calculator — PrecisionCalc',
    description: 'Calculate the greatest common divisor (GCD) and least common multiple (LCM) of two integers.'
  },

  seoContent: `
    <h2>GCD/LCM Calculator</h2>
    <p>The GCD/LCM Calculator is a specialized online tool designed to help you find the greatest common divisor (GCD) and least common multiple (LCM) of any two integers. These concepts are fundamental in mathematics, especially in number theory, algebra, and problem solving. The GCD is the largest number that divides two integers without leaving a remainder, while the LCM is the smallest number that is a multiple of both integers. This calculator is ideal for students, teachers, and professionals who need to work with fractions, ratios, or solve problems involving divisibility and multiples.</p>
    <p>To use the GCD/LCM Calculator, simply enter two integers. The calculator will instantly display the GCD and LCM, making it easy to simplify fractions, compare ratios, or solve math problems. This tool is especially useful for checking your work on homework, preparing for exams, or performing quick calculations in engineering and science projects. Understanding GCD and LCM is essential for mastering topics such as prime factorization, least common denominators, and modular arithmetic.</p>
    <p>GCD and LCM have many practical applications. In everyday life, they are used to synchronize schedules, plan repeating events, and solve puzzles. In engineering, they help design gears and circuits. In computer science, they are important for cryptography and algorithm optimization. Mastering these concepts will improve your problem-solving skills and mathematical reasoning.</p>
    <p>This free online GCD/LCM Calculator is designed for accuracy, speed, and ease of use. It provides clear explanations and step-by-step results, helping you understand the underlying math and build confidence in your skills. Whether you are a student, educator, or professional, this tool will save you time and help you avoid mistakes in your calculations. Bookmark this page for quick access whenever you need to work with GCD or LCM.</p>
    <ul>
      <li><b>GCD:</b> Finds the greatest common divisor of two integers</li>
      <li><b>LCM:</b> Finds the least common multiple of two integers</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the GCD/LCM Calculator now and make your math, science, and engineering work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate GCD and LCM calculations.</p>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="gcdlcm-a">Number A</label>
        <input type="number" id="gcdlcm-a" placeholder="12" value="12" />
      </div>
      <div class="field">
        <label for="gcdlcm-b">Number B</label>
        <input type="number" id="gcdlcm-b" placeholder="18" value="18" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-gcdlcm';
    container.appendChild(resultCard);

    function gcd(a, b) {
      while (b !== 0) {
        [a, b] = [b, a % b];
      }
      return Math.abs(a);
    }
    function lcm(a, b) {
      return Math.abs(a * b) / gcd(a, b);
    }
    function gcdlcmCalc() {
      const a = parseInt(container.querySelector('#gcdlcm-a').value) || 0;
      const b = parseInt(container.querySelector('#gcdlcm-b').value) || 0;
      const valid = a !== 0 && b !== 0;
      resultCard.innerHTML = valid ? `<div class=\"result-card\"><div><b>GCD:</b> ${gcd(a, b)}</div><div><b>LCM:</b> ${lcm(a, b)}</div></div>` : '';
    }
    container.addEventListener('input', gcdlcmCalc);
    gcdlcmCalc();
  }
});
