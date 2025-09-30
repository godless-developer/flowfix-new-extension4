import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_KEY!;

export async function sendMessageReq(text: string, user: any) {
  try {
    // 1. Backend-с мэдээлэл авах
    const backendRes = await axios.get(`${API_BASE_URL}/infos`);
    const infos = backendRes.data || [];

    // 2. Prompt
    const systemPrompt = `
Та зөвхөн хэрэглэгчийн асуулт болон доорх мэдээлэлд суурилж хариул.
Хэзээ ч бүх мэдээллийг бүгдийг нь бүү гарга.
Зөвхөн тухайн асуулттай холбоотой хэсгийг л ашигла.
`;

    // 3. OpenAI API руу
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `
Асуулт: ${text}

Миний backend-с ирсэн мэдээлэл:
${JSON.stringify(infos)}
            `,
          },
        ],
      }),
    });

    const data = await res.json();
    if (data.error) {
      console.error("OpenAI error:", data.error);
      return `⚠️ OpenAI Error: ${data.error.message}`;
    }

    return data.choices?.[0]?.message?.content || "⚠️ Хариулт хоосон ирлээ.";
  } catch (err) {
    console.error("sendMessageReq error:", err);
    return "⚠️ Error: мэдээлэл авахад алдаа гарлаа";
  }
}
