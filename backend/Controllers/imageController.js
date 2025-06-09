import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { models } from '../Models/index.js';

const { User, Image } = models;

// multer 설정: uploads 폴더에 저장, 파일명 중복 방지
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), 'backend', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        const uniqueSuffix = uuidv4(); // 고유한 UUID
        const filename = `${uniqueSuffix}_${basename}${ext}`;
        cb(null, filename);
    }       
});

// upload middleware (라우터에서 사용)
export const upload = multer({ storage });

// 이미지 저장
export const saveImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: '이미지 파일이 필요합니다.' });
        }

        // 가장 최근 사용자 가져오기
        const latestUser = await User.findOne({
            order: [['createdAt', 'DESC']],
            attributes: ['id'],
        });

        if (!latestUser) {
            return res.status(404).json({ message: '사용자가 없습니다.' });
        }

        // 이미지 정보 DB에 저장
        const savedImage = await Image.create({
            userId: latestUser.id,
            img: req.file.filename,
        });

        res.status(201).json({ id: savedImage.id, img: savedImage.img });
    } catch (error) {
        console.error('이미지 저장 오류:', error);
        res.status(500).json({ message: '서버 에러' });
    }
};

// 가장 최근 사용자 및 이미지 조회
export const getLatest = async (req, res) => {
    try {
        const latestUser = await User.findOne({
            order: [['createdAt', 'DESC']],
            attributes: ['id'],
        });

        if (!latestUser) {
            return res.status(404).json({ message: '사용자가 없습니다.' });
        }

        const latestImage = await Image.findOne({
            where: { userId: latestUser.id },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'img'],
        });

        if (!latestImage) {
            return res.status(404).json({ message: '이미지가 없습니다.' });
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${latestImage.img}`;

        res.status(200).json({
            userId: latestUser.id,
            imageUrl,
        });
    } catch (error) {
        console.error('이미지 조회 오류:', error);
        res.status(500).json({ message: '서버 에러' });
    }
};