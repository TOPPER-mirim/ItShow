import express from "express";
import geminiController from "../Controllers/geminiController.js";

const router = express.Router();

// 리라이팅한 글 디비에 저장
router.post("/rewriting", geminiController.rewritingSentence);

// 리라이팅한 글 반환
router.get("/getRewriting/:contentId", geminiController.getRewritingSentence);

export default router;
