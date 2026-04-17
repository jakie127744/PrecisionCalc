/**
 * PrecisionCalc — Rectangle/Square Calculator
 * Area = w × h, Perimeter = 2(w + h), Diagonal = sqrt(w² + h²)
 */
registerTool({
  id: 'rectangle',
  name: 'Rectangle/Square Calculator',
  category: 'Math',
  icon: '▭',
  materialIcon: 'rectangle',
  tagline: 'Calculate area, perimeter, and diagonal of a rectangle or square.',
  keywords: ['rectangle', 'square', 'area', 'perimeter', 'diagonal', 'geometry', 'width', 'height'],
  meta: {
    title: 'Rectangle/Square Calculator — PrecisionCalc',
    description: 'Calculate the area, perimeter, and diagonal of a rectangle or square. Free online rectangle and square calculator.'
  },

  seoContent: `
    <h2>Rectangle & Square Calculator</h2>
    <p>The Rectangle & Square Calculator is a versatile online tool that helps you calculate the area, perimeter, and diagonal of rectangles and squares. Rectangles and squares are fundamental shapes in geometry, appearing in mathematics, architecture, engineering, and everyday life. Understanding how to calculate their properties is essential for students, teachers, professionals, and anyone working with geometric figures.</p>
    <p>To use this calculator, simply enter the width and height of your rectangle or square. The area is calculated using the formula <b>Area = width × height</b>, which measures the space inside the shape. The perimeter is found using <b>Perimeter = 2 × (width + height)</b>, representing the total distance around the shape. The diagonal is calculated using <b>Diagonal = √(width² + height²)</b>, which measures the straight-line distance between opposite corners. These calculations are useful for solving geometry problems, planning construction projects, or checking your work on homework and exams.</p>
    <p>Rectangles and squares have many practical applications. In architecture and engineering, they are used in the design of rooms, buildings, and furniture. In art and design, rectangular and square patterns create visually appealing layouts. In everyday life, rectangles and squares are found in books, screens, tiles, and more. Mastering the properties of these shapes helps build a strong foundation in geometry and spatial reasoning.</p>
    <p>This free online Rectangle & Square Calculator is designed for accuracy, speed, and ease of use. It provides instant results and clear explanations, making it ideal for students, educators, and professionals alike. Whether you are working on a math assignment, designing a structure, or exploring geometric concepts, this tool will save you time and help you avoid mistakes. Bookmark this page for quick access whenever you need to calculate the area, perimeter, or diagonal of a rectangle or square.</p>
    <ul>
      <li><b>Area:</b> Calculates the space inside the rectangle or square</li>
      <li><b>Perimeter:</b> Computes the total distance around the shape</li>
      <li><b>Diagonal:</b> Measures the straight-line distance between opposite corners</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Rectangle & Square Calculator now and make your geometry, engineering, and design work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate rectangle and square calculations.</p>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="rectangle-width">Width</label>
        <input type="number" id="rectangle-width" placeholder="8" min="0" value="8" />
      </div>
      <div class="field">
        <label for="rectangle-height">Height</label>
        <input type="number" id="rectangle-height" placeholder="5" min="0" value="5" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-rectangle';
    container.appendChild(resultCard);

    function rectangleCalc() {
      const w = parseFloat(container.querySelector('#rectangle-width').value) || 0;
      const h = parseFloat(container.querySelector('#rectangle-height').value) || 0;
      const area = w * h;
      const perimeter = 2 * (w + h);
      const diagonal = Math.sqrt(w * w + h * h);
      const valid = w > 0 && h > 0;
      resultCard.innerHTML = valid ? `<div class=\"result-card\"><div><b>Area:</b> ${area.toFixed(4)}</div><div><b>Perimeter:</b> ${perimeter.toFixed(4)}</div><div><b>Diagonal:</b> ${diagonal.toFixed(4)}</div></div>` : '';
    }
    container.addEventListener('input', rectangleCalc);
    rectangleCalc();
  }
});
