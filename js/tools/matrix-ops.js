/**
 * PrecisionCalc — Matrix Addition & Multiplication Calculator
 * Supports 2x2 and 3x3 matrices
 */
registerTool({
  id: 'matrix-ops',
  name: 'Matrix Addition/Multiplication',
  category: 'Math',
  icon: '⧉',
  materialIcon: 'grid_on',
  tagline: 'Add and multiply 2x2/3x3 matrices.',
  keywords: ['matrix', 'addition', 'multiplication', 'math', '2x2', '3x3'],
  meta: {
    title: 'Matrix Addition/Multiplication — PrecisionCalc',
    description: 'Add and multiply 2x2 and 3x3 matrices.'
  },

  seoContent: `
    <p>Matrices are the backbone of linear algebra, computer graphics, engineering simulations, and machine learning. This calculator performs the two most common operations — addition and multiplication — on 2×2 and 3×3 matrices, showing the exact result instantly as you change any value.</p>

    <h3>Matrix Addition</h3>
    <div class="formula-block">(A + B)ᵢⱼ = Aᵢⱼ + Bᵢⱼ</div>
    <p>Addition is element-wise: you simply add each entry in matrix A to the entry in the same position in matrix B. Both matrices must have the same dimensions. For example, adding [[1,2],[3,4]] and [[5,6],[7,8]] gives [[6,8],[10,12]] — each cell is just the sum of its two corresponding cells.</p>

    <h3>Matrix Multiplication</h3>
    <div class="formula-block">(AB)ᵢⱼ = Σₖ Aᵢₖ × Bₖⱼ</div>
    <p>Multiplication is more involved than addition: each entry in the result is the dot product of a row from A and a column from B. This is why matrix multiplication is <em>not</em> commutative — A×B usually does not equal B×A, unlike ordinary number multiplication. For a 2×2 example, multiplying [[1,2],[3,4]] by [[5,6],[7,8]] gives [[19,22],[43,50]], where the top-left entry 19 comes from (1×5 + 2×7).</p>

    <h3>Where Matrix Operations Are Used</h3>
    <ul>
      <li><b>Computer graphics:</b> Rotating, scaling, and translating 2D/3D objects on screen uses matrix multiplication.</li>
      <li><b>Machine learning:</b> Neural network layers are essentially chained matrix multiplications applied to input data.</li>
      <li><b>Engineering & physics:</b> Systems of linear equations (structural loads, circuit analysis) are solved using matrix methods.</li>
      <li><b>Economics:</b> Input-output models that track how industries depend on each other use matrix multiplication.</li>
    </ul>

    <h3>Key Rules to Remember</h3>
    <ul>
      <li>Addition requires both matrices to be the exact same size.</li>
      <li>Multiplication requires the number of columns in A to equal the number of rows in B.</li>
      <li>The identity matrix (1s on the diagonal, 0s elsewhere) leaves any matrix unchanged when multiplied.</li>
      <li>Matrix multiplication is associative — (AB)C = A(BC) — but not commutative.</li>
    </ul>

    <details>
      <summary>❓ Why isn't matrix multiplication commutative?</summary>
      <p>Because each entry of the product depends on a specific row-by-column combination. Swapping the order changes which rows pair with which columns, producing a different (or sometimes undefined) result. This is one of the biggest conceptual differences from ordinary arithmetic.</p>
    </details>
    <details>
      <summary>❓ Can I multiply matrices of different sizes?</summary>
      <p>Only if the number of columns in the first matrix equals the number of rows in the second. A 2×3 matrix can be multiplied by a 3×2 matrix (producing a 2×2 result), but not by another 2×3 matrix.</p>
    </details>
    <details>
      <summary>❓ What's a real-world example of matrix addition?</summary>
      <p>Combining two sales spreadsheets for the same regions and product categories — adding this month's numbers to last month's, cell by cell, is literally matrix addition.</p>
    </details>
  `,

  template: () => `
    <div class="toggle-row" style="gap:8px;">
      <span>Size:</span>
      <div class="toggle-btn" id="matrixops-size-toggle">
        <button id="matrixops-size-2" class="active" onclick="matrixOpsSetSize(2)">2x2</button>
        <button id="matrixops-size-3" onclick="matrixOpsSetSize(3)">3x3</button>
      </div>
    </div>
    <div class="form-row single">
      <div class="field">
        <label for="matrixops-op">Operation</label>
        <select id="matrixops-op">
          <option value="add">Addition</option>
          <option value="mul">Multiplication</option>
        </select>
      </div>
    </div>
    <div id="matrixops-fields-2">
      <div class="form-row"><div class="field"><input type="number" id="m2a11" value="1" /></div><div class="field"><input type="number" id="m2a12" value="2" /></div></div>
      <div class="form-row"><div class="field"><input type="number" id="m2a21" value="3" /></div><div class="field"><input type="number" id="m2a22" value="4" /></div></div>
      <div class="form-row"><div class="field"><input type="number" id="m2b11" value="5" /></div><div class="field"><input type="number" id="m2b12" value="6" /></div></div>
      <div class="form-row"><div class="field"><input type="number" id="m2b21" value="7" /></div><div class="field"><input type="number" id="m2b22" value="8" /></div></div>
    </div>
    <div id="matrixops-fields-3" style="display:none">
      <div class="form-row"><div class="field"><input type="number" id="m3a11" value="1" /></div><div class="field"><input type="number" id="m3a12" value="2" /></div><div class="field"><input type="number" id="m3a13" value="3" /></div></div>
      <div class="form-row"><div class="field"><input type="number" id="m3a21" value="4" /></div><div class="field"><input type="number" id="m3a22" value="5" /></div><div class="field"><input type="number" id="m3a23" value="6" /></div></div>
      <div class="form-row"><div class="field"><input type="number" id="m3a31" value="7" /></div><div class="field"><input type="number" id="m3a32" value="8" /></div><div class="field"><input type="number" id="m3a33" value="9" /></div></div>
      <div class="form-row"><div class="field"><input type="number" id="m3b11" value="9" /></div><div class="field"><input type="number" id="m3b12" value="8" /></div><div class="field"><input type="number" id="m3b13" value="7" /></div></div>
      <div class="form-row"><div class="field"><input type="number" id="m3b21" value="6" /></div><div class="field"><input type="number" id="m3b22" value="5" /></div><div class="field"><input type="number" id="m3b23" value="4" /></div></div>
      <div class="form-row"><div class="field"><input type="number" id="m3b31" value="3" /></div><div class="field"><input type="number" id="m3b32" value="2" /></div><div class="field"><input type="number" id="m3b33" value="1" /></div></div>
    </div>
  `,

  mount(container) {
    window.matrixOpsSetSize = (size) => {
      container.querySelector('#matrixops-fields-2').style.display = size === 2 ? '' : 'none';
      container.querySelector('#matrixops-fields-3').style.display = size === 3 ? '' : 'none';
      container.querySelector('#matrixops-size-2').classList.toggle('active', size === 2);
      container.querySelector('#matrixops-size-3').classList.toggle('active', size === 3);
      matrixOpsCalc();
    };
    const resultCard = container.querySelector('#result-card-matrix-ops');
    function add2(a, b) {
      return [
        [a[0][0]+b[0][0], a[0][1]+b[0][1]],
        [a[1][0]+b[1][0], a[1][1]+b[1][1]]
      ];
    }
    function mul2(a, b) {
      return [
        [a[0][0]*b[0][0]+a[0][1]*b[1][0], a[0][0]*b[0][1]+a[0][1]*b[1][1]],
        [a[1][0]*b[0][0]+a[1][1]*b[1][0], a[1][0]*b[0][1]+a[1][1]*b[1][1]]
      ];
    }
    function add3(a, b) {
      return [
        [a[0][0]+b[0][0], a[0][1]+b[0][1], a[0][2]+b[0][2]],
        [a[1][0]+b[1][0], a[1][1]+b[1][1], a[1][2]+b[1][2]],
        [a[2][0]+b[2][0], a[2][1]+b[2][1], a[2][2]+b[2][2]]
      ];
    }
    function mul3(a, b) {
      let r = [];
      for (let i = 0; i < 3; ++i) {
        r[i] = [];
        for (let j = 0; j < 3; ++j) {
          r[i][j] = 0;
          for (let k = 0; k < 3; ++k) r[i][j] += a[i][k]*b[k][j];
        }
      }
      return r;
    }
    function matrixOpsCalc() {
      const op = container.querySelector('#matrixops-op').value;
      let result = [];
      if (container.querySelector('#matrixops-fields-2').style.display !== 'none') {
        const a = [
          [parseFloat(container.querySelector('#m2a11').value)||0, parseFloat(container.querySelector('#m2a12').value)||0],
          [parseFloat(container.querySelector('#m2a21').value)||0, parseFloat(container.querySelector('#m2a22').value)||0]
        ];
        const b = [
          [parseFloat(container.querySelector('#m2b11').value)||0, parseFloat(container.querySelector('#m2b12').value)||0],
          [parseFloat(container.querySelector('#m2b21').value)||0, parseFloat(container.querySelector('#m2b22').value)||0]
        ];
        result = op === 'add' ? add2(a, b) : mul2(a, b);
      } else {
        const a = [
          [parseFloat(container.querySelector('#m3a11').value)||0, parseFloat(container.querySelector('#m3a12').value)||0, parseFloat(container.querySelector('#m3a13').value)||0],
          [parseFloat(container.querySelector('#m3a21').value)||0, parseFloat(container.querySelector('#m3a22').value)||0, parseFloat(container.querySelector('#m3a23').value)||0],
          [parseFloat(container.querySelector('#m3a31').value)||0, parseFloat(container.querySelector('#m3a32').value)||0, parseFloat(container.querySelector('#m3a33').value)||0]
        ];
        const b = [
          [parseFloat(container.querySelector('#m3b11').value)||0, parseFloat(container.querySelector('#m3b12').value)||0, parseFloat(container.querySelector('#m3b13').value)||0],
          [parseFloat(container.querySelector('#m3b21').value)||0, parseFloat(container.querySelector('#m3b22').value)||0, parseFloat(container.querySelector('#m3b23').value)||0],
          [parseFloat(container.querySelector('#m3b31').value)||0, parseFloat(container.querySelector('#m3b32').value)||0, parseFloat(container.querySelector('#m3b33').value)||0]
        ];
        result = op === 'add' ? add3(a, b) : mul3(a, b);
      }
      let html = '<b>Result:</b><br/><table style="margin:0.5em auto">';
      for (let i = 0; i < result.length; ++i) {
        html += '<tr>';
        for (let j = 0; j < result[i].length; ++j) html += `<td style="padding:0.25em 0.75em">${result[i][j]}</td>`;
        html += '</tr>';
      }
      html += '</table>';
      resultCard.innerHTML = html;
      resultCard.classList.add('active');
      pulseResult('matrix-ops');
    }
    container.addEventListener('input', matrixOpsCalc);
    matrixOpsCalc();
  }
});
