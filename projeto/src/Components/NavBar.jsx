import { memo, useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { UserContext } from "../App";

import "./NavBar.style.css"

import Button from "./Button.jsx";
import UserMenu from "./UserMenu.jsx";
import LinkQuery from "./LinkQuery.jsx";

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    //Lê os estados do usuário
    const {user, logged, entity} = useContext(UserContext);
    
    const [userBtn, setUserBtn] = useState();

    
    //Define qual tipo de botão estará na barra de navegação
    useEffect(() => {
        const updateUserBtn = () => {
            if(location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/signup/entity"){
                setUserBtn();
            }
            else if(!logged){
                setUserBtn(<Button onClick={() => {navigate("/login")}}>Entrar</Button>)
            }
            else if(entity){
                setUserBtn(<UserMenu></UserMenu>)
            }
            else{
                setUserBtn(<UserMenu></UserMenu>)
            }
        }

        updateUserBtn();
    }, [logged, entity, user, location, navigate])

	return(
        <nav>
            <LinkQuery to="/home" replace>Início</LinkQuery>
            {userBtn}
        </nav>
    );
}

export default memo(NavBar);