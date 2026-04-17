/**
 * PrecisionCalc — Matrix Addition & Multiplication Calculator
 * Supports 2x2 and 3x3 matrices
 */
registerTool({
  id: 'matrixops',
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
    <h2>Matrix Addition & Multiplication Calculator</h2>
    <p>Add or multiply 2x2 and 3x3 matrices. Enter your matrix values and select the operation for instant results. Useful for algebra, linear algebra, and engineering.</p>
    <ul>
      <li><b>Addition:</b> Element-wise sum of matrices</li>
      <li><b>Multiplication:</b> Standard matrix multiplication</li>
    </ul>
    <p>This free online matrix calculator is perfect for students and professionals.</p>
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
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-matrixops';
    container.appendChild(resultCard);
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
      let html = '<div class="result-card"><b>Result:</b><br/><table style="margin:0.5em auto">';
      for (let i = 0; i < result.length; ++i) {
        html += '<tr>';
        for (let j = 0; j < result[i].length; ++j) html += `<td style="padding:0.25em 0.75em">${result[i][j]}</td>`;
        html += '</tr>';
      }
      html += '</table></div>';
      resultCard.innerHTML = html;
    }
    container.addEventListener('input', matrixOpsCalc);
    matrixOpsCalc();
  }
});
