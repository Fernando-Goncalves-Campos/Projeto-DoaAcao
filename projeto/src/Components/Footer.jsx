import { memo } from "react";

import LinkQuery from "./LinkQuery.jsx";

import "./Footer.style.css";

function Footer() {
	return(
        <footer>
            <div className="links">
                <LinkQuery to="/aboutus" replace>Sobre nós</LinkQuery>
                <LinkQuery to="/home" replace>Início</LinkQuery>
            </div>
        </footer>
    );
}

export default memo(Footer);