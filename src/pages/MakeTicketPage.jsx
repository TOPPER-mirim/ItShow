import React, { useState, useRef } from "react";
import "../styles/reset.css";
import "../styles/MakeTicketPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TicketPreview from "../components/TicketPreview";
import MakePaletter from "../components/MakePalette";
import SinglePaletter from "../components/SinglePaletter";
import CustomPopup from "../components/CustomPopup";

const MakeTicketPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { nickname, content, filter } = location.state || {};

    // TicketPreview ref 추가
    const ticketPreviewRef = useRef(null);

    /** 필터에 따른 기본 정보 설정 */
    const filterMap = {
        감성: "/images/필터-감성.svg",
        가오: "/images/필터-가오.svg",
        개그: "/images/필터-개그.svg"
    };
    const logoUrl = filterMap[filter];

    const patternMap = {
        감성: [1, 2, 3].map(i => `/images/Pattern/PatternPaletter/감성-패턴${i}.png`),
        가오: [1, 2, 3].map(i => `/images/Pattern/PatternPaletter/가오-패턴${i}.png`),
        개그: [1, 2, 3].map(i => `/images/Pattern/PatternPaletter/개그-패턴${i}.png`),
    };

    const stickerMap = {
        감성: [1, 2, 3].map(i => `/images/Sticker/StickerPaletter/감성-스티커${i}.png`),
        가오: [1, 2, 3].map(i => `/images/Sticker/StickerPaletter/가오-스티커${i}.png`),
        개그: [1, 2, 3].map(i => `/images/Sticker/StickerPaletter/개그-스티커${i}.png`),
    };

    const backgroundColorMap = {
        감성: "#BDDDF7",
        가오: "#D9D9D9",
        개그: "#FFE88E",
    };

    const patternStyleMap = {
        "감성-패턴1": {
            image: "/images/Pattern/감성-패턴1.png",
            textColor: "#C10100",
            fontFamily: "Cafe24ClassicType-Regular",
            ticketLogoImg: "/images/LogoImg/감성-logo1(갈색).png",
        },
        "감성-패턴2": {
            image: "/images/Pattern/감성-패턴2.png",
            textColor: "#05361A",
            fontFamily: "YClover-Bold",
            ticketLogoImg: "/images/LogoImg/감성-logo2(그린).png",
        },
        "감성-패턴3": {
            image: "/images/Pattern/감성-패턴3.png",
            textColor: "#73A8D3",
            fontFamily: "ghanachoco",
            ticketLogoImg: "/images/LogoImg/감성-logo3(골드).png",
        },
        "가오-패턴1": {
            image: "/images/Pattern/가오-패턴1.png",
            textColor: "#FFFFFF",
            fontFamily: "LOTTERIADDAG",
            ticketLogoImg: "/images/LogoImg/가오-logo1(화이트).png",
        },
        "가오-패턴2": {
            image: "/images/Pattern/가오-패턴2.png",
            textColor: "#FFFFFF",
            fontFamily: "SeoulHangangM",
            ticketLogoImg: "/images/LogoImg/가오-logo1(화이트).png",
        },
        "가오-패턴3": {
            image: "/images/Pattern/가오-패턴3.png",
            textColor: "#FFFFFF",
            fontFamily: "SeoulHangangM",
            ticketLogoImg: "/images/LogoImg/가오-logo1(화이트).png",
        },
        "개그-패턴1": {
            image: "/images/Pattern/개그-패턴1.png",
            textColor: "#000000",
            fontFamily: "GothicA1-Light",
            ticketLogoImg: "/images/LogoImg/개그-logo1(노랑).png",
        },
        "개그-패턴2": {
            image: "/images/Pattern/개그-패턴2.png",
            textColor: "#FFFFFF",
            fontFamily: "YoonChildfundkoreaManSeh",
            ticketLogoImg: "/images/LogoImg/개그-logo1(노랑).png",
        },
        "개그-패턴3": {
            image: "/images/Pattern/개그-패턴3.png",
            textColor: "#E14F36",
            fontFamily: "GothicA1-Light",
            ticketLogoImg: "/images/LogoImg/개그-logo2(오렌지).png",
        },
    };

    const [selectedFrame, setSelectedFrame] = useState(1);
    const [fillColor, setFillColor] = useState(backgroundColorMap[filter]);
    const [patternUrl, setPatternUrl] = useState(null);
    const [textColor, setTextColor] = useState("#000000"); // 텍스트 색상 상태 추가
    const [fontFamily, setFontFamily] = useState("Pretendard"); // 글꼴 상태 추가
    const [selectedStickers, setSelectedStickers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [saveToBook, setSaveToBook] = useState(false);
    const [ticketLogoImg, setTicketLogoImg] = useState(null);

    const handleFrameClick = (frameNumber) => setSelectedFrame(frameNumber);

    const handleStickerClick = (url) => {
        setSelectedStickers(prev => [
            ...prev,
            { id: Date.now(), url, x: 50, y: 50 }
        ]);
    };

    // 패턴 클릭 핸들러 수정
    const handlePatternClick = (thumbUrl, idx) => {
        const patternKey = `${filter}-패턴${idx + 1}`;
        const patternStyle = patternStyleMap[patternKey];

        if (patternStyle) {
            setPatternUrl(patternStyle.image);
            setTextColor(patternStyle.textColor);
            setFontFamily(patternStyle.fontFamily);
            setTicketLogoImg(patternStyle.ticketLogoImg);

            setFillColor("transparent");
        }
    };

    const handleColorClick = (color, logoImg) => {
        setFillColor(color);
        setPatternUrl(null);
        setFontFamily(null);
        setTicketLogoImg(logoImg);

        const isDarkColor = ["#000000", "#225268"].includes(color);
        setTextColor(isDarkColor ? "#FFFFFF" : "#000000");
    };

    const handleSubmit = async () => {
        try {
            const dataUrl = await ticketPreviewRef.current?.captureTicket();
            if (!dataUrl) {
                alert("티켓 캡처에 실패했습니다.");
                return;
            }

            // base64 데이터URL에서 헤더 제거하고 pure base64만 추출
            const base64Data = dataUrl.replace(/^data:image\/[a-z]+;base64,/, "");

            // JSON 형태로 전송
            const response = await fetch("http://54.180.152.171:3000/upload", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Data  // 헤더 제거된 순수 base64 데이터
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("업로드 성공:", result);

            navigate('/result', {
                state: {
                    nickname: nickname,
                    content,
                    filter,
                    ticketData: result,
                    saveToBook,
                    ticketImage: dataUrl
                }
            });

            // 이후 로컬 다운로드 및 세션 저장 등은 생략
        } catch (error) {
            console.error("백엔드 업로드 중 오류:", error);
            alert("티켓 업로드에 실패했습니다.");
        }
    };

    // console.log(layoutStyleMap[filter]);

    return (
        <div
            className="makeTicket-container"
            style={{
                width: "100vw",
                background: `linear-gradient(to bottom, ${backgroundColorMap[filter]}, transparent)`
            }}
        >
            <div className="ticket-preview-wrapper">
                <TicketPreview
                    ref={ticketPreviewRef}
                    logoImgUrl={logoUrl}
                    fillColor={fillColor}
                    frameIndex={selectedFrame}
                    patternUrl={patternUrl}
                    textColor={textColor} // 텍스트 색상 prop 추가
                    fontFamily={fontFamily} // 글꼴 prop 추가
                    stickers={selectedStickers}
                    onStickerUpdate={setSelectedStickers}
                    filter={filter}
                    ticketLogoImg={ticketLogoImg}
                />
            </div>

            <div className="paletter-container">
                <MakePaletter title="프레임">
                    {[1, 2, 3].map(i => (
                        <SinglePaletter
                            key={i}
                            imageUrl={`/images/프레임${i}.png`}
                            onClick={() => handleFrameClick(i)}
                            isSelected={selectedFrame === i}
                        />
                    ))}
                </MakePaletter>

                <MakePaletter title="단색 배경">
                    {[
                        { color: backgroundColorMap[filter], img: "none.svg", ticketLogoImg: "/images/Ticketlogo.png" },
                        { color: "#FFC1C1", img: "pink.png", ticketLogoImg: "/images/Ticketlogo.png" },
                        { color: "#FEC730", img: "yellow.png", ticketLogoImg: "/images/Ticketlogo.png" },
                        { color: "#9CD69D", img: "green.png", ticketLogoImg: "/images/Ticketlogo.png" },
                        { color: "#DFECF2", img: "babyblue.png", ticketLogoImg: "/images/Ticketlogo.png" },
                        { color: "#225268", img: "blue.png", ticketLogoImg: "/images/Ticketlogo.png" },
                        { color: "#000000", img: "black.png", ticketLogoImg: "/images/Ticketlogo.png" }
                    ].map(({ color, img, ticketLogoImg }) => (
                        <SinglePaletter
                            key={color}
                            imageUrl={`/images/${img}`}
                            onClick={() => handleColorClick(color, ticketLogoImg)}
                            isSelected={fillColor === color && patternUrl === null}
                        />
                    ))}
                </MakePaletter>

                <MakePaletter title="패턴 배경">
                    <SinglePaletter
                        imageUrl="/images/none.svg"
                        onClick={() => {
                            setPatternUrl(null);
                            setTextColor("#000000");
                            setFillColor(backgroundColorMap[filter]);
                            setFontFamily("Pretendard");
                        }}
                        isSelected={patternUrl === null}
                    />
                    {(patternMap[filter] || []).map((thumbUrl, idx) => {
                        const patternKey = `${filter}-패턴${idx + 1}`;
                        const patternStyle = patternStyleMap[patternKey];
                        const isSelected = patternUrl === patternStyle?.image;

                        return (
                            <SinglePaletter
                                key={idx}
                                imageUrl={thumbUrl}
                                onClick={() => handlePatternClick(thumbUrl, idx)}
                                isSelected={isSelected}
                            />
                        );
                    })}
                </MakePaletter>

                <MakePaletter title="스티커">
                    <SinglePaletter
                        imageUrl="/images/none.svg"
                        onClick={() => setSelectedStickers([])}
                        isSelected={selectedStickers.length === 0}
                    />
                    {(stickerMap[filter] || []).map((thumbUrl, idx) => {
                        const appliedUrl = thumbUrl.replace("/StickerPaletter/", "/");
                        const isSelected = selectedStickers.some(s => s.url === appliedUrl);
                        return (
                            <SinglePaletter
                                key={idx}
                                imageUrl={thumbUrl}
                                onClick={() => handleStickerClick(appliedUrl)}
                                isSelected={isSelected}
                            />
                        );
                    })}
                </MakePaletter>
            </div>

            {/* 하단 확인 박스 */}
            <div className="ticketConfirmBox">
                <label className="customCheckbox">
                    <input
                        type="checkbox"
                        name="ticketBookOk"
                        checked={saveToBook}
                        onChange={(e) => setSaveToBook(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    <p>티켓북에 저장하시겠습니까?</p>
                </label>

                <Button size="big" onClick={() => setShowPopup(true)}>
                    럭키 티켓 출력하기
                </Button>
            </div>

            {showPopup && (
                <CustomPopup message="정말 티켓을 발행하시겠습니까?">
                    <p className="popup-content-text">발행 이후로 변경하실 수 없어요!</p>
                    <div className="button-container">
                        <Button size="mini" variant="green" onClick={handleSubmit}>
                            티켓 발행하기
                        </Button>
                        <Button size="mini" variant="empty" onClick={() => setShowPopup(false)}>
                            좀 더 생각해보기
                        </Button>
                    </div>
                </CustomPopup>
            )}
        </div>
    );
};

export default MakeTicketPage;