import React from "react";

function MakePaletter({title, children}) {
    
    return (
        <div>
            <p>{title}</p>
            <div className="paletters">
                {children}
            </div>
        </div>
    )
}

export default MakePaletter;