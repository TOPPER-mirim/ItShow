import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });
import express from "express";
import cors from "cors";
import { models } from './Models/index.js';
import geminiRouter from "./Routers/gemini.js";
import userRouter from "./Routers/user.js";
import qrcodeRouter from "./Routers/qrcode.js";
import imageRouter from "./Routers/image.js";

const app = express();

// json body parser, 용량 제한 추가
app.use(express.json({ limit: '10mb' }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://itshow-luckyticket.vercle.app"], // React 개발 서버 주소
    credentials: true,
  })
);

// 정적 파일 제공 경로 (uploads 폴더)
app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));

app.use("/", geminiRouter);
app.use("/", userRouter);
app.use("/", qrcodeRouter);
app.use("/", imageRouter);

app.get('/', (req, res) => {
  res.send('Hello from server!');
});

// DB 연결 및 테이블 동기화
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

app.listen(3000, '0.0.0.0', () => {
  console.log("서버가 http://0.0.0.0:3000 에서 실행 중입니다.");
});
