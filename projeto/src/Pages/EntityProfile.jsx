import { memo, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../App";

import Button from "../Components/Button";
import InputForm from "../Components/InputForm";

function EntityProfile() {
    const {user, entity} = useContext(UserContext);

	const navigate = useNavigate();

    const { entityCNPJ } = useParams();

    const [entityInfo, setEntityInfo] = useState();
    const [entityDisplay, setEntityDisplay] = useState();

    const [name, setName] = useState("");
    const [socialReason, setSocialReason] = useState("");
    const [CNPJ, setCNPJ] = useState("");
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
    const [responsible, setResponsible] = useState("");
    const [position, setPosition] = useState("");

    useEffect(() => {
		async function getEntity() {
			//const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entities/${entityCNPJ}`);

			//if (response.status !== 200) {
			//	const message = `An error occurred: ${response.statusText}`;
			//	alert(message);
			//	return;
			//}

			//const readEntity = await response.json();

			//setEntityInfo(readEntity);
            /*
            setName(readEntity.name);
            setSocialReason(readEntity.socialReason);
            setCNPJ(readEntity.CNPJ);
            setemail(readEntity.email);
            setPhone(readEntity.phone);
            setSecondPhone(readEntity.secondPhone);

            setImg(readEntity.img);
            setCEP(readEntity.CEP);
            setStreetName(readEntity.streetName);
            setAddressNumber(readEntity.addressNumber);
            setComplement(readEntity.complement);

            setDistrict(readEntity.district);
            setState(readEntity.state);
            setCity(readEntity.city);
            setReferencePoint(readEntity.referencePoint);
            setResponsible(readEntity.responsible);
            setPosition(readEntity.position);            
            */
            setEntityInfo({
                name: "nome",
                CNPJ: entityCNPJ,
                streetName: "streetName",
                socialReason: "socialReason",
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
                responsible: "Responsible",
                position: "position"
            });
		}

		getEntity();
	}, []);

    useEffect(()=>{
        if(entity && user.CNPJ === entityCNPJ){
            //Adiciona a conta no banco de dados
            const patchEntityDB = async () => {
                /*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entity/${entityCNPJ}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        name: name,
                        socialReason: socialReason,
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
                        responsible: responsible,
                        position: position
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
                const response = await patchEntityDB();
                if(response.status === 200){
                    alert("Profile updated");
                }
                else{
                    const message = `An error occurred: ${response.statusText}`;
                    alert(message);
                }
            }

            setEntityDisplay(entityInfo? <>
                <h1>Dados da entidade</h1>
                <form onSubmit={handleSubmit}>
                    <InputForm setValue={value => {setName(value)}} defaultValue={entityInfo.name} title required>Nome</InputForm>
                    <InputForm setValue={value => {setSocialReason(value)}} defaultValue={entityInfo.socialReason} title required>Razão Social</InputForm>
                    <InputForm setValue={value => {setCNPJ(value)}} defaultValue={entityInfo.CNPJ} title disabled required>CNPJ</InputForm>
                    <InputForm type="email" setValue={value => {setEmail(value)}} defaultValue={entityInfo.email} title required>E-mail</InputForm>
                    <InputForm setValue={value => {setPhone(value)}} defaultValue={entityInfo.phone} title required>Telefone 1</InputForm>
                    <InputForm setValue={value => {setSecondPhone(value)}} defaultValue={entityInfo.secondPhone} title>Telefone 2</InputForm>

                    <InputForm setValue={value => {setCEP(value)}} defaultValue={entityInfo.CEP} title required>CEP</InputForm>
                    <InputForm setValue={value => {setStreetName(value)}} defaultValue={entityInfo.streetName} title required>Nome da Rua</InputForm>
                    <InputForm setValue={value => {setAddressNumber(value)}} defaultValue={entityInfo.addressNumber} title required>Número</InputForm>
                    <InputForm setValue={value => {setComplement(value)}} defaultValue={entityInfo.complement} title>Complemento</InputForm>

                    <InputForm setValue={value => {setDistrict(value)}} defaultValue={entityInfo.district} title required>Bairro</InputForm>
                    <InputForm setValue={value => {setState(value)}} defaultValue={entityInfo.state} title required>Estado</InputForm>
                    <InputForm setValue={value => {setCity(value)}} defaultValue={entityInfo.city} title required>Cidade</InputForm>
                    <InputForm setValue={value => {setReferencePoint(value)}} defaultValue={entityInfo.referencePoint} title>Referência</InputForm>
                    <InputForm setValue={value => {setResponsible(value)}} defaultValue={entityInfo.responsible} title required>Nome do Responsável</InputForm>
                    <InputForm setValue={value => {setPosition(value)}} defaultValue={entityInfo.position} title required>Cargo do responsável</InputForm>
                    <Button submit>SALVAR INFORMAÇÕES</Button>
                </form>
            </> :<></>);
        }

        else{
            setEntityDisplay(entityInfo? <>
                <h1>Dados da entidade</h1>
                <img src={entityInfo.img} alt={entityInfo.name} />
                {entityInfo.name}
                {entityInfo.CNPJ}
                {entityInfo.socialReason}
                {entityInfo.email}
                {entityInfo.phone}
                {entityInfo.secondPhone}
                {entityInfo.CEP}
                {entityInfo.streetName}
                {entityInfo.addressNumber}
                {entityInfo.complement}
                {entityInfo.city}
                {entityInfo.referencePoint}
                {entityInfo.responsible}
                {entityInfo.position}
                <Button onClick={()=>{navigate(`/entities/${entityCNPJ}/works`)}}>VER TRABALHOS</Button>
            </> :<></>);
        }
    }, [entityInfo]);

	return(
        <div>
            {entityDisplay}
        </div>
    );
}

export default memo(EntityProfile);