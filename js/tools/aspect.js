/**
 * PrecisionCalc — Aspect Ratio Calculator
 * Converts and compares aspect ratios (e.g., 16:9, 4:3).
 */
registerTool({
  id:       'aspect',
  name:     'Aspect Ratio',
  category: 'Daily Life',
  icon:         '\ud83d\udcf7',
  materialIcon: 'aspect_ratio',
  tagline:  'Convert and compare aspect ratios for screens and images.',
  keywords: ['aspect ratio', 'screen', 'image', 'video', 'resize', 'convert'],
  meta: {
    title:       'Aspect Ratio Calculator — PrecisionCalc',
    description: 'Convert and compare aspect ratios for screens, images, and video.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"aspect-w\">Width</label><input type=\"number\" id=\"aspect-w\" value=\"1920\" /></div>
      <div class=\"field\"><label for=\"aspect-h\">Height</label><input type=\"number\" id=\"aspect-h\" value=\"1080\" /></div>
    </div>
  `,

  mount(container) {
    const calc = () => {
      const w = parseFloat(container.querySelector('#aspect-w').value) || 0;
      const h = parseFloat(container.querySelector('#aspect-h').value) || 0;
      if (w <= 0 || h <= 0) return '';
      function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
      const g = gcd(w, h);
      const rw = w / g, rh = h / g;
      return `<div class=\"result-card\" style=\"font-size:2rem;text-align:center;\"><b>${rw}:${rh}</b></div>`;
    };
    container.innerHTML += `<div id=\"result-card-aspect\"></div>`;
    container.addEventListener('input', () => {
      container.querySelector('#result-card-aspect').innerHTML = calc();
    });
    container.querySelector('#result-card-aspect').innerHTML = calc();
  }
  ,
    seoContent: `
      <p>The Aspect Ratio Calculator is an essential tool for anyone working with images, videos, screens, or digital content. Aspect ratio describes the proportional relationship between the width and height of a rectangle, and is usually expressed as two numbers separated by a colon (e.g., 16:9, 4:3). Understanding aspect ratios is crucial for photographers, videographers, designers, and anyone who needs to resize or display visual media without distortion.</p>

      <h3>What Is Aspect Ratio?</h3>
      <p>Aspect ratio is the ratio of width to height. For example, a 1920x1080 pixel screen has an aspect ratio of 16:9 because 1920 divided by 120 is 16, and 1080 divided by 120 is 9. Common aspect ratios include 1:1 (square), 4:3 (classic TV and photos), 16:9 (HD video and modern displays), and 21:9 (ultrawide monitors and cinema).</p>

      <h3>Why Aspect Ratio Matters</h3>
      <ul>
        <li><strong>Photography & Video:</strong> Choosing the right aspect ratio ensures your images and videos display correctly on different devices and platforms.</li>
        <li><strong>Web & Graphic Design:</strong> Maintaining consistent aspect ratios prevents stretching or squishing of graphics and layouts.</li>
        <li><strong>Printing:</strong> Knowing the aspect ratio helps you crop photos to fit standard print sizes without losing important details.</li>
        <li><strong>Screen Compatibility:</strong> Different screens (phones, tablets, monitors, TVs) use different aspect ratios. Matching the ratio avoids black bars or cropping.</li>
      </ul>

      <h3>How to Use the Aspect Ratio Calculator</h3>
      <ol>
        <li>Enter the width and height of your image, video, or screen.</li>
        <li>The calculator reduces the ratio to its simplest form (e.g., 3840x2160 becomes 16:9).</li>
        <li>Use the result to resize, crop, or design content that fits your target display perfectly.</li>
      </ol>

      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>What happens if I use the wrong aspect ratio?</summary>
        <p>Using the wrong aspect ratio can cause images or videos to appear stretched, squished, or to have black bars (letterboxing/pillarboxing) on the sides. Always match the aspect ratio to your display or platform requirements.</p>
      </details>
      <details>
        <summary>Can I convert between aspect ratios?</summary>
        <p>Yes! Use the calculator to find the current ratio, then crop or resize your content to match the desired ratio. Be aware that cropping may remove parts of the image or video.</p>
      </details>
      <details>
        <summary>What are the most common aspect ratios?</summary>
        <p>1:1 (square), 4:3 (old TV, classic photos), 3:2 (DSLR cameras), 16:9 (HD video, most monitors), 21:9 (cinema, ultrawide), and 2.39:1 (widescreen movies).</p>
      </details>

      <h3>Tips for Working with Aspect Ratios</h3>
      <ul>
        <li>Always check the aspect ratio before resizing or cropping to avoid unwanted distortion.</li>
        <li>For social media, use platform-specific aspect ratios (e.g., Instagram square 1:1, Stories 9:16).</li>
        <li>When designing for print, match your aspect ratio to standard paper sizes (e.g., 8x10, 5x7).</li>
      </ul>

      <p>With the Aspect Ratio Calculator, you can quickly and accurately determine the best dimensions for your project. Avoid guesswork and ensure your visuals look perfect on any screen or print format!</p>
    `
});
