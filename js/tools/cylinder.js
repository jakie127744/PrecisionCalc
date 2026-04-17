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
    <h2>Cylinder Calculator</h2>
    <p>The Cylinder Calculator is a powerful online tool that allows you to calculate the surface area and volume of a cylinder with ease. Cylinders are three-dimensional geometric shapes with two parallel circular bases connected by a curved surface. They are commonly found in everyday objects such as cans, pipes, tanks, and columns. Understanding how to calculate the properties of a cylinder is essential for students, engineers, architects, and anyone working with cylindrical objects.</p>
    <p>To use this calculator, simply enter the radius and height of your cylinder. The surface area is calculated using the formula <b>Surface Area = 2πr(h + r)</b>, which measures the total area covering the outside of the cylinder. The volume is found using <b>Volume = πr²h</b>, representing the amount of space inside the cylinder. These calculations are useful for determining material requirements, storage capacity, or solving geometry problems.</p>
    <p>Cylinders have a wide range of applications. In engineering, they are used in the design of tanks, engines, and hydraulic systems. In construction, cylindrical columns provide structural support. In science, cylinders are used in experiments and measurements. Mastering the properties of cylinders helps build a strong foundation in geometry, physics, and engineering.</p>
    <p>This free online Cylinder Calculator is designed for accuracy, speed, and ease of use. It provides instant results and clear explanations, making it ideal for students, educators, and professionals. Whether you are working on a math assignment, designing a mechanical system, or exploring geometric concepts, this tool will save you time and help you avoid mistakes. Bookmark this page for quick access whenever you need to calculate the surface area or volume of a cylinder.</p>
    <ul>
      <li><b>Surface Area:</b> Calculates the total area covering the cylinder</li>
      <li><b>Volume:</b> Computes the space inside the cylinder</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Cylinder Calculator now and make your geometry, engineering, and design work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate cylinder calculations.</p>
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
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-cylinder';
    container.appendChild(resultCard);

    function cylinderCalc() {
      const r = parseFloat(container.querySelector('#cylinder-radius').value) || 0;
      const h = parseFloat(container.querySelector('#cylinder-height').value) || 0;
      const surface = 2 * Math.PI * r * (h + r);
      const volume = Math.PI * r * r * h;
      const valid = r > 0 && h > 0;
      resultCard.innerHTML = valid ? `<div class="result-card"><div><b>Surface Area:</b> ${surface.toFixed(4)}</div><div><b>Volume:</b> ${volume.toFixed(4)}</div></div>` : '';
    }
    container.addEventListener('input', cylinderCalc);
    cylinderCalc();
  }
});
