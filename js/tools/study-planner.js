/**
 * PrecisionCalc — Study Time Estimator
 * Estimates how many hours a week you should study based on credit hours and difficulty.
 */
registerTool({
  id:       'study-planner',
  name:     'Study Hour Planner',
  category: 'Education',
  icon:         '🕰️',
  materialIcon: 'more_time',
  tagline:  'Estimate weekly study hours needed per course.',
  keywords: ['study', 'hours', 'planner', 'time management', 'university', 'college', 'education'],
  meta: {
    title:       'Study Hour Planner — PrecisionCalc',
    description: 'Calculate how many hours you should study per week based on course credits and difficulty levels.'
  },

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="sp-credits">Course Credit Hours</label>
        <input type="number" id="sp-credits" placeholder="3" value="3" />
      </div>
      <div class="field">
        <label for="sp-difficulty">Course Difficulty (1-10)</label>
        <input type="range" id="sp-difficulty" min="1" max="10" value="5" />
        <span id="sp-diff-val" style="text-align:center; font-size:0.8rem; margin-top:4px;">Moderate (5/10)</span>
      </div>
      <div class="field">
        <label for="sp-target">Target Grade</label>
        <select id="sp-target" style="background:var(--surface-container); color:var(--on-surface); border-radius:var(--radius-md); padding:8px;">
          <option value="4">A (Excellent)</option>
          <option value="3" selected>B (Good)</option>
          <option value="2">C (Pass)</option>
        </select>
      </div>
    </div>
  `,

  mount(container) {
    const credInput = container.querySelector('#sp-credits');
    const diffInput = container.querySelector('#sp-difficulty');
    const targetInput = container.querySelector('#sp-target');
    const diffLabel = container.querySelector('#sp-diff-val');
    const resultCard = container.querySelector('#result-card-study-planner');

    const updateLabel = () => {
        const v = diffInput.value;
        let text = "Moderate";
        if (v < 4) text = "Easy";
        if (v > 7) text = "Hard";
        diffLabel.innerText = `${text} (${v}/10)`;
    };

    const calc = () => {
      const credits = parseFloat(credInput.value) || 0;
      const difficulty = parseFloat(diffInput.value) || 5;
      const target = parseFloat(targetInput.value) || 3;

      // Base formula: 2 hours per credit for 'B', scales by difficulty and target
      // Difficulty multiplier: 0.5 to 1.5
      // Target multiplier: A=1.5, B=1.0, C=0.7
      const diffMult = 0.5 + (difficulty / 10);
      const targetMult = target === 4 ? 1.5 : target === 3 ? 1.0 : 0.7;
      
      const studyHours = (credits * 2) * diffMult * targetMult;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Study Hours / Week</span>
            <span class="result-value large">
                ${fmt.number(studyHours, 1)} hrs
                <button class="copy-btn" onclick="copyValue(this,'${fmt.number(studyHours, 1)} hours')" title="Copy">📋</button>
            </span>
            <span class="result-sub">Outside of class time</span>
          </div>
          <div class="result-item">
            <span class="result-label">Daily Allocation</span>
            <span class="result-value">${fmt.number(studyHours / 7, 1)} hrs</span>
            <span class="result-sub">7 days a week</span>
          </div>
          <div class="result-item">
            <span class="result-label">Total Load</span>
            <span class="result-value">${fmt.number(studyHours + credits, 1)} hrs</span>
            <span class="result-sub">Class + Study</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('study-planner');
    };

    diffInput.addEventListener('input', () => { updateLabel(); calc(); });
    [credInput, targetInput].forEach(el => el.addEventListener('input', calc));

    updateLabel();
    calc();
  },

  seoContent: `
    <p>Time management is the single biggest factor in collegiate success. The Study Hour Planner helps you visualize your weekly commitment for each course, ensuring you don't overextend yourself during registration.</p>

    <h3>The 2:1 Rule</h3>
    <p>The standard academic recommendation is to study <b>2 hours for every 1 credit hour</b> of class. For a typical 3-credit course, this means 6 hours of homework and review per week. However, this varies significantly based on subject complexity.</p>

    <h3>Factors That Impact Study Time</h3>
    <ul>
      <li><strong>Prerequisite Knowledge:</strong> If you are taking a class without a strong foundation, expect to spend 25-50% more time on review.</li>
      <li><strong>Assessment Type:</strong> Lab-heavy or writing-intensive courses often require more hours than lecture-only courses.</li>
      <li><strong>Target Grade:</strong> Aiming for an 'A' usually requires consistent weekly review, whereas a 'Pass' might only require keeping up with assignments.</li>
    </ul>

    <details>
      <summary>❓ Is "Easy" really only 3 hours per week?</summary>
      <p>For some introductory courses or subjects you already excel in, 1 hour per credit might be enough. This tool provides an estimate; always adjust based on your actual experience in the first two weeks of class.</p>
    </details>
  `
});
