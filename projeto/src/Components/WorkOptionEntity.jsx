import { memo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./WorkOptionEntity.style.css";

import Button from "./Button";
import WorkVolunteerRating from "./WorkVolunteerRating";

function WorkOptionEntity({work, deleteWork, className="", style={}}) {
    const contentRef = useRef();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [volunteersInfo, setVolunteersInfo] = useState(work.volunteers.map(volunteer => <WorkVolunteerRating volunteer={volunteer}/>));

    const handleLook = () => {
        setOpen(!open)
    }
    
    const handleDelete = () => {
        deleteWork();
    }

    return(
        <div className={className} style={style}>
            <img src={work.img} alt={work.name}/>
            <h2 onClick={()=>{navigate(`${work.name}`)}}>{work.name}</h2>
            {work.description}
            <Button onClick={handleDelete}>Remover</Button>
            <Button onClick={handleLook}>Visualizar</Button>
            <div ref={contentRef} className="workData" style={{height: open ? contentRef.current.scrollHeight + "px" : 0}}>
                {work.address}
                Tipo de vaga: {work.frequency}
                <div>
                    <h1>Inscritos</h1>
                    {work.volunteers.length}
                    <div>
                        Nome
                        Email
                        Telefone
                        Avaliação
                    </div>
                    {volunteersInfo}
                </div>
            </div>
        </div>
    );
}

export default memo(WorkOptionEntity);