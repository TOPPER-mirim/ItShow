import express from 'express';
import qrCodeController from '../Controllers/qrCodeController.js';

const router = express.Router();

// 큐알 코드 반환
router.get('/qrcode', qrCodeController.returnQRCode);

export default router;
