import { memo } from "react";
import { useNavigate } from "react-router-dom";

import "./ImageLink.style.css";

//Imagem com link de redirecionamento
function ImageLink({to, src, className = '', style = {}, children}) {
    const navigate = useNavigate();
    return(
        <div className={`hoverScale ${className}`} style={style} onClick={() => {navigate(to)}}>
            <img src={src} alt={children}/>
            <div className="textInsideImg"><span>{children}</span></div>
        </div>
    );
}

export default memo(ImageLink);