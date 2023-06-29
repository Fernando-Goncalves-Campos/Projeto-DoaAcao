import { memo, useState } from "react";

import InputForm from "../Components/InputForm"
import CustomButton from "../Components/CustomButton";
import { useNavigate } from "react-router-dom";

function SignUpEntity() {
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [socialReason, setSocialReason] = useState("");
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
    const [password, setPassword] = useState("");

    //Adiciona a conta no banco de dados
    const addEntityDB = async () => {
        /*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entities`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                socialReason: socialReason,
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
                position: position,
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
        const response = await addEntityDB();
        if(response.status === 201){
            alert("Account sent to validation");
            navigate(-1);
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
            <InputForm setValue={value => {setName(value)}} required>*Nome da Empresa</InputForm>
            <InputForm setValue={value => {setSocialReason(value)}} required>*Razão Social</InputForm>
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
            <InputForm type="password" setValue={value => {setPassword(value)}} required>*Senha</InputForm>

            <CustomButton submit>Criar conta</CustomButton>
        </form>
    );
}

export default memo(SignUpEntity);