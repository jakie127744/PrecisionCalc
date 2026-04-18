/**
 * PrecisionCalc — Unified Tool Registry
 * Contains metadata for all tools to support dashboard rendering while lazy-loading logic.
 */

window.PrecisionCalcRegistry = {
  'age': { id: 'age', name: 'Age Calculator', category: 'Daily Life', icon: '👶', materialIcon: 'calendar_month' },
  'amortization': { id: 'amortization', name: 'Amortization Table', category: 'Finance', icon: '📈', materialIcon: 'table_chart' },
  'aspect': { id: 'aspect', name: 'Aspect Ratio', category: 'Daily Life', icon: '📸', materialIcon: 'aspect_ratio' },
  'autoloan': { id: 'autoloan', name: 'Auto Loan & Lease', category: 'Finance', icon: '🚗', materialIcon: 'directions_car' },
  'bac': { id: 'bac', name: 'BAC Calculator', category: 'Health', icon: '🍷', materialIcon: 'local_bar' },
  'binaryhex': { id: 'binaryhex', name: 'Binary & Hex Converter', category: 'Education', icon: '🔢', materialIcon: '123' },
  'bmi': { id: 'bmi', name: 'BMI Calculator', category: 'Health', icon: '⚖️', materialIcon: 'monitor_weight' },
  'bodyfat': { id: 'bodyfat', name: 'Body Fat % (Navy)', category: 'Health', icon: '💪', materialIcon: 'fitness_center' },
  'circle': { id: 'circle', name: 'Circle Calculator', category: 'Math', icon: '⭕', materialIcon: 'circle' },
  'compound': { id: 'compound', name: 'Compound Interest', category: 'Finance', icon: '📈', materialIcon: 'monitoring' },
  'cone': { id: 'cone', name: 'Cone Calculator', category: 'Math', icon: '⏶', materialIcon: 'change_history' },
  'contact': { id: 'contact', name: 'About & Contact', category: 'Legal', icon: '✉️', materialIcon: 'mail' },
  'cookingconvert': { id: 'cookingconvert', name: 'Cooking Measurement Converter', category: 'Daily Life', icon: '🥣', materialIcon: 'kitchen' },
  'credit-card-payoff': { id: 'credit-card-payoff', name: 'Credit Card Payoff', category: 'Finance', icon: '💳', materialIcon: 'credit_card' },
  'cube': { id: 'cube', name: 'Cube Calculator', category: 'Math', icon: '🧊', materialIcon: 'check_box_outline_blank' },
  'cylinder': { id: 'cylinder', name: 'Cylinder Calculator', category: 'Math', icon: '🛢️', materialIcon: 'cylinder' },
  'datediff': { id: 'datediff', name: 'Date Difference Calculator', category: 'Daily Life', icon: '📅', materialIcon: 'event' },
  'duration': { id: 'duration', name: 'Time Duration', category: 'Daily Life', icon: '🕒', materialIcon: 'schedule' },
  'ellipse': { id: 'ellipse', name: 'Ellipse Calculator', category: 'Math', icon: '⭕', materialIcon: 'circle' },
  'emi': { id: 'emi', name: 'Loan/EMI Calculator', category: 'Finance', icon: '💰', materialIcon: 'payments' },
  'exponent': { id: 'exponent', name: 'Exponent/Power Calculator', category: 'Math', icon: '^', materialIcon: 'superscript' },
  'factorial': { id: 'factorial', name: 'Factorial Calculator', category: 'Math', icon: '!', materialIcon: 'calculate' },
  'final-grade': { id: 'final-grade', name: 'Final Grade Goal', category: 'Education', icon: '🎯', materialIcon: 'ads_click' },
  'fraction': { id: 'fraction', name: 'Fraction Calculator', category: 'Math', icon: '➗', materialIcon: 'calculate' },
  'freelancetax': { id: 'freelancetax', name: 'Freelance Tax Estimator', category: 'Finance', icon: '💰', materialIcon: 'calculate' },
  'gas': { id: 'gas', name: 'Gas Cost Calculator', category: 'Daily Life', icon: '⛽', materialIcon: 'local_gas_station' },
  'gcdlcm': { id: 'gcdlcm', name: 'GCD/LCM Calculator', category: 'Math', icon: 'gcd', materialIcon: 'calculate' },
  'gpa': { id: 'gpa', name: 'GPA/CGPA Calculator', category: 'Education', icon: '📚', materialIcon: 'school' },
  'grade': { id: 'grade', name: 'Weighted Grade Calc', category: 'Education', icon: '📊', materialIcon: 'analytics' },
  'idealweight': { id: 'idealweight', name: 'Ideal Weight', category: 'Health', icon: '🏋️', materialIcon: 'monitor_weight' },
  'inflation': { id: 'inflation', name: 'Inflation Calculator', category: 'Finance', icon: '💵', materialIcon: 'trending_up' },
  'kitchen': { id: 'kitchen', name: 'Kitchen Converter', category: 'Daily Life', icon: '🍳', materialIcon: 'kitchen' },
  'logarithm': { id: 'logarithm', name: 'Logarithm Calculator', category: 'Math', icon: 'log', materialIcon: 'calculate' },
  'macro': { id: 'macro', name: 'Macro Calculator', category: 'Health', icon: '🍎', materialIcon: 'restaurant' },
  'matrix': { id: 'matrix', name: 'Matrix Calculator', category: 'Math', icon: '🔢', materialIcon: 'grid_on' },
  'mortgage': { id: 'mortgage', name: 'Mortgage Calculator', category: 'Finance', icon: '🏠', materialIcon: 'home' },
  'onerepmax': { id: 'onerepmax', name: 'One-Rep Max (1RM)', category: 'Health', icon: '💪', materialIcon: 'fitness_center' },
  'parallelogram': { id: 'parallelogram', name: 'Parallelogram Calculator', category: 'Math', icon: '▱', materialIcon: 'rectangle' },
  'password': { id: 'password', name: 'Password Strength', category: 'Daily Life', icon: '🔒', materialIcon: 'password' },
  'percentage': { id: 'percentage', name: 'Percentage Calculator', category: 'Math', icon: '%', materialIcon: 'percent' },
  'polygon': { id: 'polygon', name: 'Regular Polygon Calculator', category: 'Math', icon: '⎔', materialIcon: 'hexagon' },
  'pregnancy': { id: 'pregnancy', name: 'Pregnancy Due Date', category: 'Health', icon: '👶', materialIcon: 'pregnant_woman' },
  'prime': { id: 'prime', name: 'Prime Checker', category: 'Math', icon: '🔮', materialIcon: '123' },
  'privacy': { id: 'privacy', name: 'Privacy Policy', category: 'Legal', icon: '🛡️', materialIcon: 'policy' },
  'pythagorean': { id: 'pythagorean', name: 'Pythagorean Theorem', category: 'Math', icon: '△', materialIcon: 'square_foot' },
  'quadratic': { id: 'quadratic', name: 'Quadratic Solver', category: 'Math', icon: '√', materialIcon: 'calculate' },
  'rectangle': { id: 'rectangle', name: 'Rectangle/Square Calculator', category: 'Math', icon: '▭', materialIcon: 'rectangle' },
  'retirement': { id: 'retirement', name: '401k/Retirement Planner', category: 'Finance', icon: '👥', materialIcon: 'savings' },
  'roi': { id: 'roi', name: 'ROI Calculator', category: 'Finance', icon: '💸', materialIcon: 'trending_up' },
  'salary': { id: 'salary', name: 'Salary to Hourly', category: 'Finance', icon: '💵', materialIcon: 'payments' },
  'savings-goal': { id: 'savings-goal', name: 'Savings Goal Calculator', category: 'Finance', icon: '💰', materialIcon: 'savings' },
  'scientific-notation': { id: 'scientific-notation', name: 'Scientific Notation', category: 'Education', icon: '🔬', materialIcon: 'auto_fix' },
  'scientific': { id: 'scientific', name: 'Scientific Calculator', category: 'Math', icon: '🖩', materialIcon: 'science' },
  'simple-interest': { id: 'simple-interest', name: 'Simple Interest', category: 'Finance', icon: '$', materialIcon: 'savings' },
  'sphere': { id: 'sphere', name: 'Sphere Calculator', category: 'Math', icon: '⚽', materialIcon: 'circle' },
  'stddev': { id: 'stddev', name: 'Standard Deviation', category: 'Math', icon: 'σ', materialIcon: 'functions' },
  'study-planner': { id: 'study-planner', name: 'Study Hour Planner', category: 'Education', icon: '📅', materialIcon: 'more_time' },
  'tdee': { id: 'tdee', name: 'TDEE Calculator', category: 'Health', icon: '🔥', materialIcon: 'local_fire_department' },
  'terms': { id: 'terms', name: 'Terms of Service', category: 'Legal', icon: '📋', materialIcon: 'gavel' },
  'tipsplit': { id: 'tipsplit', name: 'Tip Splitter', category: 'Daily Life', icon: '💸', materialIcon: 'payments' },
  'tip': { id: 'tip', name: 'Tip Calculator', category: 'Daily Life', icon: '💸', materialIcon: 'percent' },
  'trapezoid': { id: 'trapezoid', name: 'Trapezoid Calculator', category: 'Math', icon: '⏢', materialIcon: 'trending_flat' },
  'triangle': { id: 'triangle', name: 'Triangle Calculator', category: 'Math', icon: '△', materialIcon: 'change_history' },
  'unit': { id: 'unit', name: 'Unit Converter', category: 'Daily Life', icon: '📏', materialIcon: 'straighten' },
  'water': { id: 'water', name: 'Water Intake', category: 'Health', icon: '💧', materialIcon: 'water_drop' },
  'word-counter': { id: 'word-counter', name: 'Essay Analyzer', category: 'Education', icon: '📝', materialIcon: 'edit_note' }
};

window.registerTool = function(toolDef) {
  // Merge full data into the existing stub
  window.PrecisionCalcRegistry[toolDef.id] = {
    ...window.PrecisionCalcRegistry[toolDef.id],
    ...toolDef
  };
};

window.getAllTools = function() {
  return Object.values(window.PrecisionCalcRegistry);
};

window.searchTools = function(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return window.getAllTools().filter(t => 
    t.name.toLowerCase().includes(q) || 
    (t.keywords && t.keywords.some(k => k.toLowerCase().includes(q))) ||
    t.category.toLowerCase().includes(q)
  );
};
