import express from "express";
import cors from "cors";
import path from 'path';
import { models } from './Models/index.js';
import geminiRouter from "./Routers/gemini.js";
import userRouter from "./Routers/user.js";
import qrcodeRouter from "./Routers/qrcode.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // React 개발 서버 주소
  })
);

// 클라이언트가 '/uploads/파일명'으로 접근하면 (db에 uploads/images/파일명으로 저장되어 있으니까)
// 서버의 'backend/uploads' 폴더에 있는 실제 파일 제공
app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads'))); 

app.use("/", geminiRouter);
app.use("/", userRouter);
app.use("/", qrcodeRouter);

// DB 연결 및 테이블 동기화
(async () => {
  try {
    await models.sequelize.authenticate();
    console.log("DB 연결 성공");
    // force: false는 테이블이 없으면 새로 생성
    // 테이블 구조가 변경된 경우 기존 테이블을 삭제하고 다시 만들고 싶다면 force: true 사용
    await models.sequelize.sync({ force: false });
    console.log("테이블 동기화 완료");
  } catch (error) {
    console.error("DB 연결 실패:", error);
  }
})();

app.listen(5000, () => {
  console.log("서버가 http://localhost:5000 에서 실행 중입니다.");
});