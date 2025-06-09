import express from 'express';
import { upload, saveImage, getLatest } from '../controllers/imageController.js';

const router = express.Router();

// 업로드할 때는 upload.single('image') 사용
router.post('/upload', upload.single('image'), saveImage);

// 최신 이미지 조회
router.get('/latest', getLatest);

export default router;