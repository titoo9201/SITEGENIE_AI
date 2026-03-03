function formatHTML(html = "") {
  return html
    .replace(/></g, ">\n<")
    .replace(/</g, "\n<")
    .replace(/>/g, ">\n")
    .replace(/\n\s*\n/g, "\n");
}

module.exports = { formatHTML };
