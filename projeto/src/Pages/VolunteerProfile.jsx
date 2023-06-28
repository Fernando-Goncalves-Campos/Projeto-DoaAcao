import { memo, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserContext, FilterContext } from "../App";

import Button from "../Components/Button";
import InputForm from "../Components/InputForm";
import ChoosePreferences from "../Components/ChoosePreferences";

function VolunteerProfile() {
    const {user, entity} = useContext(UserContext);
    const {filters} = useContext(FilterContext);

    const { volunteerCPF } = useParams();

    const [volunteerInfo, setVolunteerInfo] = useState();
    const [volunteerDisplay, setVolunteerDisplay] = useState();

    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [CPF, setCPF] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [secondPhone, setSecondPhone] = useState("");
    
    const [img, setImg] = useState("");
    const [CEP, setCEP] = useState("");
    const [streetName, setStreetName] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    const [complement, setComplement] = useState("");
    
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [referencePoint, setReferencePoint] = useState("");

    const [reasons, setReasons] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
		async function getVolunteer() {
			//const response = await fetch(`http://${process.env.REACT_APP_API_URL}/volunteers/${volunteersCPF}`);

			//if (response.status !== 200) {
			//	const message = `An error occurred: ${response.statusText}`;
			//	alert(message);
			//	return;
			//}

			//const readVolunteer = await response.json();

			//setVolunteer(readVolunteer);
            /*
            setName(readVolunteer.name);
            setBirthday(readVolunteer.birthday);
            setCPF(readVolunteer.CPF);
            setemail(readVolunteer.email);
            setPhone(readVolunteer.phone);
            setSecondPhone(readVolunteer.secondPhone);

            setImg(readVolunteer.img);
            setCEP(readVolunteer.CEP);
            setStreetName(readVolunteer.streetName);
            setAddressNumber(readVolunteer.addressNumber);
            setComplement(readVolunteer.complement);

            setDistrict(readVolunteer.district);
            setState(readVolunteer.state);
            setCity(readVolunteer.city);
            setReferencePoint(readVolunteer.referencePoint);
            
            setReasons(readVolunteer.reasons);
            setSkills(readVolunteer.skills);         
            */
            setVolunteerInfo({
                name: "nome",
                CNPJ: volunteerCPF,
                streetName: "streetName",
                reason: "reason",
                img: "",
                email:"email",
                phone:"phone",
                secondPhone: "secondPhone",
                CEP: "CEP",
                addressNumber: "AddressNumber",
                complement: "complement",
                district: "district",
                state: "state",
                city: "city",
                referencePoint: "referencePoint",
                reasons: ["causa 2", "causa 3", "causa 4"],
                skills: ["habilidade 1", "habilidade 5"]
            });
            setReasons(["causa 2", "causa 3", "causa 4"]);
            setSkills(["habilidade 1", "habilidade 5"]);
		}

		getVolunteer();
	}, []);

    useEffect(()=>{
        if(volunteerInfo){
            if(!entity && user.CPF === volunteerCPF){
                //Adiciona a conta no banco de dados
                const patchVolunteerDB = async () => {
                    /*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/volunteers/${volunteerCPF}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            name: name,
                            birthday: birthday,
                            email: email,
                            phone: phone,
                            secondPhone: secondPhone,
                            CEP: CEP,
                            streetName: streetName,
                            addressNumber: addressNumber,
                            complement: complement,
                            district: district,
                            state: state,
                            city: city,
                            referencePoint: referencePoint,
                            reasons: reasons,
                            skills: skills
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    return response;*/
                    return {status: 200};
                }

                const handleSubmit = async (e) => {
                    e.preventDefault();

                    //Adiciona o administrador ao banco de dados
                    const response = await patchVolunteerDB();
                    if(response.status === 200){
                        alert("Profile updated");
                    }
                    else{
                        const message = `An error occurred: ${response.statusText}`;
                        alert(message);
                    }
                }

                setVolunteerDisplay(<>
                    <h1>Dados da entidade</h1>
                    <form onSubmit={handleSubmit}>
                        <InputForm setValue={value => {setName(value)}} defaultValue={volunteerInfo.name} title required>Nome</InputForm>
                        <InputForm type="date" setValue={value => {setBirthday(value)}} defaultValue={volunteerInfo.birthday} title required>Data de nascimento</InputForm>
                        <InputForm setValue={value => {setCPF(value)}} defaultValue={volunteerInfo.CPF} title disabled required>CPF</InputForm>
                        <InputForm type="email" setValue={value => {setEmail(value)}} defaultValue={volunteerInfo.email} title required>E-mail</InputForm>
                        <InputForm setValue={value => {setPhone(value)}} defaultValue={volunteerInfo.phone} title required>Telefone 1</InputForm>
                        <InputForm setValue={value => {setSecondPhone(value)}} defaultValue={volunteerInfo.secondPhone} title>Telefone 2</InputForm>

                        <InputForm setValue={value => {setCEP(value)}} defaultValue={volunteerInfo.CEP} title required>CEP</InputForm>
                        <InputForm setValue={value => {setStreetName(value)}} defaultValue={volunteerInfo.streetName} title required>Nome da Rua</InputForm>
                        <InputForm setValue={value => {setAddressNumber(value)}} defaultValue={volunteerInfo.addressNumber} title required>Número</InputForm>
                        <InputForm setValue={value => {setComplement(value)}} defaultValue={volunteerInfo.complement} title>Complemento</InputForm>

                        <InputForm setValue={value => {setDistrict(value)}} defaultValue={volunteerInfo.district} title required>Bairro</InputForm>
                        <InputForm setValue={value => {setState(value)}} defaultValue={volunteerInfo.state} title required>Estado</InputForm>
                        <InputForm setValue={value => {setCity(value)}} defaultValue={volunteerInfo.city} title required>Cidade</InputForm>
                        <InputForm setValue={value => {setReferencePoint(value)}} defaultValue={volunteerInfo.referencePoint} title>Referência</InputForm>
                        
                        <ChoosePreferences filter={filters.Causas} preferences={reasons} setPreferences={(value) => {setReasons(value)}} max={3}>Causas</ChoosePreferences>
                        <ChoosePreferences filter={filters.Habilidades} preferences={skills} setPreferences={(value) => {setSkills(value)}} max={3}>Habilidades</ChoosePreferences>

                        <Button submit>SALVAR INFORMAÇÕES</Button>
                    </form>
                </>);
            }

            else{
                setVolunteerDisplay(<>
                    <h1>Dados da entidade</h1>
                    <img src={volunteerInfo.img} alt={volunteerInfo.name} />
                    {volunteerInfo.name}
                    {volunteerInfo.CPF}
                    {volunteerInfo.birthday}
                    {volunteerInfo.email}
                    {volunteerInfo.phone}
                    {volunteerInfo.secondPhone}
                    {volunteerInfo.CEP}
                    {volunteerInfo.streetName}
                    {volunteerInfo.addressNumber}
                    {volunteerInfo.complement}
                    {volunteerInfo.city}
                    {volunteerInfo.referencePoint}
                    <ul>{volunteerInfo.reasons.map(reason=><li key={reason}>{reason}</li>)}</ul>
                    <ul>{volunteerInfo.skills.map(skill=><li key={skill}>{skill}</li>)}</ul>
                </>);
            }
        }
        
    }, [volunteerInfo, skills, reasons]);

	return(
        <div>
            {volunteerDisplay}
        </div>
    );
}

export default memo(VolunteerProfile);