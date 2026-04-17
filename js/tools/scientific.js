/**
 * PrecisionCalc — Scientific Calculator
 * Visual button keypad. Pure JS eval with sanitization.
 */
registerTool({
  id:       'scientific',
  name:     'Scientific Calculator',
  category: 'Math',
  icon:         '🔬',
  materialIcon: 'science',
  tagline:  'A full-featured scientific calculator with trig, log, and more.',
  keywords: ['scientific calculator', 'trig', 'sine', 'cosine', 'logarithm', 'square root', 'exponent', 'scientific notation'],
  meta: {
    title:       'Scientific Calculator — PrecisionCalc',
    description: 'Free online scientific calculator with trigonometry, logarithms, exponents, and more. Full-featured with real-time display.'
  },

  // No template/mount — handled entirely via custom render
  template: () => `
    <div class="sci-display">
      <div id="sci-expr" class="expr"></div>
      <div id="sci-result">0</div>
    </div>
    <div class="sci-keypad" id="sci-keypad">
      <!-- Injected by mount() -->
    </div>
  `,

  mount(container) {
    let expr   = '';
    let lastWasEq = false;

    const display = container.querySelector('#sci-result');
    const exprEl  = container.querySelector('#sci-expr');

    const keys = [
      { label: 'sin',  fn: () => append('Math.sin('), cls: 'fn' },
      { label: 'cos',  fn: () => append('Math.cos('), cls: 'fn' },
      { label: 'tan',  fn: () => append('Math.tan('), cls: 'fn' },
      { label: 'log',  fn: () => append('Math.log10('), cls: 'fn' },
      { label: 'ln',   fn: () => append('Math.log('), cls: 'fn' },

      { label: '√',    fn: () => append('Math.sqrt('), cls: 'fn' },
      { label: 'x²',   fn: () => append('**2'), cls: 'fn' },
      { label: 'xⁿ',   fn: () => append('**'), cls: 'fn' },
      { label: 'π',    fn: () => append(String(Math.PI)), cls: 'fn' },
      { label: 'e',    fn: () => append(String(Math.E)), cls: 'fn' },

      { label: '(',    fn: () => append('('), cls: '' },
      { label: ')',    fn: () => append(')'), cls: '' },
      { label: '%',    fn: () => append('%'), cls: 'op' },
      { label: '⌫',    fn: () => del(),  cls: 'del' },
      { label: 'AC',   fn: () => clear(), cls: 'del' },

      { label: '7',    fn: () => append('7'), cls: '' },
      { label: '8',    fn: () => append('8'), cls: '' },
      { label: '9',    fn: () => append('9'), cls: '' },
      { label: '÷',    fn: () => append('/'), cls: 'op' },
      { label: '1/x',  fn: () => append('1/('), cls: 'fn' },

      { label: '4',    fn: () => append('4'), cls: '' },
      { label: '5',    fn: () => append('5'), cls: '' },
      { label: '6',    fn: () => append('6'), cls: '' },
      { label: '×',    fn: () => append('*'), cls: 'op' },
      { label: '±',    fn: () => negate(), cls: 'op' },

      { label: '1',    fn: () => append('1'), cls: '' },
      { label: '2',    fn: () => append('2'), cls: '' },
      { label: '3',    fn: () => append('3'), cls: '' },
      { label: '−',    fn: () => append('-'), cls: 'op' },
      { label: '!',    fn: () => append('factorial('), cls: 'fn' },

      { label: '0',    fn: () => append('0'), cls: 'zero' },
      { label: '.',    fn: () => append('.'), cls: '' },
      { label: '=',    fn: () => evaluate(), cls: 'eq' },
      { label: '+',    fn: () => append('+'), cls: 'op' },
    ];

    const keypad = container.querySelector('#sci-keypad');
    keypad.innerHTML = keys.map((k, i) => `
      <button class="sci-btn ${k.cls}" id="sci-key-${i}" aria-label="${k.label}" data-key-idx="${i}">
        ${k.label}
      </button>
    `).join('');

    keypad.addEventListener('click', (e) => {
      const btn = e.target.closest('.sci-btn');
      if (!btn) return;
      const idx = parseInt(btn.dataset.keyIdx);
      keys[idx].fn();
    });

    // Keyboard support
    document.addEventListener('keydown', sciKeydown);
    // Clean up listener when tool is unloaded
    const origRoute = window.route;

    function sciKeydown(e) {
      if (!container.isConnected) {
        document.removeEventListener('keydown', sciKeydown);
        return;
      }
      const map = {
        '0':'0','1':'1','2':'2','3':'3','4':'4',
        '5':'5','6':'6','7':'7','8':'8','9':'9',
        '.':'.', '+':'+', '-':'-', '*':'*', '/':'/',
        '(':' (', ')':')', 'Enter':'=', 'Backspace':'⌫', 'Escape':'AC'
      };
      if (map[e.key]) {
        e.preventDefault();
        if (e.key === 'Enter') evaluate();
        else if (e.key === 'Backspace') del();
        else if (e.key === 'Escape') clear();
        else append(e.key);
      }
    }

    /* ── Calculator Logic ── */
    function append(val) {
      if (lastWasEq && /\d|\./.test(val)) expr = '';
      lastWasEq = false;
      expr += val;
      update();
    }
    function del() {
      expr = expr.slice(0, -1);
      update();
    }
    function clear() {
      expr = '';
      display.textContent = '0';
      exprEl.textContent  = '';
      lastWasEq = false;
    }
    function negate() {
      if (!expr) return;
      if (expr.startsWith('-')) expr = expr.slice(1);
      else expr = '-(' + expr + ')';
      update();
    }
    function evaluate() {
      try {
        let safe = expr
          .replace(/\^/g, '**')
          .replace(/Math\.sin\(/g, 'Math.sin(')
          .replace(/Math\.cos\(/g, 'Math.cos(')
          .replace(/Math\.tan\(/g, 'Math.tan(');
        // Inject factorial helper
        safe = 'const factorial = n => n<=1?1:n*factorial(n-1); ' + safe;
        // Validate: only allow safe characters
        if (/[a-zA-Z_$][a-zA-Z0-9_$]*/.test(safe.replace(/Math\.(sin|cos|tan|sqrt|log|log10|PI|E|abs|floor|ceil|round|pow)|factorial/g, ''))) {
          throw new Error('Invalid expression');
        }
        // eslint-disable-next-line no-new-func
        const result = new Function('return ' + safe.replace('const factorial = n => n<=1?1:n*factorial(n-1); ', '') + ';')();
        // Use a safe eval via Function constructor
        const evalResult = evalSafe(expr);
        exprEl.textContent   = expr + ' =';
        display.textContent  = formatSciResult(evalResult);
        lastWasEq = true;
      } catch {
        display.textContent = 'Error';
        setTimeout(() => { display.textContent = expr || '0'; }, 900);
      }
    }
    function update() {
      if (!expr) { display.textContent = '0'; exprEl.textContent = ''; return; }
      try {
        const res = evalSafe(expr);
        display.textContent = formatSciResult(res);
      } catch {
        display.textContent = expr;
      }
      exprEl.textContent = expr;
    }
    function evalSafe(e) {
      // Build a restricted evaluator using Function
      const wrapped = e
        .replace(/Math\./g, 'Math.')
        .replace(/factorial\(/g, '(function f(n){return n<=1?1:n*f(n-1)})(');
      // eslint-disable-next-line no-new-func
      return new Function(
        'Math',
        '"use strict"; return (' + wrapped + ');'
      )(Math);
    }
    function formatSciResult(n) {
      if (!isFinite(n)) return 'Error';
      if (Math.abs(n) > 1e15 || (Math.abs(n) < 1e-10 && n !== 0)) {
        return n.toExponential(6);
      }
      const str = String(parseFloat(n.toPrecision(12)));
      return str;
    }
  },

  seoContent: `
    <p>A scientific calculator extends the basic four operations (add, subtract, multiply, divide) with advanced mathematical functions including trigonometry, logarithms, exponents, and roots. These functions are essential for students, engineers, scientists, and anyone working with technical calculations.</p>

    <h3>Trigonometric Functions</h3>
    <div class="formula-block">
      sin(θ) = opposite / hypotenuse
      cos(θ) = adjacent / hypotenuse
      tan(θ) = opposite / adjacent = sin(θ)/cos(θ)
    </div>
    <p>Note: This calculator uses radians by default (standard for most scientific applications). To convert degrees to radians: multiply by π/180. For example, 90° = π/2 ≈ 1.5708 radians.</p>

    <h3>Logarithms</h3>
    <p>The natural logarithm (ln) uses base e (≈2.71828), while log₁₀ uses base 10. Logarithms are the inverse of exponentiation: if 10² = 100, then log₁₀(100) = 2. They are fundamental in finance (compound growth), physics (sound decibels), and chemistry (pH scale).</p>

    <h3>Order of Operations (PEMDAS)</h3>
    <p>Parentheses → Exponents → Multiplication/Division → Addition/Subtraction. Use parentheses liberally to ensure your expressions evaluate in the intended order.</p>

    <details>
      <summary>❓ What is Euler's number (e)?</summary>
      <p>e ≈ 2.71828 is the base of the natural logarithm. It appears naturally in continuous compounding, population growth, radioactive decay, and probability theory. It is defined as the limit of (1 + 1/n)^n as n approaches infinity.</p>
    </details>
    <details>
      <summary>❓ What is the factorial function?</summary>
      <p>n! (n factorial) is the product of all positive integers from 1 to n. For example, 5! = 5×4×3×2×1 = 120. Factorials grow extremely fast: 20! = 2.4 quintillion. They are fundamental to combinatorics, probability, and the Taylor series expansions of functions like sin(x) and eˣ.</p>
    </details>
  `
});
