import { memo, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FilterContext } from "../App";

import Button from "../Components/Button";
import InputForm from "../Components/InputForm";
import CheckBox from "../Components/CheckBox";
import ChoosePreferences from "../Components/ChoosePreferences";
import SingleTimeEvent from "../Components/SingleTimeEvent";
import RepeatingEvent from "../Components/RepeatingEvent";

function CreateWork() {
    const navigate = useNavigate();

    const { filters } = useContext(FilterContext);

    const { entityCNPJ } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState("");
    const [complement, setComplement] = useState("");

    const [reasons, setReasons] = useState([]);
    const [skills, setSkills] = useState([]);

    const [frequency, setFrequency] = useState("Recorrente");

    const [singleTime, setSingleTime] = useState([]);
    const [repeating, setRepeating] = useState([]);

    const [distance, setDistance] = useState(false);

    //Adiciona a conta no banco de dados
    const addWorkDB = async () => {
        /*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entities/${entityCNPJ}/works`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                description: description,
                address: address,
                complement: complement,
                reasons: reasons,
                skills: skills,
                frequency: frequency,
                time: frequency === "Recorrente"? singleTime : recurrent,
                distance: distance
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return response;*/
        return {status: 201};
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Adiciona o administrador ao banco de dados
        const response = await addWorkDB();
        if(response.status === 201){
            alert("Work created");
            navigate(-1);
        }
        else if(response.status === 409){
            alert("Work already exists!!!");
        }
        else{
            const message = `An error occurred: ${response.statusText}`;
			alert(message);
        }
    }

    const handleDistanceChange = (e) => {
        if(e.target.checked){
            setDistance(true);
        }
        else{
            setDistance(false);
        }
    }

	return(
        <div>
            <h1>Criação de nova oportunidade</h1>

            <form onSubmit={handleSubmit}>
                <h2>Nome da vaga</h2>
                <InputForm setValue={value => {setName(value)}} required>Digite o nome da vaga</InputForm>

                <h2>Sobre a vaga</h2>
                <InputForm setValue={value => {setDescription(value)}} rows={10} cols={50} textarea required>Descreva as funções que a pessoa deve nesta vaga e a finalidade de se voluntariar para ela</InputForm>
                
                <h2>Quantidade de vagas</h2>
                <InputForm type="number" setValue={value => setQuantity(value)} defaultValue={1} min={1} required/>
                
                <h2>Endereço</h2>
                <InputForm setValue={value => {setAddress(value)}} required>Digite o local onde o evento irá ocorrer</InputForm>
                <InputForm setValue={value => {setComplement(value)}} required>Complemento</InputForm>

                <ChoosePreferences filter={filters.Causas} preferences={reasons} setPreferences={(value) => {setReasons(value)}} max={3}>Causas</ChoosePreferences>
                <ChoosePreferences filter={filters.Habilidades} preferences={skills} setPreferences={(value) => {setSkills(value)}} max={3}>Habilidades</ChoosePreferences>

                <CheckBox radio name="frequency" checked={frequency === "Recorrente"} onChange={e => {setFrequency(e.target.value)}}>Recorrente</CheckBox>
                <CheckBox radio name="frequency" checked={frequency === "Pontual"} onChange={e => {setFrequency(e.target.value)}}>Pontual</CheckBox>
                {frequency === "Pontual"? <SingleTimeEvent setEvents={value => {setSingleTime(value)}}/>: <RepeatingEvent setEvents={value => {setRepeating(value)}}/>}
                
                <CheckBox name="Distance" onChange={handleDistanceChange} checked={distance}>Essa vaga pode ser feita a distância</CheckBox>

                <Button submit>Adicionar vaga</Button>
            </form>
            
        </div>
    );
}

export default memo(CreateWork);