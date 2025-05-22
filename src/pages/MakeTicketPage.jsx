import React from "react";
import "../styles/reset.css";
import "../styles/MakeTicketPage.css";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import TicketPreview from "../components/TicketPreview";

const MakeTicketPage = () => {
    const location = useLocation();
    const { nickname, content, filter } = location.state || {};

    const filterMap = {
        감성: "../images/필터-감성.svg",
        가오: "../images/필터-가오.svg",
        개그: "../images/필터-개그.svg"
    };

    const logoUrl = filterMap[filter]

    return (
        <div className="makeTicket-container">

            <TicketPreview logoImgUrl={logoUrl}></TicketPreview>

            <Button size="big">럭키 티켓 출력하기</Button>
            
        </div>
    );
};

export default MakeTicketPage;
