import { memo, useState } from "react";

import "./RepeatingEvent.style.css";

import InputForm from "./InputForm";

//Input dos horários de um evento, quando ele repete
function RepeatingEvent({setDate, setTime, className="", style={}}) {
    return(
        <div id="repeating-form" className={className} style={style}>
            <h2 className="descricaoHorarios">Descrição dos horários</h2>
            <InputForm textarea setValue={value => {setDate(value)}} required>Ex: Todos os sábados das 10 às 12</InputForm>

            <h2 className="horasSemanais">Horas semanais</h2>
            <InputForm setValue={value => {setTime(value + " horas semanais")}} required>Ex: 4</InputForm>
        </div>
    );
}

export default memo(RepeatingEvent);