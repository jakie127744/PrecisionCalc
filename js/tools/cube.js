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
    <h2>Cube Calculator</h2>
    <p>The Cube Calculator is a specialized online tool that enables you to calculate the surface area and volume of a cube with ease. Cubes are three-dimensional geometric shapes with six equal square faces, and they are fundamental in geometry, mathematics, engineering, and design. Understanding how to calculate the properties of a cube is essential for students, teachers, engineers, and anyone working with cubic objects.</p>
    <p>To use this calculator, simply enter the side length of your cube. The surface area is calculated using the formula <b>Surface Area = 6 × side²</b>, which measures the total area covering the outside of the cube. The volume is found using <b>Volume = side³</b>, representing the amount of space inside the cube. These calculations are useful for determining material requirements, storage capacity, or solving geometry problems.</p>
    <p>Cubes have a wide range of applications. In engineering, they are used in the design of containers, boxes, and building blocks. In mathematics, cubes are used to teach concepts of volume and surface area. In everyday life, cubes are found in dice, ice cubes, and packaging. Mastering the properties of cubes helps build a strong foundation in geometry, mathematics, and engineering.</p>
    <p>This free online Cube Calculator is designed for accuracy, speed, and ease of use. It provides instant results and clear explanations, making it ideal for students, educators, and professionals. Whether you are working on a math assignment, designing a structure, or exploring geometric concepts, this tool will save you time and help you avoid mistakes. Bookmark this page for quick access whenever you need to calculate the surface area or volume of a cube.</p>
    <ul>
      <li><b>Surface Area:</b> Calculates the total area covering the cube</li>
      <li><b>Volume:</b> Computes the space inside the cube</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Cube Calculator now and make your geometry, mathematics, and design work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate cube calculations.</p>
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
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-cube';
    container.appendChild(resultCard);

    function cubeCalc() {
      const a = parseFloat(container.querySelector('#cube-side').value) || 0;
      const surface = 6 * a * a;
      const volume = Math.pow(a, 3);
      const valid = a > 0;
      resultCard.innerHTML = valid ? `<div class=\"result-card\"><div><b>Surface Area:</b> ${surface.toFixed(4)}</div><div><b>Volume:</b> ${volume.toFixed(4)}</div></div>` : '';
    }
    container.addEventListener('input', cubeCalc);
    cubeCalc();
  }
});
