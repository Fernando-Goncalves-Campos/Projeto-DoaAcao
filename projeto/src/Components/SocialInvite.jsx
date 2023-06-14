import { memo } from "react";

import "./SocialInvite.style.css";

function SocialInvite({src, className = '', style = {}, children}) {
    return(
        <div className={`socialInviteClass ${className}`} style={style}>
            <img src={src} alt={children} className="socialInviteImg" />
            {children}
        </div>
    );
}

export default memo(SocialInvite);