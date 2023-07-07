import { memo, useState } from "react";

import "./SingleTimeEvent.style.css";

import InputForm from "./InputForm";

//Input dos horários de um evento, quando ele acontece em apenas um momento
function SingleTimeEvent({setDate, setTime, className="", style={}}) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleChangeStartTime = (value) => {
        setStartTime(value);
        setTime(value + " até " + endTime);
    }

    const handleChangeEndTime = (value) => {
        setEndTime(value)
        setTime(startTime + " até " + value);
    }

    return(
        <div id="single-form" className={className} style={style}>
            <h2>Dia</h2>
            <InputForm type="date" setValue={value => {setDate(value)}} required/>
            
            <h2>Início</h2>
            <InputForm type="time" setValue={value => {handleChangeStartTime(value)}} required/>
            
            <h2>Término</h2>
            <InputForm type="time" setValue={value => {handleChangeEndTime(value)}} required/>
        </div>
    );
}

export default memo(SingleTimeEvent);