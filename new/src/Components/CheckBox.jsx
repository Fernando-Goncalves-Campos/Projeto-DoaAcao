import { memo } from "react";

import "./CheckBox.style.css";

function CheckBox({name, onChange, className = '', style = {}, checked=false, radio=false, children}) {
    return(
        <div className={`${className}`} style={style}>
            <input type={radio?"radio":"checkbox"} id={children} name={name} value={children} checked={checked} onChange={onChange} />
            &thinsp;<label htmlFor={children}>{children}</label>
        </div>  
    );
}

export default memo(CheckBox);