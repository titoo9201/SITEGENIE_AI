
async function extractJson(rawResponse) {
 try {
  if (!rawResponse) return null;

  // Remove markdown json fences
  let cleanText = rawResponse
   .replace(/```json/g, "")
   .replace(/```/g, "")
   .trim();

  // Find JSON block
  const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

  if (!jsonMatch) return null;

  let jsonString = jsonMatch[0];

  // Extra safety sanitization
  jsonString = jsonString
   .replace(/,\s*}/g, "}")
   .replace(/,\s*]/g, "]");

  return JSON.parse(jsonString);

 } catch (error) {
  console.log("json parsing error:", error.message);
  return null;
 }
}

module.exports = { extractJson };

module.exports={
    extractJson
}
