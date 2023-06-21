import { memo, useState } from "react";

import InputForm from "../Components/InputForm"
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

function SignUpEntity() {
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [reason, setReason] = useState("");
    const [CNPJ, setCNPJ] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    
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

    //Adiciona a conta no banco de dados
    const addVolunteerDB = async () => {
        /*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/volunteers`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                reason: reason,
                CNPJ, CNPJ
                email: email,
                phone: phone,
                img: img,
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
        return {status: 201};
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Adiciona o administrador ao banco de dados
        const response = await addVolunteerDB();
        if(response.status === 201){
            navigate(-1);
        }
        else{
            alert("Account already exists!!!");
        }
    }

	return(
        <form onSubmit={handleSubmit}>
            <h2>*Campos obrigatórios</h2>
            <InputForm setValue={value => {setName(value)}} required>*Nome da Empresa</InputForm>
            <InputForm setValue={value => {setReason(value)}} required>*Razão Social</InputForm>
            <InputForm setValue={value => {setCNPJ(value)}} required>*CNPJ</InputForm>
            <InputForm type="email" setValue={value => {setEmail(value)}} required>*E-mail</InputForm>
            <InputForm setValue={value => {setPhone(value)}} required>*Telefone</InputForm>
            
            Imagem de perfil: <input type="file" className="hoverScale" onChange={value => {setImg(value)}} accept=".png, .jpg, .jpeg"/>
            <InputForm setValue={value => {setCEP(value)}} required>*CEP</InputForm>
            <InputForm setValue={value => {setStreetName(value)}} required>*Nome da Rua</InputForm>
            <InputForm setValue={value => {setAddressNumber(value)}} required>*Número</InputForm>
            <InputForm setValue={value => {setComplement(value)}}>Complemento</InputForm>

            <InputForm setValue={value => {setDistrict(value)}} required>*Bairro</InputForm>
            <InputForm setValue={value => {setState(value)}} required>*Estado</InputForm>
            <InputForm setValue={value => {setCity(value)}} required>*Cidade</InputForm>
            <InputForm setValue={value => {setReferencePoint(value)}}>Ponto de Referência</InputForm>
            <InputForm setValue={value => {setResponsible(value)}} required>*Nome do Responsável</InputForm>
            <InputForm setValue={value => {setPosition(value)}} required>*Cargo do responsável</InputForm>

            <Button submit>Criar conta</Button>
        </form>
    );
}

export default memo(SignUpEntity);