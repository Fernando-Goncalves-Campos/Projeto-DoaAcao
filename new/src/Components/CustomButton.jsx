import { memo } from "react";

import "./CustomButton.style.css";

function CustomButton({onClick=() => {}, className = '', style = {}, submit=false, children}) {
    //Caso seja um botão de um formulário
    if(submit){
        return <input type="submit" className={`btnClass hoverScale ${className}`} style={style} value={children} />
    }
    //Caso seja um botão qualquer
    else{
        return <button onClick={onClick} className={`btnClass hoverScale ${className}`} style={style}>{children}</button>
    }
}

export default memo(CustomButton);