import { memo, useState } from "react";

import "./SingleTimeEvent.style.css";

import Button from "./Button";
import InputForm from "./InputForm";

function SingleTimeEvent({setEvents, className="", style={}}) {
    const [day, setDay] = useState("");
    const [start, setStart] = useState("");
    const [finish, setFinish] = useState("");
    const [task, setTask] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();

        setEvents((prevEvents) => [...prevEvents, {
            day: day,
            start: start,
            finish: finish,
            task: task
        }])
    }

    return(
        <div id="form" className={className} style={style}>
            <h2>Dia</h2>
            <InputForm type="date" setValue={value => {setDay(value)}}/>
            
            <h2>Início</h2>
            <InputForm type="time" setValue={value => {setStart(value)}}/>
            
            <h2>Término</h2>
            <InputForm type="time" setValue={value => {setFinish(value)}}/>

            <h2>Evento</h2>
            <InputForm setValue={value => {setTask(value)}}>Ex: Limpeza</InputForm>

            <Button onClick={handleSubmit}>Adicionar</Button>
        </div>
    );
}

export default memo(SingleTimeEvent);