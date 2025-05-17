import React from "react";

function Button({
    children,
    onClick,
    size = "medium",
    variant = "green" // green 또는 empty
}) {
    const sizeStyles = {
        mini: {
            padding: "4px 8px",
            fontSize: "19px",
            width: "184px",
        },
        small: {
            padding: "6px 12px",
            fontSize: "17px",
            width: "290px",
        },
        regular: {
            padding: "8px 16px",
            fontSize: "19px",
            width: "401px",
        },
        medium: {
            padding: "8px 20px",
            fontSize: "20px",
            width: "630px",
        },
        big: {
            padding: "8px 28px",
            fontSize: "23px",
            width: "1071px",
        },
    };

    const variantStyles = {
        green: {
            backgroundColor: "#69DA70",
            color: "#FFFFFF",
            border: "none",
        },
        empty: {
            backgroundColor: "#FFFFFF",
            color: "#69DA70",
            border: "2px solid #69DA70",
        },
    };

    const style = {
        ...sizeStyles[size],
        ...variantStyles[variant],
        cursor: "pointer",
        borderRadius: "8px",
    };

    return (
        <button style={style} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;