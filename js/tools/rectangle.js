/**
 * PrecisionCalc — Rectangle/Square Calculator
 * Area = w × h, Perimeter = 2(w + h), Diagonal = sqrt(w² + h²)
 */
registerTool({
  id: 'rectangle',
  name: 'Rectangle/Square Calculator',
  category: 'Math',
  icon: '▭',
  materialIcon: 'rectangle',
  tagline: 'Calculate area, perimeter, and diagonal of a rectangle or square.',
  keywords: ['rectangle', 'square', 'area', 'perimeter', 'diagonal', 'geometry', 'width', 'height'],
  meta: {
    title: 'Rectangle/Square Calculator — PrecisionCalc',
    description: 'Calculate the area, perimeter, and diagonal of a rectangle or square. Free online rectangle and square calculator.'
  },

  seoContent: `
    <p>Standard printer paper (8.5" × 11" in the US, A4 elsewhere), most TV and monitor screens, and nearly every door and window frame are rectangles — arguably the most-measured shape in daily life, precisely because it's the simplest way to divide space into predictable, stackable, buildable units.</p>

    <h3>Three Measurements, Three Formulas</h3>
    <div class="formula-block">Area = w × h &nbsp;|&nbsp; Perimeter = 2(w + h) &nbsp;|&nbsp; Diagonal = √(w² + h²)</div>
    <p>With the default width 8 and height 5: Area = 8 × 5 = 40 square units, Perimeter = 2(8+5) = 26 units, and Diagonal = √(64+25) = √89 ≈ 9.43 units. That diagonal formula is just the Pythagorean theorem in disguise — a rectangle's diagonal always forms the hypotenuse of a right triangle with the width and height as its two legs.</p>

    <h3>Why the Diagonal Matters More Than People Expect</h3>
    <p>TV and monitor sizes are always advertised by diagonal measurement, not width or height — a "55-inch TV" means the diagonal is 55 inches, which is why two TVs with the same diagonal but different aspect ratios (16:9 vs. 4:3) can have noticeably different actual screen areas. Carpenters and builders also rely on the diagonal for a classic trick: if a rectangular frame's two diagonals measure exactly equal, the frame is guaranteed to be a true rectangle with perfect 90° corners — a property that doesn't hold for a general parallelogram.</p>

    <h3>Square: The Special Case</h3>
    <p>A square is simply a rectangle where width equals height. All three formulas still apply — Area becomes side², Perimeter becomes 4 × side, and Diagonal becomes side × √2 — making the square the most symmetric member of the rectangle family, with four equal sides and four right angles.</p>

    <details>
      <summary>❓ Why is diagonal² = width² + height²?</summary>
      <p>A rectangle's diagonal splits it into two identical right triangles, where the width and height are the two legs and the diagonal is the hypotenuse — direct application of the Pythagorean theorem, a²+b²=c².</p>
    </details>
    <details>
      <summary>❓ Can two rectangles have the same area but different perimeters?</summary>
      <p>Yes, easily — a 4×9 rectangle and a 6×6 square both have an area of 36, but perimeters of 26 and 24 respectively. Among all rectangles with a fixed area, the square always has the smallest possible perimeter.</p>
    </details>
    <details>
      <summary>❓ How do carpenters use the "equal diagonals" trick to check for square corners?</summary>
      <p>After building a rectangular frame, measuring both diagonals corner-to-corner is a fast, accurate way to verify all four corners are true right angles — if the diagonals match exactly, the frame is guaranteed rectangular; if they differ, at least one corner is off.</p>
    </details>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="rectangle-width">Width</label>
        <input type="number" id="rectangle-width" placeholder="8" min="0" value="8" />
      </div>
      <div class="field">
        <label for="rectangle-height">Height</label>
        <input type="number" id="rectangle-height" placeholder="5" min="0" value="5" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-rectangle');

    function rectangleCalc() {
      const w = parseFloat(container.querySelector('#rectangle-width').value) || 0;
      const h = parseFloat(container.querySelector('#rectangle-height').value) || 0;
      const area = w * h;
      const perimeter = 2 * (w + h);
      const diagonal = Math.sqrt(w * w + h * h);
      const valid = w > 0 && h > 0;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter width and height ✦</div>'; return; }
      resultCard.innerHTML = `<div><b>Area:</b> ${area.toFixed(4)}</div><div><b>Perimeter:</b> ${perimeter.toFixed(4)}</div><div><b>Diagonal:</b> ${diagonal.toFixed(4)}</div>`;
      resultCard.classList.add('active');
      pulseResult('rectangle');
    }
    container.addEventListener('input', rectangleCalc);
    rectangleCalc();
  }
});
