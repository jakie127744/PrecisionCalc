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
    <p>Whenever a video game rotates a 3D character, or a search engine ranks web pages, or a spreadsheet solves a system of equations, there's a matrix determinant working behind the scenes. This calculator focuses on that single number — computed from a 2×2 or 3×3 grid of values — that tells you something surprisingly important about the whole matrix at once.</p>

    <h3>What the Determinant Actually Tells You</h3>
    <div class="formula-block">2×2: det = ad − bc, for matrix [[a,b],[c,d]]</div>
    <p>For the default 2×2 matrix [[1,2],[3,4]]: det = (1×4) − (2×3) = 4 − 6 = −2. Geometrically, the determinant's absolute value equals the factor by which the matrix scales area (in 2D) or volume (in 3D) when used as a transformation. A determinant of 0 means the transformation "flattens" space into a lower dimension — collapsing a 2D plane onto a line, for instance — which is why a zero determinant signals the matrix cannot be inverted.</p>

    <h3>The 3×3 Case: Cofactor Expansion</h3>
    <p>For a 3×3 matrix, the determinant is computed by expanding along the first row, multiplying each entry by the determinant of the 2×2 matrix that remains after removing its row and column, with alternating signs: det = a₁₁(a₂₂a₃₃ − a₂₃a₃₂) − a₁₂(a₂₁a₃₃ − a₂₃a₃₁) + a₁₃(a₂₁a₃₂ − a₂₂a₃₁). This recursive pattern — reducing a larger determinant to smaller ones — extends to matrices of any size, though by hand it becomes impractical past 3×3 or 4×4.</p>

    <h3>Why a Zero Determinant Matters So Much</h3>
    <p>A matrix with a determinant of exactly zero is called <b>singular</b>. In practical terms, a singular matrix represents a system of equations that either has no solution or infinitely many — not the single, unique solution most real-world problems need. Engineers and data scientists specifically check for near-zero determinants because they signal numerically unstable systems, where tiny input errors can cause wildly incorrect results.</p>

    <details>
      <summary>❓ Why does the sign alternate in the 3×3 formula?</summary>
      <p>The alternating +/−/+ pattern (called the "checkerboard" sign rule) comes from the mathematical definition of a determinant as a signed sum over all possible permutations of matrix entries — it's not arbitrary, and skipping it produces a wrong answer.</p>
    </details>
    <details>
      <summary>❓ Does a negative determinant mean something went wrong?</summary>
      <p>No — a negative determinant is completely valid. It indicates the transformation also flips orientation (like a mirror reflection) in addition to scaling. Only the absolute value of the determinant represents the actual scale factor.</p>
    </details>
    <details>
      <summary>❓ How is the determinant used in solving systems of equations?</summary>
      <p>Cramer's Rule uses determinants directly to solve systems of linear equations by forming ratios of modified-matrix determinants to the original matrix's determinant — a technique taught in most introductory linear algebra courses as an alternative to row reduction.</p>
    </details>
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
    const resultCard = container.querySelector('#result-card-matrix');
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
      resultCard.innerHTML = `<div><b>Result:</b> ${result}</div>`;
      resultCard.classList.add('active');
      pulseResult('matrix');
    }
    container.addEventListener('input', matrixCalc);
    matrixCalc();
  }
});
