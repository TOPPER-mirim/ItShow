import { models } from "../Models/index.js";
import QRCode from "qrcode";
import fs from "fs/promises";
import path from "path";

const qrCodeController = {
  // 큐알 코드 반환
  returnQRCode: async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).send("userId가 없습니다.");
      }

      // 이미지 테이블 userId에 저장되어 있는 아이디 (사용자 아이디) 불러오기
      const imgData = await models.Image.findOne({
        where: { userId },
      });
      if (!imgData) {
        return res.status(404).send("아이디(이미지)가 존재하지 않습니다.");
      }

      // DB에 저장된 경로
      const dbImgPath = imgData.img; //img: Image 테이블의 컬럼 이름

      // 실제 서버 경로 확인
      const actualImgPath = path.join(process.cwd(), "backend", "uploads", dbImgPath);

      try {
        await fs.access(actualImgPath);
      } catch {
        return res.status(404).send("이미지 파일이 존재하지 않습니다.");
      }

      // 서버 주소 포함해서 전체 URL 구성 (프론트에서도 접근 가능하게)
      // encodeURI: URL에 들어가면 안 되는 문자들을 인코딩해주는 함수 (한글 포함)
      const imageURL = `${req.protocol}://${req.get("host")}/uploads/${encodeURI(dbImgPath)}`;

      // QR 코드 생성 (이미지가 생성)
      const qrcode = await QRCode.toDataURL(imageURL);

      // 결과 응답
      res.json({ qrCode: qrcode, originalImagePath: imageURL });
    } catch (error) {
      console.error("QR 코드 생성 오류:", error);
      res.status(500).json({ error: "QR 코드 생성 실패", detail: error.message });
    }
  },
};

export default qrCodeController;
