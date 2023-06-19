import { memo, useState, useContext } from "react";

import { UserContext } from "../App";

import InputForm from "../Components/InputForm"
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

function SignUpVolunteer() {
    const navigate = useNavigate()
    
    const {setUser, setLogged, setEntity} = useContext(UserContext);

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [CPF, setCPF] = useState("");
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

    //Adiciona a conta no banco de dados
    const addVolunteerDB = async () => {
        /*const response = await fetch(`http://localhost:5050/volunteers/`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                lastName: lastName,
                CPF: CPF,
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
                referencePoint: referencePoint
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
            setLogged(true);
            setEntity(false);
            setUser({
                name: name,
                lastName: lastName,
                CPF: CPF,
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
                referencePoint: referencePoint
            });
            navigate(-2);
        }
        else{
            alert("Account already exists!!!");
        }
    }

	return(
        <form onSubmit={handleSubmit}>
            <h2>*Campos obrigatórios</h2>
            <InputForm setValue={value => {setName(value)}} required>*Nome</InputForm>
            <InputForm setValue={value => {setLastName(value)}} required>*Sobrenome</InputForm>
            <InputForm setValue={value => {setCPF(value)}}>CPF</InputForm>
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

            <Button submit>Criar conta</Button>
        </form>
    );
}

export default memo(SignUpVolunteer);