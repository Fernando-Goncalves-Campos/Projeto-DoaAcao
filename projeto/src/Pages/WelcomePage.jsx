import { memo } from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
    const navigate = useNavigate();
    function handleEnter(){
        navigate("/home");
    }

	return(
        <div>
            <h1>Bem Vindo</h1> <br />
            <button onClick={handleEnter}> Entrar </button>
        </div>
    );
}

export default memo(WelcomePage);