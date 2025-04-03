import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:5173',  // React 개발 서버 주소
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Node.js 서버 정상 실행 중!');
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
