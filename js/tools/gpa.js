/**
 * PrecisionCalc — GPA/CGPA Calculator
 * Supports up to 10 subjects/semesters.
 */
registerTool({
  id:       'gpa',
  name:     'GPA/CGPA Calculator',
  category: 'Education',
  icon:         '\ud83d\udcda',
  materialIcon: 'school',
  tagline:  'Calculate your GPA or CGPA from grades and credits.',
  keywords: ['gpa', 'cgpa', 'grade point average', 'cumulative', 'university', 'college', 'grades', 'credits'],
  meta: {
    title:       'GPA/CGPA Calculator — PrecisionCalc',
    description: 'Calculate your GPA or CGPA from grades and credits for up to 10 subjects or semesters.'
  },

  template: () => `
    <div class=\"form-row\" style=\"flex-direction:column;gap:8px;\">
      <div id=\"gpa-rows\"></div>
      <button type=\"button\" id=\"gpa-add-row\">+ Add Subject/Semester</button>
    </div>
  `,

  mount(container) {
    const gpaRows = container.querySelector('#gpa-rows');
    let rows = 5;
    const maxRows = 10;
    function renderRows() {
      gpaRows.innerHTML = '';
      for (let i = 0; i < rows; i++) {
        gpaRows.innerHTML += `
          <div class=\"form-row\" style=\"gap:8px;\">
            <div class=\"field\">
              <label>Grade</label>
              <input type=\"number\" min=\"0\" max=\"10\" step=\"0.01\" class=\"gpa-grade\" value=\"0\" />
            </div>
            <div class=\"field\">
              <label>Credits</label>
              <input type=\"number\" min=\"0\" max=\"10\" step=\"0.01\" class=\"gpa-credit\" value=\"0\" />
            </div>
          </div>
        `;
      }
    }
    renderRows();
    container.querySelector('#gpa-add-row').onclick = () => {
      if (rows < maxRows) {
        rows++;
        renderRows();
      }
    };
    const calc = () => {
      const grades = Array.from(container.querySelectorAll('.gpa-grade')).map(x => parseFloat(x.value) || 0);
      const credits = Array.from(container.querySelectorAll('.gpa-credit')).map(x => parseFloat(x.value) || 0);
      let totalCredits = 0, totalPoints = 0;
      for (let i = 0; i < grades.length; i++) {
        totalCredits += credits[i];
        totalPoints += grades[i] * credits[i];
      }
      if (totalCredits === 0) return '';
      const gpa = totalPoints / totalCredits;
      return `<div class=\"result-card\"><b>GPA/CGPA:</b> ${gpa.toFixed(2)}</div>`;
    };
    container.innerHTML += `<div id=\"result-card-gpa\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-gpa').innerHTML = calc();
    });
    container.querySelector('#result-card-gpa').innerHTML = calc();
  }
  ,
    seoContent: `
      <p>The GPA/CGPA Calculator is an essential tool for students, parents, and educators who want to track academic performance and set educational goals. GPA (Grade Point Average) and CGPA (Cumulative Grade Point Average) are widely used metrics in schools, colleges, and universities to summarize a student’s academic achievement over a term, semester, or entire program. Understanding how these averages are calculated can help you plan your studies, apply for scholarships, and meet graduation requirements.</p>

      <h3>What Is GPA and CGPA?</h3>
      <ul>
        <li><strong>GPA:</strong> The average of grade points earned in a single term or semester, weighted by the number of credits for each course.</li>
        <li><strong>CGPA:</strong> The cumulative average of grade points across multiple terms or semesters, reflecting overall academic performance.</li>
      </ul>

      <h3>How the Calculator Works</h3>
      <ol>
        <li>Enter your grades and the corresponding credits for each subject or semester.</li>
        <li>The calculator multiplies each grade by its credit value, sums the results, and divides by the total credits to find your GPA or CGPA.</li>
        <li>You can add up to 10 subjects or semesters for a comprehensive calculation.</li>
      </ol>

      <h3>Why GPA/CGPA Matters</h3>
      <ul>
        <li><strong>Academic Standing:</strong> Many institutions use GPA/CGPA to determine honors, probation, or eligibility for advanced courses.</li>
        <li><strong>Scholarships & Admissions:</strong> Universities and scholarship committees often require a minimum GPA/CGPA for consideration.</li>
        <li><strong>Career Opportunities:</strong> Employers may ask for GPA/CGPA as part of job applications, especially for recent graduates.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>What grading scale does this calculator use?</summary>
        <p>This calculator is flexible and works with any 0–10 or 0–4 scale, as long as you enter grades and credits accurately. Check your institution’s grading policy for details.</p>
      </details>
      <details>
        <summary>How can I improve my GPA/CGPA?</summary>
        <p>Focus on courses with higher credit values, seek help in challenging subjects, and retake courses if allowed to replace low grades.</p>
      </details>
      <details>
        <summary>What’s the difference between GPA and CGPA?</summary>
        <p>GPA usually refers to a single term or semester, while CGPA covers all terms/semesters completed so far.</p>
      </details>

      <h3>Tips for Academic Success</h3>
      <ul>
        <li>Keep track of your grades and credits throughout the year to avoid surprises at the end of the term.</li>
        <li>Meet with academic advisors to set realistic goals and strategies for improvement.</li>
        <li>Use your GPA/CGPA to identify strengths and areas for growth in your studies.</li>
      </ul>

      <p>With the GPA/CGPA Calculator, you can take charge of your academic journey, make informed decisions, and achieve your educational aspirations. Try it now and see where you stand!</p>
    `
});
