import { memo, useState, useContext } from "react";

import { UserContext } from "../App";

import InputForm from "../Components/InputForm"
import CustomButton from "../Components/CustomButton";
import { useNavigate } from "react-router-dom";

import './css/SignUpVolunteer.style.css';

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
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/user`, {
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

        return response;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Adiciona o administrador ao banco de dados
        const response = await addVolunteerDB();
        if(response.status === 201 || response.status === 200){
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
        <form onSubmit={handleSubmit} className="signup-volunteer">
            <h2>*Campos obrigatórios</h2>
            <div className="container-input-forms-volunteer">
                        <div className="form-row">
                            <InputForm setValue={value => {setName(value)}} required className="input-forms-volunteer nome">*Nome</InputForm>
                            <InputForm type="date" setValue={value => {setBirthday(value)}}  required className="input-forms-volunteer aniversario">*Data de nascimento</InputForm>
                        </div>

                        <div className="form-row">
                            <InputForm setValue={value => {setCPF(value)}} required className="input-forms-volunteer cpf">*CPF</InputForm>
                            <InputForm type="email" setValue={value => {setEmail(value)}} required className="input-forms-volunteer email">*E-mail</InputForm>
                            <InputForm setValue={value => {setPhone(value)}} required className="input-forms-volunteer phone">*Telefone</InputForm>
                        </div>


                        <div className="form-row">
                            <InputForm setValue={value => {setCEP(value)}} required className="input-forms-volunteer cep">*CEP</InputForm>
                            <InputForm setValue={value => {setStreetName(value)}} required className="input-forms-volunteer rua">*Nome da Rua</InputForm>
                            <InputForm setValue={value => {setAddressNumber(value)}} required className="input-forms-volunteer numero">*Número</InputForm>
            
                        </div>
                            
                        <div className="form-row">
                            <InputForm setValue={value => {setComplement(value)}} className="input-forms-volunteer complemento">Complemento</InputForm>
                            <InputForm setValue={value => {setDistrict(value)}} required className="input-forms-volunteer bairro">*Bairro</InputForm>
                            <InputForm setValue={value => {setState(value)}} required className="input-forms-volunteer estado">*Estado</InputForm>
                            <InputForm setValue={value => {setCity(value)}} required className="input-forms-volunteer cidade">*Cidade</InputForm>
                        </div>
                        
                        <div className="form-row">
                            <InputForm setValue={value => {setReferencePoint(value)}} className="input-forms-volunteer referencia">Ponto de Referência</InputForm>
                            <InputForm type="password" setValue={value => {setPassword(value)}} required className="input-forms-volunteer senha">*Senha</InputForm>
                   
                        </div>

                        <div className="form-row">
                            <div className="img-cadastro-volunteer">
                                Imagem de perfil:<br/>
                                <input type="file" className="hoverScale file-volunteer-register" onChange={e => {setImg(e.target.value)}} accept=".png, .jpg, .jpeg"/>
                            </div>


                            <div className="container-submit-volunteer-create">
                                <CustomButton submit className="create-account-volunteer">Criar conta</CustomButton>
                            </div>
                            
                        </div>  
                
            </div>

        </form>
    );
}

export default memo(SignUpVolunteer);