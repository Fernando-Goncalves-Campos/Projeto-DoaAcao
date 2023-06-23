import { memo } from "react";

import LinkQuery from "./LinkQuery.jsx";

import "./Footer.style.css";

function Footer() {
	return(
        <footer>
            <LinkQuery to="/aboutus" replace>Sobre nós</LinkQuery>
        </footer>
    );
}

export default memo(Footer);