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
    <h2>Ellipse Calculator</h2>
    <p>The Ellipse Calculator is a specialized online tool that enables you to calculate the area and circumference of an ellipse with ease. Ellipses are oval-shaped curves, defined by their major and minor axes, and are fundamental in geometry, astronomy, engineering, and design. Understanding how to calculate the properties of an ellipse is essential for students, teachers, scientists, and anyone working with elliptical shapes.</p>
    <p>To use this calculator, simply enter the lengths of the major axis (a) and minor axis (b) of your ellipse. The area is calculated using the formula <b>Area = πab</b>, which measures the space inside the ellipse. The circumference is approximated using <b>Circumference ≈ π[a + b]</b> (Ramanujan's approximation), representing the distance around the ellipse. These calculations are useful for determining material requirements, solving geometry problems, or checking your work on homework and exams.</p>
    <p>Ellipses have a wide range of applications. In astronomy, they describe the orbits of planets and comets. In engineering, ellipses are used in the design of gears, cams, and reflectors. In art and design, ellipses create visually appealing shapes and patterns. Mastering the properties of ellipses helps build a strong foundation in geometry, physics, and engineering.</p>
    <p>This free online Ellipse Calculator is designed for accuracy, speed, and ease of use. It provides instant results and clear explanations, making it ideal for students, educators, and professionals. Whether you are working on a math assignment, designing a mechanical system, or exploring geometric concepts, this tool will save you time and help you avoid mistakes. Bookmark this page for quick access whenever you need to calculate the area or circumference of an ellipse.</p>
    <ul>
      <li><b>Area:</b> Calculates the space inside the ellipse</li>
      <li><b>Circumference:</b> Approximates the distance around the ellipse</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Ellipse Calculator now and make your geometry, science, and engineering work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate ellipse calculations.</p>
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
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-ellipse';
    container.appendChild(resultCard);

    function ellipseCalc() {
      const a = parseFloat(container.querySelector('#ellipse-a').value) || 0;
      const b = parseFloat(container.querySelector('#ellipse-b').value) || 0;
      const area = Math.PI * a * b;
      // Ramanujan's approximation for circumference
      const circumference = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      const valid = a > 0 && b > 0;
      resultCard.innerHTML = valid ? `<div class=\"result-card\"><div><b>Area:</b> ${area.toFixed(4)}</div><div><b>Circumference:</b> ${circumference.toFixed(4)}</div></div>` : '';
    }
    container.addEventListener('input', ellipseCalc);
    ellipseCalc();
  }
});
