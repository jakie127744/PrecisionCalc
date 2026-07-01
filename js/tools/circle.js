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
    <p>A circle is a shape consisting of all points in a plane that are at a fixed distance from a central point. That distance is the radius, the boundary line around it is the circumference, and the flat space it encloses is the area. Circles show up everywhere from engineering and architecture to everyday cooking (pan sizes) and sports (track distances).</p>

    <h3>Circle Formulas</h3>
    <div class="formula-block">Area = π × r² &nbsp;|&nbsp; Circumference = 2 × π × r</div>
    <ul>
      <li><strong>Diameter (d):</strong> 2 × radius (r) — the full distance across the circle through its center.</li>
      <li><strong>Circumference (C):</strong> 2 × π × r, or equivalently π × d — the distance around the circle.</li>
      <li><strong>Area (A):</strong> π × r² — the space enclosed within the circle.</li>
    </ul>
    <p>For example, a circle with a radius of 5 units has an area of π × 5² ≈ 78.54 square units and a circumference of 2 × π × 5 ≈ 31.42 units.</p>

    <h3>Understanding Pi (π)</h3>
    <p>Pi is an irrational number, approximately 3.14159, representing the ratio of any circle's circumference to its diameter. No matter how large or small the circle — from a coin to a planet's orbit — this ratio never changes, which is what makes pi one of the most fundamental constants in mathematics.</p>

    <h3>Real-World Applications</h3>
    <ul>
      <li><b>Construction:</b> Calculating material needed for circular pools, tanks, or roundabouts.</li>
      <li><b>Manufacturing:</b> Determining pipe cross-sectional area for flow-rate calculations.</li>
      <li><b>Sports:</b> Measuring the circumference of a running track's curved sections.</li>
      <li><b>Everyday life:</b> Figuring out how much pizza (area) you're actually getting for the price, or how much fencing (circumference) a circular garden needs.</li>
    </ul>

    <details>
      <summary>❓ What is the difference between radius and diameter?</summary>
      <p>The radius is the distance from the center to the edge. The diameter is the distance across the circle through the center — exactly twice the radius. Most formulas use radius, so if you only know the diameter, halve it first.</p>
    </details>
    <details>
      <summary>❓ Why does area use r² but circumference only uses r?</summary>
      <p>Area measures two-dimensional space, so it scales with the square of the radius — doubling the radius quadruples the area. Circumference measures a one-dimensional distance around the edge, so it scales linearly — doubling the radius simply doubles the circumference.</p>
    </details>
    <details>
      <summary>❓ Is pi ever exactly 3.14?</summary>
      <p>No — pi is irrational, meaning its decimal digits continue forever without repeating. 3.14 and 22/7 are both common rounded approximations used for everyday calculations, but true precision work uses many more decimal places (this calculator uses JavaScript's built-in high-precision value of π).</p>
    </details>
  `
});
