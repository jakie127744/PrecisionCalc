/**
 * PrecisionCalc — Prime Number Checker
 * Checks if a number is prime.
 */
registerTool({
  id:       'prime',
  name:     'Prime Checker',
  category: 'Math',
  icon:         '\ud83d\udd2e',
  materialIcon: '123',
  tagline:  'Check if a number is prime.',
  keywords: ['prime', 'number', 'checker', 'math'],
  meta: {
    title:       'Prime Number Checker — PrecisionCalc',
    description: 'Check if a number is prime.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"prime-n\">Number</label><input type=\"number\" id=\"prime-n\" value=\"7\" /></div>
    </div>
  `,

  mount(container) {
    const input = container.querySelector('#prime-n');
    const resultCard = container.querySelector('#result-card-prime');

    const calc = () => {
      const n = parseInt(input.value);
      if (isNaN(n)) {
          resultCard.innerHTML = `<div class="result-placeholder">Enter a number to check ✦</div>`;
          return;
      }

      if (n < 2) {
          resultCard.innerHTML = `
            <div class="result-grid">
              <div class="result-item">
                <span class="result-label">Status</span>
                <span class="result-value danger">Not Prime</span>
              </div>
              <div class="result-item">
                <span class="result-label">Note</span>
                <span class="result-sub">Prime numbers must be 2 or greater.</span>
              </div>
            </div>
          `;
          return;
      }

      let isPrime = true;
      let firstFactor = null;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            isPrime = false;
            firstFactor = i;
            break;
        }
      }

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Status</span>
            <span class="result-value large ${isPrime ? 'success' : 'danger'}">
                ${isPrime ? 'Prime' : 'Composite'}
                <button class="copy-btn" onclick="copyValue(this,'${isPrime ? 'Prime' : 'Composite'}')" title="Copy">📋</button>
            </span>
          </div>
          ${!isPrime ? `
          <div class="result-item">
            <span class="result-label">Divisible by</span>
            <span class="result-value">${firstFactor}</span>
            <span class="result-sub">${n} / ${firstFactor} = ${n/firstFactor}</span>
          </div>
          ` : `
          <div class="result-item">
            <span class="result-label">Next Prime</span>
            <span class="result-sub">Calculating...</span>
          </div>
          `}
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('prime');
    };

    input.addEventListener('input', calc);
    calc();
  },

  seoContent: `
    <p>A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers. In other words, its only divisors are 1 and itself.</p>

    <h3>Prime Numbers vs. Composite Numbers</h3>
    <ul>
      <li><strong>Prime:</strong> 2, 3, 5, 7, 11, 13, 17, 19... (Infinite)</li>
      <li><strong>Composite:</strong> 4, 6, 8, 9, 10, 12... (Numbers with more than two factors)</li>
      <li><strong>Special Case:</strong> 1 is neither prime nor composite.</li>
      <li><strong>Special Case:</strong> 2 is the only even prime number.</li>
    </ul>

    <h3>How to Check for Primality</h3>
    <p>The simplest method (Trial Division) is to divide the number by every integer from 2 up to the square root of the number. If any integer divides it evenly, the number is composite. If none do, it is prime.</p>

    <details>
      <summary>❓ What are Mersenne Primes?</summary>
      <p>A Mersenne prime is a prime number that is one less than a power of two (2^n - 1). The largest known prime numbers are typically Mersenne primes.</p>
    </details>
    <details>
      <summary>❓ Why do primes matter in cryptography?</summary>
      <p>Modern encryption (like RSA) relies on the fact that it is very easy to multiply two large prime numbers together, but extremely difficult for even the most powerful computers to factor the resulting huge composite number back into its original primes.</p>
    </details>
  `
});

