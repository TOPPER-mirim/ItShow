import React from "react";
import '../styles/Tickets.css';
import { Link } from "react-router-dom"; 


function TicketsEmotionPage() {
    return (
        <div className="emotion-page">
         <Link to="/tickets"> {/* 원하는 경로로 */}
                <img
                    src="/images/emotion-font.png"  
                    alt="Center"
                    className="emotion-font-image"
                />
            </Link>
    </div>
    );
}

export default TicketsEmotionPage;
