/**
 * PrecisionCalc — Sphere Calculator
 * Surface Area = 4πr², Volume = (4/3)πr³
 */
registerTool({
  id: 'sphere',
  name: 'Sphere Calculator',
  category: 'Math',
  icon: '⚪',
  materialIcon: 'circle',
  tagline: 'Calculate surface area and volume of a sphere.',
  keywords: ['sphere', 'surface area', 'volume', 'radius', 'geometry', 'pi'],
  meta: {
    title: 'Sphere Calculator — PrecisionCalc',
    description: 'Calculate the surface area and volume of a sphere using radius. Free online sphere calculator.'
  },

  seoContent: `
    <p>A sphere is the most "efficient" 3D shape possible — for a given volume, it has less surface area than any other solid. That's exactly why soap bubbles, water droplets, and stars all pull themselves into spheres: surface tension and gravity both minimize surface area for the volume they contain.</p>

    <h3>The Formulas</h3>
    <div class="formula-block">Surface Area = 4 × π × r² &nbsp;|&nbsp; Volume = (4/3) × π × r³</div>
    <p>With the default radius of 5: surface area = 4 × π × 25 ≈ 314.16 square units, and volume = (4/3) × π × 125 ≈ 523.6 cubic units. Notice the exponents — surface area scales with r², volume with r³. That difference in scaling is the whole story behind the next section.</p>

    <h3>Why Doubling the Radius Doesn't Just Double Everything</h3>
    <p>Because surface area depends on r² and volume on r³, doubling a sphere's radius quadruples its surface area but multiplies its volume by 8. This is why a beach ball (large volume relative to its surface) feels light and fragile, while a golf ball (small volume relative to its surface) feels dense — and it's the same reason small animals lose body heat faster than large ones (more skin surface per unit of body volume) and why cells can only grow so large before needing to divide (nutrient absorption depends on surface area, but metabolic demand scales with volume).</p>

    <h3>Spheres in the Real World</h3>
    <ul>
      <li><b>Astronomy:</b> Planets and stars form as spheres because gravity pulls mass symmetrically inward from every direction.</li>
      <li><b>Engineering:</b> Pressure vessels and gas tanks are often spherical because a sphere distributes internal pressure evenly across its surface, minimizing stress concentrations.</li>
      <li><b>Sports:</b> Balls are spheres specifically because that shape rolls and bounces predictably regardless of orientation.</li>
    </ul>

    <details>
      <summary>❓ Is a sphere the same as a circle?</summary>
      <p>No — a circle is a two-dimensional shape (a flat disc outline), while a sphere is the three-dimensional equivalent, like a ball. A sphere's cross-section through its center is a circle, which is often a source of confusion between the two.</p>
    </details>
    <details>
      <summary>❓ Why is 4πr² the surface area and not something involving r³?</summary>
      <p>Surface area measures a 2D quantity (the "skin" of the sphere), so it scales with the square of the radius, just like the area of a flat circle (πr²). Volume measures 3D space, so it scales with the cube of the radius. This r² vs. r³ distinction holds for area vs. volume in any 3D shape.</p>
    </details>
    <details>
      <summary>❓ How is the sphere volume formula actually derived?</summary>
      <p>One classic method (attributed to Archimedes) compares a hemisphere to a cylinder with a cone removed from it — both have the same cross-sectional area at every height, so by Cavalieri's principle they have equal volumes, which algebraically works out to the (4/3)πr³ formula. Archimedes considered this discovery so significant he requested a sphere inscribed in a cylinder be carved on his tombstone.</p>
    </details>
  `,

  template: () => `
    <div class="form-row single">
      <div class="field">
        <label for="sphere-radius">Radius</label>
        <input type="number" id="sphere-radius" placeholder="5" min="0" value="5" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-sphere');

    function sphereCalc() {
      const r = parseFloat(container.querySelector('#sphere-radius').value) || 0;
      const surface = 4 * Math.PI * r * r;
      const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
      const valid = r > 0;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter radius ✦</div>'; return; }
      resultCard.innerHTML = `<div><b>Surface Area:</b> ${surface.toFixed(4)}</div><div><b>Volume:</b> ${volume.toFixed(4)}</div>`;
      resultCard.classList.add('active');
      pulseResult('sphere');
    }
    container.addEventListener('input', sphereCalc);
    sphereCalc();
  }
});
