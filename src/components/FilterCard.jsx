import React from "react";
import "../styles/FilterCard.css";

const FilterCard = ({ name, image, description, example, onClick, className, bgimage }) => {
    return (
        <div className={`filter-card ${name}`} onClick={onClick}>
            <img src={bgimage} alt="backgroudImg" className="bgImg"/>
            <div className="filter-logo">
                <img src={image} className="filter-icon" alt={`${name} 아이콘`} />
                <p className="filter-name">{name}</p>
            </div>

            <div className="filter-description-container">
                <div className="description">{description}</div>
                <div className="ex">{example}</div>
            </div>
        </div>
    );
};

export default FilterCard;