/**
 * PrecisionCalc — Word and Character Counter
 * Analyzes text for word count, character count, and readability.
 */
registerTool({
  id:       'word-counter',
  name:     'Essay Analyzer',
  category: 'Education',
  icon:         '✍️',
  materialIcon: 'edit_note',
  tagline:  'Count words, characters, and estimate reading time.',
  keywords: ['word count', 'character count', 'essay', 'writing', 'length', 'education'],
  meta: {
    title:       'Word & Character Counter — PrecisionCalc',
    description: 'Quickly count words and characters for your essay or assignment. Includes estimated reading and speaking time.'
  },

  template: () => `
    <div class="form-row">
      <div class="field" style="flex:1;">
        <label for="wc-input">Enter or paste your text</label>
        <textarea id="wc-input" rows="8" placeholder="Type or paste your content here..." style="background:var(--surface-container); color:var(--on-surface); border:1px solid var(--outline-variant); border-radius:var(--radius-md); padding:12px; font-family:inherit; font-size:1rem; resize:vertical;"></textarea>
      </div>
    </div>
  `,

  mount(container) {
    const input = container.querySelector('#wc-input');
    const resultCard = container.querySelector('#result-card-word-counter');

    const calc = () => {
      const text = input.value || "";
      const chars = text.length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const sentences = text.split(/[.!?]+/).length - 1;

      // Avg reading speed: 200 wpm, Speaking: 130 wpm
      const readMinutes = words / 200;
      const speakMinutes = words / 130;

      if (!text.trim()) {
        resultCard.innerHTML = `<div class="result-placeholder">Start typing to analyze... ✦</div>`;
        return;
      }

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Words</span>
            <span class="result-value large">
                ${words}
                <button class="copy-btn" onclick="copyValue(this,'${words}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Characters</span>
            <span class="result-value">${chars}</span>
            <span class="result-sub">Includes spaces</span>
          </div>
          <div class="result-item">
            <span class="result-label">Sentences</span>
            <span class="result-value">${Math.max(0, sentences)}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Read Time</span>
            <span class="result-value">~${Math.ceil(readMinutes)} min</span>
            <span class="result-sub">@ 200 wpm</span>
          </div>
          <div class="result-item">
            <span class="result-label">Speak Time</span>
            <span class="result-value">~${Math.ceil(speakMinutes)} min</span>
            <span class="result-sub">@ 130 wpm</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('word-counter');
    };

    input.addEventListener('input', calc);
    calc();
  },

  seoContent: `
    <p>Writing an essay or preparing a speech often requires adhering to strict length requirements. This Essay Analyzer goes beyond simple word counting to provide insights into your content's length and delivery time.</p>

    <h3>Word vs. Character Counting</h3>
    <p>Academic assignments typically use word counts (e.g., 500-word essay), while social media and web platforms often use character limits (e.g., 280 characters). This tool provides both instantly.</p>

    <h3>Time Estimates</h3>
    <ul>
      <li><strong>Reading Time:</strong> Useful for blog posts and articles. The average adult reads at about 200-250 words per minute.</li>
      <li><strong>Speaking Time:</strong> Vital for presentations and speeches. The average speaking rate is approximately 130 words per minute for clear delivery.</li>
    </ul>

    <details>
      <summary>❓ Does this count punctuation?</summary>
      <p>Character counts include all punctuation and spaces. Word counts treat any string of characters separated by a space as a single word.</p>
    </details>
  `
});
