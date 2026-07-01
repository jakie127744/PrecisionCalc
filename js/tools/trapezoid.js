/**
 * PrecisionCalc — Trapezoid Calculator
 * Area = (a + b) × h / 2, Perimeter = a + b + c + d
 */
registerTool({
  id: 'trapezoid',
  name: 'Trapezoid Calculator',
  category: 'Math',
  icon: '⏢',
  materialIcon: 'trending_flat',
  tagline: 'Calculate area and perimeter of a trapezoid.',
  keywords: ['trapezoid', 'area', 'perimeter', 'side', 'base', 'height', 'geometry'],
  meta: {
    title: 'Trapezoid Calculator — PrecisionCalc',
    description: 'Calculate the area and perimeter of a trapezoid using bases, sides, and height. Free online trapezoid calculator.'
  },

  seoContent: `
    <p>Look at a cross-section of an aqueduct canal, a highway overpass support, or a classic A-line skirt, and you're looking at a trapezoid — a shape engineers reach for constantly because a wider base and narrower top (or vice versa) distributes load and material more efficiently than a plain rectangle.</p>

    <h3>Why the Area Formula Uses an Average</h3>
    <div class="formula-block">Area = (a + b) ÷ 2 × h</div>
    <p>A trapezoid's area formula is essentially "average the two parallel sides, then multiply by height" — because a trapezoid can be thought of as sitting exactly between a rectangle (if the top equaled the bottom) and a triangle (if the top shrank to zero). Averaging the two bases captures that in-between geometry precisely. With the defaults (bases 8 and 5, height 6): Area = (8+5)/2 × 6 = 6.5 × 6 = 39 square units. Perimeter is simpler — just add all four sides: 8+5+4+3 = 20 units (using the default side lengths of 4 and 3).</p>

    <h3>Not All Four-Sided Shapes With Parallel Sides Are the Same</h3>
    <ul>
      <li><b>Trapezoid:</b> Exactly one pair of parallel sides (the two "bases"); the other two sides (the "legs") can be any length and aren't necessarily equal.</li>
      <li><b>Isosceles trapezoid:</b> A trapezoid whose two non-parallel legs are equal in length, giving it a mirror-symmetric appearance — common in architecture for aesthetic balance.</li>
      <li><b>Parallelogram:</b> Has <em>two</em> pairs of parallel sides, which is why it needs a different area formula (base × height, no averaging required).</li>
    </ul>

    <h3>Trapezoids Show Up in Calculus Too</h3>
    <p>The "trapezoidal rule" is a widely used numerical method for estimating the area under a curve: instead of one big trapezoid, you slice the region under the curve into many thin trapezoid-shaped strips, calculate each one's area with this same formula, and sum them. It's one of the simplest ways computers and calculators approximate definite integrals when an exact algebraic solution isn't practical.</p>

    <details>
      <summary>❓ What if I only know the two bases and the two legs, not the height?</summary>
      <p>You'd need to derive the height first, typically using the Pythagorean theorem on the right triangles formed by dropping perpendiculars from the shorter base to the longer one — this calculator requires height directly since that derivation depends on which leg configuration you have.</p>
    </details>
    <details>
      <summary>❓ Is a parallelogram also technically a trapezoid?</summary>
      <p>Under the "inclusive" definition of a trapezoid (at least one pair of parallel sides), yes — a parallelogram qualifies since it has two pairs. Under the stricter "exclusive" definition (exactly one pair), it does not. Different textbooks and countries use different conventions.</p>
    </details>
    <details>
      <summary>❓ Why do highway overpass supports often use a trapezoidal cross-section?</summary>
      <p>A trapezoid shape — wider at the base, narrower at the top — provides greater stability against tipping and better distributes the structure's weight into the foundation, compared to a uniform rectangular column of the same material volume.</p>
    </details>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="trapezoid-a">Base a</label>
        <input type="number" id="trapezoid-a" placeholder="8" min="0" value="8" />
      </div>
      <div class="field">
        <label for="trapezoid-b">Base b</label>
        <input type="number" id="trapezoid-b" placeholder="5" min="0" value="5" />
      </div>
      <div class="field">
        <label for="trapezoid-c">Side c</label>
        <input type="number" id="trapezoid-c" placeholder="4" min="0" value="4" />
      </div>
      <div class="field">
        <label for="trapezoid-d">Side d</label>
        <input type="number" id="trapezoid-d" placeholder="3" min="0" value="3" />
      </div>
      <div class="field">
        <label for="trapezoid-h">Height</label>
        <input type="number" id="trapezoid-h" placeholder="6" min="0" value="6" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-trapezoid');

    function trapezoidCalc() {
      const a = parseFloat(container.querySelector('#trapezoid-a').value) || 0;
      const b = parseFloat(container.querySelector('#trapezoid-b').value) || 0;
      const c = parseFloat(container.querySelector('#trapezoid-c').value) || 0;
      const d = parseFloat(container.querySelector('#trapezoid-d').value) || 0;
      const h = parseFloat(container.querySelector('#trapezoid-h').value) || 0;
      const area = (a + b) * h / 2;
      const perimeter = a + b + c + d;
      const valid = a > 0 && b > 0 && c > 0 && d > 0 && h > 0;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter all sides and height ✦</div>'; return; }
      resultCard.innerHTML = `<div><b>Area:</b> ${area.toFixed(4)}</div><div><b>Perimeter:</b> ${perimeter.toFixed(4)}</div>`;
      resultCard.classList.add('active');
      pulseResult('trapezoid');
    }
    container.addEventListener('input', trapezoidCalc);
    trapezoidCalc();
  }
});
