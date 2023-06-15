import { memo } from "react";
import { useNavigate } from "react-router-dom";

import "./WorkOption.style.css";

function WorkOption({work, className="", style={}}) {
    const navigate = useNavigate();

    return(
        <div className={`workOptionContainer hoverScale${className}`} style={style} onClick={() => {navigate(`entities/${work.entity}/works/${work.name}`)}}>
            <img src={work.src} alt={work.name} />
            <h1>{work.name}</h1>
            <h2>Por {work.entity}</h2>
            <p>{work.description}</p>
            <span>{work.region}</span>
            <span>{work.day}</span>
        </div>
    );
}

export default memo(WorkOption);