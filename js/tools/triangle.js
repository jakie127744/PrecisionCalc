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
    <p>A triangle is a polygon with three edges and three vertices. It is one of the basic shapes in geometry. Understanding its properties like area and perimeter is fundamental for building, design, and physics.</p>

    <h3>Ways to Calculate Area</h3>
    <ul>
      <li><strong>Base and Height:</strong> The most common method. Area = 0.5 × base × height.</li>
      <li><strong>Three Sides (Heron's Formula):</strong> Used when you know all side lengths but not the height. First, find the semi-perimeter (s = (a+b+c)/2), then Area = √(s(s-a)(s-b)(s-c)).</li>
      <li><strong>Equilateral Triangle:</strong> If all sides are equal, Area = (√3 / 4) × side².</li>
    </ul>

    <h3>Triangle Inequality Theorem</h3>
    <p>For a triangle to exist, the sum of any two sides must be greater than the third side. If this condition isn't met (e.g., sides 1, 2, and 10), it is impossible to form a triangle.</p>

    <details>
      <summary>❓ What is the perimeter?</summary>
      <p>The perimeter is the total length of the boundary of the triangle, calculated by adding the lengths of all three sides (a + b + c).</p>
    </details>
    <details>
      <summary>❓ What if I only have two sides and an angle?</summary>
      <p>You can use the formula: Area = 0.5 × a × b × sin(C), where C is the included angle. For more advanced cases, use a specialized trigonometry calculator.</p>
    </details>
  `
});
