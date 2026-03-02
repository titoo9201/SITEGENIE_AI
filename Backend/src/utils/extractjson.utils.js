async function extractJson(rawResponse) {
    try {
        if (!rawResponse) return null;

        let text = rawResponse;

        // Remove markdown code blocks
        text = text.replace(/```json/g, "");
        text = text.replace(/```javascript/g, "");
        text = text.replace(/```/g, "");

        // Sometimes AI adds explanation text → extract only JSON part
        const firstIndex = text.indexOf("{");
        const lastIndex = text.lastIndexOf("}");

        if (firstIndex === -1 || lastIndex === -1) return null;

        const jsonString = text.slice(firstIndex, lastIndex + 1);

        return JSON.parse(jsonString);

    } catch (error) {
        console.log("json parsing error", error.message);
        return null;
    }
}

module.exports = { extractJson };
