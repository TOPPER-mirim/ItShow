import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/FilterPage.css";

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
                        <img src="./images/필터-감성.svg" className="filter-icon"/>
                        <p className="filter-name">감성 필터</p>
                    </div>
                    
                    <div className="filter-description-container">
                        <div className="description">감성 필터는 여러분의 이야기를 깊게 공감하여 위안, 감동을 줄 수 있는 필터에요.</div>
                        <div className="ex">ex) 오늘 너무 우울해 → 내일은 좀 더 너에게 희망적인 날이 되기를</div>
                    </div>
                </div>

                {/* 가오 필터 */}
                <div className="filter-gao" onClick={() => handleFilterClick("가오")}>
                    <div className="filter-logo">
                        <img src="./images/필터-가오.svg" className="filter-icon"/>
                        <p className="filter-name">가오 필터</p>
                    </div>

                    <div className="filter-description-container">
                        <div className="description">가오 필터는 여러분의 이야기를 멋있고 든든한 말투로 위안 또는 이야기 해주는 필터에요.</div>
                        <div className="ex">ex) 선우가 너무 보고싶은데 볼 수 없어 → 선우? 선우따위 필요없어. 잘생긴 사람 보고싶으면 거울 봐</div>
                    </div>
                </div>

                {/* 재미 필터 */}
                <div className="filter-fun" onClick={() => handleFilterClick("재미")}>
                    <div className="filter-logo">
                        <img src="./images/필터-개그.svg" className="filter-icon"/>
                        <p className="filter-name">개그 필터</p>
                    </div>

                    <div className="filter-description-container">
                        <div className="description">개그 필터는 여러분의 이야기를 즐거움과 웃음으로 바꿔주는 필터에요.</div>
                        <div className="ex">ex) 배고파..집 가고싶어. → 앞에 있는 노트북 부앙부앙 씹어먹자</div>
                    </div>
                </div>
            </div>

            {loading && <p className="loading-text">AI가 열심히 작성 중이에요...</p>}
        </div>
    );
};

export default FilterPage;