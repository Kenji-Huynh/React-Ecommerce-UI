const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Kiểm tra xem API key có tồn tại không
if (!OPENAI_API_KEY) {
  console.warn('OpenAI API key not found. Chatbot functionality will be limited.');
}

export const chatWithAI = async (userMessage, products) => {
  // Kiểm tra API key trước khi gọi API
  if (!OPENAI_API_KEY) {
    return {
      message: "Xin lỗi, tính năng chatbot hiện tại không khả dụng. Vui lòng liên hệ với chúng tôi để được hỗ trợ.",
      suggestedProducts: [],
      keywords: [],
      reasoning: "API key không được cấu hình"
    };
  }

  // Chuẩn bị context sản phẩm
  const productsContext = products.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    tags: product.tags,
    level: product.level,
    instructor: product.instructor,
    author: product.author
  }));

  const systemPrompt = `
Bạn là trợ lý AI tư vấn học tiếng Anh của TEMPO. Nhiệm vụ của bạn là:
1. Phân tích tin nhắn của người dùng để tìm keywords về loại sản phẩm, kỹ năng, trình độ, mục tiêu, giảng viên.
2. Dựa trên keywords, gợi ý 2-3 sản phẩm phù hợp nhất từ danh sách sản phẩm.
3. Trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp.
4. Giải thích tại sao gợi ý những sản phẩm đó.
Danh sách sản phẩm hiện có: ${JSON.stringify(productsContext)}
Hãy phản hồi theo format JSON:
{
  "message": "Câu trả lời của bạn",
  "suggestedProducts": [id1, id2, id3],
  "keywords": ["keyword1", "keyword2"],
  "reasoning": "Lý do gợi ý"
}
`;

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      max_tokens: 1000,
      temperature: 0.7
    })
  });

  if (!response.ok) throw new Error("Lỗi khi gọi OpenAI API");

  const data = await response.json();
  const aiContent = data.choices[0].message.content;

  try {
    const parsed = JSON.parse(aiContent);
    return {
      message: parsed.message,
      suggestedProducts: parsed.suggestedProducts
        ? parsed.suggestedProducts.map(id => products.find(p => p.id === id)).filter(Boolean)
        : [],
      keywords: parsed.keywords || [],
      reasoning: parsed.reasoning || ""
    };
  } catch {
    return { message: aiContent, suggestedProducts: [], keywords: [], reasoning: "" };
  }
};
