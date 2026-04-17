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
    <p>A Pregnancy Due Date Calculator estimates when your baby will arrive based on the first day of your last menstrual period (LMP) or your conception date. While only about 4% of babies are born on their exact due date, the estimation is vital for monitoring fetal development and scheduling prenatal care.</p>

    <h3>How the Due Date is Calculated</h3>
    <p>Standard gestation is approximately 280 days (40 weeks) from the first day of your last period, or 266 days (38 weeks) from conception. This tool uses Naegele's rule for its primary estimation.</p>

    <h3>Trimester Breakdown</h3>
    <ul>
      <li><strong>First Trimester:</strong> Week 1 to the end of Week 12. Critical for organ development.</li>
      <li><strong>Second Trimester:</strong> Week 13 to the end of Week 26. Often the most comfortable period ("The Golden Period").</li>
      <li><strong>Third Trimester:</strong> Week 27 to birth. Period of rapid fetal weight gain.</li>
    </ul>

    <details>
      <summary>❓ What if I have irregular cycles?</summary>
      <p>If your cycles are shorter or longer than the average 28 days, these calculations might be slightly off. Your healthcare provider will likely use an early ultrasound (dating scan) to provide a more accurate due date.</p>
    </details>
    <details>
      <summary>❓ Is "full term" always 40 weeks?</summary>
      <p>A pregnancy is considered "early term" at 37 weeks and "full term" at 39 weeks. Delivery between 39-41 weeks is considered optimal for the baby's health.</p>
    </details>
  `
});
