import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const geminiAPI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function rewritingSentence(req, res) {
  try {
    const userEmotion = req.body.emotion; // emotion이라는 데이터 필드로 값 받아오기
    if (!userEmotion) {
      return res.status(400).json({ error: "오늘의 감정을 입력하세요" });
    }

    const model = geminiAPI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // gemini-2.0-flash 모델 사용
    const prompt = `"${userEmotion}"사용자의 감정을 INFP 스타일로 감성적으로 위로하거나 공감해줘. 따뜻하고 부드러운 20대 말투로. 문장은 20자 이내로 해줘.`;

    const result = await model.generateContent(prompt); // gemini 모델에 prompt(프롬프트) 보냄
    const response = await result.response; // gemini가 생성한 결과 객체
    const text = response.text(); // 텍스트만 추출
    res.json({ result: text.trim() }); // trim(): 앞뒤 불필요한 공백 제거
  } catch (err) {
    console.error('Error during Gemini API call:', err);
    res.status(500).json({ error: 'Gemini API 호출 중 오류 발생' });
  }
}