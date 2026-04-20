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
    <p>A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. For example, 7 is prime because its only factors are 1 and 7. The number 8 is not prime because it is divisible by 2 and 4 as well. Prime numbers are the fundamental building blocks of all natural numbers — every composite number can be expressed as a unique product of primes, a concept known as the Fundamental Theorem of Arithmetic.</p>

    <h3>Prime vs. Composite vs. Neither</h3>
    <ul>
      <li><strong>Prime:</strong> 2, 3, 5, 7, 11, 13, 17, 19, 23, 29... — divisible only by 1 and themselves.</li>
      <li><strong>Composite:</strong> 4, 6, 8, 9, 10, 12, 14, 15... — have three or more factors.</li>
      <li><strong>The number 1:</strong> Neither prime nor composite — a special case by mathematical convention.</li>
      <li><strong>The number 2:</strong> The only even prime. All other even numbers are divisible by 2 and thus composite.</li>
    </ul>

    <h3>How to Test If a Number Is Prime</h3>
    <p>The most straightforward method is <strong>Trial Division</strong>: divide the number N by every integer from 2 up to √N. If any divide evenly, N is composite; if none do, N is prime. This works because if N has a factor larger than its square root, it must also have a corresponding factor smaller than its square root. For example, to test whether 97 is prime, you only need to check divisibility up to √97 ≈ 9.8 — that means checking 2, 3, 5, and 7. None divide 97 evenly, so 97 is prime.</p>

    <h3>Famous Prime Numbers and Sequences</h3>
    <ul>
      <li><strong>Mersenne Primes:</strong> Primes of the form 2^p - 1 (e.g., 3, 7, 31, 127). The largest known primes are almost always Mersenne primes.</li>
      <li><strong>Twin Primes:</strong> Pairs of primes that differ by 2, such as (3, 5), (11, 13), (17, 19), (41, 43). It is unknown whether infinitely many twin primes exist.</li>
      <li><strong>Palindromic Primes:</strong> Primes that read the same forwards and backwards, like 11, 313, 757.</li>
      <li><strong>Prime Fibonacci Numbers:</strong> 2, 3, 5, 13, 89, 233 are both Fibonacci numbers and prime.</li>
    </ul>

    <h3>Why Primes Matter in Real Life</h3>
    <p><strong>Cryptography & Internet Security:</strong> RSA encryption — used by every HTTPS website — is built on prime multiplication. Two massive primes (hundreds of digits long) are multiplied together to generate a public key. Decrypting the data without the private key means factoring that huge product back into its two primes, which remains computationally infeasible even for the most powerful computers. This asymmetry between easy multiplication and hard factoring is the bedrock of modern digital security.</p>
    <p><strong>Hashing & Data Structures:</strong> Prime numbers are frequently used as hash table sizes and moduli in hash functions because they minimize collisions and distribute values more evenly across buckets.</p>
    <p><strong>Cicadas:</strong> Interestingly, many cicada species emerge every 13 or 17 years — both prime numbers — which mathematicians believe reduces overlap with the life cycles of predators.</p>

    <details>
      <summary>❓ How many prime numbers are there?</summary>
      <p>There are infinitely many prime numbers. Euclid proved this around 300 BC with a beautifully simple argument: assume a finite list of all primes, multiply them together and add 1. The result is either prime itself or divisible by a prime not in the original list — a contradiction.</p>
    </details>
    <details>
      <summary>❓ What is the Sieve of Eratosthenes?</summary>
      <p>A classical algorithm for finding all primes up to a given limit. Start with a list of all integers from 2 to N. Mark 2 as prime, then strike out all multiples of 2. Move to the next unmarked number (3), mark it prime, strike its multiples, and repeat. Numbers that remain unmarked after the process are all prime. It is very efficient for finding primes in bulk.</p>
    </details>
    <details>
      <summary>❓ What are Mersenne Primes?</summary>
      <p>A Mersenne prime is of the form 2^p - 1 where p itself must also be prime. Examples: when p=2, 2²-1=3 (prime); when p=5, 2⁵-1=31 (prime). Not all such numbers are prime — when p=11, 2¹¹-1=2047=23×89. As of 2024, only 51 Mersenne primes have been discovered; the largest has over 41 million digits.</p>
    </details>
    <details>
      <summary>❓ Why do primes matter in cryptography?</summary>
      <p>Modern encryption like RSA relies on the difficulty of factoring the product of two large primes. It is trivial to multiply two 1024-bit primes in milliseconds, but factoring the result back into its two prime components would take classical computers longer than the age of the universe.</p>
    </details>
  `
});

