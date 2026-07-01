/**
 * PrecisionCalc — Cone Calculator
 * Surface Area = πr(r + l), Volume = (1/3)πr²h
 * l = slant height = sqrt(r² + h²)
 */
registerTool({
  id: 'cone',
  name: 'Cone Calculator',
  category: 'Math',
  icon: '🔺',
  materialIcon: 'change_history',
  tagline: 'Calculate surface area and volume of a cone.',
  keywords: ['cone', 'surface area', 'volume', 'radius', 'height', 'slant height', 'geometry', 'pi'],
  meta: {
    title: 'Cone Calculator — PrecisionCalc',
    description: 'Calculate the surface area and volume of a cone using radius and height. Free online cone calculator.'
  },

  seoContent: `
    <p>Ice cream scoops, traffic cones, funnels, and even volcano shapes are all approximations of the same solid: a circular base tapering to a single point. That taper is what makes a cone's surface area trickier than a cylinder's — you can't just wrap a flat rectangle around it the way you can a cylinder's side.</p>

    <h3>Volume and Surface Area</h3>
    <div class="formula-block">Volume = ⅓ × π × r² × h &nbsp;|&nbsp; Surface Area = π × r × (r + l), where l = √(r² + h²)</div>
    <p>The slant height <b>l</b> isn't an input you provide directly — it's derived from the radius and vertical height using the Pythagorean theorem, since the slant, radius, and height form a right triangle. For the default values here (radius 5, height 10): l = √(5² + 10²) = √125 ≈ 11.18, giving a volume of ⅓ × π × 25 × 10 ≈ 261.8 cubic units and a surface area of π × 5 × (5 + 11.18) ≈ 254.2 square units.</p>

    <h3>Why a Cone's Volume Is Exactly ⅓ of a Cylinder's</h3>
    <p>A cone and a cylinder sharing the same base radius and height have a precise relationship: the cone's volume is always exactly one-third the cylinder's. This isn't a coincidence — it's provable with calculus (integrating cross-sectional disc areas from the apex to the base) or demonstrated physically: fill a cone-shaped container with water and pour it into a same-sized cylinder three times to fill it exactly.</p>

    <h3>Where Cones Show Up</h3>
    <ul>
      <li><b>Manufacturing:</b> Hoppers and funnels use conical geometry so gravity feeds material toward a narrow outlet.</li>
      <li><b>Optics and acoustics:</b> Megaphones and speaker horns use a cone shape to direct and amplify sound waves.</li>
      <li><b>Nature:</b> Volcanoes, sand piles, and stalagmites naturally form conical shapes because loose material settles at a consistent angle of repose.</li>
    </ul>

    <details>
      <summary>❓ Why can't I just multiply the base circumference by the slant height for surface area?</summary>
      <p>Because the "unrolled" lateral surface of a cone isn't a rectangle — it's a sector of a circle with radius equal to the slant height. The formula πrl already accounts for this geometry correctly; a naive rectangle-based estimate would overstate the area.</p>
    </details>
    <details>
      <summary>❓ Does a taller, narrower cone always have less volume than a short, wide one?</summary>
      <p>Not necessarily — volume depends on r² × h, so radius matters more than height. Doubling the height only doubles the volume, but doubling the radius quadruples it. A short, wide cone can easily hold more than a tall, narrow one with the same slant height.</p>
    </details>
    <details>
      <summary>❓ What's the difference between a right cone and an oblique cone?</summary>
      <p>A right cone has its apex directly above the center of the circular base — this calculator assumes that shape. An oblique cone has its apex off to one side, which changes the surface area formula but not the volume formula (volume only depends on base area and perpendicular height, regardless of tilt).</p>
    </details>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="cone-radius">Radius</label>
        <input type="number" id="cone-radius" placeholder="5" min="0" value="5" />
      </div>
      <div class="field">
        <label for="cone-height">Height</label>
        <input type="number" id="cone-height" placeholder="10" min="0" value="10" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-cone');

    function coneCalc() {
      const r = parseFloat(container.querySelector('#cone-radius').value) || 0;
      const h = parseFloat(container.querySelector('#cone-height').value) || 0;
      const l = Math.sqrt(r * r + h * h);
      const surface = Math.PI * r * (r + l);
      const volume = (1 / 3) * Math.PI * r * r * h;
      const valid = r > 0 && h > 0;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter radius and height ✦</div>'; return; }
      resultCard.innerHTML = `<div><b>Surface Area:</b> ${surface.toFixed(4)}</div><div><b>Volume:</b> ${volume.toFixed(4)}</div>`;
      resultCard.classList.add('active');
      pulseResult('cone');
    }
    container.addEventListener('input', coneCalc);
    coneCalc();
  }
});
