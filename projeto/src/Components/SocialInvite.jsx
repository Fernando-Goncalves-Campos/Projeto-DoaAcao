import { memo } from "react";

import "./SocialInvite.style.css";

//Imagem circular convidando o usuário a participar de algum trabalho voluntário
function SocialInvite({src, className = '', style = {}, children}) {
    return(
        <div className={`socialInviteClass ${className}`} style={style}>
            <img src={src} alt={children} className="socialInviteImg hoverScale" />
            {children}
        </div>
    );
}

export default memo(SocialInvite);