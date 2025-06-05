import express from 'express';
import userController from '../Controllers/userController.js';

const router = express.Router();

// 이름, 내용 입력
router.post('/user', userController.createUser);

// 사용자 조회
router.get('/user/:id', userController.getUserById);

export default router;
