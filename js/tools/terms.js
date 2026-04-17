/**
 * PrecisionCalc — Terms of Service
 */
registerTool({
  id: 'terms',
  name: 'Terms of Service',
  category: 'Legal',
  icon: '📋',
  materialIcon: 'gavel',
  tagline: 'Usage terms and conditions.',
  meta: {
    title: 'Terms of Service — PrecisionCalc',
    description: 'Terms and conditions for using PrecisionCalc tools.'
  },

  template: () => `
    <div class="seo-card" style="line-height:1.7;">
      <h1>Terms of Service</h1>
      <p>By accessing PrecisionCalc.com, you agree to the following terms:</p>

      <h3>1. Accuracy of Results</h3>
      <p>While we strive for 100% precision, all calculations provided by our tools are estimates and should be used for informational purposes only. PrecisionCalc and Molave Labs are not responsible for financial or health decisions made based on these results.</p>

      <h3>2. Permitted Use</h3>
      <p>You may use our tools for personal or professional use. Automated scraping or mass-collection of our calculation logic is prohibited.</p>

      <h3>3. Liability Disclaimer</h3>
      <p>In no event shall PrecisionCalc be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our tools.</p>
    </div>
  `,

  mount(container) {}
});
