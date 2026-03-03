function formatHTML(html = "") {
  try {
    return html
      .replace(/></g, ">\n<")
      .replace(/(<\/(head|body|html)>)/g, "$1\n")
      .replace(/(<(head|body|html)[^>]*>)/g, "\n$1\n")
      .replace(/\n\s*\n/g, "\n");
  } catch {
    return html;
  }
}

module.exports = { formatHTML };
