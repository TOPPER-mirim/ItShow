import React, { useState } from "react";
import "../styles/reset.css";
import "../styles/MakeTicketPage.css";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import TicketPreview from "../components/TicketPreview";
import MakePaletter from "../components/MakePalette";
import SinglePaletter from "../components/SinglePaletter";

// import Frame1 from "../components/Frame1";
// import Frame2 from "../components/Frame2";
// import Frame3 from "../components/Frame3";

const MakeTicketPage = () => {
    const location = useLocation();
    const { nickname, content, filter } = location.state || {};

    const filterMap = {
        감성: "../images/필터-감성.svg",
        가오: "../images/필터-가오.svg",
        재미: "../images/필터-개그.svg"
    };

    const logoUrl = filterMap[filter];

    const [fillColor, setFillColor] = useState("#000000");

    const [selectedFrame, setSelectedFrame] = useState(1);

    const [patternUrl, setPatternUrl] = useState(null);

    const handleFrameClick = (frameNumber) => {
        setSelectedFrame(frameNumber);
    };

    const patternMap = {
        감성: [1, 2, 3].map(i => `../images/Pattern/PatternPaletter/감성-패턴${i}.png`),
        가오: [1, 2, 3].map(i => `../images/Pattern/PatternPaletter/가오-패턴${i}.png`),
        재미: [1, 2, 3].map(i => `../images/Pattern/PatternPaletter/개그-패턴${i}.png`),
    };

    const bacco = filter === "감성"
        ? "#BDDDF7"
        : filter === "가오"
            ? "#D9D9D9"
            : "#FFE88E";

    const [selectedStickers, setSelectedStickers] = useState([]);

    const stickerMap = {
        감성: [1, 2, 3].map(i => `../images/Sticker/StickerPaletter/감성-스티커${i}.png`),
        가오: [1, 2, 3].map(i => `../images/Sticker/StickerPaletter/가오-스티커${i}.png`),
        재미: [1, 2, 3].map(i => `../images/Sticker/StickerPaletter/재미-스티커${i}.png`),
    }

    const handleStickerClick = (stickerUrl) => {
        setSelectedStickers(prev => [...prev, {
            id: Date.now(), // 고유 ID
            url: stickerUrl,
            x: 50, // 초기 위치
            y: 50
        }]);
    };

    return (
        <div className="makeTicket-container" style={{
            width: "100vw",
            height: "100vh",
            background: `linear-gradient(to bottom, ${bacco}, transparent)`,
            // backgroundColor: "#F8F8F8"
        }}>

            <TicketPreview
                logoImgUrl={logoUrl}
                fillColor={fillColor}
                frameIndex={selectedFrame} // frameIndex -> selectedFrame으로 수정
                patternUrl={patternUrl}
                stickers={selectedStickers} // 스티커 배열 전달
                onStickerUpdate={setSelectedStickers} // 스티커 업데이트 함수 전달
            />

            <div className="paletter-container">

                <MakePaletter title="프레임">
                    <SinglePaletter imageUrl="../images/프레임1.png" onClick={() => handleFrameClick(1)} />
                    <SinglePaletter imageUrl="../images/프레임2.png" onClick={() => handleFrameClick(2)} />
                    <SinglePaletter imageUrl="../images/프레임3.png" onClick={() => handleFrameClick(3)} />
                </MakePaletter>

                <MakePaletter title="단색 배경">
                    <SinglePaletter imageUrl="../images/none.svg" onClick={() => setFillColor("#D9D9D9")} />
                    <SinglePaletter imageUrl="../images/pink.png" onClick={() => setFillColor("#FFC1C1")} />
                    <SinglePaletter imageUrl="../images/yellow.png" onClick={() => setFillColor("#FEC730")} />
                    <SinglePaletter imageUrl="../images/green.png" onClick={() => setFillColor("#9CD69D")} />
                    <SinglePaletter imageUrl="../images/babyblue.png" onClick={() => setFillColor("#DFECF2")} />
                    <SinglePaletter imageUrl="../images/blue.png" onClick={() => setFillColor("#225268")} />
                    <SinglePaletter imageUrl="../images/black.png" onClick={() => setFillColor("#000000")} />
                </MakePaletter>

                <MakePaletter title="패턴 배경">
                    <SinglePaletter imageUrl="../images/none.svg" onClick={() => setPatternUrl(null)} />
                    {(filter && patternMap[filter] ? patternMap[filter] : []).map((thumbUrl, idx) => {
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
                    <SinglePaletter imageUrl="../images/none.svg" onClick={() => alert("null")} />
                    {(filter && stickerMap[filter] ? stickerMap[filter] : []).map((thumbUrl, idx) => {
                        const appliedUrl = thumbUrl.replace("/StickerPaletter/", "/");
                        return (
                            <SinglePaletter
                                key={idx}
                                imageUrl={thumbUrl}
                                onClick={() => handleStickerClick(appliedUrl)} // 클릭 핸들러 추가
                            />
                        )
                    })}
                </MakePaletter>
            </div>

            <div className="ticketConfirmBox">
                <label className="customCheckbox">
                    <input type="checkbox" name="ticketBookOk" />
                    <span className="checkmark"></span>
                    <p>티켓북에 저장하시겠습니까?</p>
                </label>

                <Button size="big">럭키 티켓 출력하기</Button>
            </div>

        </div>
    );
};

export default MakeTicketPage;