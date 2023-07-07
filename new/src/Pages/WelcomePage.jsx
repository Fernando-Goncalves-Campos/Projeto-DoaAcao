import { memo } from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "../Components/CustomButton.jsx";

import "./css/WelcomePage.style.css";

function WelcomePage() {
    const navigate = useNavigate();

    return(
        <>
            <div id="welcomeImage">
                <div id="welcomeCustomButtonsContainer">
                    <span>
                        Você pode fazer o bem que o mundo tanto precisa. Ajude o próximo.
                    </span>
                    <CustomButton onClick={() => {navigate("/home")}} >Ver ações voluntárias</CustomButton>
                    <CustomButton onClick={() => {navigate("/aboutus")}} >Saiba mais sobre o projeto</CustomButton>
                </div>
            </div>

            <div id="welcomeTextContainer">
                <div id="welcomeText">
                    <h1><span>Doa</span>Ação</h1>
                    <p>O Projeto DoaAção é uma plataforma dedicada à conexão de voluntários com organizações sem fins lucrativos. Nosso objetivo é promover a solidariedade e possibilitar a realização de ações voluntárias em prol de causas importantes. <br /> Seja você um voluntário em busca de oportunidades ou uma organização sem fins lucrativos que necessita de apoio, o Projeto DoaAção é o lugar certo para você.</p>
                </div>
            </div>
        </>
    );
}

export default memo(WelcomePage);