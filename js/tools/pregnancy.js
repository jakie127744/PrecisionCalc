/**
 * PrecisionCalc — Pregnancy Due Date Calculator
 * Estimates due date based on last period or conception date.
 */
registerTool({
  id:       'pregnancy',
  name:     'Pregnancy Due Date',
  category: 'Health',
  icon:         '\ud83d\udc76',
  materialIcon: 'pregnant_woman',
  tagline:  'Estimate your pregnancy due date from LMP or conception.',
  keywords: ['pregnancy', 'due date', 'lmp', 'conception', 'gestation', 'baby'],
  meta: {
    title:       'Pregnancy Due Date Calculator — PrecisionCalc',
    description: 'Estimate your pregnancy due date based on last menstrual period (LMP) or conception date.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"preg-lmp\">Last Menstrual Period (LMP)</label><input type=\"date\" id=\"preg-lmp\" /></div>
      <div class=\"field\"><label for=\"preg-conception\">Conception Date (optional)</label><input type=\"date\" id=\"preg-conception\" /></div>
    </div>
  `,

  mount(container) {
    const lmpInput = container.querySelector('#preg-lmp');
    const concInput = container.querySelector('#preg-conception');
    const resultCard = container.querySelector('#result-card-pregnancy');

    const calc = () => {
      const lmpVal = lmpInput.value;
      const concVal = concInput.value;
      let dueDate = null;
      let lmpDate = null;

      if (concVal) {
        dueDate = new Date(concVal);
        dueDate.setDate(dueDate.getDate() + 266); // 38 weeks
        lmpDate = new Date(concVal);
        lmpDate.setDate(lmpDate.getDate() - 14); // Est LMP
      } else if (lmpVal) {
        dueDate = new Date(lmpVal);
        dueDate.setDate(dueDate.getDate() + 280); // 40 weeks
        lmpDate = new Date(lmpVal);
      }

      if (!dueDate || isNaN(dueDate.getTime())) {
        resultCard.innerHTML = `<div class="result-placeholder">Enter your last period date ✦</div>`;
        return;
      }

      const today = new Date();
      const diffTime = Math.abs(today - lmpDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;
      
      let trimester = "1st";
      if (weeks >= 13) trimester = "2nd";
      if (weeks >= 27) trimester = "3rd";

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Estimated Due Date</span>
            <span class="result-value large">
                ${dueDate.toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}
                <button class="copy-btn" onclick="copyValue(this,'${dueDate.toLocaleDateString()}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Current Progress</span>
            <span class="result-value">${weeks}w ${days}d</span>
            <span class="result-sub">${trimester} Trimester</span>
          </div>
          <div class="result-item">
            <span class="result-label">Days to Go</span>
            <span class="result-value">${Math.max(0, Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)))}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('pregnancy');
    };

    [lmpInput, concInput].forEach(el => el.addEventListener('input', calc));
    calc();
  },

  seoContent: `
    <p>A pregnancy due date calculator estimates when a baby will arrive based on the first day of the last menstrual period (LMP) or a known conception date. While only about 4–5% of babies are actually born on their exact calculated due date, the estimate is still essential for monitoring fetal development, scheduling prenatal appointments and screenings, and planning for the arrival.</p>

    <h3>How the Due Date Is Calculated</h3>
    <div class="formula-block">Due Date = LMP + 280 days (40 weeks), or Conception Date + 266 days (38 weeks)</div>
    <p>Standard gestation is measured from the first day of the last menstrual period, not from conception, because ovulation typically occurs about two weeks after LMP — this is why "40 weeks pregnant" actually corresponds to roughly 38 weeks since conception. This tool applies Naegele's rule, the standard obstetric method for estimating due dates, adjusting automatically depending on whether you provide an LMP date or a conception date.</p>

    <h3>Trimester Breakdown</h3>
    <ul>
      <li><strong>First Trimester:</strong> Week 1 through the end of Week 12 — the period most critical for organ development, when the risk of miscarriage is also highest.</li>
      <li><strong>Second Trimester:</strong> Week 13 through the end of Week 26 — often called "the golden period," typically bringing relief from early symptoms like nausea and fatigue.</li>
      <li><strong>Third Trimester:</strong> Week 27 through birth — a period of rapid fetal weight gain and increasing physical demands on the parent's body.</li>
    </ul>

    <h3>Why Due Dates Are Estimates, Not Guarantees</h3>
    <p>Only a small percentage of babies arrive exactly on their calculated due date — most births happen within a two-week window on either side. Actual delivery timing depends on many individual factors including cycle length, whether it's a first pregnancy, and overall maternal health, which is why healthcare providers treat the due date as a planning target rather than a firm prediction.</p>

    <details>
      <summary>❓ What if I have irregular menstrual cycles?</summary>
      <p>If your cycles are noticeably shorter or longer than the average 28 days, LMP-based calculations may be less accurate, since ovulation timing shifts with cycle length. Your healthcare provider will typically use an early ultrasound (dating scan) to refine the due date more precisely in these cases.</p>
    </details>
    <details>
      <summary>❓ Is "full term" always exactly 40 weeks?</summary>
      <p>No — a pregnancy is considered "early term" at 37–38 weeks, "full term" at 39–40 weeks, "late term" at 41 weeks, and "post-term" after 42 weeks. Delivery between 39 and 41 weeks is generally considered optimal for the baby's health outcomes.</p>
    </details>
    <details>
      <summary>❓ Does this replace medical prenatal care?</summary>
      <p>No — this calculator gives a statistical estimate only. Due dates confirmed by ultrasound, especially in the first trimester, are considered more accurate than LMP-based calculations alone, and regular prenatal care with a qualified provider remains essential throughout pregnancy.</p>
    </details>
  `
});
