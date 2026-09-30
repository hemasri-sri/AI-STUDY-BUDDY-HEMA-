const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

const askGemini = async (prompt) => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      if (!err.message.includes("503") || attempt === 3) {
        throw err;
      }

      await new Promise(resolve => setTimeout(resolve, attempt * 5000));
    }
  }
};

module.exports = { askGemini };
