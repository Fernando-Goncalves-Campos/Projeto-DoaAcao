import { memo } from "react";

import "./InputForm.style.css";

function Input({setValue, defaultValue="", type="text", className="", style={}, children}) {
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return(
        <input type={type} defaultValue={defaultValue} placeholder={children} onChange={handleChange} className={`inputClass ${className}`} style={style}/>
    );
}

export default memo(Input);