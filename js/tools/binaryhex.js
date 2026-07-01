/**
 * PrecisionCalc — Binary/Hex/Decimal Converter
 * Converts between binary, hexadecimal, and decimal numbers.
 */
registerTool({
  id:       'binaryhex',
  name:     'Binary & Hex Converter',
  category: 'Education',
  icon:         '💻',
  materialIcon: '123',
  tagline:  'Convert between binary, hex, decimal and octal numbers.',

  keywords: ['binary', 'hex', 'decimal', 'converter', 'number', 'base converter', 'base-2', 'base-16', 'octal'],
  meta: {
    title:       'Binary/Hex/Decimal Converter — PrecisionCalc',
    description: 'Professional base converter for binary, hexadecimal, octal and decimal numbers. Perfect for CS students and engineers.'
  },

  template: () => `
    <div class="form-row">
      <div class="field">
        <label for="binhex-dec">Decimal (Base 10)</label>
        <input type="number" id="binhex-dec" placeholder="255" value="255" />
      </div>
      <div class="field">
        <label for="binhex-bin">Binary (Base 2)</label>
        <input type="text" id="binhex-bin" placeholder="11111111" value="11111111" />
      </div>
    </div>
    <div class="form-row">
      <div class="field">
        <label for="binhex-hex">Hexadecimal (Base 16)</label>
        <input type="text" id="binhex-hex" placeholder="FF" value="FF" />
      </div>
      <div class="field">
        <label for="binhex-oct">Octal (Base 8)</label>
        <input type="text" id="binhex-oct" placeholder="377" value="377" />
      </div>
    </div>
  `,

  mount(container) {
    const decEl = container.querySelector('#binhex-dec');
    const binEl = container.querySelector('#binhex-bin');
    const hexEl = container.querySelector('#binhex-hex');
    const octEl = container.querySelector('#binhex-oct');
    const resultCard = container.querySelector('#result-card-binaryhex');

    function updateAll(dec) {
      if (isNaN(dec)) {
        resultCard.innerHTML = `<div class="result-placeholder">Enter a valid number ✦</div>`;
        return;
      }

      // Update fields (avoid infinite loops by checking if changed)
      if (decEl.value !== dec.toString(10)) decEl.value = dec.toString(10);
      const bV = dec.toString(2);
      if (binEl.value.toLowerCase() !== bV) binEl.value = bV;
      const hV = dec.toString(16).toUpperCase();
      if (hexEl.value.toUpperCase() !== hV) hexEl.value = hV;
      const oV = dec.toString(8);
      if (octEl.value !== oV) octEl.value = oV;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Binary</span>
            <span class="result-value large" style="font-size:1.1rem; letter-spacing:1px; word-break:break-all;">
                ${bV}
                <button class="copy-btn" onclick="copyValue(this,'${bV}')" title="Copy">📋</button>
            </span>
            <span class="result-sub">${bV.length} bits</span>
          </div>
          <div class="result-item">
            <span class="result-label">Hexadecimal</span>
            <span class="result-value">
                0x${hV}
                <button class="copy-btn" onclick="copyValue(this,'${hV}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Octal</span>
            <span class="result-value">o${oV}</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('binaryhex');
    }

    decEl.addEventListener('input', () => updateAll(parseInt(decEl.value, 10)));
    binEl.addEventListener('input', () => updateAll(parseInt(binEl.value, 2)));
    hexEl.addEventListener('input', () => updateAll(parseInt(hexEl.value, 16)));
    octEl.addEventListener('input', () => updateAll(parseInt(octEl.value, 8)));

    updateAll(255);
  },

  seoContent: `
    <p>Understanding different numeral systems is a cornerstone of computer science and digital logic. This Base Converter allows you to bridge the gap between human-readable decimal numbers and the binary, hexadecimal, and octal formats used by hardware, low-level programming, and networking.</p>

    <h3>Common Number Bases</h3>
    <div class="formula-block">Value = Σ (digit × baseᵖᵒˢⁱᵗⁱᵒⁿ)</div>
    <ul>
      <li><strong>Decimal (Base 10):</strong> The standard system used by humans day to day. Uses digits 0–9.</li>
      <li><strong>Binary (Base 2):</strong> The native language of computer hardware, where every value is stored as electrical on/off states. Uses only 0 and 1.</li>
      <li><strong>Hexadecimal (Base 16):</strong> A compact way to represent binary. Uses digits 0–9 and letters A–F, where A=10 through F=15.</li>
      <li><strong>Octal (Base 8):</strong> Less common today, but still used in some legacy systems and Unix/Linux file permission notation (like chmod 755).</li>
    </ul>

    <h3>Worked Example</h3>
    <p>The decimal number 255 converts to binary 11111111 (eight 1s, since 255 is the maximum value a single byte can hold), to hexadecimal FF (F=15, and 15×16 + 15 = 255), and to octal 377. This is exactly why 255 shows up constantly in computing — it's the largest value representable in 8 bits.</p>

    <h3>Why Use Hexadecimal?</h3>
    <p>Hexadecimal is preferred in programming because one hex digit corresponds exactly to 4 bits (a "nibble"), and two hex digits correspond exactly to one byte (8 bits). This makes it significantly easier to read memory addresses, color codes (like #FF5733 in CSS), and MAC addresses than the equivalent raw binary string, which would be four times longer and much harder to scan visually.</p>

    <h3>Practical Applications</h3>
    <ul>
      <li><b>Web development:</b> CSS colors are written in hexadecimal (e.g., #FFFFFF for white).</li>
      <li><b>Networking:</b> IPv6 addresses and MAC addresses are expressed in hexadecimal.</li>
      <li><b>Low-level programming:</b> Memory addresses, byte values, and bitwise flags are commonly shown in hex or binary.</li>
      <li><b>Unix/Linux permissions:</b> File permission codes like 755 or 644 are octal representations of read/write/execute bits.</li>
    </ul>

    <details>
      <summary>❓ How do I convert manually?</summary>
      <p>To convert from decimal to another base, repeatedly divide the number by the target base and record the remainders in reverse order. To convert to decimal, multiply each digit by the base raised to its positional power (starting at 0 from the right) and sum the results.</p>
    </details>
    <details>
      <summary>❓ Why does binary use so many more digits than decimal?</summary>
      <p>Because binary only has two symbols (0 and 1) per digit compared to decimal's ten (0–9), it needs roughly 3.3 times more digits to represent the same value — which is exactly why hexadecimal exists, as a much more compact stand-in for binary.</p>
    </details>
  `
});
