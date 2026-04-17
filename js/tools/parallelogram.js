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
    <h2>Parallelogram Calculator</h2>
    <p>The Parallelogram Calculator is a comprehensive online tool designed to help you quickly and accurately determine the area and perimeter of any parallelogram. Parallelograms are four-sided polygons with opposite sides that are equal in length and parallel. They are a fundamental shape in geometry, appearing in mathematics, engineering, architecture, and everyday life. Understanding how to calculate the properties of a parallelogram is essential for students, teachers, professionals, and anyone working with geometric figures.</p>
    <p>To use this calculator, simply enter the base, height, and side length of your parallelogram. The area is calculated using the formula <b>Area = base × height</b>, which measures the space inside the parallelogram. The perimeter is found using <b>Perimeter = 2 × (base + side)</b>, representing the total distance around the shape. These calculations are useful for solving geometry problems, planning construction projects, or checking your work on homework and exams.</p>
    <p>Parallelograms have many practical applications. In architecture and engineering, they are used in the design of trusses, bridges, and frameworks. In art and design, parallelogram patterns create visually appealing tiling and tessellations. In physics, parallelograms are used to represent vectors and forces. Mastering the properties of parallelograms helps build a strong foundation in geometry and spatial reasoning.</p>
    <p>This free online Parallelogram Calculator is designed for accuracy, speed, and ease of use. It provides instant results and clear explanations, making it ideal for students, educators, and professionals alike. Whether you are working on a math assignment, designing a structure, or exploring geometric concepts, this tool will save you time and help you avoid mistakes. Bookmark this page for quick access whenever you need to calculate the area or perimeter of a parallelogram.</p>
    <ul>
      <li><b>Area:</b> Calculates the space inside the parallelogram using base and height</li>
      <li><b>Perimeter:</b> Computes the total distance around the parallelogram</li>
      <li><b>Step-by-step explanations and instant results</b></li>
    </ul>
    <p>Try the Parallelogram Calculator now and make your geometry, engineering, and design work easier and more efficient. If you find this tool helpful, please share it with classmates, colleagues, or anyone who could benefit from fast and accurate parallelogram calculations.</p>
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
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-parallelogram';
    container.appendChild(resultCard);

    function parallelogramCalc() {
      const base = parseFloat(container.querySelector('#parallelogram-base').value) || 0;
      const height = parseFloat(container.querySelector('#parallelogram-height').value) || 0;
      const side = parseFloat(container.querySelector('#parallelogram-side').value) || 0;
      const area = base * height;
      const perimeter = 2 * (base + side);
      const valid = base > 0 && height > 0 && side > 0;
      resultCard.innerHTML = valid ? `<div class="result-card"><div><b>Area:</b> ${area.toFixed(4)}</div><div><b>Perimeter:</b> ${perimeter.toFixed(4)}</div></div>` : '';
    }
    container.addEventListener('input', parallelogramCalc);
    parallelogramCalc();
  }
});
