import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/reset.css";
import "../styles/FilterPage.css";
import FilterSelect from "../components/FilterSelect";

const FilterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { nickname, content } = location.state || {};

    const [loading, setLoading] = useState(false);

    const handleFilterClick = (filter) => {
        navigate("/make", {
            state: {
                nickname,
                content,
                filter,
            },
        });
    };

    return (
        <div className="all-container">
            <div className="back-icon">
                <img src="./images/filter-page-back-icon.svg" />
                <img src="./images/filter-page-back-icon.svg" />
            </div>

            <FilterSelect
                title="필터를 선택해 볼까요?"
                subtitle="설명을 읽고 어떤 필터를 사용할지 고민해 보세요!"
                onFilterClick={handleFilterClick}
            />
        </div>
    );
};

export default FilterPage;
