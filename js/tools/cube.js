/**
 * PrecisionCalc — Cube Calculator
 * Surface Area = 6a², Volume = a³
 */
registerTool({
  id: 'cube',
  name: 'Cube Calculator',
  category: 'Math',
  icon: '◼',
  materialIcon: 'check_box_outline_blank',
  tagline: 'Calculate surface area and volume of a cube.',
  keywords: ['cube', 'surface area', 'volume', 'side', 'geometry'],
  meta: {
    title: 'Cube Calculator — PrecisionCalc',
    description: 'Calculate the surface area and volume of a cube using side length. Free online cube calculator.'
  },

  seoContent: `
    <p>A cube is the simplest 3D shape to reason about, precisely because every one of its six faces, twelve edges, and eight corners is identical — a single measurement (the side length) is all you need to fully describe it. That simplicity is exactly why dice, sugar cubes, and shipping boxes default to this shape whenever uniformity matters more than efficiency.</p>

    <h3>The Two Formulas</h3>
    <div class="formula-block">Surface Area = 6 × side² &nbsp;|&nbsp; Volume = side³</div>
    <p>Surface area is simply the area of one square face (side²) multiplied by 6, since a cube has six identical faces. For the default side length of 5: surface area = 6 × 25 = 150 square units, and volume = 5³ = 125 cubic units. Notice these two numbers are close for small cubes, but volume grows much faster as the side increases — at side 10, surface area only reaches 600 while volume jumps to 1,000.</p>

    <h3>The "Cube-Square Law" in Practice</h3>
    <p>Because surface area scales with the square of the side length while volume scales with the cube, larger cubes have proportionally less surface area relative to their volume than smaller ones. This single relationship — sometimes called the square-cube law — explains phenomena as different as why elephants have thick legs relative to their body size (supporting cubed weight with only squared cross-sectional bone strength) and why large industrial ice cubes melt slower per unit of mass than small ones (less relative surface exposed to warm air).</p>

    <h3>Cube vs. Rectangular Prism (Box)</h3>
    <p>A cube is a special case of a rectangular prism (box) where all three dimensions — length, width, and height — happen to be equal. If you need to calculate a shape with different dimensions on each side, you'd want a general box/rectangular-prism formula (Volume = l × w × h) rather than this cube-specific calculator, which assumes all sides match.</p>

    <details>
      <summary>❓ Why do dice use a cube shape instead of another solid?</summary>
      <p>A cube has six congruent faces meeting at perfectly symmetric right angles, which guarantees each face has an exactly equal probability of landing face-up when rolled fairly — a property not guaranteed by irregular polyhedra.</p>
    </details>
    <details>
      <summary>❓ How many edges, faces, and vertices does a cube have?</summary>
      <p>A cube has 6 faces, 12 edges, and 8 vertices. This satisfies Euler's polyhedron formula: Vertices − Edges + Faces = 2 (8 − 12 + 6 = 2), which holds true for every convex polyhedron.</p>
    </details>
    <details>
      <summary>❓ If I double the side length, how much more paint would I need to cover it?</summary>
      <p>Exactly 4 times as much, since surface area scales with the square of the side length (2² = 4) — even though the cube itself would hold 8 times as much volume (2³ = 8).</p>
    </details>
  `,

  template: () => `
    <div class="form-row single">
      <div class="field">
        <label for="cube-side">Side</label>
        <input type="number" id="cube-side" placeholder="5" min="0" value="5" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-cube');

    function cubeCalc() {
      const a = parseFloat(container.querySelector('#cube-side').value) || 0;
      const surface = 6 * a * a;
      const volume = Math.pow(a, 3);
      const valid = a > 0;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter side length ✦</div>'; return; }
      resultCard.innerHTML = `<div><b>Surface Area:</b> ${surface.toFixed(4)}</div><div><b>Volume:</b> ${volume.toFixed(4)}</div>`;
      resultCard.classList.add('active');
      pulseResult('cube');
    }
    container.addEventListener('input', cubeCalc);
    cubeCalc();
  }
});
