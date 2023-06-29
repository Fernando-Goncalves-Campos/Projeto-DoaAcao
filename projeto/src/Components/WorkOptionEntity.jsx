import { memo, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App"

import CustomButton from "./CustomButton";
import WorkVolunteerRating from "./WorkVolunteerRating";

import "./WorkOptionEntity.style.css";

function WorkOptionEntity({work, entityCNPJ, deleteWork, className="", style={}}) {
    const { user, entity } = useContext(UserContext);

    const contentRef = useRef();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [volunteersInfo, setVolunteersInfo] = useState(work.volunteers.map(volunteer => <WorkVolunteerRating key={volunteer.CPF} volunteer={volunteer}/>));

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
            {entity && user.CNPJ == entityCNPJ?
                    <><CustomButton onClick={handleDelete}>Remover</CustomButton>
                    <CustomButton onClick={handleLook}>Visualizar</CustomButton></>
                :
                    <></>
            }
            
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