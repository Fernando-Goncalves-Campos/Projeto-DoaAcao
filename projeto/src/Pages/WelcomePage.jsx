import { memo } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Components/Button.jsx";

function WelcomePage() {
    const navigate = useNavigate();

    return(
        <>
            <div id="welcomeImage">
                <div id="welcomeButtonsContainer">
                    <span>
                        Você pode fazer o bem que o mundo tanto precisa. Ajude o próximo.
                    </span>
                    <Button onClick={() => {navigate("/home")}} >Ver ações voluntárias</Button>
                    <Button onClick={() => {navigate("/aboutus")}} >Saiba mais sobre o projeto</Button>
                </div>
            </div>

            <div id="welcomeText">
                <h1>DoaAção</h1>
                <p>O Projeto DoaAção é uma plataforma dedicada à conexão de voluntários com organizações sem fins lucrativos. Nosso objetivo é promover a solidariedade e possibilitar a realização de ações voluntárias em prol de causas importantes. Seja você um voluntário em busca de oportunidades ou uma organização sem fins lucrativos que necessita de apoio, o Projeto DoaAção é o lugar certo para você.</p>
            </div>
        </>
    );
}

export default memo(WelcomePage);