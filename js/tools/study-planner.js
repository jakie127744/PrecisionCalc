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
    <p>Effective time management is one of the most reliable predictors of academic success in university and college settings. Research consistently shows that students who plan and schedule their study time outperform those who study in unstructured, reactive bursts. The Study Hour Planner helps you calculate a realistic weekly study commitment for each of your courses before and during the semester, so you can manage your credit load without burning out.</p>

    <h3>The 2:1 Study Rule</h3>
    <p>The widely-accepted academic standard is to study <b>2 hours outside of class for every 1 credit hour</b>. A typical 3-credit lecture course therefore demands about 6 hours of study, reading, and homework per week. A 15-credit semester would require roughly 30 hours of independent study — equivalent to a part-time job on top of your classroom hours. However, this is a starting baseline; difficulty, your background knowledge, and your target grade will all shift this number significantly.</p>

    <h3>Factors That Impact Study Time</h3>
    <ul>
      <li><strong>Prior Knowledge:</strong> Taking an intro course in a subject you already know well? You might need 50% less time. Starting an advanced STEM course with weak prerequisites? Plan for 50–100% more.</li>
      <li><strong>Course Format:</strong> Lab-intensive, writing-intensive, or project-based courses frequently demand more hours per credit than pure lecture courses.</li>
      <li><strong>Assessment Style:</strong> Courses with weekly homework sets require consistent daily effort. Courses with only a midterm and a final allow more flexibility but demand disciplined review sessions.</li>
      <li><strong>Target Grade:</strong> Studying just enough to pass (C) requires less time than maintaining a 3.5 GPA. This tool scales its estimate based on whether you are aiming for an A, B, or a passing grade.</li>
      <li><strong>Learning Style & Environment:</strong> Studying in a distracting environment can double the time required to absorb the same material compared to focused, distraction-free study sessions.</li>
    </ul>

    <h3>Research-Backed Study Strategies</h3>
    <p><strong>Spaced Repetition:</strong> Instead of cramming all in one session, distribute your study over multiple shorter sessions spread across days. Each review session strengthens the neural pathways and dramatically improves long-term retention. Apps like Anki use this algorithm automatically.</p>
    <p><strong>Active Recall:</strong> Don't just re-read your notes. Flip them over and try to recall the key concepts from memory. Answering practice questions is significantly more effective for exam preparation than passive reading or highlighting.</p>
    <p><strong>The Pomodoro Technique:</strong> Work for 25 minutes with full focus, then take a 5-minute break. After 4 cycles, take a longer 15–30 minute break. This keeps your brain fresh, prevents decision fatigue, and makes large study blocks feel manageable.</p>
    <p><strong>Time Blocking:</strong> Schedule specific blocks in your calendar for each course — treat them like non-negotiable appointments. Students who schedule study time in advance are substantially more likely to follow through than those who study "when they have time."</p>

    <h3>How the Calculator Works</h3>
    <p>This tool uses the 2:1 baseline and applies two multipliers: a difficulty multiplier (ranging from 0.5× for easy courses to 1.5× for hard ones) and a grade-target multiplier (0.7× for a passing grade, 1.0× for a B, 1.5× for an A). The result is an estimated weekly study hour budget that you can use to allocate time in your schedule before the semester begins.</p>

    <details>
      <summary>❓ Is 3 hours really enough for an easy 3-credit course?</summary>
      <p>For some introductory electives or subjects where you already have strong background knowledge, yes — 2–3 hours per week may be sufficient. Always recalibrate after the first two weeks of class once you've seen the actual workload. The first assignment or quiz is usually a good reality check.</p>
    </details>
    <details>
      <summary>❓ How many credit hours should I take per semester?</summary>
      <p>Full-time status is typically 12 credits (about 36 hours/week of class + study). A higher load of 18 credits demands roughly 54 hours per week in class and studying — the equivalent of a full-time job plus significant overtime. Most students perform better with 15 credits or fewer while maintaining other obligations like work or extracurriculars.</p>
    </details>
    <details>
      <summary>❓ What time of day is best for studying?</summary>
      <p>Research on chronobiology suggests that cognitive performance peaks 1–3 hours after you fully wake up. For most people, morning or early afternoon is optimal for demanding analytical work. Low-energy periods (like right after lunch) are better for reviewing flashcards or watching lecture recordings — tasks that require less active concentration.</p>
    </details>
  `
});
