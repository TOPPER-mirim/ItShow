import React from "react";
import "../styles/FunnyLayout.css";

const FunnyLayout = ({
    filter,
    textStyle,
    filterLayout,
    aiText,
    userInfo,
    dateTime,
}) => {
    return (
        <div className="content-container" style={textStyle}>
            <div className="content-left" style={{ position: "relative" }}>
                <div className="gam-left-content-wrapper">
                    <img
                        src="../images/Ticketlogo.png"
                        alt="LuckyTicket"
                        className="gam-ticket-logo"
                    />
                    <div className="ai-text">
                        {aiText}
                    </div>
                    <div className="user-text">
                        {userInfo?.content || "로딩 중..."}
                    </div>
                    <div className="name">
                        {userInfo?.name || "로딩 중..."}
                    </div>
                </div>
            </div>

            <div className="content-right">
                <img
                    src={filterLayout}
                    alt={`${filter} 레이아웃 가이드`}
                    className="layout-guide-image"
                />

                <div className="right-container">
                    <div className="day-month">
                        <div className="day">
                            {dateTime.dayOfWeek}
                        </div>
                        <div className="month">
                            {dateTime.month}
                        </div>
                    </div>
                    <div className="days">
                        {dateTime.day}
                    </div>
                    <div className="year-time">
                        <div className="year">
                            {dateTime.year}
                        </div>
                        <div className="time">
                            {dateTime.time}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FunnyLayout;