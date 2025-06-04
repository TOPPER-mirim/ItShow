import React from "react";
import "../styles/CustomPopup.css";

const CustomPopup = ({ message, children }) => {
    return (
        <div className="custom-popup">
            <div className="popup-content">
                <img
                    src="/images/warning-icon.png"
                    alt="경고 아이콘"
                    className="popup-image"
                />
                <p className="popup-text">{message}</p>
                {children}
            </div>
        </div>
    );
};

export default CustomPopup;