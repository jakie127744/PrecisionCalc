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
    <p>Password strength is a measure of how resistant a password is to guessing or brute-force attacks. In its simplest form, it estimates how many attempts an attacker would need to make, on average, to find the correct password by trying combinations systematically.</p>

    <h3>What Is Information Entropy?</h3>
    <div class="formula-block">Entropy (bits) = Length × log₂(Character Set Size)</div>
    <p>Entropy, in the context of passwords, is measured in bits and represents how many yes/no decisions an attacker's search would need to correctly guess the password. A password with 60 bits of entropy is significantly harder to crack than one with 30 bits — every additional bit doubles the number of possible combinations, so entropy grows exponentially, not linearly, with length and character variety.</p>

    <h3>Why Character Variety Matters Less Than Length</h3>
    <p>Adding a symbol to your character set increases the base of the exponent (charset size), but adding characters to your password's length increases the exponent itself — and exponents dominate. A 16-character password using only lowercase letters (26 options per character) actually has more entropy than an 8-character password using all four character types (94 options per character), because 26¹⁶ vastly exceeds 94⁸. This is why long passphrases are often both stronger and easier to remember than short, "complex" passwords.</p>

    <h3>Tips for Strong Passwords</h3>
    <ul>
      <li><strong>Length is king:</strong> A long password made of simple words (a passphrase) is often stronger and easier to remember than a short, complex one.</li>
      <li><strong>Use a password manager:</strong> Don't try to remember unique passwords for every site — use a reputable manager to generate and store long, random passwords.</li>
      <li><strong>Avoid common patterns:</strong> Dictionary words, "123456", and keyboard patterns (qwerty) are the first things attackers' cracking dictionaries try.</li>
      <li><strong>Enable multi-factor authentication:</strong> Even a strong password benefits from a second layer of verification on important accounts.</li>
    </ul>

    <details>
      <summary>❓ How long should my password be?</summary>
      <p>Current security guidance recommends a minimum of 12 characters, though 16 or more is preferred for critical accounts like email, banking, or password managers themselves.</p>
    </details>
    <details>
      <summary>❓ Does this tool send my password anywhere?</summary>
      <p>No. This calculation is performed entirely locally in your browser using JavaScript. Your password is never transmitted, logged, or stored — it never leaves your device.</p>
    </details>
    <details>
      <summary>❓ Why does the "time to crack" estimate assume 1 trillion guesses per second?</summary>
      <p>This reflects a realistic modern offline attack using specialized hardware (GPUs or ASICs) against a leaked password hash database. Online, rate-limited login attempts are far slower, so real-world cracking time against a live login form is typically much longer than the estimate shown here.</p>
    </details>
  `
});

