import React, { useState, useEffect } from "react";

function Button({
    children,
    onClick,
    size = "medium",
    variant = "green" // green 또는 empty
}) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 반응형 사이즈 계산
    const getResponsiveSize = (baseSize) => {
        if (windowWidth >= 768 && windowWidth <= 1024) {
            // 태블릿 사이즈
            return {
                mini: {
                    padding: "8px 16px",
                    fontSize: "16px",
                    width: "150px",
                },
                small: {
                    padding: "10px 20px",
                    fontSize: "17px",
                    width: "200px",
                },
                regular: {
                    padding: "12px 24px",
                    fontSize: "18px",
                    width: "300px",
                },
                medium: {
                    padding: "14px 28px",
                    fontSize: "19px",
                    width: "400px",
                },
                big: {
                    padding: "16px 32px",
                    fontSize: "20px",
                    width: "700px",
                },
            };
        } else if (windowWidth < 768) {
            // 모바일 사이즈
            return {
                mini: {
                    padding: "6px 12px",
                    fontSize: "14px",
                    width: "120px",
                },
                small: {
                    padding: "8px 16px",
                    fontSize: "15px",
                    width: "150px",
                },
                regular: {
                    padding: "10px 20px",
                    fontSize: "16px",
                    width: "200px",
                },
                medium: {
                    padding: "12px 24px",
                    fontSize: "17px",
                    width: "250px",
                },
                big: {
                    padding: "14px 28px",
                    fontSize: "18px",
                    width: "100%",
                },
            };
        } else {
            // 데스크톱 사이즈 (기존 값)
            return {
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
        }
    };

    const sizeStyles = getResponsiveSize(size);

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
        transition: "all 0.3s ease", // 부드러운 크기 변화
    };

    return (
        <button style={style} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;