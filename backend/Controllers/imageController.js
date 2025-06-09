import { Op } from "sequelize";
import path from "path";
import fs from "fs/promises"; // 프로미스 기반 fs
import { v4 as uuidv4 } from "uuid";
import { models } from "../Models/index.js";

const { User, Image, AIContent } = models;

// base64 이미지 저장 및 DB 기록
export const saveImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res
        .status(400)
        .json({ message: "base64 이미지 데이터가 필요합니다." });
    }

    // base64 헤더 제거 (예: data:image/png;base64,...)
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    // 확장자 추출 (image/png -> png)
    const extMatch = image.match(/^data:image\/(\w+);base64,/);
    const ext = extMatch ? extMatch[1] : "png";

    // 고유 파일명 생성
    const filename = `${uuidv4()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "backend", "uploads");

    // uploads 폴더 없으면 생성
    await fs.mkdir(uploadDir, { recursive: true });

    // 파일 경로
    const filePath = path.join(uploadDir, filename);

    // base64 -> 바이너리로 변환 후 저장
    await fs.writeFile(filePath, base64Data, "base64");

    // 가장 최근 사용자 조회
    const latestUser = await User.findOne({
      order: [["createdAt", "DESC"]],
      attributes: ["id"],
    });

    if (!latestUser) {
      return res.status(404).json({ message: "사용자가 없습니다." });
    }

    // DB에 이미지 기록
    const savedImage = await Image.create({
      userId: latestUser.id,
      img: filename,
    });

    res.status(201).json({
      id: savedImage.id,
      img: filename,
      imageUrl: `${req.protocol}://${req.get("host")}/uploads/${filename}`,
    });
  } catch (error) {
    console.error("base64 이미지 저장 오류:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};

// 가장 최근 사용자 및 이미지 조회
export const getLatest = async (req, res) => {
  try {
    const latestUser = await User.findOne({
      order: [["createdAt", "DESC"]],
      attributes: ["id"],
    });

    if (!latestUser) {
      return res.status(404).json({ message: "사용자가 없습니다." });
    }

    const latestImage = await Image.findOne({
      where: { userId: latestUser.id },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "img"],
    });

    if (!latestImage) {
      return res.status(404).json({ message: "이미지가 없습니다." });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      latestImage.img
    }`;

    res.status(200).json({
      userId: latestUser.id,
      imageUrl,
    });
  } catch (error) {
    console.error("이미지 조회 오류:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};

// 모든 이미지 조회
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.findAll({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "userId", "img", "createdAt"],
    });

    if (images.length === 0) {
      return res.status(404).json({ message: "저장된 이미지가 없습니다." });
    }

    // 각 이미지에 대해 URL 생성
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads`;
    const imageList = images.map((img) => ({
      id: img.id,
      userId: img.userId,
      imageUrl: `${baseUrl}/${img.img}`,
      createdAt: img.createdAt,
    }));

    res.status(200).json(imageList);
  } catch (error) {
    console.error("전체 이미지 조회 오류:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};

// filterStr별 이미지(아이디, 필터) 반환
export const getFilterImages = async (req, res) => {
  try {
    const { filterStr } = req.body;

    // filterStr이 있으면 LIKE 검색 조건 생성
    const whereClause = filterStr
      ? { filterStr: { [Op.like]: `${filterStr}` } }
      : {};

    const contents = await AIContent.findAll({
      where: whereClause,
      attributes: ["filterStr"],
      include: [
        {
          model: User,
          attributes: ["id", "name"],
          include: [
            {
              model: Image,
              attributes: ["id", "img", "createdAt"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (contents.length === 0) {
      return res
        .status(404)
        .json({ message: "조건에 맞는 콘텐츠가 없습니다." });
    }

    // 이미지가 있는 항목만 필터링 후 응답 데이터 생성
    const responseData = contents
      .filter((content) => content.User && content.User.Images.length > 0)
      .map((content) => ({
        id: content.User.Images[0].id, // 이미지의 ID
        filterStr: content.filterStr,
        imageUrl: `${req.protocol}://${req.get("host")}/uploads/${content.User.Images[0].img}`,
      }));

    res.status(200).json(responseData);
  } catch (error) {
    console.error("filterStr별 이미지 조회 오류:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};
