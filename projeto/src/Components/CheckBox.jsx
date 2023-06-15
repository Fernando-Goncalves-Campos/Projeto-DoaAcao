import { memo } from "react";

import "./CheckBox.style.css";

function CheckBox({name, onChange, className = '', style = {}, checked=false, children}) {
    return(
        <div className={`${className}`} style={style}>
            <input type="checkbox" id={children} name={name} value={children} checked={checked} onChange={onChange} />
            <label htmlFor={children}>{children}</label>
        </div>
        
    );
}

export default memo(CheckBox);