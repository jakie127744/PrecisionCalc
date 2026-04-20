/**
 * PrecisionCalc — Triangle Area & Perimeter Calculator
 * Supports: base/height, 3 sides (Heron's), equilateral
 */
registerTool({
  id: 'triangle',
  name: 'Triangle Calculator',
  category: 'Math',
  icon: '△',
  materialIcon: 'change_history',
  tagline: 'Calculate area and perimeter for any triangle.',
  keywords: ['triangle', 'area', 'perimeter', 'heron', 'geometry', 'base', 'height', 'side'],
  meta: {
    title: 'Triangle Calculator — PrecisionCalc',
    description: 'Calculate the area and perimeter of a triangle using base/height, three sides (Heron\'s formula), or equilateral. Free online triangle calculator.'
  },

  template: () => `
    <div class="toggle-row" style="gap:8px;">
      <span>Mode:</span>
      <div class="toggle-btn" id="triangle-mode-toggle">
        <button id="triangle-mode-bh" class="active" onclick="triangleSetMode('bh')">Base/Height</button>
        <button id="triangle-mode-sss" onclick="triangleSetMode('sss')">3 Sides</button>
        <button id="triangle-mode-eq" onclick="triangleSetMode('eq')">Equilateral</button>
      </div>
    </div>
    <div id="triangle-fields-bh">
      <div class="form-row">
        <div class="field">
          <label for="triangle-base">Base</label>
          <input type="number" id="triangle-base" placeholder="10" min="0" value="10" />
        </div>
        <div class="field">
          <label for="triangle-height">Height</label>
          <input type="number" id="triangle-height" placeholder="6" min="0" value="6" />
        </div>
      </div>
    </div>
    <div id="triangle-fields-sss" style="display:none">
      <div class="form-row">
        <div class="field">
          <label for="triangle-a">Side a</label>
          <input type="number" id="triangle-a" placeholder="7" min="0" value="7" />
        </div>
        <div class="field">
          <label for="triangle-b">Side b</label>
          <input type="number" id="triangle-b" placeholder="8" min="0" value="8" />
        </div>
        <div class="field">
          <label for="triangle-c">Side c</label>
          <input type="number" id="triangle-c" placeholder="9" min="0" value="9" />
        </div>
      </div>
    </div>
    <div id="triangle-fields-eq" style="display:none">
      <div class="form-row single">
        <div class="field">
          <label for="triangle-eq-side">Side</label>
          <input type="number" id="triangle-eq-side" placeholder="5" min="0" value="5" />
        </div>
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-triangle');

    window.triangleSetMode = (mode) => {
      container.querySelector('#triangle-fields-bh').style.display = mode === 'bh' ? '' : 'none';
      container.querySelector('#triangle-fields-sss').style.display = mode === 'sss' ? '' : 'none';
      container.querySelector('#triangle-fields-eq').style.display = mode === 'eq' ? '' : 'none';
      container.querySelector('#triangle-mode-bh').classList.toggle('active', mode === 'bh');
      container.querySelector('#triangle-mode-sss').classList.toggle('active', mode === 'sss');
      container.querySelector('#triangle-mode-eq').classList.toggle('active', mode === 'eq');
      calc();
    };

    const calc = () => {
      let area = 0, perimeter = 0, isValid = true;
      const mode = container.querySelector('#triangle-mode-bh').classList.contains('active') ? 'bh' : 
                   container.querySelector('#triangle-mode-sss').classList.contains('active') ? 'sss' : 'eq';

      if (mode === 'bh') {
        const base = parseFloat(container.querySelector('#triangle-base').value) || 0;
        const height = parseFloat(container.querySelector('#triangle-height').value) || 0;
        area = 0.5 * base * height;
        perimeter = null;
        isValid = base > 0 && height > 0;
      } else if (mode === 'sss') {
        const a = parseFloat(container.querySelector('#triangle-a').value) || 0;
        const b = parseFloat(container.querySelector('#triangle-b').value) || 0;
        const c = parseFloat(container.querySelector('#triangle-c').value) || 0;
        const s = (a + b + c) / 2;
        const areaSq = s * (s - a) * (s - b) * (s - c);
        area = areaSq > 0 ? Math.sqrt(areaSq) : 0;
        perimeter = a + b + c;
        isValid = a > 0 && b > 0 && c > 0 && area > 0;
      } else {
        const side = parseFloat(container.querySelector('#triangle-eq-side').value) || 0;
        area = (Math.sqrt(3) / 4) * side * side;
        perimeter = 3 * side;
        isValid = side > 0;
      }

      if (!isValid) {
        resultCard.innerHTML = `<div class="result-placeholder">Enter valid triangle dimensions ✦</div>`;
        return;
      }

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Area</span>
            <span class="result-value large">
                ${fmt.number(area, 2)}
                <button class="copy-btn" onclick="copyValue(this,'${fmt.number(area, 2)}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Perimeter</span>
            <span class="result-value">${perimeter !== null ? fmt.number(perimeter, 2) : '—'}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Mode</span>
            <span class="result-value" style="font-size:1rem;">${mode === 'bh' ? 'Base/Height' : mode === 'sss' ? '3 Sides (Heron)' : 'Equilateral'}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('triangle');
    };

    container.querySelectorAll('input').forEach(el => el.addEventListener('input', calc));
    calc();
  },

  seoContent: `
    <p>A triangle is a polygon with three sides and three angles. It is the simplest closed polygon and appears everywhere in nature, architecture, and engineering — from structural trusses and bridge designs to mountain silhouettes and the pyramids of Egypt. Understanding a triangle's area and perimeter is a foundational geometry skill used in construction, land surveying, navigation, and physics.</p>

    <h3>Triangle Classification</h3>
    <p>Triangles are classified in two ways — by their sides and by their angles:</p>
    <ul>
      <li><strong>Equilateral:</strong> All three sides are equal; all three interior angles are exactly 60°.</li>
      <li><strong>Isosceles:</strong> Two sides are equal; the base angles (opposite the equal sides) are also equal.</li>
      <li><strong>Scalene:</strong> All three sides are different lengths; all three angles are different.</li>
      <li><strong>Right Triangle:</strong> One angle is exactly 90°. The hypotenuse (longest side) satisfies the Pythagorean Theorem: a² + b² = c².</li>
      <li><strong>Obtuse Triangle:</strong> One angle is greater than 90°.</li>
      <li><strong>Acute Triangle:</strong> All three angles are less than 90°.</li>
    </ul>

    <h3>Area Formulas</h3>
    <ul>
      <li><strong>Base and Height:</strong> Area = ½ × base × height. This is the most common formula. The height must be perpendicular to the base.</li>
      <li><strong>Heron's Formula (3 sides):</strong> First compute the semi-perimeter s = (a + b + c) / 2. Then Area = √[s(s−a)(s−b)(s−c)]. Useful when you know all side lengths but not the height.</li>
      <li><strong>Equilateral Triangle:</strong> Area = (√3 / 4) × side². Since all sides are equal, this simplifies the calculation significantly.</li>
      <li><strong>SAS (Side-Angle-Side):</strong> Area = ½ × a × b × sin(C), where C is the included angle. Useful in trigonometry applications.</li>
    </ul>

    <h3>The Triangle Inequality Theorem</h3>
    <p>For a valid triangle to exist, the sum of the lengths of any two sides must be strictly greater than the length of the third side. In notation: a + b > c, a + c > b, and b + c > a. If you enter three sides that violate this rule — for example, 1, 2, and 10 — no valid triangle can be formed, and the calculator will indicate invalid input.</p>

    <h3>The Pythagorean Theorem</h3>
    <p>For right triangles specifically, the relationship between the three sides is a² + b² = c², where c is the hypotenuse. This theorem, proven by ancient Greek mathematicians and independently discovered by multiple civilizations, is arguably the most famous equation in geometry. It underpins everything from GPS satellite calculations to screen resolution design.</p>

    <h3>Interior Angle Sum Rule</h3>
    <p>Regardless of the type of triangle, the three interior angles always sum to exactly 180°. This rule is a direct consequence of Euclidean geometry and is used extensively to find unknown angles when two are known.</p>

    <details>
      <summary>❓ What is the perimeter of a triangle?</summary>
      <p>The perimeter is simply the sum of all three side lengths: P = a + b + c. It represents the total length of the boundary of the shape. To calculate the perimeter using only base and height is not possible without additional information about the other sides.</p>
    </details>
    <details>
      <summary>❓ What if I only have two sides and an angle?</summary>
      <p>Use the Law of Cosines: c² = a² + b² − 2ab·cos(C). This extends the Pythagorean theorem to non-right triangles and allows you to find the third side when you know two sides and the included angle. Alternatively, the Law of Sines (a/sin A = b/sin B = c/sin C) is helpful when you know two angles and one side.</p>
    </details>
    <details>
      <summary>❓ Why do triangles appear so often in engineering?</summary>
      <p>Triangles are the only polygon that is inherently rigid. A square can be deformed into a parallelogram under pressure, but a triangle with fixed side lengths cannot change shape. This makes triangular trusses the foundation of bridges, roofs, and steel towers — they distribute forces efficiently without deforming.</p>
    </details>
    <details>
      <summary>❓ Can two triangles have the same area but different shapes?</summary>
      <p>Yes. Two triangles with the same area are not necessarily congruent or similar. For example, a very flat, wide triangle and a tall, narrow triangle can both have an area of 12 sq ft, but their side lengths and angles will be completely different.</p>
    </details>
  `
});
