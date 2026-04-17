/**
 * PrecisionCalc — Age Calculator
 * Calculates age in years, months, days from date of birth.
 */
registerTool({
  id:       'age',
  name:     'Age Calculator',
  category: 'Daily Life',
  icon:         '\ud83d\udc76',
  materialIcon: 'calendar_month',
  tagline:  'Find your exact age in years, months, and days.',
  keywords: ['age', 'date of birth', 'birthday', 'years', 'months', 'days', 'date difference'],
  meta: {
    title:       'Age Calculator — PrecisionCalc',
    description: 'Calculate your exact age in years, months, and days from your date of birth. Free online age calculator.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\">
        <label for=\"age-dob\">Date of Birth</label>
        <input type=\"date\" id=\"age-dob\" />
      </div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      const dobStr = container.querySelector('#age-dob').value;
      if (!dobStr) return '';
      const dob = new Date(dobStr);
      const today = new Date();
      let years = today.getFullYear() - dob.getFullYear();
      let months = today.getMonth() - dob.getMonth();
      let days = today.getDate() - dob.getDate();
      if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }
      return `
        <div class=\"result-card\">
          <div><b>Age:</b> ${years} years, ${months} months, ${days} days</div>
        </div>
      `;
    };
    container.innerHTML += `<div id=\"result-card-age\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-age').innerHTML = calc();
    });
    container.querySelector('#result-card-age').innerHTML = calc();
  }
  ,
    seoContent: `
      <p>The Age Calculator is a simple yet powerful tool designed to help you determine your exact age in years, months, and days from your date of birth. Whether you need to know your age for official documents, health records, or just out of curiosity, this calculator provides an instant and accurate answer. Age calculation is a common requirement in many aspects of life, from filling out forms to understanding eligibility for school, sports, retirement, and more.</p>

      <h3>How Age Calculation Works</h3>
      <p>Age is typically calculated as the difference between your date of birth and the current date. This tool uses the Gregorian calendar, which is the most widely used civil calendar in the world. It accounts for leap years and varying month lengths, ensuring that the result is precise. The calculation involves subtracting the birth year from the current year, then adjusting for months and days to provide a detailed breakdown.</p>

      <h3>Why Knowing Your Exact Age Matters</h3>
      <ul>
        <li><strong>Legal and Official Purposes:</strong> Many legal processes require you to state your age accurately, such as applying for a passport, driver’s license, or social security benefits.</li>
        <li><strong>Education:</strong> School admissions, grade placements, and age-based competitions often depend on your exact age.</li>
        <li><strong>Health and Fitness:</strong> Age is a key factor in medical assessments, fitness plans, and vaccination schedules.</li>
        <li><strong>Milestones and Celebrations:</strong> Birthdays, anniversaries, and other life events are all based on age calculations.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>How does the calculator handle leap years?</summary>
        <p>The calculator automatically accounts for leap years, so if you were born on February 29, it will correctly calculate your age even in non-leap years.</p>
      </details>
      <details>
        <summary>Can I use this calculator for someone else?</summary>
        <p>Yes, simply enter any date of birth to find the age as of today. This is useful for parents, teachers, or anyone needing to check another person’s age.</p>
      </details>
      <details>
        <summary>Is my age calculated in real time?</summary>
        <p>Yes, as soon as you enter or change the date of birth, the calculator updates the result instantly without needing to reload the page.</p>
      </details>

      <h3>Tips for Accurate Results</h3>
      <ul>
        <li>Double-check the date format (YYYY-MM-DD) to avoid errors.</li>
        <li>For official purposes, always verify your date of birth from legal documents.</li>
        <li>This calculator provides age as of today; for a specific date, use that date as the reference.</li>
      </ul>

      <p>Whether you’re planning a milestone celebration, filling out paperwork, or just curious, the Age Calculator gives you a fast, reliable answer. Try it now and see your age in years, months, and days!</p>
    `
});
