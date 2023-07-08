import { memo } from "react";

import "./css/AboutUs.css";

function AboutUs() {
	return(
        <>
        <div className="about-us-container">

            <div className="about-us-container-children">
                <h1>Sobre nós</h1>
                <p>Bem-vindo à nossa página de Ações Voluntárias! Somos uma comunidade dedicada a fazer a diferença na vida das pessoas e no mundo ao nosso redor por meio de voluntariado. Nós acreditamos no poder transformador do serviço e estamos comprometidos em promover o bem-estar social, ajudando aqueles que mais precisam.</p>

                <p>Nossa organização foi fundada com o objetivo de unir pessoas que compartilham a mesma paixão por causas sociais e ambientais. Acreditamos que cada indivíduo possui habilidades e talentos únicos, e através do trabalho conjunto, podemos criar um impacto significativo nas comunidades em que atuamos.</p>

                <p>Nossa equipe é composta por voluntários comprometidos e entusiasmados, provenientes de diversas áreas e formações. Essa diversidade de experiências nos permite abordar uma ampla gama de questões sociais, como educação, saúde, meio ambiente, direitos humanos e muito mais. Nosso objetivo é atuar em projetos que tragam melhorias tangíveis e sustentáveis para a vida das pessoas.</p>

                <p>Acreditamos que a mudança começa de forma individual e se espalha para além de nossas fronteiras. Por isso, incentivamos a participação de pessoas de todas as idades, origens e habilidades. Valorizamos a inclusão e a diversidade, reconhecendo que cada indivíduo tem um papel único a desempenhar em nossa missão.</p>

                <p>Nossas ações voluntárias envolvem uma variedade de atividades, desde auxiliar em abrigos de animais, organização de campanhas de doação, promover a conscientização sobre questões sociais, até realizar trabalhos comunitários e ajudar em projetos de sustentabilidade. Estamos sempre abertos a novas ideias e iniciativas que possam trazer impacto positivo para a sociedade.</p>

                <p>Acreditamos que o voluntariado não só ajuda a construir comunidades mais fortes, mas também traz inúmeros benefícios pessoais. Ao dedicar seu tempo e energia ao serviço aos outros, você pode desenvolver novas habilidades, expandir seu conhecimento, fortalecer relacionamentos e experimentar uma sensação gratificante de propósito.</p>

                <p>Se você está interessado em fazer parte de nossa comunidade de voluntários ou deseja conhecer mais sobre nossas ações, entre em contato conosco. Juntos, podemos criar um mundo melhor através do poder do voluntariado.</p>

                <p>Junte-se a nós e faça parte dessa mudança!</p>
            </div>
        </div>
        </>
    );
}

export default memo(AboutUs);