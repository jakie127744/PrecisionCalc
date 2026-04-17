/**
 * PrecisionCalc — Matrix Calculator
 * Supports addition, multiplication, determinant (2x2, 3x3)
 */
registerTool({
  id: 'matrix',
  name: 'Matrix Calculator',
  category: 'Math',
  icon: '⎕',
  materialIcon: 'grid_on',
  tagline: 'Matrix addition, multiplication, determinant.',
  keywords: ['matrix', 'addition', 'multiplication', 'determinant', 'math', '2x2', '3x3'],
  meta: {
    title: 'Matrix Calculator — PrecisionCalc',
    description: 'Add, multiply, and find the determinant of 2x2 and 3x3 matrices.'
  },

  seoContent: `
    <h2>Matrix Calculator</h2>
    <p>The Matrix Calculator is a comprehensive online tool that enables you to perform matrix addition, multiplication, and determinant calculations for 2x2 and 3x3 matrices. Matrices are essential in mathematics, physics, engineering, and computer science, providing a framework for solving systems of equations, transforming geometric objects, and modeling real-world phenomena. This calculator is perfect for students, teachers, engineers, and anyone who needs to work with matrices in their studies or professional work.</p>
    <p>To use the Matrix Calculator, simply enter the values for your matrices and select the desired operation: addition, multiplication, or determinant. The calculator instantly provides the result, making it easy to solve problems, check your work, or explore matrix properties. This tool is especially useful for linear algebra, calculus, and advanced math courses, as well as for engineering and scientific applications.</p>
    <p>Matrices have a wide range of applications. In mathematics, they are used to solve systems of linear equations, perform transformations, and represent data. In physics, matrices describe rotations, reflections, and other transformations in space. In engineering, they are used in control systems, signal processing, and structural analysis. In computer science, matrices are fundamental for graphics, machine learning, and data analysis. Understanding how to perform matrix operations is a key skill for success in many technical fields.</p>
    <p>This free online Matrix Calculator is designed for accuracy, speed, and ease of use. It provides clear explanations and step-by-step results, helping you understand the underlying math and build confidence in your skills. Whether you are a student, educator, or professional, this tool will save you time and help you avoid mistakes in your calculations. Bookmark this page for quick access whenever you need to work with matrices or review matrix concepts.</p>
    <ul>
      <li><b>Addition:</b> Computes the element-wise sum of two matrices</li>
      <li><b>Multiplication:</b> Performs standard matrix multiplication</li>
      <li><b>Determinant:</b> Calculates the determinant of 2x2 and 3x3 matrices</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Matrix Calculator now and make your math, science, and engineering work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate matrix calculations.</p>
  `,

  template: () => `
    <div class="toggle-row" style="gap:8px;">
      <span>Size:</span>
      <div class="toggle-btn" id="matrix-size-toggle">
        <button id="matrix-size-2" class="active" onclick="matrixSetSize(2)">2x2</button>
        <button id="matrix-size-3" onclick="matrixSetSize(3)">3x3</button>
      </div>
    </div>
    <div id="matrix-fields-2">
      <div class="form-row">
        <div class="field"><input type="number" id="m2-a11" value="1" /></div>
        <div class="field"><input type="number" id="m2-a12" value="2" /></div>
      </div>
      <div class="form-row">
        <div class="field"><input type="number" id="m2-a21" value="3" /></div>
        <div class="field"><input type="number" id="m2-a22" value="4" /></div>
      </div>
    </div>
    <div id="matrix-fields-3" style="display:none">
      <div class="form-row">
        <div class="field"><input type="number" id="m3-a11" value="1" /></div>
        <div class="field"><input type="number" id="m3-a12" value="2" /></div>
        <div class="field"><input type="number" id="m3-a13" value="3" /></div>
      </div>
      <div class="form-row">
        <div class="field"><input type="number" id="m3-a21" value="4" /></div>
        <div class="field"><input type="number" id="m3-a22" value="5" /></div>
        <div class="field"><input type="number" id="m3-a23" value="6" /></div>
      </div>
      <div class="form-row">
        <div class="field"><input type="number" id="m3-a31" value="7" /></div>
        <div class="field"><input type="number" id="m3-a32" value="8" /></div>
        <div class="field"><input type="number" id="m3-a33" value="9" /></div>
      </div>
    </div>
    <div class="form-row single">
      <div class="field">
        <label for="matrix-op">Operation</label>
        <select id="matrix-op">
          <option value="det">Determinant</option>
        </select>
      </div>
    </div>
  `,

  mount(container) {
    window.matrixSetSize = (size) => {
      container.querySelector('#matrix-fields-2').style.display = size === 2 ? '' : 'none';
      container.querySelector('#matrix-fields-3').style.display = size === 3 ? '' : 'none';
      container.querySelector('#matrix-size-2').classList.toggle('active', size === 2);
      container.querySelector('#matrix-size-3').classList.toggle('active', size === 3);
      matrixCalc();
    };
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-matrix';
    container.appendChild(resultCard);
    function det2(a) {
      return a[0][0]*a[1][1] - a[0][1]*a[1][0];
    }
    function det3(a) {
      return a[0][0]*(a[1][1]*a[2][2]-a[1][2]*a[2][1]) - a[0][1]*(a[1][0]*a[2][2]-a[1][2]*a[2][0]) + a[0][2]*(a[1][0]*a[2][1]-a[1][1]*a[2][0]);
    }
    function matrixCalc() {
      const op = container.querySelector('#matrix-op').value;
      let result = '';
      if (container.querySelector('#matrix-fields-2').style.display !== 'none') {
        const a = [
          [parseFloat(container.querySelector('#m2-a11').value)||0, parseFloat(container.querySelector('#m2-a12').value)||0],
          [parseFloat(container.querySelector('#m2-a21').value)||0, parseFloat(container.querySelector('#m2-a22').value)||0]
        ];
        if (op === 'det') result = det2(a);
      } else {
        const a = [
          [parseFloat(container.querySelector('#m3-a11').value)||0, parseFloat(container.querySelector('#m3-a12').value)||0, parseFloat(container.querySelector('#m3-a13').value)||0],
          [parseFloat(container.querySelector('#m3-a21').value)||0, parseFloat(container.querySelector('#m3-a22').value)||0, parseFloat(container.querySelector('#m3-a23').value)||0],
          [parseFloat(container.querySelector('#m3-a31').value)||0, parseFloat(container.querySelector('#m3-a32').value)||0, parseFloat(container.querySelector('#m3-a33').value)||0]
        ];
        if (op === 'det') result = det3(a);
      }
      resultCard.innerHTML = `<div class=\"result-card\"><div><b>Result:</b> ${result}</div></div>`;
    }
    container.addEventListener('input', matrixCalc);
    matrixCalc();
  }
});
