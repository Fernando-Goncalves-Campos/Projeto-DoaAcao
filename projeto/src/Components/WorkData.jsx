import { memo } from "react";

import "./WorkData.style.css";

function WorkData({ work, setRating, className="", style={}}) {
    const handleRating = (value) => {
        setRating(value);
    }

    return(
        <div className>
            
        </div>
    );
}

export default memo(WorkData);