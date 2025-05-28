import React from "react";
// import "../styles/Frame.css";

const Frame1 = ({ fillColor = "black" }) => {
    
    return (
        <svg width="949" height="370" viewBox="0 0 949 370" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="1" width="722.337" height="368.268" rx="30" fill={fillColor} />
            <path d="M722 52V317" stroke="white" strokeDasharray="23 23" />
            <rect x="722" width="227" height="369" rx="30" fill={fillColor} />
        </svg>
    );
};

export default Frame1;