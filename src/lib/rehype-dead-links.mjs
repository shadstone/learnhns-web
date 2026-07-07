/** @typedef {import('hast').Root} Root */
/** @typedef {import('hast').Element} Element */

const DEAD_LINK_PATTERN = /namebase\.io/i;

/**
 * Marks links to offline Namebase hosts so docs CSS can style them.
 * @returns {import('unified').Plugin<[], Root>}
 */
export function rehypeDeadLinks() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'a') return;

      const href = node.properties?.href;
      if (typeof href !== 'string' || !DEAD_LINK_PATTERN.test(href)) return;

      const existing = node.properties.className;
      const classes = Array.isArray(existing)
        ? existing
        : existing
          ? [existing]
          : [];

      node.properties.className = [...classes, 'dead-link'];
      node.properties.title = 'Namebase service offline (June 2026)';
    });
  };
}

/** @param {import('hast').Nodes} node */
function walk(node, fn) {
  fn(node);
  if ('children' in node && Array.isArray(node.children)) {
    for (const child of node.children) walk(child, fn);
  }
}

/** @param {string} id */
export function isArchivedDocId(id) {
  return (
    id.startsWith('about-namebase/') ||
    id === 'development/namebase-record-assistant'
  );
}