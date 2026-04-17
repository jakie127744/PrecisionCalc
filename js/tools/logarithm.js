/**
 * PrecisionCalc — Logarithm Calculator
 * Calculates log base b of x, ln(x), log10(x)
 */
registerTool({
  id: 'logarithm',
  name: 'Logarithm Calculator',
  category: 'Math',
  icon: 'log',
  materialIcon: 'calculate',
  tagline: 'Calculate logarithms with any base.',
  keywords: ['logarithm', 'log', 'ln', 'log10', 'base', 'math'],
  meta: {
    title: 'Logarithm Calculator — PrecisionCalc',
    description: 'Calculate logarithms with any base, including natural log (ln) and common log (log10).'
  },

  seoContent: `
    <h2>Logarithm Calculator</h2>
    <p>The Logarithm Calculator is a powerful online tool designed to help you compute logarithms for any base, including the natural logarithm (ln) and the common logarithm (log<sub>10</sub>). Logarithms are fundamental in mathematics, science, engineering, and computer science, providing a way to solve equations involving exponential growth or decay, analyze data, and simplify complex calculations. This calculator is ideal for students, teachers, engineers, and anyone who needs to work with logarithmic functions in their studies or professional work.</p>
    <p>To use the Logarithm Calculator, simply enter the value (x) and the base (b) for which you want to calculate the logarithm. The calculator instantly provides the result for log<sub>b</sub>(x), as well as the natural logarithm ln(x) and the common logarithm log<sub>10</sub>(x). This makes it easy to compare different logarithmic values and understand their relationships. The tool is especially useful for solving exponential equations, converting between different logarithmic bases, and checking your work on homework or exams.</p>
    <p>Logarithms have a wide range of applications. In science, they are used to describe phenomena such as sound intensity (decibels), earthquake magnitude (Richter scale), and acidity (pH scale). In finance, logarithms help model compound interest and investment growth. In computer science, they are essential for analyzing algorithms and data structures, particularly those involving binary trees and search operations. Understanding how to calculate and interpret logarithms is a key skill for success in many technical fields.</p>
    <p>This free online Logarithm Calculator is designed for accuracy, speed, and ease of use. Whether you are working on algebra, calculus, statistics, or engineering problems, this tool provides reliable results and clear explanations. You can use it to check your manual calculations, explore logarithmic properties, or simply save time on repetitive math tasks. Bookmark this page for quick access whenever you need to compute logarithms or review logarithmic concepts.</p>
    <ul>
      <li><b>log<sub>b</sub>(x):</b> Calculates the logarithm of x to any base b</li>
      <li><b>ln(x):</b> Computes the natural logarithm (base e)</li>
      <li><b>log<sub>10</sub>(x):</b> Computes the common logarithm (base 10)</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Logarithm Calculator now and make your math, science, and engineering work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate logarithmic calculations.</p>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="log-x">Value (x)</label>
        <input type="number" id="log-x" placeholder="8" min="0" value="8" />
      </div>
      <div class="field">
        <label for="log-base">Base (b)</label>
        <input type="number" id="log-base" placeholder="2" min="0" value="2" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-logarithm';
    container.appendChild(resultCard);

    function logCalc() {
      const x = parseFloat(container.querySelector('#log-x').value) || 0;
      const b = parseFloat(container.querySelector('#log-base').value) || 0;
      let logb = '', ln = '', log10 = '';
      if (x > 0 && b > 0 && b !== 1) logb = Math.log(x) / Math.log(b);
      if (x > 0) ln = Math.log(x);
      if (x > 0) log10 = Math.log10(x);
      resultCard.innerHTML = x > 0 && b > 0 && b !== 1 ? `<div class=\"result-card\"><div><b>log<sub>${b}</sub>(${x}) =</b> ${logb}</div><div><b>ln(${x}) =</b> ${ln}</div><div><b>log<sub>10</sub>(${x}) =</b> ${log10}</div></div>` : '';
    }
    container.addEventListener('input', logCalc);
    logCalc();
  }
});
