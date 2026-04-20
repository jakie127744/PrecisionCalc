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
    <p>Converting an annual salary to an hourly rate is one of the most practical financial calculations you can do. It lets you compare job offers on a fair footing, understand the true cost of overtime, evaluate a freelance rate against a staff role, and recognize exactly how much you earn every hour you spend at work. Many people are surprised to discover their effective hourly rate after accounting for unpaid overtime, commuting time, and benefits costs.</p>

    <h3>The Salary-to-Hourly Formula</h3>
    <div class="formula-block">Hourly Rate = Annual Salary ÷ Total Hours Worked Per Year</div>
    <p>Total actual hours worked = (Hours per week × Weeks worked) − (Vacation days × Hours per day). The most common assumption is 40 hours/week × 52 weeks = <strong>2,080 hours/year</strong>. With 10 paid vacation days (2 weeks), this drops to approximately <strong>2,000 hours</strong>. With 15 days off, it drops to ~1,960 hours.</p>

    <h3>Worked Example</h3>
    <p>A $75,000/year salary, 40 hrs/week, 10 vacation days:</p>
    <ul>
      <li>Total hours = 40 × 52 − 10 × 8 = 2,080 − 80 = <strong>2,000 hours</strong></li>
      <li>Hourly Rate = $75,000 ÷ 2,000 = <strong>$37.50/hr</strong></li>
      <li>Daily = $75,000 ÷ 250 work days = <strong>$300/day</strong></li>
      <li>Bi-weekly paycheck = $75,000 ÷ 26 = <strong>$2,884.62</strong></li>
    </ul>

    <h3>Why Actual Hours Matter — The "Secret" Salary Cut</h3>
    <p>Many salaried employees — especially those in management, consulting, software, or finance — routinely work 50, 60, or even 70 hours per week without additional pay. Running the numbers shows the real impact:</p>
    <ul>
      <li>At 40 hrs/week: $75,000/yr = $37.50/hr</li>
      <li>At 50 hrs/week: $75,000/yr = $30.00/hr (a 20% effective pay cut)</li>
      <li>At 60 hrs/week: $75,000/yr = $25.00/hr (a 33% pay cut vs. the 40-hr scenario)</li>
    </ul>
    <p>This is why "total compensation" discussions must always include expected actual hours — not just the number on the offer letter.</p>

    <h3>US Salary Benchmarks (2024)</h3>
    <ul>
      <li><strong>US Median Household Income:</strong> ~$80,610 (Census Bureau, 2023)</li>
      <li><strong>US Median Individual Wage:</strong> ~$59,384 ($28.55/hr at 40 hrs/week)</li>
      <li><strong>Federal Minimum Wage:</strong> $7.25/hr ($15,080/year full-time) — many states set higher floors</li>
      <li><strong>NYC / California minimum wages:</strong> $16–17/hr as of 2024</li>
    </ul>

    <h3>Salary vs. Hourly: Which is Better?</h3>
    <p>A salaried position typically offers stability, benefits, and a defined career path. An hourly position often provides overtime pay (1.5× rate for hours over 40/week under FLSA), more flexibility, and clearer boundaries between work and personal time. When comparing the two, always look at:</p>
    <ul>
      <li><strong>Health insurance:</strong> Employer contributions can be worth $6,000–$18,000 per year.</li>
      <li><strong>401(k) matching:</strong> A 50% match up to 6% of salary = $2,250/year on a $75k salary.</li>
      <li><strong>PTO (Paid Time Off):</strong> 15 days of PTO at $37.50/hr = ~$4,500 of additional compensation.</li>
      <li><strong>Remote work / commute saved:</strong> A 2-hour daily commute costs ~500 hours/year — a significant quality-of-life factor.</li>
    </ul>

    <h3>Freelance Rate vs. Employee Salary</h3>
    <p>As a freelancer or independent contractor, you must set a higher hourly rate than a salaried employee to cover equivalent compensation. Freelancers pay both halves of FICA (15.3% vs. the employee's 7.65%), receive no employer-provided benefits, have no paid vacation or sick days, and must account for non-billable time (admin, sales, unfilled hours). A common rule of thumb: your freelance rate should be at least 1.5–2× your equivalent salaried hourly rate to achieve the same net income.</p>

    <details>
      <summary>❓ What is the standard number of work hours per year?</summary>
      <p>The US standard is 2,080 hours (52 weeks × 40 hours). With 10 paid vacation days (2 weeks), this drops to approximately 2,000 hours. Many salaried employees in demanding fields work 50–60 hours per week, which can reduce the effective hourly rate dramatically — sometimes to levels below what an hourly minimum-wage position would pay after overtime.</p>
    </details>
    <details>
      <summary>❓ How do I compare a salaried vs. hourly job offer?</summary>
      <p>Convert both to an hourly rate using actual expected hours. Then add the dollar value of benefits: health insurance (+$6,000–$18,000/yr), 401k match (+$1,000–$5,000/yr), PTO value, and any equity/bonus. A $65,000 salaried job with full benefits can outperform a $75,000 hourly contract role once you account for self-employment tax and benefit costs.</p>
    </details>
    <details>
      <summary>❓ How much of my salary is taken by taxes?</summary>
      <p>For a $75,000 income in the US (2024 single filer, standard deduction), you fall into the 22% federal marginal bracket. After the standard deduction ($14,600), taxable income is ~$60,400. Federal tax is roughly $8,800. Add ~$5,738 in FICA (7.65%) and you're looking at a total federal burden of ~$14,500/year — about 19% effective rate. State taxes vary from 0% (TX, FL) to 13.3% (CA).</p>
    </details>
    <details>
      <summary>❓ What is "bi-weekly" vs. "semi-monthly" pay?</summary>
      <p>Bi-weekly means paid every two weeks = 26 paychecks/year. Semi-monthly means paid twice a month (usually 1st and 15th) = 24 paychecks/year. Each bi-weekly paycheck is slightly smaller than a semi-monthly one, but in months with 3 pay Fridays, you get an extra paycheck — many people use these to accelerate debt payoff or savings.</p>
    </details>
  `
});
