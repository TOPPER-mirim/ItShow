import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { models } from "../Models/index.js";

dotenv.config();

const geminiAPI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 사용자가 입력한 글을 user 테이블에서 가져와서 글을 재생성해서 저장해줌
const geminiController = {
  rewritingSentence: async (req, res) => {
    try {
      const filter = req.body.filter?.trim();
      const id = req.body.id;
      if (!filter || !id) {
        return res.status(400).json({ error: "필터와 아이디가 전달되지 않았습니다." });
      }

      // 프론트에서 보낸 아이디 값인 유저의 글을 찾기
      const userId = await models.User.findOne({
        where: { id },
        attributes: ["id", "content"],
      });
      if (!userId || !userId.content) {
        return res.status(404).json({ error: "사용자가 쓴 글이 없습니다." });
      }

      const originalContent = userId.content;

      // 필터에 따라서 프롬프트 작성
      let prompt = "";
      switch (filter) {
        case "감성":
          prompt = `"${originalContent}" 사용자의 감정을 INFP 스타일로 감성적으로 위로하거나 공감해. 따뜻하고 부드러운 20대 말투로 해. 20자 이내로, 줄바꿈(\n) 없는 문장으로 만들어.`;
          break;
        case "가오":
          prompt = `"${originalContent}" 사용자의 감정을 허세 섞인 말투로 멋있고 간지나게 바꿔. 자존감을 올려주는 위로, 츤데레 느낌으로. 폼, 자존심, 허세 강조. 20자 이내로, 줄바꿈(\n) 없는 문장으로 만들어.`;
          break;
        case "개그":
          prompt = `"${originalContent}" 사용자의 감정을 유쾌하고 재밌게 바꿔. 무조건 웃기려고 하는 개그 스타일, 커뮤니케이션 느낌 강조. 20자 이내로, 줄바꿈(\n) 없는 문장으로 만들어.`;
          break;
        default:
          return res.status(400).json({ error: "올바르지 않은 필터입니다." });
      }

      const model = geminiAPI.getGenerativeModel({ model: "gemini-2.0-flash" }); // gemini-2.0-flash 모델 사용
      const result = await model.generateContent(prompt); // gemini 모델에 prompt(프롬프트) 보냄
      const response = await result.response; // gemini가 생성한 결과 객체
      const text = response.text(); // 텍스트만 추출

      // AI가 생성한 문장 AIContent 테이블에 저장
      await models.AIContent.create({
        reContent: text,
        filterStr: filter,
        contentId: userId.id, // 외래키로 저장
      });

      res.status(201).json(text);
    } catch (err) {
      console.error("Error during Gemini API call:", err);
      res.status(500).json({ error: "Gemini API 호출 중 오류 발생" });
    }
  },

  // 리라이팅한 글 반환
  getRewritingSentence: async (req, res) => {
    try {
      const { contentId } = req.params;
      const reContent = await models.AIContent.findOne({
        where: { contentId },
        attributes: ["id", "reContent"],
      });
      if (!reContent || !reContent.reContent) {
        return res.status(404).json({ error: "다시 생성한 글이 없습니다." });
      }
      res.status(200).json(reContent);
    } catch (error) {
      console.error('Error fetching AIContent:', error);
      res.status(500).json({ error: 'AIContent를 불러오는 데 실패했습니다.' });
    }
  },  
};

export default geminiController;
