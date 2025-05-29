import React from "react";
import '../styles/Tickets.css';
import { Link } from "react-router-dom"; 

function TicketsStylePage() {
    return (
        <div className="style-page">
             <Link to="/tickets">
         <img
                src="/images/style-font.png"  
                alt="Center"
                className="style-font-image"
            />
            </Link>
    </div>
    );
}

export default TicketsStylePage;
