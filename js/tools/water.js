/**
 * PrecisionCalc — Water Intake Calculator
 */
registerTool({
  id:       'water',
  name:     'Water Intake',
  category: 'Health',
  icon:         '💧',
  materialIcon: 'water_drop',
  tagline:  'Find your personalized daily water intake recommendation.',
  keywords: ['water intake', 'hydration', 'daily water', 'how much water to drink', 'water calculator'],
  meta: {
    title:       'Daily Water Intake Calculator — PrecisionCalc',
    description: 'Calculate how much water you should drink per day based on your weight, activity level, and climate. Get results in ounces and liters.'
  },

  template: () => `
    <div class="toggle-row">
      <span>Units:</span>
      <div class="toggle-btn">
        <button id="water-lbs-btn" class="active" onclick="waterSetUnit('lbs')">lbs</button>
        <button id="water-kg-btn" onclick="waterSetUnit('kg')">kg</button>
      </div>
    </div>
    <div class="form-row">
      <div class="field">
        <label for="water-weight">Body Weight</label>
        <input type="number" id="water-weight" placeholder="165" min="0" value="165" />
      </div>
      <div class="field">
        <label for="water-activity">Activity Level</label>
        <select id="water-activity">
          <option value="1.0">Sedentary</option>
          <option value="1.1" selected>Lightly Active</option>
          <option value="1.2">Moderately Active</option>
          <option value="1.35">Very Active</option>
          <option value="1.5">Athlete</option>
        </select>
      </div>
    </div>
    <div class="form-row single">
      <div class="field">
        <label for="water-climate">Climate</label>
        <select id="water-climate">
          <option value="1.0" selected>Temperate (normal)</option>
          <option value="1.1">Hot / Humid</option>
          <option value="0.9">Cold / Low humidity</option>
        </select>
      </div>
    </div>
  `,

  mount(container) {
    window.waterUnit = 'lbs';
    window.waterSetUnit = (unit) => {
      window.waterUnit = unit;
      container.querySelector('#water-lbs-btn').classList.toggle('active', unit === 'lbs');
      container.querySelector('#water-kg-btn').classList.toggle('active',  unit === 'kg');
      container.querySelector('#water-weight').placeholder = unit === 'lbs' ? '165' : '75';
      waterCalc();
    };

    const resultCard = container.querySelector('#result-card-water');

    const waterCalc = () => {
      let weightLbs = parseFloat(container.querySelector('#water-weight')?.value) || 0;
      if (window.waterUnit === 'kg') weightLbs = weightLbs * 2.20462;

      const actMult     = parseFloat(container.querySelector('#water-activity')?.value)  || 1.1;
      const climateMult = parseFloat(container.querySelector('#water-climate')?.value)   || 1.0;

      // Base: ~0.5 oz per lb of body weight (Mayo Clinic guideline)
      const baseOz = weightLbs * 0.5;
      const totalOz = baseOz * actMult * climateMult;
      const totalL  = totalOz * 0.0295735;
      const cups    = totalOz / 8;

      resultCard.innerHTML = `
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">Daily Water Intake</span>
            <span class="result-value large">
              ${fmt.number(totalL, 1)} <span style="font-size:1rem;color:var(--text-muted)">L/day</span>
              <button class="copy-btn" onclick="copyValue(this,'${fmt.number(totalL,1)} L')" title="Copy">📋</button>
            </span>
          </div>
          <div class="result-item">
            <span class="result-label">In Ounces</span>
            <span class="result-value">${Math.round(totalOz)} oz/day</span>
          </div>
          <div class="result-item">
            <span class="result-label">8oz Cups</span>
            <span class="result-value">${Math.round(cups)} cups/day</span>
          </div>
        </div>
      `;
      resultCard.classList.add('active');
      pulseResult('water');
    };

    window.waterCalc = waterCalc;
    container.querySelectorAll('input, select').forEach(el => el.addEventListener('input', waterCalc));
    waterCalc();
  },

  seoContent: `
    <p>Staying properly hydrated is one of the simplest, highest-impact things you can do for your daily health and performance. Water makes up about 60% of the adult human body and plays a critical role in virtually every physiological process — from regulating core body temperature and lubricating joints to flushing metabolic waste, delivering nutrients to cells, and enabling nerve signal transmission. Despite this, research consistently shows that the majority of adults are in a chronic state of mild dehydration without realizing it.</p>

    <h3>The Hydration Formula Used</h3>
    <div class="formula-block">Daily Water (oz) = Body Weight (lbs) × 0.5 × Activity Multiplier × Climate Factor</div>
    <p>This calculator uses the widely cited baseline of <strong>~0.5 oz of water per pound of body weight</strong> as a starting point, then adjusts upward for physical activity and hot/humid climates. The Mayo Clinic recommends approximately 3.7 liters (125 oz/day) for men and 2.7 liters (91 oz/day) for women from <em>all</em> sources combined — including food, which typically contributes 20% of total fluid intake.</p>

    <h3>Debunking the "8 Glasses a Day" Rule</h3>
    <p>The famous "8×8" advice — drink eight 8-ounce glasses of water per day (64 oz / 1.9L) — is a convenient rule of thumb but is not backed by rigorous science. It was likely derived from a 1945 US Food and Nutrition Board recommendation that was widely misquoted over decades. Actual needs vary dramatically by body size, activity level, climate, diet, and individual physiology. This calculator provides a personalized estimate far more accurate than any blanket rule.</p>

    <h3>Signs of Dehydration</h3>
    <p>Dehydration exists on a spectrum — symptoms begin long before you feel severely thirsty:</p>
    <ul>
      <li><strong>Mild (1–2% body weight):</strong> Thirst, dark yellow urine, slightly reduced concentration and mood.</li>
      <li><strong>Moderate (2–4%):</strong> Headache, fatigue, reduced physical performance, dry mouth, dizziness, infrequent urination.</li>
      <li><strong>Severe (5%+):</strong> Rapid heartbeat, sunken eyes, extreme fatigue, confusion. Medical attention required above 7–8%.</li>
    </ul>
    <p>The simplest daily check: your urine should be <strong>pale yellow</strong> (like lemonade). Dark amber means drink more; colorless may mean you're over-hydrating.</p>

    <h3>What Counts Toward Daily Fluid Intake?</h3>
    <p>All beverages and water-rich foods contribute to your total intake:</p>
    <ul>
      <li><strong>Coffee &amp; Tea:</strong> Yes — both count. Despite containing caffeine (a mild diuretic), the net fluid contribution is still positive. A 2014 study in PLOS ONE found no meaningful difference in hydration between coffee drinkers and water drinkers at normal consumption levels.</li>
      <li><strong>Fruits &amp; Vegetables:</strong> Cucumber (~96% water), lettuce (95%), tomatoes (94%), watermelon (92%), and oranges (87%) all contribute meaningfully to daily hydration.</li>
      <li><strong>Soups &amp; broths:</strong> Highly hydrating and also provide electrolytes (sodium, potassium).</li>
      <li><strong>Juices &amp; Sports Drinks:</strong> Count toward fluid totals but add significant sugar/calories — not ideal as primary hydration sources.</li>
    </ul>

    <h3>Electrolytes and Hydration</h3>
    <p>Pure water is not sufficient for hydration during intense exercise or heat exposure. Electrolytes — primarily sodium, potassium, magnesium, and chloride — are essential for fluid absorption and retention in cells. During workouts lasting over 60 minutes, adding an electrolyte tablet, coconut water, or a sports drink to your intake helps prevent hyponatremia (low blood sodium from over-drinking plain water) and maintains muscle function.</p>

    <h3>Hydration and Weight Management</h3>
    <p>Drinking water before meals can reduce caloric intake by creating a feeling of fullness. A 2010 study found that participants who drank 500ml of water 30 minutes before each meal lost 44% more weight over 12 weeks than those who didn't. The body also sometimes misinterprets mild thirst as hunger — staying well-hydrated can reduce unnecessary snacking.</p>

    <details>
      <summary>❓ Does coffee or tea count toward water intake?</summary>
      <p>Yes — caffeinated beverages like coffee and tea do count toward your daily fluid totals. While caffeine has a mild diuretic effect, studies show the net hydration from drinking coffee or tea is still positive. Plain water remains the best choice for primary hydration, but you don't need to offset or "not count" your morning coffee.</p>
    </details>
    <details>
      <summary>❓ Can you drink too much water?</summary>
      <p>Yes. Hyponatremia (water intoxication) occurs when consuming large volumes of plain water dilutes sodium concentration in the blood below safe levels. This is rare for most people under normal conditions but is a real risk for endurance athletes drinking large amounts without electrolyte replacement. Symptoms include nausea, headache, confusion, and in severe cases, seizures or death.</p>
    </details>
    <details>
      <summary>❓ Should I drink more water when sick?</summary>
      <p>Yes. Fever, vomiting, and diarrhea all accelerate fluid and electrolyte loss. The general guidance is to increase water intake and — for vomiting or diarrhea lasting more than a few hours — consider electrolyte solutions (oral rehydration salts, Pedialyte, or similar) to replace lost sodium and potassium, not just water.</p>
    </details>
    <details>
      <summary>❓ How does climate affect how much I should drink?</summary>
      <p>In hot or humid climates, the body sweats significantly more to maintain core temperature — a 165-lb person can lose over 1 liter of sweat per hour during moderate exercise in the heat. Cold climates reduce sweat but increase respiratory fluid loss (you can see your breath) and may also suppress thirst perception, making it easy to under-drink in winter. This calculator applies a climate multiplier to account for these differences.</p>
    </details>
  `
});
