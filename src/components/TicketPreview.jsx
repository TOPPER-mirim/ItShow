import React, { useState } from "react";
import "../styles/TicketPreview.css";

function TicketPreview({ logoImgUrl, children }) {
    const [isClicked, setIsClicked] = useState(false);

    const handleToggleColor = () => {
        setIsClicked(!isClicked);
    };

    const fillColor = isClicked ? "#FDD835" : "black"; // 클릭 시 노란색

    return (
        <div className="ticket-preview-container">
            <div className="preview-title-container">
                <p className="preview-text">나만의 럭키티켓을 만들어 봐요!</p>
                <img src={logoImgUrl} alt="이모지 아이콘" className="emoji-icon" />
            </div>

            <div className="ticket-frame" onClick={handleToggleColor}>
                <svg
                    width="949"
                    height="370"
                    viewBox="0 0 949 370"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="TicketFrame"
                >
                    <rect y="1" width="722.337" height="368.268" rx="30" fill={fillColor} />
                    <path d="M722 52V317" stroke="white" strokeDasharray="23 23" />
                    <rect x="722" width="227" height="369" rx="30" fill={fillColor} />
                </svg>
            </div>

            <div className="ticket-content">{children}</div>
        </div>
    );
}

export default TicketPreview;