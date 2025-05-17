import React from "react";

function TicketPreview({ logoImgUrl, children }) {
    return (
        <div className="ticket-preview-container">
            <div className="title-container">
                <p className="preview-text">나만의 럭키티켓을 만들어 봐요!</p>
                <img src={logoImgUrl} alt="이모지 아이콘" className="emoji-icon" />
            </div>
            <div className="ticket-content">{children}</div>
        </div>
    );
}

export default TicketPreview;
