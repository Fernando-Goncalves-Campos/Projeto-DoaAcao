import { memo } from "react";

import "./Button.style.css";

function Button({onClick, className = '', style = {}, children}) {
    return(
        <button onClick={onClick} className={`btnClass hoverScale ${className}`} style={style}>{children}</button>
    );
}

export default memo(Button);