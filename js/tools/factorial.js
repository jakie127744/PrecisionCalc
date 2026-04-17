/**
 * PrecisionCalc — Factorial Calculator
 * Calculates n!
 */
registerTool({
  id: 'factorial',
  name: 'Factorial Calculator',
  category: 'Math',
  icon: '!',
  materialIcon: 'calculate',
  tagline: 'Calculate factorials (n!).',
  keywords: ['factorial', 'n!', 'math', 'product', 'permutation', 'combination'],
  meta: {
    title: 'Factorial Calculator — PrecisionCalc',
    description: 'Calculate the factorial of any non-negative integer (n!).'
  },

  seoContent: `
    <h2>Factorial Calculator</h2>
    <p>The Factorial Calculator is a user-friendly online tool that allows you to compute the factorial of any non-negative integer (n!). Factorials are a fundamental concept in mathematics, representing the product of all positive integers up to a given number. They are widely used in probability, statistics, combinatorics, algebra, and many other fields. This calculator is ideal for students, teachers, scientists, and anyone who needs to work with factorials in their studies or professional work.</p>
    <p>To use the Factorial Calculator, simply enter a non-negative integer. The calculator will instantly display the value of n!, making it easy to solve problems involving permutations, combinations, and probability. This tool is especially useful for checking your work on homework, preparing for exams, or performing quick calculations in science and engineering projects. It supports values up to 170, ensuring accurate results for a wide range of applications.</p>
    <p>Factorials have many practical applications. In probability and statistics, they are used to calculate the number of possible outcomes in experiments, such as the number of ways to arrange or select items. In algebra, factorials appear in binomial expansions and series. In computer science, they are important for algorithm analysis and recursive programming. Understanding how to calculate and interpret factorials is a key skill for success in many technical fields.</p>
    <p>This free online Factorial Calculator is designed for accuracy, speed, and ease of use. It provides clear explanations and step-by-step results, helping you understand the underlying math and build confidence in your skills. Whether you are a student, educator, or professional, this tool will save you time and help you avoid mistakes in your calculations. Bookmark this page for quick access whenever you need to work with factorials or review factorial concepts.</p>
    <ul>
      <li><b>n!:</b> Calculates the product of all positive integers up to n</li>
      <li><b>Supports values up to 170 for accurate results</b></li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Factorial Calculator now and make your math, science, and engineering work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate factorial calculations.</p>
  `,

  template: () => `
    <div class="form-row single">
      <div class="field">
        <label for="factorial-n">n</label>
        <input type="number" id="factorial-n" placeholder="5" min="0" value="5" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-factorial';
    container.appendChild(resultCard);
    function fact(n) {
      if (n < 0) return NaN;
      let res = 1;
      for (let i = 2; i <= n; ++i) res *= i;
      return res;
    }
    function factorialCalc() {
      const n = parseInt(container.querySelector('#factorial-n').value) || 0;
      const valid = n >= 0 && n <= 170;
      resultCard.innerHTML = valid ? `<div class=\"result-card\"><div><b>${n}!</b> = ${fact(n)}</div></div>` : '';
    }
    container.addEventListener('input', factorialCalc);
    factorialCalc();
  }
});
