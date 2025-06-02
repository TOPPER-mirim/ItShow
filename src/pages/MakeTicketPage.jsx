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

    return (
        <div className="makeTicket-container">

            <TicketPreview
                logoImgUrl={logoUrl}
                fillColor={fillColor}
                frameIndex={selectedFrame}
                patternUrl={patternUrl}
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
                    {(filterMap[filter] ? patternMap[filter] : []).map((thumbUrl, idx) => {
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

                <Button size="big">럭키 티켓 출력하기</Button>
            </div>


        </div>
    );
};

export default MakeTicketPage;
