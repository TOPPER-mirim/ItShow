import React from "react";
import '../styles/Tickets.css';
import { Link } from "react-router-dom"; 

function TicketsFunnyPage() {
    return (
        <div className="funny-page">
              <Link to="/tickets">
         <img
                src="/images/funny-font.png"  
                alt="Center"
                className="funny-font-image"
            />
    </Link>
    </div>
    );
}

export default TicketsFunnyPage;
