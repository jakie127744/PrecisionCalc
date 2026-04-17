/**
 * PrecisionCalc — Regular Polygon Calculator
 * Area = (n × s²) / (4 × tan(π/n)), Perimeter = n × s
 * n = number of sides, s = side length
 */
registerTool({
  id: 'polygon',
  name: 'Regular Polygon Calculator',
  category: 'Math',
  icon: '⬟',
  materialIcon: 'hexagon',
  tagline: 'Calculate area and perimeter of a regular polygon.',
  keywords: ['polygon', 'regular polygon', 'area', 'perimeter', 'side', 'geometry', 'n-gon'],
  meta: {
    title: 'Regular Polygon Calculator — PrecisionCalc',
    description: 'Calculate the area and perimeter of a regular polygon (n sides). Free online polygon calculator.'
  },

  seoContent: `
    <h2>Regular Polygon Calculator</h2>
    <p>The Regular Polygon Calculator is a versatile online tool that helps you calculate the area and perimeter of any regular polygon, regardless of the number of sides. Regular polygons are geometric shapes with all sides and angles equal, such as equilateral triangles, squares, and regular hexagons. They are fundamental in geometry, mathematics, architecture, and design. Understanding how to calculate the properties of regular polygons is essential for students, teachers, professionals, and anyone working with geometric figures.</p>
    <p>To use this calculator, simply enter the number of sides (n) and the side length (s) of your polygon. The area is calculated using the formula <b>Area = (n × s²) / (4 × tan(π/n))</b>, which measures the space inside the polygon. The perimeter is found using <b>Perimeter = n × s</b>, representing the total distance around the shape. These calculations are useful for solving geometry problems, planning construction projects, or checking your work on homework and exams.</p>
    <p>Regular polygons have many practical applications. In architecture and engineering, they are used in the design of tiles, panels, and structures. In art and design, regular polygons create visually appealing patterns and tessellations. In mathematics, they are used to explore symmetry, angles, and geometric properties. Mastering the properties of regular polygons helps build a strong foundation in geometry and spatial reasoning.</p>
    <p>This free online Regular Polygon Calculator is designed for accuracy, speed, and ease of use. It provides instant results and clear explanations, making it ideal for students, educators, and professionals alike. Whether you are working on a math assignment, designing a structure, or exploring geometric concepts, this tool will save you time and help you avoid mistakes. Bookmark this page for quick access whenever you need to calculate the area or perimeter of a regular polygon.</p>
    <ul>
      <li><b>Area:</b> Calculates the space inside the regular polygon</li>
      <li><b>Perimeter:</b> Computes the total distance around the shape</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Regular Polygon Calculator now and make your geometry, engineering, and design work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate regular polygon calculations.</p>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="polygon-sides">Number of Sides (n)</label>
        <input type="number" id="polygon-sides" placeholder="6" min="3" value="6" />
      </div>
      <div class="field">
        <label for="polygon-side">Side Length (s)</label>
        <input type="number" id="polygon-side" placeholder="4" min="0" value="4" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-polygon';
    container.appendChild(resultCard);

    function polygonCalc() {
      const n = parseInt(container.querySelector('#polygon-sides').value) || 0;
      const s = parseFloat(container.querySelector('#polygon-side').value) || 0;
      const area = n >= 3 ? (n * s * s) / (4 * Math.tan(Math.PI / n)) : 0;
      const perimeter = n * s;
      const valid = n >= 3 && s > 0;
      resultCard.innerHTML = valid ? `<div class=\"result-card\"><div><b>Area:</b> ${area.toFixed(4)}</div><div><b>Perimeter:</b> ${perimeter.toFixed(4)}</div></div>` : '';
    }
    container.addEventListener('input', polygonCalc);
    polygonCalc();
  }
});
