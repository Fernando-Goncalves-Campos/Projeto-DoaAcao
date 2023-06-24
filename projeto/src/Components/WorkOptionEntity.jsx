import { memo } from "react";

import "./WorkOptionEntity.style.css";

import Button from "./Button";

function WorkOptionEntity({work, deleteWork, className="", style={}}) {
    const handleLook = () => {

    }
    
    const handleDelete = () => {
        deleteWork();
    }

    return(
        <div className={className} style={style}>
            <img src={work.img} alt={work.name}/>
            <h2>{work.name}</h2>
            {workDescription}
            <Button onClick={handleLook}>Visualizar</Button>
            <Button onClick={handleDelete}>Remover</Button>
        </div>
    );
}

export default memo(WorkOptionEntity);