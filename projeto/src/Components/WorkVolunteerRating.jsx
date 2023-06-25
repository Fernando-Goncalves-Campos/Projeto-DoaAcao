import { memo } from "react";

import "./WorkVolunteerRating.style.css";

import CustomRating from "./CustomRating"

function WorkVolunteerRating({volunteer, className="", style={}}) {

    return(
        <div className={className} style={style}>
            {volunteer.name}
            {volunteer.email}
            {volunteer.phone}
            <CustomRating />
        </div>
    );
}

export default memo(WorkVolunteerRating);