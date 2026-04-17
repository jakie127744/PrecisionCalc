/**
 * PrecisionCalc — Standard Deviation Calculator
 * Calculates mean, variance, and standard deviation for a list of numbers.
 */
registerTool({
  id:       'stddev',
  name:     'Standard Deviation',
  category: 'Math',
  icon:         '\u03c3',
  materialIcon: 'functions',
  tagline:  'Calculate mean, variance, and standard deviation.',
  keywords: ['standard deviation', 'variance', 'mean', 'statistics', 'math'],
  meta: {
    title:       'Standard Deviation Calculator — PrecisionCalc',
    description: 'Calculate mean, variance, and standard deviation for a list of numbers.'
  },

  template: () => `
    <div class="form-row">
      <div class="field" style="flex:1;">
        <label for="stddev-list">Numbers (comma or space separated)</label>
        <input type="text" id="stddev-list" placeholder="10, 25, 40, 15, 30" value="10, 25, 40, 15, 30" />
      </div>
    </div>
  `,

  mount(container) {
    const input = container.querySelector('#stddev-list');
    const resultCard = container.querySelector('#result-card-stddev');

    const calc = () => {
      const raw = input.value;
      const nums = raw.split(/[,\s]+/).map(s => s.trim()).filter(s => s !== "").map(Number).filter(x => !isNaN(x));
      
      if (nums.length === 0) {
        resultCard.innerHTML = `<div class="result-placeholder">Enter numbers above ✦</div>`;
        return;
      }

      const count = nums.length;
      const mean = nums.reduce((a, b) => a + b, 0) / count;
      
      // Population Variance
      const pVar = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / count;
      const pStd = Math.sqrt(pVar);

      // Sample Variance (Bessel's correction)
      const sVar = count > 1 ? nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (count - 1) : 0;
      const sStd = Math.sqrt(sVar);

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Mean (Average)</span>
            <span class="result-value large">
                ${fmt.number(mean, 2)}
                <button class="copy-btn" onclick="copyValue(this,'${fmt.number(mean, 2)}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Std Dev (Population)</span>
            <span class="result-value">${fmt.number(pStd, 3)}</span>
            <span class="result-sub">σ (Sigma)</span>
          </div>
          <div class="result-item">
            <span class="result-label">Std Dev (Sample)</span>
            <span class="result-value">${count > 1 ? fmt.number(sStd, 3) : '—'}</span>
            <span class="result-sub">s (Bessel's Correction)</span>
          </div>
          <div class="result-item">
            <span class="result-label">Variance</span>
            <span class="result-value">${fmt.number(pVar, 3)}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('stddev');
    };

    input.addEventListener('input', calc);
    calc();
  },

  seoContent: `
    <p>Standard deviation (SD) is a statistic that measures the dispersion of a dataset relative to its mean. It is calculated as the square root of the variance. If the data points are further from the mean, there is a higher deviation within the data set; thus, the more spread out the data, the higher the standard deviation.</p>

    <h3>Population vs. Sample</h3>
    <ul>
      <li><strong>Population Standard Deviation (σ):</strong> Used when you have data for every member of the group you are studying (e.g., test scores for every student in a class).</li>
      <li><strong>Sample Standard Deviation (s):</strong> Used when your data is a subset of a larger population. It uses "Bessel's correction" (n-1 instead of n) to provide an unbiased estimate of the population variance.</li>
    </ul>

    <h3>How to Interpret Standard Deviation</h3>
    <p>In a normal distribution (the "Bell Curve"):</p>
    <ul>
      <li>68% of data falls within 1 standard deviation of the mean.</li>
      <li>95% of data falls within 2 standard deviations.</li>
      <li>99.7% of data falls within 3 standard deviations.</li>
    </ul>

    <details>
      <summary>❓ What is Variance?</summary>
      <p>Variance is the average of the squared differences from the Mean. While standard deviation is in the same units as the data, variance is in squared units.</p>
    </details>
    <details>
      <summary>❓ Why square the differences?</summary>
      <p>Squaring ensures that negative differences (numbers below the mean) don't cancel out positive differences (numbers above the mean).</p>
    </details>
  `
});
