import { memo } from "react";

import LinkQuery from "./LinkQuery.jsx";

import "./Footer.style.css";

function Footer() {
	return(
        <footer>
            <LinkQuery to="/aboutus" replace>Sobre nós</LinkQuery>
            <div className="links">
                <LinkQuery to="/home" replace>Início</LinkQuery>
            </div>
        </footer>
    );
}

export default memo(Footer);