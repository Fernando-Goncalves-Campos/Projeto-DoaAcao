import { memo, useState } from "react";

import InputForm from "../Components/InputForm"
import CustomButton from "../Components/CustomButton";
import { useNavigate } from "react-router-dom";

import './css/SignUpEntity.css';

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
        if(response.status === 201 || response.status === 200){
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
        <form onSubmit={handleSubmit} className="signup-entity">
            <h2>*Campos obrigatórios</h2>

            <div className="container-input-forms-entity">

                <div className="form-row">
                    <InputForm setValue={value => {setName(value)}} required className="input-forms-entity nome">*Nome da Empresa</InputForm>
                    <InputForm setValue={value => {setSocialReason(value)}} required className="input-forms-entity razaosocial">*Razão Social</InputForm>
                    <InputForm setValue={value => {setCNPJ(value)}} required className="input-forms-entity cnpj">*CNPJ</InputForm>
                </div>


                <div className="form-row">
                    <InputForm type="email" setValue={value => {setEmail(value)}} required className="input-forms-entity email">*E-mail</InputForm>
                    <InputForm setValue={value => {setPhone(value)}} required className="input-forms-entity telefone">*Telefone</InputForm>
                    <InputForm setValue={value => {setCEP(value)}} required className="input-forms-entity cep">*CEP</InputForm>
                    
                </div>
                
                <div className="form-row">
                    <InputForm setValue={value => {setStreetName(value)}} required className="input-forms-entity rua">*Nome da Rua</InputForm>
                    <InputForm setValue={value => {setAddressNumber(value)}} required className="input-forms-entity numero">*Número</InputForm>
                    <InputForm setValue={value => {setComplement(value)}} className="input-forms-entity complemento">Complemento</InputForm>
                </div>


                <div className="form-row">
                    <InputForm setValue={value => {setDistrict(value)}} required className="input-forms-entity bairro">*Bairro</InputForm>
                    <InputForm setValue={value => {setState(value)}} required className="input-forms-entity estado">*Estado</InputForm>
                    <InputForm setValue={value => {setCity(value)}} required className="input-forms-entity cidade">*Cidade</InputForm>
                    <InputForm setValue={value => {setReferencePoint(value)}} className="input-forms-entity referencia">Ponto de Referência</InputForm>
                </div>
                

                <div className="form-row">
                    <InputForm setValue={value => {setResponsible(value)}} required className="input-forms-entity responsavel">*Nome do Responsável</InputForm>
                    <InputForm setValue={value => {setPosition(value)}} required className="input-forms-entity cargoresponsavel">*Cargo do responsável</InputForm>
                    <InputForm type="password" setValue={value => {setPassword(value)}} required className="input-forms-entity senha">*Senha</InputForm>
                </div>
                

                <div className="form-row">
                    <div className="img-cadastro-entity">
                        Imagem de perfil:<br/>
                        <input type="file" className="hoverScale file-entity-register" onChange={e => {setImg(e.target.value)}} accept=".png, .jpg, .jpeg"/>
                    </div>

                    <div className="container-submit-entity-create">
                        <CustomButton submit className="create-account-entity">Criar conta</CustomButton>
                    </div>
                    
                </div>
                
                
            </div>

        </form>
    );
}

export default memo(SignUpEntity);