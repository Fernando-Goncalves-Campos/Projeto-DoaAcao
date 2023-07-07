import { memo, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../App"

import CustomButton from "../Components/CustomButton";

function WorkDescription() {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const { entityCNPJ, workName } = useParams();

    const [work, setWork] = useState();
    const [workDisplay, setWorkDisplay] = useState();

    useEffect(() => {
		async function getWork() {
			//const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entities/${entityCNPJ}/works/${workName}`);

			//if (response.status !== 200) {
			//	const message = `An error occurred: ${response.statusText}`;
			//	alert(message);
			//	return;
			//}

			//const readWork = await response.json();

			//setWork(readWork);
            setWork({entity: {
                name: "nome",
                CNPJ: entityCNPJ,
                img: "",
            },
            info:{
                name: workName,
                description: "Descrição t",
                date: "1/1/1",
                time: "8:00 até 12:00",
                img: "",
                lacation: "São Carlos",
                skills: ["teste", "teste2", "teste3"],
            }});
		}

		getWork();
	}, []);

    useEffect(()=>{
        //Inscreve o voluntário no trabalho
        const registerVolunteerDB = async () => {
            /*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entities/${work.entity.name}/works/${work.info.name}`, {
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

            return response;*/
            return {status: 200};
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
            <div>
                <h1>{work.info.name}</h1>
                <h2>{work.info.location}</h2>
                <ul>
                    {work.info.skills.map((skill)=><li key={skill}>{skill}</li>)}
                </ul>

                <div>
                    <img src={work.info.img} alt={work.info.name}/>
                    <CustomButton onClick={handleRegister}>QUERO ME INSCREVER</CustomButton>
                </div>
            </div>

            <div>
                <h1>Sobre o trabalho</h1>
                {work.info.description}
            </div>

            <div>
                <h1>Data</h1>
                {work.info.date}
                {work.info.time}
            </div>

            <div>
                <h1 onClick={() => {navigate(`/entities/${entityCNPJ}`)}}>Sobre a entidade</h1>
                <img src={work.entity.img} alt={work.entity.name}/>
            </div>
        </> :<></>)
    }, [work]);

	return(
        <div>
            {workDisplay}
        </div>
    );
}

export default memo(WorkDescription);