/**
 * PrecisionCalc — About & Contact
 */
registerTool({
  id: 'contact',
  name: 'About & Contact',
  category: 'Legal',
  icon: '✉️',
  materialIcon: 'mail',
  tagline: 'Get in touch with us.',
  meta: {
    title: 'About PrecisionCalc — Contact Us',
    description: 'Learn more about PrecisionCalc and get in touch with the Molave Labs team.'
  },

  template: () => `
    <div class="seo-card" style="line-height:1.7;">
      <h1>About PrecisionCalc</h1>
      <p>PrecisionCalc is a high-performance utility hub designed by <strong>Molave Labs</strong>. Our mission is to provide clean, fast, and accurate calculation tools for everyone—from homeowners and investors to students and health enthusiasts.</p>

      <h3>Contact Us</h3>
      <p>Do you have a suggestion for a new tool? Found a bug? We'd love to hear from you.</p>
      <p>For inquiries, please reach out to us at:</p>
      <p><strong>Email:</strong> support@molavelabs.com</p>
      <p><strong>Location:</strong> Built with precision across our global distributed team.</p>
    </div>
  `,

  mount(container) {}
});
