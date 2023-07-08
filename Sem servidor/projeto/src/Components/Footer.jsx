import { memo } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

import LinkQuery from "./LinkQuery.jsx";

import "./Footer.style.css";

function Footer() {
	return(
        <footer>
            <div className="links">
                <a className='instagram-icon' href="https://www.instagram.com/" target="_blank"><FaInstagram /></a>
                <a className='twitter-icon' href="https://www.twitter.com/" target="_blank"><FaTwitter /></a>
                <a className='facebook-icon' href="https://www.facebook.com/" target="_blank"><FaFacebook /></a>
            </div>
            <div className="copyright-msg">
                <span>© 2023 Voluntech. Todos os direitos reservados.</span>
            </div>
        </footer>
    );
}

export default memo(Footer);
