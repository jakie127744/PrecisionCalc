/**
 * PrecisionCalc — Salary to Hourly Converter
 */
registerTool({
  id:       'salary',
  name:     'Salary to Hourly',
  category: 'Finance',
  icon:         '💼',
  materialIcon: 'payments',
  tagline:  'Convert any salary to hourly, daily, weekly, and monthly rates instantly.',
  keywords: ['salary', 'hourly', 'wage', 'annual salary', 'pay', 'income', 'hourly rate'],
  meta: {
    title:       'Salary to Hourly Calculator — PrecisionCalc',
    description: 'Convert annual salary to hourly rate, daily pay, weekly and monthly income. Free salary calculator with take-home breakdown.'
  },

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="sal-amount">Annual Salary ($)</label>
        <input type="number" id="sal-amount" placeholder="75,000" min="0" value="75000" />
      </div>
      <div class="field">
        <label for="sal-hours">Hours per Week</label>
        <input type="number" id="sal-hours" placeholder="40" min="1" max="168" value="40" />
      </div>
    </div>
    <div class="form-row">
      <div class="field">
        <label for="sal-weeks">Weeks Worked per Year</label>
        <input type="number" id="sal-weeks" placeholder="52" min="1" max="52" value="52" />
      </div>
      <div class="field">
        <label for="sal-vacation">Vacation Days per Year</label>
        <input type="number" id="sal-vacation" placeholder="10" min="0" max="365" value="10" />
      </div>
    </div>
  `,

  mount(container) {
    const inputs = ['sal-amount', 'sal-hours', 'sal-weeks', 'sal-vacation']
      .map(id => container.querySelector(`#${id}`));
    const resultCard = container.querySelector('#result-card-salary');

    const calc = () => {
      const annual   = parseFloat(inputs[0].value) || 0;
      const hpw      = parseFloat(inputs[1].value) || 40;
      const weeks    = parseFloat(inputs[2].value) || 52;
      const vacDays  = parseFloat(inputs[3].value) || 0;

      const workDays   = weeks * 5 - vacDays;
      const workHours  = hpw * weeks - vacDays * (hpw / 5);
      const hourly     = workHours > 0 ? annual / workHours : 0;
      const daily      = workDays  > 0 ? annual / workDays  : 0;
      const weekly     = annual / weeks;
      const monthly    = annual / 12;
      const biWeekly   = annual / 26;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Hourly Rate</span>
            <span class="result-value large">
              ${fmt.currency(hourly)}
              <button class="copy-btn" onclick="copyValue(this,'${fmt.currency(hourly)}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Daily Pay</span>
            <span class="result-value">${fmt.currency(daily)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Weekly Pay</span>
            <span class="result-value">${fmt.currency(weekly)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Bi-Weekly Pay</span>
            <span class="result-value">${fmt.currency(biWeekly)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Monthly Pay</span>
            <span class="result-value">${fmt.currency(monthly)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Annual Salary</span>
            <span class="result-value">${fmt.currency(annual)}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('salary');
    };

    inputs.forEach(el => el?.addEventListener('input', calc));
    calc();
  },

  seoContent: `
    <p>Converting an annual salary to an hourly rate is essential for comparing job offers, negotiating pay, or understanding the true value of your time. The calculation depends on how many hours you actually work, not just the standard 2,080-hour assumption.</p>

    <h3>The Salary-to-Hourly Formula</h3>
    <div class="formula-block">Hourly Rate = Annual Salary ÷ Total Hours Worked Per Year</div>
    <p>Total hours worked = (Hours per week × Weeks worked) − (Vacation days × Hours per day). The standard assumption of 40 hrs/week and 52 weeks gives 2,080 hours per year, but this changes significantly if you take vacation or work part-time.</p>

    <h3>Why This Matters</h3>
    <p>A $75,000 salary with 2 weeks vacation and 40-hour weeks equals approximately $37.50/hr. But a $70,000 salary with unlimited vacation and flexible hours might result in a higher effective hourly rate if you work fewer actual hours. Always calculate actual hours, not assumed hours.</p>

    <details>
      <summary>❓ What is the standard number of work hours per year?</summary>
      <p>The U.S. standard is 2,080 hours (52 weeks × 40 hours). With 10 paid vacation days, this drops to approximately 2,000 hours. Many salaried employees in demanding fields work 50–60 hours per week, which can reduce the effective hourly rate dramatically.</p>
    </details>
    <details>
      <summary>❓ How do I compare a salaried vs. hourly job?</summary>
      <p>Convert both to an hourly rate using actual expected hours. Also factor in benefits: health insurance, 401(k) matching, and paid time off can be worth $10,000–$25,000 per year in additional compensation beyond the base salary.</p>
    </details>
  `
});
