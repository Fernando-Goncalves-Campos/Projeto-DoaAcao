import { memo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App";

import InputForm from "../Components/InputForm.jsx";
import CustomButton from "../Components/CustomButton.jsx";


//Import do css
import './css/Login.style.css';


function Login() {
    const navigate = useNavigate();

    const {setUser, setLogged, setEntity} = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailVolunteer, setEmailVolunteer] = useState("");
    const [emailEntity, setEmailEntity] = useState("");

    const loginUser = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({
                email: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if(response.status === 200){
            const loggedUser = await response.json();
            setLogged(true);
            await setUser(loggedUser.user);
            setEntity(loggedUser.entity);
            navigate("/home");
        }
        else if(response.status === 403 || response.status === 404){
            alert("account doesn't exist or the password is wrong!");
        }
        else{
            const message = `An error occurred: ${response.statusText}`;
			alert(message);
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser();
    }

    const handleVolunteer = (e) => {
        e.preventDefault();
        navigate("/signup")
    }

    const handleEntity = (e) => {
        e.preventDefault();
        navigate("/signup/entity")
    }
	return(
        <div className="container-login-register">
            <div className="container-login">
                <div className="container-login-fields">
                    <h1>Já sou usuário</h1>
                    <InputForm setValue={value => {setUsername(value)} } className="login-input">E-mail, CPF ou CNPJ</InputForm>
                    <InputForm setValue={value => {setPassword(value)}} type="password" className="login-input">Senha</InputForm>
                    <br/>
                    <span>Esqueci minha senha</span>
                    <br/>
                    <CustomButton onClick={handleLogin} className="login-button">Acessar conta</CustomButton>
                </div>
            </div>

            <div className="line-between"></div>

            <div className="container-register">
                <div className="container-login-fields">
                    <h1>Criar conta como Voluntário</h1>
                    <InputForm setValue={value => {setEmailVolunteer(value)}} className="login-input">Informe seu e-mail</InputForm>
                    <br/>
                    <CustomButton onClick={handleVolunteer} className="login-button">Voluntariar-se</CustomButton>
                </div>

                <div className="container-login-fields">
                    <h1>Criar conta como Entidade</h1>
                    <InputForm setValue={value => {setEmailEntity(value)}} className="login-input">Informe seu e-mail</InputForm>
                    <br/>
                    <CustomButton onClick={handleEntity} className="login-button">Cadastrar-se</CustomButton>
                </div>
            </div>
        </div>
    );
}

export default memo(Login);