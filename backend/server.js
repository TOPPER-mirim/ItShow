import express from "express";
import cors from "cors";
import models from './Models/index.js';
import geminiRouter from "./Routers/gemini.js";
import userRouter from "./Routers/user.js";



const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // React 개발 서버 주소
  })
);

app.use("/", geminiRouter);
app.use("/", userRouter);

// DB 연결 및 테이블 동기화
(async () => {
  try {
    await models.sequelize.authenticate();
    console.log("DB 연결 성공");
    await models.sequelize.sync(); // 테이블 없으면 생성됨
    console.log("테이블 동기화 완료");
  } catch (error) {
    console.error("DB 연결 실패:", error);
  }
})();

app.listen(5000, () => {
  console.log("서버가 http://localhost:5000 에서 실행 중입니다.");
});