const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "deepseek/deepseek-chat";

async function generateResponse(prompt) {
  const response = await fetch(openRouterUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "system",
          content: `
You are a website generator AI.

Rules:
- Return ONLY valid JSON
- Do NOT add explanations
- Do NOT add markdown
- Do NOT add code fences
- Output must follow this format:

{
 "message":"short explanation",
 "code":"full html code"
}
`
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error("OpenRouter error " + err);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

module.exports = {
  generateResponse,
};
