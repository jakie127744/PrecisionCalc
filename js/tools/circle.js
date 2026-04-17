/**
 * PrecisionCalc — Circle Area & Circumference Calculator
 * Formula: Area = πr², Circumference = 2πr
 */
registerTool({
  id: 'circle',
  name: 'Circle Calculator',
  category: 'Math',
  icon: '◯',
  materialIcon: 'circle',
  tagline: 'Calculate area and circumference of a circle.',
  keywords: ['circle', 'area', 'circumference', 'radius', 'diameter', 'geometry', 'pi'],
  meta: {
    title: 'Circle Calculator — PrecisionCalc',
    description: 'Calculate the area and circumference of a circle using radius or diameter. Free online circle calculator.'
  },

  template: () => `
    <div class="toggle-row" style="gap:8px;">
      <span>Input:</span>
      <div class="toggle-btn" id="circle-mode-toggle">
        <button id="circle-mode-radius" class="active" onclick="circleSetMode('radius')">Radius</button>
        <button id="circle-mode-diameter" onclick="circleSetMode('diameter')">Diameter</button>
      </div>
    </div>
    <div id="circle-fields-radius">
      <div class="form-row single">
        <div class="field">
          <label for="circle-radius">Radius</label>
          <input type="number" id="circle-radius" placeholder="5" min="0" value="5" />
        </div>
      </div>
    </div>
    <div id="circle-fields-diameter" style="display:none">
      <div class="form-row single">
        <div class="field">
          <label for="circle-diameter">Diameter</label>
          <input type="number" id="circle-diameter" placeholder="10" min="0" value="10" />
        </div>
      </div>
    </div>
  `,

  mount(container) {
    const radiusInput = container.querySelector('#circle-radius');
    const diameterInput = container.querySelector('#circle-diameter');
    const resultCard = container.querySelector('#result-card-circle');

    window.circleSetMode = (mode) => {
      container.querySelector('#circle-fields-radius').style.display = mode === 'radius' ? '' : 'none';
      container.querySelector('#circle-fields-diameter').style.display = mode === 'diameter' ? '' : 'none';
      container.querySelector('#circle-mode-radius').classList.toggle('active', mode === 'radius');
      container.querySelector('#circle-mode-diameter').classList.toggle('active', mode === 'diameter');
      calc();
    };

    const calc = () => {
      const mode = container.querySelector('#circle-mode-radius').classList.contains('active') ? 'radius' : 'diameter';
      let r = 0;
      if (mode === 'radius') {
          r = parseFloat(radiusInput.value) || 0;
      } else {
          r = (parseFloat(diameterInput.value) || 0) / 2;
      }

      if (r <= 0) {
        resultCard.innerHTML = `<div class="result-placeholder">Enter ${mode} to see dimensions ✦</div>`;
        return;
      }

      const d = 2 * r;
      const c = 2 * Math.PI * r;
      const a = Math.PI * r * r;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Area</span>
            <span class="result-value large">
              ${fmt.number(a, 2)}
              <button class="copy-btn" onclick="copyValue(this,'${fmt.number(a, 2)}')" title="Copy">📋</button>
            </span>
            <span class="result-sub">π × r²</span>
          </div>
          <div class="result-item">
            <span class="result-label">Circumference</span>
            <span class="result-value">${fmt.number(c, 2)}</span>
            <span class="result-sub">2 × π × r</span>
          </div>
          <div class="result-item">
            <span class="result-label">Radius / Diameter</span>
            <span class="result-value">${fmt.number(r, 2)} / ${fmt.number(d, 2)}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('circle');
    };

    radiusInput.addEventListener('input', calc);
    diameterInput.addEventListener('input', calc);
    calc();
  },

  seoContent: `
    <p>A circle is a shape consisting of all points in a plane that are at a given distance from a given point, the center. The distance around the circle is called the circumference, and the space inside it is the area.</p>

    <h3>Circle Formulas</h3>
    <ul>
      <li><strong>Diameter (d):</strong> 2 × radius (r)</li>
      <li><strong>Circumference (C):</strong> 2 × π × r (or π × d)</li>
      <li><strong>Area (A):</strong> π × r²</li>
    </ul>

    <h3>Understanding Pi (π)</h3>
    <p>Pi is an irrational number approximately equal to 3.14159. It represents the ratio of any circle's circumference to its diameter. No matter how big or small the circle, this ratio remains constant.</p>

    <details>
      <summary>❓ What is the difference between radius and diameter?</summary>
      <p>The radius is the distance from the center to the edge. The diameter is the distance across the circle through the center—exactly twice the radius.</p>
    </details>
  `
});
