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
You are a professional website generator.

Return ONLY valid JSON in this format:
{
 "message":"short confirmation",
 "code":"full html website code"
}

No markdown.
No explanation.
No code fences.
`
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error("OpenRouter error " + err);
  }

  const data = await response.json();

  if (!data?.choices?.[0]?.message?.content) {
    throw new Error("Invalid AI response");
  }

  return data.choices[0].message.content;
}

module.exports = {
  generateResponse,
};
