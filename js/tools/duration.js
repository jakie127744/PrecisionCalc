/**
 * PrecisionCalc — Time Duration Calculator
 * Calculates the duration between two dates/times.
 */
registerTool({
  id:       'duration',
  name:     'Time Duration',
  category: 'Daily Life',
  icon:         '\ud83d\udcc5',
  materialIcon: 'schedule',
  tagline:  'Calculate the duration between two dates/times.',
  keywords: ['duration', 'time', 'date', 'difference', 'calculator'],
  meta: {
    title:       'Time Duration Calculator — PrecisionCalc',
    description: 'Calculate the duration between two dates/times.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"duration-from\">From</label><input type=\"datetime-local\" id=\"duration-from\" /></div>
      <div class=\"field\"><label for=\"duration-to\">To</label><input type=\"datetime-local\" id=\"duration-to\" /></div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      const from = new Date(container.querySelector('#duration-from').value);
      const to = new Date(container.querySelector('#duration-to').value);
      if (!from.getTime() || !to.getTime() || to < from) return '';
      let ms = to - from;
      const days = Math.floor(ms / 86400000); ms %= 86400000;
      const hours = Math.floor(ms / 3600000); ms %= 3600000;
      const mins = Math.floor(ms / 60000); ms %= 60000;
      const secs = Math.floor(ms / 1000);
      return `<div class=\"result-card\" style=\"font-size:2rem;text-align:center;\"><b>${days}d ${hours}h ${mins}m ${secs}s</b></div>`;
    };
    container.innerHTML += `<div id=\"result-card-duration\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-duration').innerHTML = calc();
    });
  }
  ,
    seoContent: `
      <p>The Time Duration Calculator is a versatile tool for anyone who needs to measure the exact amount of time between two dates and times. Whether you’re planning a project, tracking work hours, calculating age, or simply curious about the time between two events, this calculator provides a fast and accurate answer in days, hours, minutes, and seconds.</p>

      <h3>Why Calculate Time Duration?</h3>
      <ul>
        <li><strong>Project Management:</strong> Track the length of tasks, deadlines, or milestones to keep projects on schedule.</li>
        <li><strong>Work & Billing:</strong> Freelancers and contractors can calculate billable hours or elapsed time for accurate invoicing.</li>
        <li><strong>Personal Planning:</strong> Figure out the time until a birthday, anniversary, trip, or other important event.</li>
        <li><strong>Legal & Compliance:</strong> Some contracts and regulations require precise time tracking between events.</li>
      </ul>

      <h3>How the Calculator Works</h3>
      <ol>
        <li>Enter the start date and time in the “From” field.</li>
        <li>Enter the end date and time in the “To” field.</li>
        <li>The calculator instantly displays the total duration in days, hours, minutes, and seconds.</li>
      </ol>

      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>Does the calculator account for leap years and daylight saving time?</summary>
        <p>Yes, it uses your device’s date and time settings, so leap years and daylight saving changes are automatically included in the calculation.</p>
      </details>
      <details>
        <summary>Can I calculate negative durations?</summary>
        <p>No, the calculator only works if the end date/time is after the start date/time. Swap the fields if you get an empty result.</p>
      </details>
      <details>
        <summary>What’s the maximum duration I can calculate?</summary>
        <p>You can calculate durations spanning years, decades, or even centuries, limited only by the range of valid dates your device supports.</p>
      </details>

      <h3>Tips for Accurate Results</h3>
      <ul>
        <li>Double-check your date and time entries, especially AM/PM and time zones if relevant.</li>
        <li>Use this tool for both short intervals (minutes, hours) and long spans (months, years).</li>
        <li>For recurring events, calculate the duration once and multiply as needed.</li>
      </ul>

      <p>With the Time Duration Calculator, you can easily measure the passage of time for any purpose—professional, academic, or personal. Try it now and see how much time has passed or how much remains until your next big event!</p>
    `
});
