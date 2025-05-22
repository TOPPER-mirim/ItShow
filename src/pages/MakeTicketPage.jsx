import React, { useState } from "react";
import "../styles/reset.css";
import "../styles/MakeTicketPage.css";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import TicketPreview from "../components/TicketPreview";
import MakePaletter from "../components/MakePalette";
import SinglePaletter from "../components/SinglePaletter";

const MakeTicketPage = () => {
    const location = useLocation();
    const { nickname, content, filter } = location.state || {};

    const filterMap = {
        감성: "../images/필터-감성.svg",
        가오: "../images/필터-가오.svg",
        개그: "../images/필터-개그.svg"
    };

    const logoUrl = filterMap[filter];
    const [filterColor, setFilterColor] = useState("#000000");

    return (
        <div className="makeTicket-container">

            <TicketPreview logoImgUrl={logoUrl} filterColor={filterColor}></TicketPreview>

            <MakePaletter title="프레임">
                <SinglePaletter
                    imageUrl="../images/필터-개그.svg"
                    onClick={() => setFilterColor("#FFC1C1")}
                />
                <SinglePaletter
                    imageUrl="../images/필터-개그.svg"
                    onClick={() => setFilterColor("#FEC730")}
                />
                <SinglePaletter
                    imageUrl="../images/필터-개그.svg"
                    onClick={() => setFilterColor("#9CD69D")}
                />
                <SinglePaletter
                    imageUrl="../images/필터-개그.svg"
                    onClick={() => setFilterColor("#DFECF2")}
                />
                <SinglePaletter
                    imageUrl="../images/필터-개그.svg"
                    onClick={() => setFilterColor("#225268")}
                />
                <SinglePaletter
                    imageUrl="../images/필터-개그.svg"
                    onClick={() => setFilterColor("#000000")}
                />
            </MakePaletter>

            <Button size="big">럭키 티켓 출력하기</Button>

        </div>
    );
};

export default MakeTicketPage;
