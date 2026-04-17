/**
 * PrecisionCalc — Time Zone Converter
 * Converts time between two time zones
 */
registerTool({
  id: 'timezone',
  name: 'Time Zone Converter',
  category: 'Daily Life',
  icon: '🌍',
  materialIcon: 'public',
  tagline: 'Convert time between time zones.',
  keywords: ['time zone', 'converter', 'utc', 'local time', 'daily life'],
  meta: {
    title: 'Time Zone Converter — PrecisionCalc',
    description: 'Convert time between any two time zones.'
  },

  seoContent: `
    <h2>Time Zone Converter</h2>
    <p>Convert time between any two time zones using UTC offsets. Enter your time and offsets for instant conversion. Useful for travel, business, and communication.</p>
    <ul>
      <li><b>Time Conversion:</b> Converts between any two UTC offsets</li>
    </ul>
    <p>This free online time zone converter is perfect for global users.</p>
  `,

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="tz-time">Time</label>
        <input type="time" id="tz-time" value="12:00" />
      </div>
      <div class="field">
        <label for="tz-from">From Time Zone (UTC offset)</label>
        <input type="number" id="tz-from" placeholder="-5" min="-12" max="14" value="0" step="1" />
      </div>
      <div class="field">
        <label for="tz-to">To Time Zone (UTC offset)</label>
        <input type="number" id="tz-to" placeholder="+8" min="-12" max="14" value="0" step="1" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = document.createElement('div');
    resultCard.id = 'result-card-timezone';
    container.appendChild(resultCard);
    function tzCalc() {
      const time = container.querySelector('#tz-time').value;
      const from = parseInt(container.querySelector('#tz-from').value) || 0;
      const to = parseInt(container.querySelector('#tz-to').value) || 0;
      if (!time) { resultCard.innerHTML = ''; return; }
      const [h, m] = time.split(':').map(Number);
      let date = new Date(Date.UTC(2000, 0, 1, h - from, m));
      date.setUTCHours(date.getUTCHours() + to);
      const hh = String(date.getUTCHours()).padStart(2, '0');
      const mm = String(date.getUTCMinutes()).padStart(2, '0');
      resultCard.innerHTML = `<div class=\"result-card\"><div><b>Converted Time:</b> ${hh}:${mm}</div></div>`;
    }
    container.addEventListener('input', tzCalc);
    tzCalc();
  }
});
