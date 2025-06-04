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
    const [saveToBook, setSaveToBook] = useState(false);

    const handleFrameClick = (frameNumber) => setSelectedFrame(frameNumber);

    const handleStickerClick = (url) => {
        setSelectedStickers(prev => [
            ...prev,
            { id: Date.now(), url, x: 50, y: 50 }
        ]);
    };

    // 티켓 다운로드 함수 (프레임만 저장)
    const handleDownloadTicket = async () => {
        if (!ticketPreviewRef.current) {
            console.error("TicketPreview ref가 없습니다.");
            return;
        }

        try {
            const dataUrl = await ticketPreviewRef.current.captureTicket();
            if (dataUrl) {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `${nickname || 'my'}_lucky_ticket.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                console.log("티켓이 성공적으로 저장되었습니다!");
            } else {
                console.error("티켓 캡처에 실패했습니다.");
                alert("티켓 저장에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("티켓 저장 중 오류:", error);
            alert("티켓 저장 중 오류가 발생했습니다.");
        }
    };

    const handleSubmit = async () => {
        // 항상 티켓 다운로드 실행
        await handleDownloadTicket();

        // 체크박스 상태에 따라 티켓북 저장 여부 결정 (필요시 추가 로직)
        if (saveToBook) {
            console.log("티켓북에도 저장됩니다.");
            // 여기에 티켓북 저장 로직 추가 가능
        }

        // 결과 페이지로 이동
        navigate("/result");
    };

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