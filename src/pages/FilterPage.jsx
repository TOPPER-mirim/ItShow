import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FilterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { nickname, content } = location.state || {}; // 이전 페이지에서 받은 데이터

    const [loading, setLoading] = useState(false);

    const handleFilterClick = async (filter) => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await fetch("https://your-backend.com/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nickname, content, filter }),
            });

            const data = await response.json();

            navigate("/result", {
                state: {
                    nickname,
                    originalContent: content,
                    filter,
                    aiResult: data.result,
                },
            });
        } catch (error) {
            console.error("AI 요청 실패:", error);
            alert("AI 응답에 실패했습니다!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="filter-container">
            <div className="title-container">
                <h2 className="title">필터를 선택해 볼까요?</h2>
                <p className="subtitle">설명을 읽고 어떤 필터를 사용할지 고민해 보세요!</p>
            </div>

            <div className="filter-list">
                {/* 감성 필터 */}
                <div className="filter-gamsung" onClick={() => handleFilterClick("감성")}>
                    <div className="filter-logo">
                        <div className="icon">✉️</div>
                    </div>
                </div>
            </div>

            {loading && <p className="loading-text">AI가 열심히 작성 중이에요...</p>}
        </div>
    );
};

export default FilterPage;