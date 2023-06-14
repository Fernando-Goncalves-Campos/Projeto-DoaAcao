import { memo } from "react";
import { useNavigate } from "react-router-dom";

import "./ImageLink.style.css";

function ImageLink({to, src, className = '', style = {}, children}) {
    const navigate = useNavigate();
    return(
        <div className={className} style={style} onClick={() => {navigate(to)}}>
            <img src={src} alt={children}/>
            <div className="textInsideImg">{children}</div>
        </div>
    );
}

export default memo(ImageLink);