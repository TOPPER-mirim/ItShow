import React from "react";
import "../styles/Frame.css";

const Frame1 = ({ fillColor = "black", patternUrl }) => {
    const hasPattern = Boolean(patternUrl);

    return (
        <svg
            viewBox="0 0 670 261" fill="none" xmlns="http://www.w3.org/2000/svg" className="responsive-svg">
            {hasPattern && (
                <defs>
                    <pattern id="pattern-bg" patternUnits="userSpaceOnUse" width="670" height="261">
                        <image  href={patternUrl} width="670" height="261" preserveAspectRatio="xMidYMid slice" />
                    </pattern>
                </defs>
            )}
            <path d="M484.976 0C498.783 0.000189519 509.976 11.193 509.976 25V26.0801C509.976 11.7207 521.616 0.0801445 535.976 0.0800781H644.001C658.36 0.0803226 670.001 11.7208 670.001 26.0801V234.328C670.001 248.687 658.36 260.328 644.001 260.328H535.976C521.616 260.328 509.976 248.687 509.976 234.328V235C509.976 248.807 498.783 260 484.976 260H25C11.1929 260 2.41612e-07 248.807 0 235V25C1.2886e-06 11.1929 11.1929 0 25 0H484.976Z" fill={hasPattern ? "url(#pattern-bg)" : fillColor} />
            <path d="M510 37.0801V223.58" stroke="white" strokeWidth="0.8" strokeDasharray="7 7" />
        </svg>
    );
};

export default Frame1;
