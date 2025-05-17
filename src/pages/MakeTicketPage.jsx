import React from "react";
import "../styles/reset.css";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import TicketPreview from "../components/TicketPreview";

const MakeTicketPage = () => {
    const location = useLocation();
    const { nickname, content, filter } = location.state || {};

    const logoUrl = "../images/필터-가오.svg";

    return (
        <div>
            <h2>선택한 필터:</h2>
            <p>{filter ? filter : "필터 정보 없음"}</p>

            <TicketPreview logoImgUrl={logoUrl}>
                <h3>럭키티켓 제목</h3>
                <p>여기에 티켓 설명이나 꾸미기 요소들을 넣으면 됩니다.</p>
            </TicketPreview>

            <Button size="big">럭키 티켓 출력하기</Button>
        </div>
    );
};

export default MakeTicketPage;
