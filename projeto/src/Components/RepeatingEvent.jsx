import { memo, useState } from "react";

import "./SingleTimeEvent.style.css";

import CustomButton from "./CustomButton";
import InputForm from "./InputForm";

function RepeatingEvent({setDate, setTime, className="", style={}}) {
    return(
        <div id="form" className={className} style={style}>
            <h2>Descrição dos horários</h2>
            <InputForm textarea setValue={value => {setDate(value)}} required>Ex: Todos os sábados das 10 às 12</InputForm>

            <h2>Horas semanais</h2>
            <InputForm setValue={value => {setTime(value + " horas semanais")}} required>Ex: 4</InputForm>
        </div>
    );
}

export default memo(RepeatingEvent);