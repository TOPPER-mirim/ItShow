import React from "react";

import "../styles/GaoLayout.css";

const GaoLayout = ({
    filter,
    textStyle,
    filterLayout,
    aiText,
    userInfo,
    dateTime,
    ticketLogoImg
}) => {
    return (
        <div className="T-content-container" style={textStyle}>
            <div className="content-left" style={{ position: "relative" }}>
                <div className="gao-left-content-container">
                    <img
                        src={filterLayout}
                        alt={`${filter} 레이아웃 가이드`}
                        className="layout-guide-image"
                    />

                    <div className="gao-logo-concept">
                        <p className="gao-lucky-ticket-text" style={textStyle}>
                            Lucky Ticket
                        </p>
                        <p className="gao-concept-text" style={textStyle}>
                            concept.{filter}
                        </p>
                    </div>

                    <div className="gao-logo-ai-user">
                        <div className="logo-container">
                            <img
                                src={ticketLogoImg}
                                alt="LuckyTicket"
                                className="gao-ticket-logo"
                            />
                        </div>

                        <div className="gao-ai-text">
                            {aiText}
                        </div>

                        <div className="gao-user-text">
                            {userInfo?.content || "로딩 중..."}
                        </div>
                    </div>

                    <div className="gao-name-date">
                        <div className="gao-name">
                            {userInfo?.name || "로딩 중..."}
                        </div>
                        <div className="gao-year-days-day">
                            <div className="gao-year">
                                {dateTime.year}
                            </div>
                            <div className="gao-days">
                                {dateTime.day}
                            </div>
                            <div className="gao-day">
                                {dateTime.dayOfWeek}
                            </div>
                        </div>
                    </div>

                    <div className="gao-topper-month-time">
                        <div className="gao-topper">
                            TOPPER
                        </div>
                        <div className="gao-month">
                            {dateTime.month}
                        </div>
                        <div className="gao-time">
                            {dateTime.time}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GaoLayout;
