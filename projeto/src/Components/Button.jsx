import { memo } from "react";

import "./Button.style.css";

function Button({onClick=() => {}, className = '', style = {}, submit=false, children}) {if(submit){
        return <input type="submit" className={`btnClass hoverScale ${className}`} style={style} value={children} />
    }
    else{
        return <button onClick={onClick} className={`btnClass hoverScale ${className}`} style={style}>{children}</button>
    }
}

export default memo(Button);