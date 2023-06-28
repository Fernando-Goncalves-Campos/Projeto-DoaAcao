import { memo, useState } from "react";

import "./SingleTimeEvent.style.css";

import Button from "./Button";
import InputForm from "./InputForm";

function RepeatingEvent({eventInfo, setEventInfo, className="", style={}}) {
    return(
        <div id="form" className={className} style={style}>
            <h2>Descrição dos horários</h2>
            <InputForm textarea setValue={value => {setEventInfo({...eventInfo, timeDescription: value})}} defaultValue={eventInfo.timeDescription}>Ex: Todos os sábados das 10 às 12</InputForm>

            <h2>Horas semanais</h2>
            <InputForm setValue={value => {setEventInfo({...eventInfo, weekHours: value})}} defaultValue={eventInfo.weekHours}>Ex: 4</InputForm>
        </div>
    );
}

export default memo(RepeatingEvent);