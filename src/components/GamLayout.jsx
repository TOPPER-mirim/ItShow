import React from "react";
import "../styles/GamLayout.css";

const GamLayout = ({
    filter,
    textStyle,
    filterLayout,
    aiText,
    userInfo,
    dateTime,
}) => {
    return (
        <div className="T-content-container">
            <div className="content-left" style={{ position: "relative" }}>
                <div className="gam-left-content-wrapper">

                    <img
                        src={filterLayout}
                        alt={`${filter} 레이아웃 가이드`}
                        className="layout-guide-image"
                    />

                    <div className="gam-lucky-ticket-text" style={textStyle}>
                        Lucky Ticket
                    </div>

                    <p className="gam-topper-text" style={textStyle}>
                        TOPPER
                    </p>

                    <div className="gam-ai-text" style={textStyle}>
                        {aiText}
                    </div>

                    <div className="gam-user-info">
                        <div className="gam-concept-text" style={textStyle}>
                            concept.{filter}
                        </div>
                        <div className="gam-user-content-text" style={textStyle}>
                            {userInfo?.content || "로딩 중..."}
                        </div>
                    </div>

                    <div className="gam-ticket-info">
                        <div className="gam-user-name" style={textStyle}>
                            {userInfo?.name || "로딩 중..."}
                        </div>

                        <div className="gam-date-container-left">
                            <div className="gam-month-day-container">
                                <div className="gam-month-text" style={textStyle}>
                                    {dateTime.dayOfWeek}
                                </div>
                                <div className="gam-day-text" style={textStyle}>
                                    {dateTime.month}
                                </div>
                            </div>
                            <div className="gam-days-text" style={textStyle}>
                                {dateTime.day}
                            </div>
                            <div className="gam-year-hour-container">
                                <div className="gam-year-text" style={textStyle}>
                                    {dateTime.year}
                                </div>
                                <div className="gam-hour-text" style={textStyle}>
                                    {dateTime.time}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-right">
                <img
                    src="../images/Ticketlogo.png"
                    alt="LuckyTicket"
                    className="gam-ticket-logo"
                    style={{ transform: "rotate(90deg)" }}
                />
            </div>
        </div>
    );
};

export default GamLayout;
