/**
 * PrecisionCalc — Final Exam Grade Calculator
 * Calculates what score you need on the final to reach a target grade.
 */
registerTool({
  id:       'final-grade',
  name:     'Final Grade Goal',
  category: 'Education',
  icon:         '🎯',
  materialIcon: 'ads_click',
  tagline:  'Calculate the score you need on your final exam.',
  keywords: ['final', 'exam', 'grade', 'goal', 'score', 'education'],
  meta: {
    title:       'Final Exam Grade Calculator — PrecisionCalc',
    description: 'Find out exactly what score you need on your final exam to achieve your target course grade.'
  },

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="fg-current">Current Grade (%)</label>
        <input type="number" id="fg-current" placeholder="85" value="85" />
      </div>
      <div class="field">
        <label for="fg-target">Target Grade (%)</label>
        <input type="number" id="fg-target" placeholder="90" value="90" />
      </div>
      <div class="field">
        <label for="fg-weight">Final Exam Weight (%)</label>
        <input type="number" id="fg-weight" placeholder="20" value="20" />
      </div>
    </div>
  `,

  mount(container) {
    const ids = ['fg-current', 'fg-target', 'fg-weight'];
    const els = ids.map(id => container.querySelector(`#${id}`));
    const resultCard = container.querySelector('#result-card-final-grade');

    const calc = () => {
      const current = parseFloat(els[0].value) || 0;
      const target = parseFloat(els[1].value) || 0;
      const weight = parseFloat(els[2].value) || 0;

      if (weight <= 0 || weight >= 100) {
        resultCard.innerHTML = `<div class="result-placeholder">Enter a valid weight (1-99%) ✦</div>`;
        return;
      }

      // Goal = [Target - Current * (1 - Weight%)] / Weight%
      const wDec = weight / 100;
      const needed = (target - (current * (1 - wDec))) / wDec;

      let status = 'possible';
      let colorClass = 'success';
      if (needed > 100) { status = 'difficult'; colorClass = 'warning'; }
      if (needed > 110) { status = 'impossible'; colorClass = 'danger'; }
      if (needed <= 0) { status = 'already reached'; colorClass = 'success'; }

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Needed on Final</span>
            <span class="result-value large ${colorClass}">
                ${needed <= 0 ? '0' : fmt.number(needed, 1)}%
                <button class="copy-btn" onclick="copyValue(this,'${fmt.number(needed, 1)}%')" title="Copy">📋</button>
            </span>
            <span class="result-sub">Status: ${status}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Current Weight</span>
            <span class="result-value">${100 - weight}%</span>
            <span class="result-sub">Portion of grade already decided</span>
          </div>
          <div class="result-item">
            <span class="result-label">Difficulty</span>
            <span class="result-value">${needed > 100 ? 'Hard' : needed > 90 ? 'Challenging' : 'Achievable'}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('final-grade');
    };

    els.forEach(el => el.addEventListener('input', calc));
    calc();
  },

  seoContent: `
    <p>The "What do I need on my final?" question is a rite of passage for every student. This calculator takes the guesswork out of finals week by providing the exact score required to meet your academic goals.</p>

    <h3>The Calculation Logic</h3>
    <div class="formula-block">
      Final Score Needed = [Target Grade - Current Grade × (1 - Final Weight)] / Final Weight
    </div>
    <p>This formula determines the missing portion of your 100% grade total. It assumes your current grade is representative of the entire non-final portion of the course.</p>

    <h3>How to Improve Your Odds</h3>
    <ul>
      <li><strong>Check for Extra Credit:</strong> Some professors offer bonus points that aren't reflected in the syllabus weight.</li>
      <li><strong>Negotiate Weights:</strong> In rare cases, some instructors allow you to shift weights if you perform better on the final.</li>
      <li><strong>Start Early:</strong> Knowing you need a 98% is better than finding out the night before!</li>
    </ul>

    <details>
      <summary>❓ Can I get over 100%?</summary>
      <p>If the calculator says you need over 100%, you must rely on extra credit or high-scaling to reach your target grade.</p>
    </details>
  `
});
