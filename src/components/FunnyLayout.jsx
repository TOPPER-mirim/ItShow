import React from "react";
import "../styles/FunnyLayout.css";
import Layout from "./Layout";

const FunnyLayout = ({
    filter,
    textStyle,
    // filterLayout,
    aiText,
    userInfo,
    dateTime,
    ticketLogoImg,
    layoutColor
}) => {
    return (
        <div className="T-content-container" style={textStyle}>
            <div className="content-left" style={{ position: "relative" }}>
                <div className="left-content-wrapper">
                    <img
                        src={ticketLogoImg}
                        alt="LuckyTicket"
                        className="ticket-logo"
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
                <Layout filter={filter} layoutColor={layoutColor} className="fun-layout-guide-image"/>

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