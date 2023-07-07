import { memo, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App"

import CustomButton from "./CustomButton";
import WorkVolunteerRating from "./WorkVolunteerRating";

import "./WorkOptionEntity.style.css";

//Item que mostra os dados de um trabalho de uma entidade
function WorkOptionEntity({work, entityCNPJ, deleteWork, className="workOptionEntityContainer", style={}}) {
    const { user, entity } = useContext(UserContext);

    const workDataStyle = () => {
        if(open) {
            return {
                height: contentRef.current.scrollHeight + "px"
            }
        } else {
            return {
                height: 0,
                padding: 0
            }
        }
    }

    const pointer = {
        cursor: "pointer"
    };

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
            <div className="workOptionMain">
                <div className="workOptionImg">
                    <img src={work.img} alt={work.name}/>
                </div>
                <div className="workOptionMainText">
                    <h2 style={pointer} onClick={()=>{navigate(`${work.name}`)}}>{work.name}</h2>
                    {work.description}
                    {!(entity && user.CNPJ == entityCNPJ)?
                            <div className="workOptionMainBtns"><CustomButton onClick={handleDelete}>Remover</CustomButton>
                            <CustomButton onClick={handleLook}>Visualizar</CustomButton></div>
                        :
                            <></>
                    }
                </div>
            </div>
            
            <div ref={contentRef} className="workData" style={{height: open ? contentRef.current.scrollHeight + "px" : 0}}>
                {work.address} <br />
                Tipo de vaga: {work.frequency}
                <div className="workOptionVolunteers">
                    <h3>Inscritos</h3>
                    {work.volunteers.length} inscritos
                    <table>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Avaliação</th>
                        </tr>
                        {volunteersInfo}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default memo(WorkOptionEntity);