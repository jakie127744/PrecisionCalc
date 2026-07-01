/**
 * PrecisionCalc — Factorial Calculator
 * Calculates n!
 */
registerTool({
  id: 'factorial',
  name: 'Factorial Calculator',
  category: 'Math',
  icon: '!',
  materialIcon: 'calculate',
  tagline: 'Calculate factorials (n!).',
  keywords: ['factorial', 'n!', 'math', 'product', 'permutation', 'combination'],
  meta: {
    title: 'Factorial Calculator — PrecisionCalc',
    description: 'Calculate the factorial of any non-negative integer (n!).'
  },

  seoContent: `
    <p>Shuffle a standard 52-card deck, and the number of possible orderings — 52! — is so large that if every star in the observable universe had a trillion planets, each with a trillion people, each shuffling a trillion decks per second since the Big Bang, they still wouldn't have come close to seeing every possible shuffle. Factorials are the reason: they grow faster than almost any other common mathematical operation.</p>

    <h3>What n! Actually Means</h3>
    <div class="formula-block">n! = n × (n−1) × (n−2) × ... × 2 × 1</div>
    <p>With the default value 5: 5! = 5 × 4 × 3 × 2 × 1 = 120. This counts something very specific: the number of distinct ways to arrange 5 different objects in a row. Factorials grow so quickly that 10! is already 3,628,800, and 20! exceeds 2.4 quintillion — which is why this calculator caps input at 170, since 171! exceeds the maximum number JavaScript (and most programming languages) can represent precisely.</p>

    <h3>Where Factorials Come From: Counting Arrangements</h3>
    <p>Imagine arranging 5 books on a shelf. You have 5 choices for the first slot, then only 4 remaining books for the second slot, 3 for the third, and so on down to 1 choice for the last slot. Multiplying the choices at each step — 5 × 4 × 3 × 2 × 1 — gives exactly 5!. This "multiply the remaining choices" logic is the intuitive reason factorials appear anywhere counting distinct orderings matters.</p>

    <h3>Factorials Power Permutations and Combinations</h3>
    <ul>
      <li><b>Permutations</b> (order matters): P(n,r) = n! / (n−r)! — the number of ways to arrange r items chosen from n.</li>
      <li><b>Combinations</b> (order doesn't matter): C(n,r) = n! / [r!(n−r)!] — the number of ways to choose r items from n, used constantly in probability (like calculating lottery odds or poker hand frequencies).</li>
      <li><b>0! is defined as 1</b>, not 0 — this is a mathematical convention that keeps the permutation and combination formulas consistent even at the edge cases.</li>
    </ul>

    <details>
      <summary>❓ Why is 0! equal to 1 and not 0?</summary>
      <p>There's exactly one way to arrange zero objects: do nothing. Mathematically, this convention also keeps formulas like C(n,0) = n!/(0!×n!) = 1 correct — there's exactly one way to choose nothing from a set, which matches reality.</p>
    </details>
    <details>
      <summary>❓ Why does the calculator stop at 170?</summary>
      <p>170! is approximately 7.26 × 10³⁰⁶, right at the edge of the largest number a standard double-precision floating point value (used by JavaScript and most calculators) can represent without losing precision or overflowing to Infinity. 171! exceeds that limit.</p>
    </details>
    <details>
      <summary>❓ Is there a way to estimate large factorials without computing every multiplication?</summary>
      <p>Yes — Stirling's approximation: n! ≈ √(2πn) × (n/e)ⁿ. It becomes remarkably accurate for large n and is widely used in statistics and physics when an exact factorial isn't necessary, just its order of magnitude or a ratio involving it.</p>
    </details>
  `,

  template: () => `
    <div class="form-row single">
      <div class="field">
        <label for="factorial-n">n</label>
        <input type="number" id="factorial-n" placeholder="5" min="0" value="5" />
      </div>
    </div>
  `,

  mount(container) {
    const resultCard = container.querySelector('#result-card-factorial');
    function fact(n) {
      if (n < 0) return NaN;
      let res = 1;
      for (let i = 2; i <= n; ++i) res *= i;
      return res;
    }
    function factorialCalc() {
      const n = parseInt(container.querySelector('#factorial-n').value) || 0;
      const valid = n >= 0 && n <= 170;
      if (!valid) { resultCard.innerHTML = '<div class="result-placeholder">Enter a whole number from 0 to 170 ✦</div>'; return; }
      resultCard.innerHTML = `<div><b>${n}!</b> = ${fact(n)}</div>`;
      resultCard.classList.add('active');
      pulseResult('factorial');
    }
    container.addEventListener('input', factorialCalc);
    factorialCalc();
  }
});
