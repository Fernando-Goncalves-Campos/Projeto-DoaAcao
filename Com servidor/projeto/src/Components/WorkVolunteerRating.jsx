import { memo } from "react";

import "./WorkVolunteerRating.style.css";

import CustomRating from "./CustomRating"

//Elemento que mostra os dados de cada voluntário que participou de um trabalho
function WorkVolunteerRating({volunteer, className="", style={}}) {

    return(
        <tr>
            <td>{volunteer.name}</td>
            <td>{volunteer.email}</td>
            <td>{volunteer.phone}</td>
            <td><CustomRating /></td>
        </tr>
    );
}

export default memo(WorkVolunteerRating);