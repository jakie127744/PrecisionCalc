/**
 * CALCY — Tool Registry
 * Each tool is a self-contained object with: id, name, category, keywords,
 * icon, meta (for SEO), and seoContent (visible article below the fold).
 * Logic and template are defined in each tool's own file under js/tools/.
 */

window.PrecisionCalcRegistry = {};

/**
 * Register a tool into the global registry.
 * Called by each individual tool file.
 */
window.registerTool = function(toolDef) {
  window.PrecisionCalcRegistry[toolDef.id] = toolDef;
};

/**
 * Get all tools as a flat array.
 */
window.getAllTools = function() {
  return Object.values(window.PrecisionCalcRegistry);
};

/**
 * Search tools by query string against name and keywords.
 */
window.searchTools = function(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return window.getAllTools().filter(tool => {
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.keywords.some(k => k.toLowerCase().includes(q)) ||
      tool.category.toLowerCase().includes(q)
    );
  });
};
