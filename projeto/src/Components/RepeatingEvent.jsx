import { memo, useState } from "react";

import "./SingleTimeEvent.style.css";

import Button from "./Button";
import InputForm from "./InputForm";

function RepeatingEvent({setEvents, className="", style={}}) {
    const [timeDescription, setTimeDescription] = useState("")
    const [weekHours, setWeekHours] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault();

        setEvents((prevEvents) => [...prevEvents, {
            timeDescription: timeDescription,
            weekHours: weekHours
        }])
    }

    return(
        <div id="form" className={className} style={style}>
            <h2>Descrição dos horários</h2>
            <InputForm textarea setValue={value => {setTimeDescription(value)}}>Ex: Todos os sábados das 10 às 12</InputForm>

            <h2>Horas semanais</h2>
            <InputForm setValue={value => {setWeekHours(value)}}>Ex: 4</InputForm>

            <Button onClick={handleSubmit}>Adicionar</Button>
        </div>
    );
}

export default memo(RepeatingEvent);