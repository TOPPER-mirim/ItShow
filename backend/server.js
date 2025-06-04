import express from 'express';
import cors from 'cors';
import geminiRouter from './Routers/gemini.js';

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',  // React 개발 서버 주소
}));

app.use('/gemini', geminiRouter);

app.listen(5000, () => {
    console.log('서버가 http://localhost:5000 에서 실행 중입니다.');
});
