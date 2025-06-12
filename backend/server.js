import fs from 'fs';
import https from 'https';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { models } from './Models/index.js';
import geminiRouter from "./Routers/gemini.js";
import userRouter from "./Routers/user.js";
import qrcodeRouter from "./Routers/qrcode.js";
import imageRouter from "./Routers/image.js";

dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });

const app = express();

app.use(express.json({ limit: '10mb' }));

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));

app.use("/", geminiRouter);
app.use("/", userRouter);
app.use("/", qrcodeRouter);
app.use("/", imageRouter);

app.get('/', (req, res) => {
  res.send('Hello from server!');
});

(async () => {
  try {
    await models.sequelize.authenticate();
    console.log("DB 연결 성공");
    await models.sequelize.sync({ force: false });
    console.log("테이블 동기화 완료");
  } catch (error) {
    console.error("DB 연결 실패:", error);
  }
})();

// SSL 인증서와 키 경로를 설정 (보통 .env에 저장)
const sslOptions = {
  key: fs.readFileSync(path.resolve(process.cwd(), 'backend', 'ssl', 'privkey.pem')),
  cert: fs.readFileSync(path.resolve(process.cwd(), 'backend', 'ssl', 'fullchain.pem')),
};

// HTTPS 서버 생성
https.createServer(sslOptions, app).listen(443, () => {
  console.log("HTTPS 서버가 https://0.0.0.0 에서 실행 중입니다.");
});