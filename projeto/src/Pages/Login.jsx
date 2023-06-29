import { memo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App";

import InputForm from "../Components/InputForm.jsx";
import CustomButton from "../Components/CustomButton.jsx";


function Login() {
    const navigate = useNavigate();

    const {setUser, setLogged, setEntity} = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailVolunteer, setEmailVolunteer] = useState("");
    const [emailEntity, setEmailEntity] = useState("");

    const loginUser = () => {
        /*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
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
        }*/
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
        <div>
            <div>
                <h1>Já sou usuário</h1>
                <InputForm setValue={value => {setUsername(value)}}>E-mail, CPF ou CNPJ</InputForm>
                <InputForm setValue={value => {setPassword(value)}} type="password">Senha</InputForm>
                <span>Esqueci minha senha</span>
                <CustomButton onClick={handleLogin}>Acessar conta</CustomButton>
                
            </div>

            <div>
                <div>
                    <h1>Criar conta como Voluntário</h1>
                    <InputForm setValue={value => {setEmailVolunteer(value)}}>Informe seu e-mail</InputForm>
                    <CustomButton onClick={handleVolunteer}>Voluntariar-se</CustomButton>
                </div>

                <div>
                    <h1>Criar conta como Entidade</h1>
                    <InputForm setValue={value => {setEmailEntity(value)}}>Informe seu e-mail</InputForm>
                    <CustomButton onClick={handleEntity}>Cadastrar-se</CustomButton>
                </div>
            </div>
        </div>
    );
}

export default memo(Login);