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
    <h2>Trapezoid Calculator</h2>
    <p>The Trapezoid Calculator is a comprehensive online tool designed to help you quickly and accurately determine the area and perimeter of any trapezoid. Trapezoids are four-sided polygons with at least one pair of parallel sides, making them a unique and important shape in geometry. They are found in mathematics, engineering, architecture, and everyday life. Understanding how to calculate the properties of a trapezoid is essential for students, teachers, professionals, and anyone working with geometric figures.</p>
    <p>To use this calculator, simply enter the lengths of the two bases, the two sides, and the height of your trapezoid. The area is calculated using the formula <b>Area = (a + b) × h / 2</b>, which measures the space inside the trapezoid. The perimeter is found using <b>Perimeter = a + b + c + d</b>, representing the total distance around the shape. These calculations are useful for solving geometry problems, planning construction projects, or checking your work on homework and exams.</p>
    <p>Trapezoids have many practical applications. In architecture and engineering, they are used in the design of bridges, ramps, and supports. In art and design, trapezoid patterns create visually appealing tiling and tessellations. In mathematics, they are used to explore properties of parallel lines and angles. Mastering the properties of trapezoids helps build a strong foundation in geometry and spatial reasoning.</p>
    <p>This free online Trapezoid Calculator is designed for accuracy, speed, and ease of use. It provides instant results and clear explanations, making it ideal for students, educators, and professionals alike. Whether you are working on a math assignment, designing a structure, or exploring geometric concepts, this tool will save you time and help you avoid mistakes. Bookmark this page for quick access whenever you need to calculate the area or perimeter of a trapezoid.</p>
    <ul>
      <li><b>Area:</b> Calculates the space inside the trapezoid</li>
      <li><b>Perimeter:</b> Computes the total distance around the shape</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Trapezoid Calculator now and make your geometry, engineering, and design work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate trapezoid calculations.</p>
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
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-trapezoid';
    container.appendChild(resultCard);

    function trapezoidCalc() {
      const a = parseFloat(container.querySelector('#trapezoid-a').value) || 0;
      const b = parseFloat(container.querySelector('#trapezoid-b').value) || 0;
      const c = parseFloat(container.querySelector('#trapezoid-c').value) || 0;
      const d = parseFloat(container.querySelector('#trapezoid-d').value) || 0;
      const h = parseFloat(container.querySelector('#trapezoid-h').value) || 0;
      const area = (a + b) * h / 2;
      const perimeter = a + b + c + d;
      const valid = a > 0 && b > 0 && c > 0 && d > 0 && h > 0;
      resultCard.innerHTML = valid ? `<div class=\"result-card\"><div><b>Area:</b> ${area.toFixed(4)}</div><div><b>Perimeter:</b> ${perimeter.toFixed(4)}</div></div>` : '';
    }
    container.addEventListener('input', trapezoidCalc);
    trapezoidCalc();
  }
});
