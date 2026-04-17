/**
 * PrecisionCalc — Gas Cost Calculator
 * Estimates the cost of a road trip based on distance, fuel efficiency, and gas price.
 */
registerTool({
  id:       'gas',
  name:     'Gas Cost Calculator',
  category: 'Daily Life',
  icon:         '\u26fd',
  materialIcon: 'local_gas_station',
  tagline:  'Estimate the cost of a road trip.',
  keywords: ['gas', 'cost', 'road trip', 'fuel', 'mpg', 'l/100km'],
  meta: {
    title:       'Gas Cost Calculator — PrecisionCalc',
    description: 'Estimate the cost of a road trip based on distance, fuel efficiency, and gas price.'
  },

  template: () => `
    <div class=\"form-row\">
      <div class=\"field\"><label for=\"gas-distance\">Distance (miles)</label><input type=\"number\" id=\"gas-distance\" value=\"100\" /></div>
      <div class=\"field\"><label for=\"gas-eff\">Fuel Efficiency (mpg)</label><input type=\"number\" id=\"gas-eff\" value=\"25\" /></div>
      <div class=\"field\"><label for=\"gas-price\">Gas Price ($/gal)</label><input type=\"number\" id=\"gas-price\" value=\"3.50\" step=\"0.01\" /></div>
    </div>
  `,

  mount(container) {
    const ids = ['gas-distance', 'gas-eff', 'gas-price'];
    const els = ids.map(id => container.querySelector(`#${id}`));
    const resultCard = container.querySelector('#result-card-gas');

    const calc = () => {
      const dist = parseFloat(els[0].value) || 0;
      const eff = parseFloat(els[1].value) || 0;
      const price = parseFloat(els[2].value) || 0;

      if (dist <= 0 || eff <= 0 || price <= 0) {
          resultCard.innerHTML = `<div class="result-placeholder">Enter values above to see results ✦</div>`;
          return;
      }

      const gallons = dist / eff;
      const cost = gallons * price;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Estimated Trip Cost</span>
            <span class="result-value large">
                ${fmt.currency(cost)}
                <button class="copy-btn" onclick="copyValue(this,'${fmt.currency(cost)}')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">Fuel Required</span>
            <span class="result-value">${fmt.number(gallons)} gal</span>
          </div>
          <div class="result-item">
            <span class="result-label">Cost per Mile</span>
            <span class="result-value">${fmt.currency(cost / dist)}/mi</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('gas');
    };

    els.forEach(el => el?.addEventListener('input', calc));
    calc();
  }
  ,
    seoContent: `
      <p>The Gas Cost Calculator is a practical tool for anyone planning a road trip, daily commute, or simply budgeting for fuel expenses. By estimating the total cost of gas for a journey, you can make smarter travel decisions, compare routes, and manage your transportation budget more effectively. This calculator is especially useful for families, business travelers, delivery drivers, and anyone who wants to avoid surprises at the pump.</p>

      <h3>How the Calculator Works</h3>
      <ol>
        <li>Enter the total distance you plan to travel (in miles).</li>
        <li>Input your vehicle’s fuel efficiency (miles per gallon, or mpg).</li>
        <li>Enter the current price of gas per gallon.</li>
        <li>The calculator instantly shows your estimated total fuel cost for the trip.</li>
      </ol>

      <h3>Why Estimate Gas Costs?</h3>
      <ul>
        <li><strong>Trip Planning:</strong> Know your fuel expenses before you hit the road, whether for a vacation, business trip, or daily commute.</li>
        <li><strong>Budgeting:</strong> Track monthly or annual fuel costs to manage your household or business finances.</li>
        <li><strong>Route Comparison:</strong> Compare different routes or modes of transportation to find the most cost-effective option.</li>
        <li><strong>Carpooling & Ridesharing:</strong> Split costs fairly among passengers or set rates for rideshare services.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>How accurate is the estimate?</summary>
        <p>The calculator provides a close estimate based on your inputs. Actual costs may vary due to traffic, driving style, terrain, and changes in gas prices.</p>
      </details>
      <details>
        <summary>How do I find my car’s fuel efficiency?</summary>
        <p>Check your vehicle’s manual, dashboard display, or use online resources. You can also calculate it by dividing miles driven by gallons used over several fill-ups.</p>
      </details>
      <details>
        <summary>Can I use this for metric units?</summary>
        <p>This version uses miles and gallons. For kilometers and liters, convert your values or look for a metric version of the calculator.</p>
      </details>

      <h3>Tips for Saving on Gas</h3>
      <ul>
        <li>Keep your tires properly inflated and your car well-maintained for better fuel efficiency.</li>
        <li>Drive at steady speeds and avoid rapid acceleration or braking.</li>
        <li>Plan trips to combine errands and reduce unnecessary mileage.</li>
        <li>Use apps or websites to find the lowest gas prices along your route.</li>
      </ul>

      <p>With the Gas Cost Calculator, you can travel with confidence, knowing your estimated fuel expenses in advance. Use it to plan your next adventure, manage your budget, or simply satisfy your curiosity about the true cost of driving!</p>
    `
});
