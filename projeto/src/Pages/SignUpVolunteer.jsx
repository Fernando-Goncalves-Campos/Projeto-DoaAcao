import { memo, useState, useContext } from "react";

import { UserContext } from "../App";

import InputForm from "../Components/InputForm"
import CustomButton from "../Components/CustomButton";
import { useNavigate } from "react-router-dom";

function SignUpVolunteer() {
    const navigate = useNavigate()
    
    const {user, setUser, setLogged, setEntity} = useContext(UserContext);

    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
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
    const [password, setPassword] = useState("");

    //Adiciona a conta no banco de dados
    const addVolunteerDB = async () => {
        /*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/volunteers`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                birthday: birthday,
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
                referencePoint: referencePoint,
                password: password
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
                birthday: birthday,
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
        else if(response.status === 409){
            alert("Account already exists!!!");
        }
        else{
            const message = `An error occurred: ${response.statusText}`;
			alert(message);
        }
    }

	return(
        <form onSubmit={handleSubmit}>
            <h2>*Campos obrigatórios</h2>
            <InputForm setValue={value => {setName(value)}} required>*Nome</InputForm>
            <InputForm type="date" setValue={value => {setBirthday(value)}}  required>*Data de nascimento</InputForm>
            <InputForm setValue={value => {setCPF(value)}} required>*CPF</InputForm>
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
            <InputForm type="password" setValue={value => {setPassword(value)}} required>*Senha</InputForm>

            <CustomButton submit>Criar conta</CustomButton>
        </form>
    );
}

export default memo(SignUpVolunteer);