/**
 * PrecisionCalc — Ellipse Calculator
 * Area = πab, Circumference ≈ π[a + b] (Ramanujan approx)
 */
registerTool({
  id: 'ellipse',
  name: 'Ellipse Calculator',
  category: 'Math',
  icon: '⬭',
  materialIcon: 'circle',
  tagline: 'Calculate area and circumference of an ellipse.',
  keywords: ['ellipse', 'area', 'circumference', 'major axis', 'minor axis', 'geometry', 'pi'],
  meta: {
    title: 'Ellipse Calculator — PrecisionCalc',
    description: 'Calculate the area and circumference of an ellipse using major and minor axes. Free online ellipse calculator.'
  },

  seoContent: `
    <p>Every planet in the solar system, including Earth, orbits the sun in an ellipse, not a perfect circle — a fact Johannes Kepler proved in 1609 after years of painstaking analysis of Mars's orbital data, overturning nearly 2,000 years of assumed circular orbits. An ellipse is essentially a "stretched" circle, defined by two radii instead of one: a major axis (the longer one) and a minor axis (the shorter one).</p>

    <h3>Area Is Simple; Circumference Is Not</h3>
    <div class="formula-block">Area = π × a × b</div>
    <p>Unlike a circle, an ellipse has no exact closed-form formula for circumference — it requires an elliptic integral that can't be expressed with elementary functions. This calculator uses <b>Ramanujan's approximation</b>, one of the most accurate simple formulas available: Circumference ≈ π × [3(a+b) − √((3a+b)(a+3b))]. With the default major axis 7 and minor axis 4: Area = π × 7 × 4 ≈ 87.96 square units, and the Ramanujan circumference ≈ π × [3(11) − √((25)(19))] ≈ π × [33 − 21.79] ≈ 35.2 units — accurate to within a few thousandths of a percent of the true value for typical ellipses.</p>

    <h3>Eccentricity: How "Stretched" Is It?</h3>
    <p>An ellipse's eccentricity (e) measures how far it deviates from a perfect circle, ranging from 0 (a circle) to just under 1 (an extremely elongated oval). It's calculated as e = √(1 − b²/a²) when a is the longer axis. Earth's orbital eccentricity is only about 0.017 — nearly circular — while Halley's Comet has an eccentricity of about 0.967, an extremely elongated ellipse that takes it from near the sun out past Neptune's orbit.</p>

    <h3>Where Ellipses Appear</h3>
    <ul>
      <li><b>Astronomy:</b> Kepler's First Law states that every planetary orbit is an ellipse with the sun at one focus, not the center.</li>
      <li><b>Acoustics and optics:</b> "Whispering galleries" use elliptical rooms because sound (or light) originating at one focus reflects perfectly to the other focus.</li>
      <li><b>Engineering:</b> Elliptical gears convert constant rotational speed into variable speed, useful in certain mechanical linkages.</li>
    </ul>

    <details>
      <summary>❓ What are the "foci" of an ellipse?</summary>
      <p>Every ellipse has two special interior points called foci (singular: focus). The defining property of an ellipse is that the sum of the distances from any point on the curve to the two foci is always constant — this is literally how you can draw a perfect ellipse with two pins and a loop of string.</p>
    </details>
    <details>
      <summary>❓ Why isn't there an exact formula for circumference?</summary>
      <p>The circumference of an ellipse requires integrating the arc length along a curve whose curvature constantly changes in a non-repeating way — this integral (called an elliptic integral) cannot be solved in terms of standard algebraic or trigonometric functions, so mathematicians rely on series expansions or approximations like Ramanujan's instead.</p>
    </details>
    <details>
      <summary>❓ What happens if the major and minor axes are equal?</summary>
      <p>The ellipse becomes a circle — a circle is simply a special case of an ellipse where a = b, and both the area and circumference formulas simplify to the familiar πr² and 2πr.</p>
    </details>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="ellipse-a">Major Axis (a)</label>
        <input type="number" id="ellipse-a" placeholder="7" min="0" value="7" />
      </div>
      <div class="field">
        <label for="ellipse-b">Minor Axis (b)</label>
        <input type="number" id="ellipse-b" placeholder="4" min="0" value="4" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-ellipse');

    function ellipseCalc() {
      const a = parseFloat(container.querySelector('#ellipse-a').value) || 0;
      const b = parseFloat(container.querySelector('#ellipse-b').value) || 0;
      const area = Math.PI * a * b;
      // Ramanujan's approximation for circumference
      const circumference = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      const valid = a > 0 && b > 0;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter major and minor axis ✦</div>'; return; }
      resultCard.innerHTML = `<div><b>Area:</b> ${area.toFixed(4)}</div><div><b>Circumference:</b> ${circumference.toFixed(4)}</div>`;
      resultCard.classList.add('active');
      pulseResult('ellipse');
    }
    container.addEventListener('input', ellipseCalc);
    ellipseCalc();
  }
});
