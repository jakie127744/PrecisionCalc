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
    <p>Standard deviation is a statistic that measures how spread out a dataset is relative to its mean (average). It's calculated as the square root of the variance, and it's one of the most widely used measures in statistics, finance, quality control, and scientific research for describing how consistent or variable a set of numbers is.</p>

    <h3>The Standard Deviation Formula</h3>
    <div class="formula-block">σ = √[ Σ(xᵢ − mean)² ÷ N ]</div>
    <p>For each number in the dataset, subtract the mean, square the result (to eliminate negative signs), average those squared differences (this is the variance), then take the square root to return to the original units. For example, the dataset [10, 25, 40, 15, 30] has a mean of 24, and a population standard deviation of about 10.75 — meaning most values sit within roughly 11 units of the average.</p>

    <h3>Population vs. Sample Standard Deviation</h3>
    <ul>
      <li><strong>Population Standard Deviation (σ):</strong> Used when you have data for every member of the group you're studying — for example, test scores for every student in a specific class.</li>
      <li><strong>Sample Standard Deviation (s):</strong> Used when your data is only a subset drawn from a larger population. It uses "Bessel's correction" (dividing by n−1 instead of n) to provide an unbiased estimate of the true population variance, since samples tend to slightly understate true variability.</li>
    </ul>

    <h3>How to Interpret Standard Deviation</h3>
    <p>In a normal distribution (the classic "bell curve"), standard deviation follows a predictable pattern known as the empirical rule:</p>
    <ul>
      <li>Approximately 68% of data falls within 1 standard deviation of the mean.</li>
      <li>Approximately 95% of data falls within 2 standard deviations.</li>
      <li>Approximately 99.7% of data falls within 3 standard deviations.</li>
    </ul>
    <p>A small standard deviation means data points cluster tightly around the mean (consistent, predictable); a large one means data is spread widely (variable, less predictable).</p>

    <h3>Real-World Applications</h3>
    <ul>
      <li><b>Finance:</b> Standard deviation of returns is a standard measure of investment volatility and risk.</li>
      <li><b>Quality control:</b> Manufacturers track standard deviation to ensure products stay within acceptable tolerances.</li>
      <li><b>Education:</b> Standardized test scores are often reported relative to the mean and standard deviation of all test-takers.</li>
      <li><b>Science:</b> Experimental results report standard deviation to communicate measurement consistency and reliability.</li>
    </ul>

    <details>
      <summary>❓ What is variance, and how does it differ from standard deviation?</summary>
      <p>Variance is the average of the squared differences from the mean. While standard deviation is expressed in the same units as the original data (making it easier to interpret intuitively), variance is expressed in squared units, which is why standard deviation is more commonly reported.</p>
    </details>
    <details>
      <summary>❓ Why square the differences instead of just averaging them directly?</summary>
      <p>Squaring ensures that negative differences (values below the mean) don't cancel out positive differences (values above the mean) when averaged — without squaring, the differences would always sum to exactly zero, making the measure useless.</p>
    </details>
    <details>
      <summary>❓ Should I use population or sample standard deviation for my data?</summary>
      <p>Use population standard deviation only if your dataset represents every single member of the group you care about. In almost all practical research, surveys, or experiments, you're working with a sample — so sample standard deviation (with Bessel's correction) is the more commonly appropriate choice.</p>
    </details>
  `
});
