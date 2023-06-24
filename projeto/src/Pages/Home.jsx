import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SocialInvite from "../Components/SocialInvite.jsx";
import Button from "../Components/Button.jsx";
import ImageLink from "../Components/ImageLink.jsx";
import LinkQuery from "../Components/LinkQuery.jsx";
import WorkOption from "../Components/WorkOption.jsx";

function Home() {
    const navigate = useNavigate();

    const [topWorks, setTopWorks] = useState([]);
    const [topWorkOptions, setTopWorkOptions] = useState([]);

	useEffect(() => {
		async function getTopWorks(amount = 4) {
			/*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/works?amount=${amount}`);

			if (response.status !== 200) {
				const message = `An error occurred: ${response.statusText}`;
				console.log(message);
				return;
			}

			const readTopWorks = await response.json();

			setTopWorks(readTopWorks.filter((topWork, index) => index < amount));*/
            setTopWorks([]);
		}

		getTopWorks();
	}, []);

    
    useEffect(() => {
        setTopWorkOptions(topWorks? topWorks.map(work => {
            return <WorkOption work={work} />
        }) : <></>)
    }, [topWorks])

	return(
        <div>
            <ul>
                <li><SocialInvite src="">Seu gesto faz a diferença</SocialInvite></li>
                <li><SocialInvite src="">Você muda o mundo</SocialInvite></li>
                <li><SocialInvite src="">Apoie as entidades</SocialInvite></li>
            </ul>

            <div>
                <div>
                    <h1>Oportunidades imperdíveis</h1>
                    <div>
                        {topWorkOptions}
                    </div>
                    <Button onClick={() => {navigate("/works")}} >Ver ações voluntárias</Button>
                </div>
                
                <div>
                    <h1>Encontre as melhores ações voluntárias para você</h1>
                    <h2>Confira as categorias mais acessadas</h2>
                    <ul>
                        <li><ImageLink to="/works?reason=causa animal" src="">Causa Animal</ImageLink></li>
                        <li><ImageLink to="/works?reason=combate à fome" src="">Combate à fome</ImageLink></li>
                        <li><ImageLink to="/works?region=são carlos" src="">Vagas em São Carlos</ImageLink></li>
                        <li><ImageLink to="/works?reason=arte e cultura" src="">Arte e Cultura</ImageLink></li>
                        <li><ImageLink to="/works?reason=educação" src="">Educação</ImageLink></li>
                    </ul>
                </div>

                <div>
                    <h1>Escolha sua cidade</h1>
                    <ul>
                        <li><LinkQuery to="/works?region=são carlos">São Carlos</LinkQuery></li>
                        <li><LinkQuery to="/works?region=araraquara">Araraquara</LinkQuery></li>
                        <li><LinkQuery to="/works?region=ribeirão preto">Ribeirão Preto</LinkQuery></li>
                        <li><LinkQuery to="/works?region=rio claro">Rio Claro</LinkQuery></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default memo(Home);