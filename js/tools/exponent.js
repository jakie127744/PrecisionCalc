/**
 * PrecisionCalc — Exponent/Power Calculator
 * Calculates x^y
 */
registerTool({
  id: 'exponent',
  name: 'Exponent/Power Calculator',
  category: 'Math',
  icon: '^',
  materialIcon: 'superscript',
  tagline: 'Calculate exponents and powers.',
  keywords: ['exponent', 'power', 'math', 'x^y', 'base', 'math'],
  meta: {
    title: 'Exponent/Power Calculator — PrecisionCalc',
    description: 'Calculate exponents and powers (x^y) for any real numbers.'
  },

  seoContent: `
    <h2>Exponent/Power Calculator</h2>
    <p>The Exponent/Power Calculator is a versatile online tool that allows you to calculate the result of raising any base (x) to any exponent (y), written as x<sup>y</sup>. Exponents are a core concept in mathematics, representing repeated multiplication and forming the basis for exponential growth, scientific notation, and many algebraic operations. This calculator is perfect for students, teachers, scientists, engineers, and anyone who needs to work with powers and exponents in their daily tasks or academic work.</p>
    <p>To use the Exponent/Power Calculator, simply enter the base and the exponent. The calculator will instantly display the result of x<sup>y</sup>, making it easy to solve problems involving powers, roots, and exponential equations. This tool is especially useful for checking homework, preparing for exams, or performing quick calculations in science and engineering projects. It supports both positive and negative exponents, as well as fractional and decimal values, giving you maximum flexibility for all types of calculations.</p>
    <p>Exponents are used in a wide range of applications. In science, they describe phenomena such as radioactive decay, population growth, and the intensity of light or sound. In finance, exponents are used to model compound interest and investment returns. In computer science, they are essential for understanding algorithm complexity and data storage. Mastering exponents is crucial for success in algebra, calculus, physics, chemistry, and many other fields.</p>
    <p>This free online Exponent/Power Calculator is designed for accuracy, speed, and ease of use. It provides clear explanations and step-by-step results, helping you understand the underlying math and build confidence in your skills. Whether you are a student, educator, or professional, this tool will save you time and help you avoid mistakes in your calculations. Bookmark this page for quick access whenever you need to work with exponents or powers.</p>
    <ul>
      <li><b>x<sup>y</sup>:</b> Calculates the power of any base raised to any exponent</li>
      <li><b>Supports positive, negative, fractional, and decimal exponents</b></li>
      <li><b>Instant results and clear explanations</b></li>
    </ul>
    <p>Try the Exponent/Power Calculator now and make your math, science, and engineering work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate exponent calculations.</p>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="exp-base">Base (x)</label>
        <input type="number" id="exp-base" placeholder="2" value="2" />
      </div>
      <div class="field">
        <label for="exp-exp">Exponent (y)</label>
        <input type="number" id="exp-exp" placeholder="3" value="3" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-exponent';
    container.appendChild(resultCard);

    function expCalc() {
      const x = parseFloat(container.querySelector('#exp-base').value) || 0;
      const y = parseFloat(container.querySelector('#exp-exp').value) || 0;
      const result = Math.pow(x, y);
      resultCard.innerHTML = `<div class=\"result-card\"><div><b>${x}<sup>${y}</sup> =</b> ${result}</div></div>`;
    }
    container.addEventListener('input', expCalc);
    expCalc();
  }
});
