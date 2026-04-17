/**
 * PrecisionCalc — Privacy Policy
 * Required for legal compliance and AdSense approval.
 */
registerTool({
  id: 'privacy',
  name: 'Privacy Policy',
  category: 'Legal',
  icon: '🛡️',
  materialIcon: 'policy',
  tagline: 'How we handle your data.',
  meta: {
    title: 'Privacy Policy — PrecisionCalc',
    description: 'Our commitment to your privacy and data security.'
  },

  template: () => `
    <div class="seo-card" style="line-height:1.7;">
      <h1>Privacy Policy</h1>
      <p>Last updated: April 17, 2026</p>
      
      <p>At <strong>PrecisionCalc.com</strong> (part of Molave Labs), your privacy is our priority. This document outlines the types of personal information we receive and collect when you use our services.</p>

      <h3>1. Data Collection</h3>
      <p>We do not require user accounts or registration. Most tools on PrecisionCalc are used anonymously. Calculation data is processed locally in your browser and is not stored on our servers unless specifically requested (e.g., saving to local history).</p>

      <h3>2. Advertising & Cookies</h3>
      <p>We use third-party advertising companies (such as Google AdSense) to serve ads when you visit our website. These companies may use cookies to provide advertisements about goods and services of interest to you.</p>

      <h3>3. Log Files</h3>
      <p>Like many other websites, we make use of log files. These files merely log visitors to the site—usually a standard procedure for hosting companies and a part of hosting services' analytics. The information inside the log files includes IP addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks.</p>

      <h3>4. Contact Us</h3>
      <p>If you have any questions regarding this policy, you may contact us via our parent site at Molave Labs.</p>
    </div>
  `,

  mount(container) {
    // Static content, nothing to mount
  }
});
