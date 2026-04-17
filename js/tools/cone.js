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
    <h2>Cone Calculator</h2>
    <p>The Cone Calculator is a user-friendly online tool that allows you to calculate the surface area and volume of a cone. Cones are three-dimensional geometric shapes with a circular base and a single vertex, commonly found in objects like ice cream cones, traffic cones, and funnels. Understanding how to calculate the properties of a cone is essential for students, teachers, engineers, and anyone working with conical objects.</p>
    <p>To use this calculator, simply enter the radius and height of your cone. The surface area is calculated using the formula <b>Surface Area = πr(r + l)</b>, where l is the slant height, which can be found using the Pythagorean theorem. The volume is found using <b>Volume = (1/3)πr²h</b>, representing the amount of space inside the cone. These calculations are useful for determining material requirements, storage capacity, or solving geometry problems.</p>
    <p>Cones have a wide range of applications. In engineering, they are used in the design of funnels, hoppers, and nozzles. In construction, conical shapes are used in roofs and towers. In everyday life, cones are found in party hats, megaphones, and more. Mastering the properties of cones helps build a strong foundation in geometry, physics, and engineering.</p>
    <p>This free online Cone Calculator is designed for accuracy, speed, and ease of use. It provides instant results and clear explanations, making it ideal for students, educators, and professionals. Whether you are working on a math assignment, designing a mechanical system, or exploring geometric concepts, this tool will save you time and help you avoid mistakes. Bookmark this page for quick access whenever you need to calculate the surface area or volume of a cone.</p>
    <ul>
      <li><b>Surface Area:</b> Calculates the total area covering the cone</li>
      <li><b>Volume:</b> Computes the space inside the cone</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Cone Calculator now and make your geometry, engineering, and design work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate cone calculations.</p>
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
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-cone';
    container.appendChild(resultCard);

    function coneCalc() {
      const r = parseFloat(container.querySelector('#cone-radius').value) || 0;
      const h = parseFloat(container.querySelector('#cone-height').value) || 0;
      const l = Math.sqrt(r * r + h * h);
      const surface = Math.PI * r * (r + l);
      const volume = (1 / 3) * Math.PI * r * r * h;
      const valid = r > 0 && h > 0;
      resultCard.innerHTML = valid ? `<div class=\"result-card\"><div><b>Surface Area:</b> ${surface.toFixed(4)}</div><div><b>Volume:</b> ${volume.toFixed(4)}</div></div>` : '';
    }
    container.addEventListener('input', coneCalc);
    coneCalc();
  }
});
