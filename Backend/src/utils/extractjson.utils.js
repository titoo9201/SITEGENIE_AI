
async function extractJson(rawResponse) {
 try {
  if(!rawResponse) return null

  // Remove markdown fences
  let cleanText = rawResponse
   .replace(/```json/g,"")
   .replace(/```/g,"")
   .trim()

  // Find JSON start-end
  const start = cleanText.indexOf("{")
  const end = cleanText.lastIndexOf("}")

  if(start === -1 || end === -1) return null

  const jsonString = cleanText.substring(start, end + 1)

  return JSON.parse(jsonString)

 } catch(error){
  console.log("json parsing error", error.message)
  return null
 }
}

module.exports={
    extractJson
}
