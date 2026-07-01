/**
 * PrecisionCalc — Cylinder Surface Area & Volume Calculator
 * Formula: Surface Area = 2πr(h + r), Volume = πr²h
 */
registerTool({
  id: 'cylinder',
  name: 'Cylinder Calculator',
  category: 'Math',
  icon: '⏺',
  materialIcon: 'cylinder',
  tagline: 'Calculate surface area and volume of a cylinder.',
  keywords: ['cylinder', 'surface area', 'volume', 'radius', 'height', 'geometry', 'pi'],
  meta: {
    title: 'Cylinder Calculator — PrecisionCalc',
    description: 'Calculate the surface area and volume of a cylinder using radius and height. Free online cylinder calculator.'
  },

  seoContent: `
    <p>Soda cans, PVC pipes, water tanks, and drinking glasses all share one shape: two identical circles connected by a curved wall. Manufacturers love cylinders for a practical reason — a round cross-section handles internal pressure more evenly than a box shape, which is why virtually every pressurized container (propane tanks, soda cans, hydraulic cylinders) is round rather than square.</p>

    <h3>Breaking Down the Surface Area Formula</h3>
    <div class="formula-block">Surface Area = 2πr² (two circular ends) + 2πrh (the curved side) = 2πr(r + h)</div>
    <p>It helps to think of a cylinder's surface as three separate pieces you could physically cut apart: the top circle (πr²), the bottom circle (πr²), and the curved side — which, if you sliced it vertically and unrolled it flat, would form a rectangle with width equal to the circumference (2πr) and height h. For the default radius 5 and height 10: two circles = 2 × π × 25 ≈ 157.1, plus the unrolled side = 2π × 5 × 10 ≈ 314.2, totaling ≈ 471.2 square units. Volume is simpler: just the circular base area times height, π × 25 × 10 ≈ 785.4 cubic units.</p>

    <h3>Why Tall, Thin Cans Waste More Material Than You'd Expect</h3>
    <p>For a fixed volume, a cylinder's surface area (and therefore material cost) is minimized when its height equals its diameter. Most manufactured cans are taller and narrower than that ideal ratio, largely because tall, narrow shapes are easier to grip, stack, and display on shelves — a case where ergonomics and branding win out over pure material efficiency.</p>

    <h3>Common Cylinder Applications</h3>
    <ul>
      <li><b>Storage tanks:</b> Water towers and industrial tanks use cylindrical shapes for even pressure distribution.</li>
      <li><b>Mechanical engineering:</b> Pistons and hydraulic cylinders rely on precise cylindrical bores to maintain a tight seal.</li>
      <li><b>Everyday packaging:</b> Cans and bottles are cylindrical because the shape is easy to manufacture, fill, and seal consistently.</li>
    </ul>

    <details>
      <summary>❓ Why is the curved side treated as a rectangle when unrolled?</summary>
      <p>If you cut a cylinder's side straight down and flattened it, it forms a perfect rectangle with no stretching or distortion — the width equals the circle's circumference and the height equals the cylinder's height. This is a key trick for deriving many curved-surface formulas.</p>
    </details>
    <details>
      <summary>❓ Does a cylinder's volume formula change if it's tilted (oblique)?</summary>
      <p>No — like a cone, a cylinder's volume only depends on its base area and its perpendicular (vertical) height, not the angle of tilt. Cavalieri's principle guarantees this: any two solids with matching cross-sectional areas at every height have the same volume.</p>
    </details>
    <details>
      <summary>❓ How much does the top and bottom circles matter compared to the side?</summary>
      <p>It depends on the ratio of radius to height. For a very tall, thin cylinder, the curved side dominates surface area. For a short, wide cylinder (like a hockey puck), the two end circles can account for the majority of the surface area.</p>
    </details>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="cylinder-radius">Radius</label>
        <input type="number" id="cylinder-radius" placeholder="5" min="0" value="5" />
      </div>
      <div class="field">
        <label for="cylinder-height">Height</label>
        <input type="number" id="cylinder-height" placeholder="10" min="0" value="10" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-cylinder');

    function cylinderCalc() {
      const r = parseFloat(container.querySelector('#cylinder-radius').value) || 0;
      const h = parseFloat(container.querySelector('#cylinder-height').value) || 0;
      const surface = 2 * Math.PI * r * (h + r);
      const volume = Math.PI * r * r * h;
      const valid = r > 0 && h > 0;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter radius and height ✦</div>'; return; }
      resultCard.innerHTML = `<div><b>Surface Area:</b> ${surface.toFixed(4)}</div><div><b>Volume:</b> ${volume.toFixed(4)}</div>`;
      resultCard.classList.add('active');
      pulseResult('cylinder');
    }
    container.addEventListener('input', cylinderCalc);
    cylinderCalc();
  }
});
