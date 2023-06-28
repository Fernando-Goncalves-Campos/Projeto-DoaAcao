import { memo, useState } from "react";

import "./SingleTimeEvent.style.css";

import Button from "./Button";
import InputForm from "./InputForm";

function SingleTimeEvent({eventInfo, setEventInfo, className="", style={}}) {
    return(
        <div id="form" className={className} style={style}>
            <h2>Dia</h2>
            <InputForm type="date" setValue={value => {setEventInfo({...eventInfo, day: value})}} defaultValue={eventInfo.day}/>
            
            <h2>Início</h2>
            <InputForm type="time" setValue={value => {setEventInfo({...eventInfo, start: value})}} defaultValue={eventInfo.start}/>
            
            <h2>Término</h2>
            <InputForm type="time" setValue={value => {setEventInfo({...eventInfo, finish: value})}} defaultValue={eventInfo.finish}/>

            <h2>Evento</h2>
            <InputForm setValue={value => {setEventInfo({...eventInfo, task: value})}} defaultValue={eventInfo.task}>Ex: Limpeza</InputForm>
        </div>
    );
}

export default memo(SingleTimeEvent);