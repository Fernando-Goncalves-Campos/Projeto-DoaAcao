import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SocialInvite from "../Components/SocialInvite.jsx";
import CustomButton from "../Components/CustomButton.jsx";
import ImageLink from "../Components/ImageLink.jsx";
import LinkQuery from "../Components/LinkQuery.jsx";
import WorkOption from "../Components/WorkOption.jsx";
import "./css/Home.style.css";

function Home() {
    const navigate = useNavigate();

    const [topWorks, setTopWorks] = useState([]);
    const [topWorkOptions, setTopWorkOptions] = useState([]);

	useEffect(() => {
		async function getTopWorks(amount = 4) {
			const response = await fetch(`http://${process.env.REACT_APP_API_URL}/works?amount=${amount}`);

			if (response.status !== 200) {
				const message = `An error occurred: ${response.statusText}`;
				console.log(message);
				return;
			}

			const readTopWorks = await response.json();

			setTopWorks(readTopWorks.filter((topWork, index) => index < amount));
		}

		getTopWorks();
	}, []);

    
    useEffect(() => {
        setTopWorkOptions(topWorks? topWorks.map(work => {
            return <WorkOption work={work} />
        }) : <></>)
    }, [topWorks])

	return(
        <div className="home-container">
            <ul className="social-invite-imgs-list">
                <li><SocialInvite src="https://www.adote.org.br/assets/images/img-foco-de-atuacao.png">Seu gesto faz a diferença</SocialInvite></li>
                <li><SocialInvite src="https://www.agenciamestre.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2008/06/social-media.jpg.webp">Você muda o mundo</SocialInvite></li>
                <li><SocialInvite src="https://envolverde.com.br/wp-content/uploads/2015/09/Ongs.jpg">Apoie as entidades</SocialInvite></li>
            </ul>

            <div className="home-options-container">
                <div className="opportunities-container">
                    <h1>Oportunidades imperdíveis</h1>
                    <div className="opportunities-options">
                        {topWorkOptions}
                    </div>
                    <CustomButton onClick={() => {navigate("/works")}} >Ver mais oportunidades</CustomButton>
                </div>
                
                <div className="best-opportunities-container">
                    <h1>Encontre as melhores ações voluntárias para você</h1>
                    <h2>Confira as categorias mais acessadas</h2>
                    <ul>
                        <li><ImageLink to="/works?causa=causa animal" src="https://conceitos.com/wp-content/uploads/direito/causa-animal.jpg" className="causa-animal">Causa Animal</ImageLink></li>
                        <li><ImageLink to="/works?causa=combate à fome" src="https://encenasaudemental.com/wp-content/uploads/2021/10/Getty-Hadyniak-fome-alimentos-pobreza.jpg" className="combate-fome">Combate à fome</ImageLink></li>
                        <li><ImageLink to="/works?localidade=são carlos" src="https://radiosds.com.br/wp-content/uploads/2022/03/sao-carlos.jpg" className="vagas-sao-carlos">Vagas em São Carlos</ImageLink></li>
                        <li><ImageLink to="/works?causa=arte e cultura" src="https://st3.depositphotos.com/1457895/19142/v/450/depositphotos_191427288-stock-illustration-map-from-traditional-symbols-of.jpg" className="arte-cultura">Arte e Cultura</ImageLink></li>
                        <li><ImageLink to="/works?causa=educação" src="https://img.imageboss.me/revista-cdn/cdn/19580/2ae2c2aaa3c9b3912769332306c5a292f4817b1a.jpg?1559248176" className="educacao">Educação</ImageLink></li>
                    </ul>
                </div>

                <div className="cities-opportunities-container">
                    <h1>Escolha sua cidade</h1>
                    <ul>
                        <li><LinkQuery to="/works?localidade=são carlos">São Carlos</LinkQuery></li>
                        <li><LinkQuery to="/works?localidade=araraquara">Araraquara</LinkQuery></li>
                        <li><LinkQuery to="/works?localidade=ribeirão preto">Ribeirão Preto</LinkQuery></li>
                        <li><LinkQuery to="/works?localidade=rio claro">Rio Claro</LinkQuery></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default memo(Home);