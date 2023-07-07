import { memo, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FilterContext } from "../App";

import CustomButton from "../Components/CustomButton";
import InputForm from "../Components/InputForm";
import CheckBox from "../Components/CheckBox";
import ChoosePreferences from "../Components/ChoosePreferences";
import SingleTimeEvent from "../Components/SingleTimeEvent";
import RepeatingEvent from "../Components/RepeatingEvent";

import styles from "./css/CreateWork.module.css";

import "./css/WelcomePage.style.css";
import { backdropClasses } from "@mui/material";

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

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

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
                time: time,
                date: date,
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
        if(response.status === 201 || response.status === 200){
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

    const handleChangeFrequency = (e) => {
        setDate("");
        setTime("");
        setFrequency(e.target.value);
    }

	return(
        <div className={styles.container}>
            
                <div className={styles.containerForms}>
                    
                    <form onSubmit={handleSubmit} className={styles.forms}>
                        <h1 className="h1-cria-vagas">Criação de nova oportunidade</h1>
                        <h2 className={styles.h2Titulo}>Nome da vaga</h2>
                        <InputForm setValue={value => {setName(value)}} required className={styles.inputVagas + ' ' + "vagaWork"}>Digite o nome da vaga</InputForm>

                        <h2 className={styles.h2Titulo}>Sobre a vaga</h2>
                        <InputForm setValue={value => {setDescription(value)}} rows={10} cols={50} textarea required className={[styles.inputVagas, styles.sobreVaga].join(' ')}>Descreva as funções que a pessoa deve nesta vaga e a finalidade de se voluntariar para ela</InputForm>
                        
                        <h2 className={styles.h2Titulo}>Quantidade de vagas</h2>
                        <InputForm type="number" setValue={value => setQuantity(value)} defaultValue={1} min={1} required className={[styles.inputVagas, styles.qtdVaga].join(' ')}/>
                        
                        <h2 className={styles.h2Titulo}>Endereço</h2>
                        <InputForm className={[styles.inputVagas, styles.enderecoWork].join(' ')} setValue={value => {setAddress(value)}} required>Digite o local onde o evento irá ocorrer</InputForm>
                        <InputForm className={styles.inputVagas + ' ' + styles.complementoWork} setValue={value => {setComplement(value)}} required>Complemento</InputForm>


                        <div className={styles.containerBotoes}>
                            <ChoosePreferences className={styles.botaoCausas} filter={filters.Causas} preferences={reasons} setPreferences={(value) => {setReasons(value)}} max={3}>Causas</ChoosePreferences>
                            <ChoosePreferences className={styles.botaoHabilidades} filter={filters.Habilidades} preferences={skills} setPreferences={(value) => {setSkills(value)}} max={3}>Habilidades</ChoosePreferences>
                        </div>

                        <h2 className={styles.tituloDisponibilidade}>Disponibilidade</h2>
                        <div className={styles.radioFrequency}>
                            
                            <CheckBox radio name="frequency" checked={frequency === "Recorrente"} onChange={handleChangeFrequency}>Recorrente</CheckBox>
                            <CheckBox radio name="frequency" checked={frequency === "Pontual"} onChange={handleChangeFrequency}>Pontual</CheckBox>
                        </div>
                        


                        {
                            frequency === "Pontual"? 
                                <SingleTimeEvent className={styles.inputVagas} setDate={value => {setDate(value)}} setTime={value => {setTime(value)}}/>
                            : 
                                <RepeatingEvent className={styles.inputVagas} setDate={value => {setDate(value)}} setTime={value => {setTime(value)}}/>
                        }
                        
                        <CheckBox className={styles.checkboxVagas} name="Distance" onChange={handleDistanceChange} checked={distance}>Essa vaga pode ser feita a distância</CheckBox>

                        <CustomButton submit>Adicionar vaga</CustomButton>
                    </form>
                </div> 

                

            
        </div>
    );
}

export default memo(CreateWork);