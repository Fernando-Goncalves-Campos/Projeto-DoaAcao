import { memo, useState } from "react";

import "./InputForm.style.css";

function InputForm({setValue, defaultValue="", type="text", className="", style={}, required=false, title=false, disabled=false, textarea=false, rows=10, cols=10, min, children}) {
    const handleChange = (e) => {
        setValue(e.target.value);
    }


    return(
        <>
            {title? children : ""} 
            {textarea?
                <textarea disabled={disabled} defaultValue={defaultValue} placeholder={children} onChange={handleChange} className={`inputClass ${className}`} style={style} required={required} rows={rows} cols={cols} />
                :
                <input type={type} disabled={disabled} defaultValue={defaultValue} placeholder={children} onChange={handleChange} className={`inputClass ${className}`} style={style} required={required} min={min}/>
            }
        </>

    );
}

export default memo(InputForm);