import express from 'express';
import { saveImage, getLatest } from '../controllers/imageController.js';

const router = express.Router();

// base64 이미지 업로드
router.post('/upload', saveImage);

// 최신 이미지 조회
router.get('/latest', getLatest);

export default router;
