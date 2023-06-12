import { memo } from "react";
import { useNavigate } from "react-router-dom";

import "./ButtonNav.style.css";

function ButtonNav({url, className = '', style = {}, children}) {
	const navigate = useNavigate();

    return(
        <button onClick={() => {navigate(url)}} className={`btnClass ${className}`} style={style}>{children}</button>
    );
}

export default memo(ButtonNav);