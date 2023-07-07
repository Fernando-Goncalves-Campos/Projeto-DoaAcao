import { memo, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../App"

import CustomButton from "../Components/CustomButton";

import "./css/WorkDescription.style.css";

function WorkDescription() {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const { entityName, workName } = useParams();

    const [work, setWork] = useState();
    const [workDisplay, setWorkDisplay] = useState();

    const style = {
        cursor: "pointer"
    };

    useEffect(() => {
		async function getWork() {
			const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entities/${entityName}/works/${workName}`);

			if (response.status !== 200) {
				const message = `An error occurred: ${response.statusText}`;
				alert(message);
				return;
			}

			const readWork = await response.json();

			setWork(readWork);
		}

		getWork();
	}, []);

    useEffect(()=>{
        //Inscreve o voluntário no trabalho
        const registerVolunteerDB = async () => {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entities/${work.entity.name}/works/${work.info.name}`, {
                method: "POST",
                body: JSON.stringify({
                    name: user.name,
                    CPF: user.CPF,
                    email: user.email,
                    phone: user.phone
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            return response;
        }

        //Lida com o clique do botão de se inscrever
        const handleRegister = async () => {
            const response = await registerVolunteerDB();
            if(response.status === 200 || response.status === 201){
                alert("Account sent to validation");
                navigate(-1);
            }
            else{
                const message = `An error occurred: ${response.statusText}`;
                alert(message);
            }
        }

        setWorkDisplay(work? <>
            <h2>{work.info.name}</h2>
            <div className="workDescriptionMain">
                <div className="workDescriptionLocationSkills">
                    <p>{work.info.location}</p>
                    <ul>
                        {work.info.skills.map((skill)=><li key={skill}>{skill}</li>)}
                    </ul>
                </div>

                <div className="workDescriptionImgBtn">
                    <div className="workDescriptionImg">
                        <img src={work.info.img} alt={work.info.name}/>
                    </div>
                    <CustomButton onClick={handleRegister}>QUERO ME INSCREVER</CustomButton>
                </div>
            </div>

            <div className="workDescriptionAbout">
                <h3>Sobre a oportunidade</h3>
                {work.info.description}
            </div>

            <div className="workDescriptionDate">
                <h3>Data</h3>
                {work.info.date}
                {work.info.time}
            </div>

            <div className="workDescriptionEntity">
                <h3 style={style} onClick={() => {navigate(`/entities/${entityName}`)}}>Sobre a entidade realizadora</h3>
                <img src={work.entity.img} alt={work.entity.name}/>
            </div>
        </> :<></>)
    }, [work]);

	return(
        <div className="workDescriptionContainer">
            {workDisplay}
        </div>
    );
}

export default memo(WorkDescription);