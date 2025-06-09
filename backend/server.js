import express from "express";
import cors from "cors";
import path from 'path';
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
    origin: "http://localhost:5173", // React 개발 서버 주소
  })
);

// 정적 파일 제공 경로 (uploads 폴더)
app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));

app.use("/", geminiRouter);
app.use("/", userRouter);
app.use("/", qrcodeRouter);
app.use("/", imageRouter);

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

app.listen(5000, () => {
  console.log("서버가 http://localhost:5000 에서 실행 중입니다.");
});
