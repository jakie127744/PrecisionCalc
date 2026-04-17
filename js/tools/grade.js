/**
 * PrecisionCalc — Weighted Grade Calculator
 * Calculates weighted average of grades.
 */
registerTool({
  id:       'grade',
  name:     'Weighted Grade Calc',
  category: 'Education',
  icon:         '📊',
  materialIcon: 'analytics',
  tagline:  'Calculate your weighted grade average.',
  keywords: ['grade', 'weighted', 'average', 'gpa', 'education', 'school'],
  meta: {
    title:       'Weighted Grade Calculator — PrecisionCalc',
    description: 'Calculate your final grade or semester average based on weighted assignments and exams.'
  },

  template: () => `
    <div class="form-row" style="flex-direction:column;gap:12px;">
      <div id="grade-rows"></div>
      <button type="button" class="secondary-btn" id="grade-add-row">+ Add Assessment</button>
    </div>
  `,

  mount(container) {
    const rowsCont = container.querySelector('#grade-rows');
    const resultCard = container.querySelector('#result-card-grade');
    let rowCount = 3;

    function renderRows() {
      rowsCont.innerHTML = '';
      for (let i = 0; i < rowCount; i++) {
        rowsCont.innerHTML += `
          <div class="form-row" style="gap:8px;">
            <div class="field" style="flex:2;">
              <label>Name (e.g. Midterm)</label>
              <input type="text" class="grade-name" placeholder="Item ${i+1}" />
            </div>
            <div class="field">
              <label>Score (%)</label>
              <input type="number" class="grade-score" min="0" max="100" value="90" />
            </div>
            <div class="field">
              <label>Weight (%)</label>
              <input type="number" class="grade-weight" min="0" max="100" value="25" />
            </div>
          </div>
        `;
      }
    }

    const calc = () => {
      const scores = Array.from(container.querySelectorAll('.grade-score')).map(el => parseFloat(el.value) || 0);
      const weights = Array.from(container.querySelectorAll('.grade-weight')).map(el => parseFloat(el.value) || 0);

      let totalWeight = 0;
      let weightedSum = 0;

      for (let i = 0; i < scores.length; i++) {
        weightedSum += scores[i] * (weights[i] / 100);
        totalWeight += weights[i];
      }

      if (totalWeight <= 0) {
        resultCard.innerHTML = `<div class="result-placeholder">Enter scores and weights ✦</div>`;
        return;
      }

      const finalGrade = weightedSum; // Normalizing to the proportion of weight entered
      const normalizedGrade = (weightedSum / totalWeight) * 100;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Weighted Grade</span>
            <span class="result-value large ${finalGrade >= 70 ? 'success' : 'warning'}">
                ${fmt.number(finalGrade, 2)}%
                <button class="copy-btn" onclick="copyValue(this,'${fmt.number(finalGrade, 2)}%')" title="Copy">📋</button>
            </span>
            <span class="result-sub">of 100% total available</span>
          </div>
          <div class="result-item">
            <span class="result-label">Average Performance</span>
            <span class="result-value">${fmt.number(normalizedGrade, 2)}%</span>
            <span class="result-sub">Average of components entered</span>
          </div>
          <div class="result-item">
            <span class="result-label">Total Weight</span>
            <span class="result-value">${totalWeight}%</span>
            <span class="result-sub">${totalWeight < 100 ? (100-totalWeight) + '% remaining' : 'Complete'}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('grade');
    };

    renderRows();
    container.querySelector('#grade-add-row').onclick = () => {
      rowCount++;
      renderRows();
      calc();
    };

    container.addEventListener('input', calc);
    calc();
  },

  seoContent: `
    <p>A Weighted Grade Calculator is an essential tool for students to track their academic progress throughout a semester. Unlike a simple average, a weighted average accounts for the relative importance of different assessments, such as finals, midterms, and weekly assignments.</p>

    <h3>How to Calculate Weighted Grades</h3>
    <p>To find your weighted grade, multiply each score by its percentage weight (as a decimal), and then sum those values. For example, if a midterm is worth 30% and you scored 90%, it contributes 27 points (90 x 0.3) to your final grade.</p>

    <h3>Tips for Using This Tool</h3>
    <ul>
      <li><strong>Check Your Syllabus:</strong> Always refer to the official weights provided by your instructor.</li>
      <li><strong>Handle Extra Credit:</strong> If you have extra credit, you can enter scores above 100% or weights that lead to a sum greater than 100%.</li>
      <li><strong>Plan Ahead:</strong> Use the tool to see how a potential score on an upcoming exam will impact your final grade.</li>
    </ul>

    <details>
      <summary>❓ What if my weights don't add up to 100%?</summary>
      <p>The tool shows your current weighted total. To see what your equivalent percentage is based <i>only</i> on completed work, look at the "Average Performance" value.</p>
    </details>
  `
});
