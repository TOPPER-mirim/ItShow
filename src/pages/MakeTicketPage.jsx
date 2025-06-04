import React, { useState } from "react";
import "../styles/reset.css";
import "../styles/MakeTicketPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TicketPreview from "../components/TicketPreview";
import MakePaletter from "../components/MakePalette";
import SinglePaletter from "../components/SinglePaletter";
import CustomPopup from "../components/CustomPopup";
import html2canvas from "html2canvas";

const MakeTicketPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { nickname, content, filter } = location.state || {};

    /** 필터에 따른 기본 정보 설정 */
    const filterMap = {
        감성: "/images/필터-감성.svg",
        가오: "/images/필터-가오.svg",
        재미: "/images/필터-개그.svg"
    };
    const logoUrl = filterMap[filter];

    const patternMap = {
        감성: [1, 2, 3].map(i => `/images/Pattern/PatternPaletter/감성-패턴${i}.png`),
        가오: [1, 2, 3].map(i => `/images/Pattern/PatternPaletter/가오-패턴${i}.png`),
        재미: [1, 2, 3].map(i => `/images/Pattern/PatternPaletter/개그-패턴${i}.png`),
    };

    const stickerMap = {
        감성: [1, 2, 3].map(i => `/images/Sticker/StickerPaletter/감성-스티커${i}.png`),
        가오: [1, 2, 3].map(i => `/images/Sticker/StickerPaletter/가오-스티커${i}.png`),
        재미: [1, 2, 3].map(i => `/images/Sticker/StickerPaletter/개그-스티커${i}.png`),
    };

    const backgroundColorMap = {
        감성: "#BDDDF7",
        가오: "#D9D9D9",
        재미: "#FFE88E",
    };

    /** 상태 설정 */
    const [selectedFrame, setSelectedFrame] = useState(1);
    const [fillColor, setFillColor] = useState("#000000");
    const [patternUrl, setPatternUrl] = useState(null);
    const [selectedStickers, setSelectedStickers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const handleFrameClick = (frameNumber) => setSelectedFrame(frameNumber);

    const handleStickerClick = (url) => {
        setSelectedStickers(prev => [
            ...prev,
            { id: Date.now(), url, x: 50, y: 50 }
        ]);
    };

    const handleSubmit = async () => {
        if (saveToBook) {
            await handleDownloadTicket();
        }
        navigate("/result");
    };

    const handleDownloadTicket = async () => {
        const element = document.querySelector(".ticket-preview-wrapper");
        if (!element) return;

        const canvas = await html2canvas(element, { useCORS: true });
        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = "my_ticket.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const [saveToBook, setSaveToBook] = useState(false);

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
                    logoImgUrl={logoUrl}
                    fillColor={fillColor}
                    frameIndex={selectedFrame}
                    patternUrl={patternUrl}
                    stickers={selectedStickers}
                    onStickerUpdate={setSelectedStickers}
                />
            </div>

            <div className="paletter-container">
                <MakePaletter title="프레임">
                    {[1, 2, 3].map(i => (
                        <SinglePaletter
                            key={i}
                            imageUrl={`/images/프레임${i}.png`}
                            onClick={() => handleFrameClick(i)}
                        />
                    ))}
                </MakePaletter>

                <MakePaletter title="단색 배경">
                    {[
                        { color: "#D9D9D9", img: "none.svg" },
                        { color: "#FFC1C1", img: "pink.png" },
                        { color: "#FEC730", img: "yellow.png" },
                        { color: "#9CD69D", img: "green.png" },
                        { color: "#DFECF2", img: "babyblue.png" },
                        { color: "#225268", img: "blue.png" },
                        { color: "#000000", img: "black.png" }
                    ].map(({ color, img }) => (
                        <SinglePaletter
                            key={color}
                            imageUrl={`/images/${img}`}
                            onClick={() => setFillColor(color)}
                        />
                    ))}
                </MakePaletter>

                <MakePaletter title="패턴 배경">
                    <SinglePaletter imageUrl="/images/none.svg" onClick={() => setPatternUrl(null)} />
                    {(patternMap[filter] || []).map((thumbUrl, idx) => {
                        const appliedUrl = thumbUrl.replace("/PatternPaletter/", "/");
                        return (
                            <SinglePaletter
                                key={idx}
                                imageUrl={thumbUrl}
                                onClick={() => setPatternUrl(appliedUrl)}
                            />
                        );
                    })}
                </MakePaletter>

                <MakePaletter title="스티커">
                    <SinglePaletter imageUrl="/images/none.svg" onClick={() => alert("스티커 제거는 추후 구현 예정입니다.")} />
                    {(stickerMap[filter] || []).map((thumbUrl, idx) => {
                        const appliedUrl = thumbUrl.replace("/StickerPaletter/", "/");
                        return (
                            <SinglePaletter
                                key={idx}
                                imageUrl={thumbUrl}
                                onClick={() => handleStickerClick(appliedUrl)}
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
                    럭키 티켓 출력하기 </Button>
            </div>

            {showPopup && (
                <CustomPopup message="정말 티켓을 발행하시겠습니까?">
                    <p className="popup-content-text">발행 이후로 변경하실 수 없어요!</p>
                    <div className="button-container">
                        <Button size="mini" variant="green" onClick={handleSubmit} >
                            티켓 발행하기 </Button>
                        <Button size="mini" variant="empty" onClick={() => setShowPopup(false)} >
                            좀 더 생각해보기 </Button>
                    </div>
                </CustomPopup>
            )}
        </div>
    );
};

export default MakeTicketPage;
