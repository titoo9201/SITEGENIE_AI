
async function extractJson(rawResponse) {
    try {
        if(!rawResponse)
        {
            return null
        }
        const cleanText = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const firstCurlyBraces=cleanText.indexOf("{")
        const lastCurlyBraces=cleanText.lastIndexOf("}")
        if(firstCurlyBraces===-1 || lastCurlyBraces===-1)
        {
            return null;
        }
        const jsonString=cleanText.slice(firstCurlyBraces,lastCurlyBraces+1)
        return JSON.parse(jsonString)

    } catch (error) {
        console.log("json parsing error",error);
        return null;
        
    }
    
}

module.exports={
    extractJson
}