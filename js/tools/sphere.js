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
    <h2>Sphere Calculator</h2>
    <p>The Sphere Calculator is a specialized online tool that enables you to calculate the surface area and volume of a sphere with ease. Spheres are perfectly round three-dimensional shapes, like balls or planets, and are fundamental in geometry, physics, engineering, and astronomy. Understanding how to calculate the properties of a sphere is essential for students, teachers, scientists, and anyone working with spherical objects.</p>
    <p>To use this calculator, simply enter the radius of your sphere. The surface area is calculated using the formula <b>Surface Area = 4πr²</b>, which measures the total area covering the outside of the sphere. The volume is found using <b>Volume = (4/3)πr³</b>, representing the amount of space inside the sphere. These calculations are useful for determining material requirements, storage capacity, or solving geometry and physics problems.</p>
    <p>Spheres have a wide range of applications. In science, they are used to model planets, atoms, and bubbles. In engineering, spheres are used in the design of tanks, bearings, and domes. In everyday life, spheres are found in sports balls, ornaments, and more. Mastering the properties of spheres helps build a strong foundation in geometry, physics, and engineering.</p>
    <p>This free online Sphere Calculator is designed for accuracy, speed, and ease of use. It provides instant results and clear explanations, making it ideal for students, educators, and professionals. Whether you are working on a math assignment, designing a mechanical system, or exploring geometric concepts, this tool will save you time and help you avoid mistakes. Bookmark this page for quick access whenever you need to calculate the surface area or volume of a sphere.</p>
    <ul>
      <li><b>Surface Area:</b> Calculates the total area covering the sphere</li>
      <li><b>Volume:</b> Computes the space inside the sphere</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Sphere Calculator now and make your geometry, science, and engineering work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate sphere calculations.</p>
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
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-sphere';
    container.appendChild(resultCard);

    function sphereCalc() {
      const r = parseFloat(container.querySelector('#sphere-radius').value) || 0;
      const surface = 4 * Math.PI * r * r;
      const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
      const valid = r > 0;
      resultCard.innerHTML = valid ? `<div class=\"result-card\"><div><b>Surface Area:</b> ${surface.toFixed(4)}</div><div><b>Volume:</b> ${volume.toFixed(4)}</div></div>` : '';
    }
    container.addEventListener('input', sphereCalc);
    sphereCalc();
  }
});
