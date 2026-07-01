/**
 * PrecisionCalc — Time Zone Converter
 * Converts time between two time zones
 */
registerTool({
  id: 'time-zone',
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
    <p>Coordinating across time zones is one of the most common friction points in remote work, international travel, and global communication. This converter lets you shift a time from one UTC offset to another instantly, so you always know what time it actually is for the other person — no mental math, no counting on your fingers.</p>

    <h3>How Time Zone Conversion Works</h3>
    <div class="formula-block">Target Time = Source Time − Source UTC Offset + Target UTC Offset</div>
    <p>Every time zone on Earth is defined as an offset from Coordinated Universal Time (UTC), ranging from UTC−12 to UTC+14. To convert, you first normalize the source time back to UTC by subtracting its offset, then apply the target zone's offset. For example, 12:00 PM in New York (UTC−5) converts to UTC 17:00, which becomes 01:00 AM the next day in Tokyo (UTC+9).</p>

    <h3>UTC Offsets for Common Cities</h3>
    <ul>
      <li><b>UTC−8 (Los Angeles, Vancouver):</b> Pacific Time</li>
      <li><b>UTC−5 (New York, Toronto, Bogotá):</b> Eastern Time</li>
      <li><b>UTC+0 (London, Lisbon, Accra):</b> Greenwich Mean Time</li>
      <li><b>UTC+1 (Paris, Berlin, Lagos):</b> Central European Time</li>
      <li><b>UTC+5:30 (Mumbai, New Delhi):</b> India Standard Time</li>
      <li><b>UTC+8 (Beijing, Singapore, Perth):</b> China Standard Time</li>
      <li><b>UTC+9 (Tokyo, Seoul):</b> Japan/Korea Standard Time</li>
      <li><b>UTC+10 (Sydney, Brisbane):</b> Australian Eastern Time</li>
    </ul>

    <h3>Why Time Zone Math Gets Confusing</h3>
    <p>Two things trip people up more than anything else: daylight saving time and the international date line. Daylight saving shifts a region's effective offset by an hour for part of the year (and not every country observes it), while crossing the date line can change the calendar day entirely even when the clock time seems to move forward only slightly. This calculator works on plain UTC offsets, so during DST transitions you should double-check whether the region you're converting to or from is currently observing daylight saving.</p>

    <h3>Common Use Cases</h3>
    <ul>
      <li><b>Scheduling international meetings:</b> Find a time slot that isn't 3 AM for anyone involved.</li>
      <li><b>Flight arrival planning:</b> Convert departure time plus flight duration into local arrival time.</li>
      <li><b>Live streams and launches:</b> Announce a single UTC time and let viewers convert it themselves.</li>
      <li><b>Remote team coordination:</b> Quickly check overlap windows between distributed team members.</li>
    </ul>

    <details>
      <summary>❓ Does this account for daylight saving time automatically?</summary>
      <p>No — you enter the UTC offset directly, so you need to use the region's *current* offset (e.g., UTC−4 for New York during Eastern Daylight Time, or UTC−5 during Eastern Standard Time). This avoids ambiguity since not every country observes daylight saving on the same schedule.</p>
    </details>
    <details>
      <summary>❓ What's the difference between UTC and GMT?</summary>
      <p>For practical purposes they're the same. GMT (Greenwich Mean Time) is a time zone; UTC (Coordinated Universal Time) is the precise timekeeping standard the world's clocks are set against. UTC is the modern technical standard, but UTC+0 and GMT are used interchangeably in everyday conversion.</p>
    </details>
    <details>
      <summary>❓ Why do some time zones have a 30 or 45 minute offset?</summary>
      <p>Not every country aligns to whole-hour offsets. India (UTC+5:30), Newfoundland (UTC−3:30), and Nepal (UTC+5:45) all use fractional offsets, usually chosen to better match solar noon to the middle of the working day for that specific region.</p>
    </details>
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
    const resultCard = container.querySelector('#result-card-time-zone');
    function tzCalc() {
      const time = container.querySelector('#tz-time').value;
      const from = parseInt(container.querySelector('#tz-from').value) || 0;
      const to = parseInt(container.querySelector('#tz-to').value) || 0;
      if (!time) { resultCard.innerHTML = '<div class="result-placeholder">Enter a time to convert ✦</div>'; return; }
      const [h, m] = time.split(':').map(Number);
      let date = new Date(Date.UTC(2000, 0, 1, h - from, m));
      date.setUTCHours(date.getUTCHours() + to);
      const hh = String(date.getUTCHours()).padStart(2, '0');
      const mm = String(date.getUTCMinutes()).padStart(2, '0');
      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Converted Time</span>
            <span class="result-value large">
              ${hh}:${mm}
              <button class="copy-btn" onclick="copyValue(this,'${hh}:${mm}')" title="Copy">📋</button>
            </span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('time-zone');
    }
    container.addEventListener('input', tzCalc);
    tzCalc();
  }
});
