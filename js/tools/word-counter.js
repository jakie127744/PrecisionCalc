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
    <p>Writing an essay, blog post, or speech often requires adhering to strict length requirements. This Essay Analyzer goes beyond simple word counting to provide insights into your content's length, structure, and delivery time — all updated live as you type.</p>

    <h3>How the Metrics Are Calculated</h3>
    <div class="formula-block">Words = trimmed text split on whitespace · Reading Time = Words ÷ 200 wpm · Speaking Time = Words ÷ 130 wpm</div>
    <p>Word count works by trimming leading/trailing whitespace and splitting the remaining text on any run of spaces, tabs, or line breaks — each resulting chunk counts as one word. Character count is a raw length of the text including spaces and punctuation. Sentence count estimates boundaries by counting periods, exclamation points, and question marks.</p>

    <h3>Word vs. Character Counting</h3>
    <p>Academic assignments typically use word counts (e.g., a 500-word essay), while social media platforms and SMS often use character limits (e.g., 280 characters on X/Twitter, 160 for a single SMS segment). This tool provides both instantly so you can check against whichever limit applies to what you're writing.</p>

    <h3>Time Estimates Explained</h3>
    <ul>
      <li><strong>Reading Time (200 wpm):</strong> Useful for blog posts, articles, and emails — based on the commonly cited average adult silent-reading speed of 200–250 words per minute.</li>
      <li><strong>Speaking Time (130 wpm):</strong> Vital for presentations, speeches, and video scripts — clear, well-paced spoken delivery averages around 130 words per minute, notably slower than silent reading.</li>
    </ul>

    <h3>Practical Uses</h3>
    <ul>
      <li><b>Academic essays:</b> Verify you're within a professor's minimum or maximum word count before submitting.</li>
      <li><b>Cover letters and resumes:</b> Keep concise documents within recommended length guidelines.</li>
      <li><b>Video and podcast scripts:</b> Estimate runtime before recording so episodes hit a target length.</li>
      <li><b>Social media posts:</b> Check character counts against platform limits before publishing.</li>
    </ul>

    <details>
      <summary>❓ Does this count punctuation?</summary>
      <p>Character counts include all punctuation and spaces. Word counts treat any string of characters separated by whitespace as a single word, so punctuation attached to a word (like "don't" or "well-known") doesn't split it into multiple words.</p>
    </details>
    <details>
      <summary>❓ Why is my speaking time estimate longer than my reading time?</summary>
      <p>Because speaking naturally happens slower than silent reading — pauses for breath, emphasis, and clarity all add time. The 130 wpm speaking-rate estimate reflects a typical, clearly-paced presentation rather than a rushed reading of the same text.</p>
    </details>
    <details>
      <summary>❓ Is the sentence count always accurate?</summary>
      <p>It's an estimate based on counting periods, question marks, and exclamation points. Abbreviations (like "Dr." or "e.g."), decimal numbers, and ellipses can occasionally throw off an automated sentence count, so treat it as a close approximation rather than an exact grammatical count.</p>
    </details>
  `
});
