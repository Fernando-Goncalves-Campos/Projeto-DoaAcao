import { memo } from "react";
import { useNavigate } from "react-router-dom";

import "./LinkQuery.style.css";

function LinkQuery({to, className = '', style = {}, children}) {
    const navigate = useNavigate();
    return(
        <span onClick={() => {navigate(to)}} className={`linkClass ${className}`} style={style}>{children}</span>
    );
}

export default memo(LinkQuery);