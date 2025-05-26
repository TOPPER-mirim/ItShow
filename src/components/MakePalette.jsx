import React from "react";
import "../styles/Paletter.css";

function MakePaletter({title, children}) {
    
    return (
        <div className="make-paletter-container">
            <p className="make-title">{title}</p>
            <div className="paletters">
                {children}
            </div>
        </div>
    )
}

export default MakePaletter;