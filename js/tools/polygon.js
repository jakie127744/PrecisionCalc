/**
 * PrecisionCalc — Regular Polygon Calculator
 * Area = (n × s²) / (4 × tan(π/n)), Perimeter = n × s
 * n = number of sides, s = side length
 */
registerTool({
  id: 'polygon',
  name: 'Regular Polygon Calculator',
  category: 'Math',
  icon: '⬟',
  materialIcon: 'hexagon',
  tagline: 'Calculate area and perimeter of a regular polygon.',
  keywords: ['polygon', 'regular polygon', 'area', 'perimeter', 'side', 'geometry', 'n-gon'],
  meta: {
    title: 'Regular Polygon Calculator — PrecisionCalc',
    description: 'Calculate the area and perimeter of a regular polygon (n sides). Free online polygon calculator.'
  },

  seoContent: `
    <p>Honeycombs are made of hexagons, not squares or octagons, for a precise mathematical reason: regular hexagons are the shape that tiles a flat surface with zero wasted space while using the least total wall material to enclose a given area — a fact bees appear to have "discovered" through evolution long before Greek geometers formalized it.</p>

    <h3>Why the Formula Involves Tangent</h3>
    <div class="formula-block">Area = (n × s²) ÷ (4 × tan(π/n)) &nbsp;|&nbsp; Perimeter = n × s</div>
    <p>Every regular polygon can be split into n identical isosceles triangles, each with its apex at the center. The tangent function enters the formula because it relates each triangle's base (a side of the polygon) to the polygon's apothem (the perpendicular distance from center to a side) — computing one triangle's area and multiplying by n gives the full polygon area. For the default hexagon (n=6, s=4): Area = (6 × 16) ÷ (4 × tan(30°)) = 96 ÷ 2.31 ≈ 41.57 square units, and Perimeter = 6 × 4 = 24 units.</p>

    <h3>As Sides Increase, a Polygon Approaches a Circle</h3>
    <p>As n grows larger and larger — 12 sides, then 100, then 10,000 — a regular polygon looks increasingly like a circle, and its area formula mathematically converges toward πr². This is exactly the geometric insight ancient mathematicians like Archimedes used to estimate π itself: by calculating the area of regular polygons with more and more sides inscribed in and circumscribed around a circle, squeezing the true value of π between two known bounds.</p>

    <h3>Regular Polygons in Design</h3>
    <ul>
      <li><b>Hexagons:</b> Used in honeycombs, nuts and bolts, and modern architectural facades because they tile perfectly with no gaps.</li>
      <li><b>Pentagons:</b> Cannot tile a flat plane without gaps or overlaps — the Pentagon building's shape is a rare intentional exception, chosen for site constraints rather than tiling efficiency.</li>
      <li><b>Octagons:</b> Used for stop signs specifically because the unique 8-sided shape remains recognizable even when partially obscured by snow or from odd viewing angles.</li>
    </ul>

    <details>
      <summary>❓ Why do only some regular polygons tile a flat surface perfectly?</summary>
      <p>A shape tiles a plane without gaps only if its interior angle divides evenly into 360°. Equilateral triangles (60°), squares (90°), and regular hexagons (120°) all satisfy this; regular pentagons (108°) and most other regular polygons do not.</p>
    </details>
    <details>
      <summary>❓ What is the apothem, and why isn't it an input here?</summary>
      <p>The apothem is the perpendicular distance from the polygon's center to the midpoint of a side. This calculator derives it internally using the tangent function from side length and number of sides, so you never need to measure or input it directly.</p>
    </details>
    <details>
      <summary>❓ Does the formula work for a triangle (n=3) or a square (n=4)?</summary>
      <p>Yes — plugging n=3 recovers the standard equilateral triangle area formula, and n=4 recovers the square area formula (side²), since both are just special cases of the general regular polygon formula.</p>
    </details>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="polygon-sides">Number of Sides (n)</label>
        <input type="number" id="polygon-sides" placeholder="6" min="3" value="6" />
      </div>
      <div class="field">
        <label for="polygon-side">Side Length (s)</label>
        <input type="number" id="polygon-side" placeholder="4" min="0" value="4" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-polygon');

    function polygonCalc() {
      const n = parseInt(container.querySelector('#polygon-sides').value) || 0;
      const s = parseFloat(container.querySelector('#polygon-side').value) || 0;
      const area = n >= 3 ? (n * s * s) / (4 * Math.tan(Math.PI / n)) : 0;
      const perimeter = n * s;
      const valid = n >= 3 && s > 0;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter sides (3+) and side length ✦</div>'; return; }
      resultCard.innerHTML = `<div><b>Area:</b> ${area.toFixed(4)}</div><div><b>Perimeter:</b> ${perimeter.toFixed(4)}</div>`;
      resultCard.classList.add('active');
      pulseResult('polygon');
    }
    container.addEventListener('input', polygonCalc);
    polygonCalc();
  }
});
