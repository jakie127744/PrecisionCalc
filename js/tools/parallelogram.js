/**
 * PrecisionCalc — Parallelogram Area & Perimeter Calculator
 * Formula: Area = base × height, Perimeter = 2(a + b)
 */
registerTool({
  id: 'parallelogram',
  name: 'Parallelogram Calculator',
  category: 'Math',
  icon: '▰',
  materialIcon: 'rectangle',
  tagline: 'Calculate area and perimeter of a parallelogram.',
  keywords: ['parallelogram', 'area', 'perimeter', 'base', 'height', 'side', 'geometry'],
  meta: {
    title: 'Parallelogram Calculator — PrecisionCalc',
    description: 'Calculate the area and perimeter of a parallelogram using base, height, and sides. Free online parallelogram calculator.'
  },

  seoContent: `
    <p>Physics students meet the parallelogram long before geometry class ever mentions it by name — it's the shape traced out when you add two vectors "tip to tail," known as the parallelogram law of vector addition. Push a shopping cart at an angle and lean on it straight ahead at the same time, and the parallelogram spanned by those two forces shows you the actual direction the cart moves.</p>

    <h3>Area Depends Only on Base and Height — Not the Slant</h3>
    <div class="formula-block">Area = base × height &nbsp;|&nbsp; Perimeter = 2 × (base + side)</div>
    <p>With the default base 10, height 6, and side 8: Area = 10 × 6 = 60 square units, and Perimeter = 2 × (10 + 8) = 36 units. Notice the area formula doesn't use the side length at all — only the perpendicular height matters, not how "slanted" the parallelogram looks. You could shear a rectangle into an extremely tilted parallelogram and, as long as the base and perpendicular height stay the same, the area never changes.</p>

    <h3>Why Shearing Doesn't Change Area</h3>
    <p>Imagine a stack of cards forming a neat rectangle. Now push the top of the stack sideways so it leans — you've turned it into a parallelogram. No cards were added or removed, so the total area (equivalent to the number of cards) is unchanged, even though the shape now looks dramatically different and its perimeter has grown (since the slanted sides are now longer than the original vertical ones). This is exactly why the area formula ignores the side length.</p>

    <h3>Parallelogram Relatives</h3>
    <ul>
      <li><b>Rectangle:</b> A parallelogram where all interior angles are 90°.</li>
      <li><b>Rhombus:</b> A parallelogram where all four sides are equal in length.</li>
      <li><b>Square:</b> A parallelogram that is both a rectangle and a rhombus at once.</li>
    </ul>

    <details>
      <summary>❓ Do opposite angles in a parallelogram have any special relationship?</summary>
      <p>Yes — opposite angles are always equal, and any two adjacent (consecutive) angles always sum to 180°. This follows directly from the parallel-sides property and the rules of angles formed by a transversal line.</p>
    </details>
    <details>
      <summary>❓ Why can't I calculate area using just the two side lengths?</summary>
      <p>Two side lengths alone don't determine the shape — you could have a nearly-flat parallelogram or a nearly-rectangular one with the exact same two side lengths, and their areas would be very different. You need either the height or the angle between the sides to pin down the area.</p>
    </details>
    <details>
      <summary>❓ How would I find the area if I only know the sides and the angle between them?</summary>
      <p>Use Area = a × b × sin(θ), where a and b are adjacent side lengths and θ is the angle between them. This is mathematically equivalent to base × height, since b × sin(θ) is exactly the perpendicular height when b is the slanted side.</p>
    </details>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="parallelogram-base">Base</label>
        <input type="number" id="parallelogram-base" placeholder="10" min="0" value="10" />
      </div>
      <div class="field">
        <label for="parallelogram-height">Height</label>
        <input type="number" id="parallelogram-height" placeholder="6" min="0" value="6" />
      </div>
      <div class="field">
        <label for="parallelogram-side">Side</label>
        <input type="number" id="parallelogram-side" placeholder="8" min="0" value="8" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-parallelogram');

    function parallelogramCalc() {
      const base = parseFloat(container.querySelector('#parallelogram-base').value) || 0;
      const height = parseFloat(container.querySelector('#parallelogram-height').value) || 0;
      const side = parseFloat(container.querySelector('#parallelogram-side').value) || 0;
      const area = base * height;
      const perimeter = 2 * (base + side);
      const valid = base > 0 && height > 0 && side > 0;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter base, height, and side ✦</div>'; return; }
      resultCard.innerHTML = `<div><b>Area:</b> ${area.toFixed(4)}</div><div><b>Perimeter:</b> ${perimeter.toFixed(4)}</div>`;
      resultCard.classList.add('active');
      pulseResult('parallelogram');
    }
    container.addEventListener('input', parallelogramCalc);
    parallelogramCalc();
  }
});
