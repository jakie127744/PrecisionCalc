/**
 * PrecisionCalc — Password Strength Estimator
 * Estimates password strength and time to crack.
 */
registerTool({
  id:       'password',
  name:     'Password Strength',
  category: 'Daily Life',
  icon:         '\ud83d\udd12',
  materialIcon: 'password',
  tagline:  'Estimate password strength and time to crack.',
  keywords: ['password', 'strength', 'security', 'crack', 'entropy'],
  meta: {
    title:       'Password Strength Estimator — PrecisionCalc',
    description: 'Estimate password strength and time to crack for any password.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\" style=\"flex:1;\">
        <label for=\"pw-input\">Password</label>
        <input type=\"text\" id=\"pw-input\" placeholder=\"Enter password\" />
      </div>
    </div>
  `,

  mount(container) {
    const pwEl = container.querySelector('#pw-input');
    const resultCard = container.querySelector('#result-card-password');

    function estimate(pw) {
      if (!pw) return null;
      let charset = 0;
      if (/[a-z]/.test(pw)) charset += 26;
      if (/[A-Z]/.test(pw)) charset += 26;
      if (/[0-9]/.test(pw)) charset += 10;
      if (/[^a-zA-Z0-9]/.test(pw)) charset += 32;
      
      const entropy = pw.length * Math.log2(charset || 1);
      const guesses = Math.pow(charset, pw.length);
      const seconds = guesses / 1e12; // Adjusted to a more realistic modern attack (1 trillion guesses/sec)

      function fmtTime(sec) {
        if (sec < 1) return 'Instantly';
        if (sec < 60) return `${Math.round(sec)} seconds`;
        if (sec < 3600) return `${Math.round(sec/60)} minutes`;
        if (sec < 86400) return `${Math.round(sec/3600)} hours`;
        if (sec < 31536000) return `${Math.round(sec/86400)} days`;
        if (sec < 31536000000) return `${Math.round(sec/31536000)} years`;
        return 'Centuries';
      }

      let strength = 'Weak';
      let colorClass = 'danger';
      if (entropy > 40) { strength = 'Fair'; colorClass = 'warning'; }
      if (entropy > 60) { strength = 'Strong'; colorClass = 'success'; }
      if (entropy > 80) { strength = 'Excellent'; colorClass = 'success'; }

      return { entropy, strength, colorClass, fmt: fmtTime(seconds) };
    }

    const calc = () => {
      const pw = pwEl.value;
      const result = estimate(pw);

      if (!result) {
        resultCard.innerHTML = `<div class="result-placeholder">Start typing to see strength ✦</div>`;
        return;
      }

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Strength Score</span>
            <span class="result-value large ${result.colorClass}">${result.strength}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Time to Crack</span>
            <span class="result-value">${result.fmt}</span>
            <span class="result-sub">Assuming 1T guesses/sec</span>
          </div>
          <div class="result-item">
            <span class="result-label">Entropy</span>
            <span class="result-value">${fmt.number(result.entropy, 1)} bits</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('password');
    };

    pwEl.addEventListener('input', calc);
    calc();
  },

  seoContent: `
    <p>Password strength is a measure of the effectiveness of a password against guessing or brute-force attacks. In its simplest form, it estimates how many guesses an attacker would have to make to find the correct password.</p>

    <h3>What is Information Entropy?</h3>
    <p>Entropy, in the context of passwords, is measured in bits. It represents the number of binary attempts (0s and 1s) needed to guess the password. A password with 60 bits of entropy is significantly harder to crack than one with 30 bits. Every additional bit of entropy doubles the difficulty for an attacker.</p>

    <h3>Tips for Unstoppable Passwords</h3>
    <ul>
      <li><strong>Length is King:</strong> A long password made of simple words (passphrase) is often stronger and easier to remember than a short, complex one.</li>
      <li><strong>Use a Manager:</strong> Don't try to remember unique passwords for every site—use a reputable password manager.</li>
      <li><strong>Avoid Common Patterns:</strong> Dictionary words, "123456", and keyboard patterns (qwerty) are the first things attackers try.</li>
    </ul>

    <details>
      <summary>❓ How long should my password be?</summary>
      <p>Current security standards recommend a minimum of 12 characters, though 16 or more is preferred for critical accounts like email or banking.</p>
    </details>
    <details>
      <summary>❓ Does this tool send my password anywhere?</summary>
      <p>No. This calculation is performed entirely locally in your browser. Your password never leaves your device.</p>
    </details>
  `
});

