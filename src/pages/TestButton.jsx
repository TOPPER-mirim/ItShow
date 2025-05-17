import React from "react";
import Button from "../components/Button";

function TestButton() {
    const sizes = ["mini", "small", "regular", "medium", "big"];
    const variants = ["green", "empty"];
    return (
        <div>
            {sizes.map((size) => (
                <div
                    key={size}
                    style={{
                        marginBottom: "24px",
                        border: "1px solid #ddd",
                        padding: "12px",
                        borderRadius: "8px",
                    }}
                >
                    <h3 style={{ marginBottom: "12px", textTransform: "capitalize" }}>
                        Size: {size}
                    </h3>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                        {variants.map((variant) => (
                            <Button
                                key={variant}
                                size={size}
                                variant={variant}
                                onClick={() => alert(`Clicked ${size} / ${variant}`)}
                            >
                                {variant} 버튼
                            </Button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TestButton;