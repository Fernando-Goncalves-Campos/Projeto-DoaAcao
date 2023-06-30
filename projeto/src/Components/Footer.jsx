import { memo } from "react";

import LinkQuery from "./LinkQuery.jsx";

import "./Footer.style.css";

function Footer() {
	return(
        <footer>
<<<<<<< Updated upstream
            <LinkQuery to="/aboutus" replace>Sobre nós</LinkQuery>
=======
            <div className="links">
                <LinkQuery to="/home" replace>Início</LinkQuery>
            </div>
>>>>>>> Stashed changes
        </footer>
    );
}

export default memo(Footer);