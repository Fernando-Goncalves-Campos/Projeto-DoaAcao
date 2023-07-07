import { memo, useRef, useState } from "react";

import "./Collapsible.style.css"

function Collapsible({buttonValue, className="", style={}, children}) {
    const contentRef = useRef();
    const [open, setOpen] = useState(false);
    
    const click = ()=>{
        setOpen(!open)
    };

	return(
        <div className={`${className}`} style={style}>
            <button type="button" className="collapsibleBtn" onClick={click}>{buttonValue}</button>
            <div ref={contentRef} className="contentCollapsible" style={{height: open ? contentRef.current.scrollHeight + "px" : 0}}>
                {children}
            </div>
        </div>
    );
}

export default memo(Collapsible);