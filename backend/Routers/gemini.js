import express from "express";
import geminiController from "../Controllers/geminiController.js";

const router = express.Router();

router.get("/rewriting", geminiController.rewritingSentence);

export default router;
