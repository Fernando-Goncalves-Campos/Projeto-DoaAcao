import { memo } from "react";

import "./WorkVolunteerRating.style.css";

function WorkVolunteerRating({volunteer, handleData, className="", style={}}) {

    return(
        <div className={className} style={style}></div>
    );
}

export default memo(WorkVolunteerRating);