function getSummaryTextFromHtml(html, numWords = 30) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const text = doc.body.textContent || "";
  const words = text.split(/\s+/).filter(Boolean);
  return (
    words.slice(0, numWords).join(" ") + (words.length > numWords ? "..." : "")
  );
}
export default getSummaryTextFromHtml;
