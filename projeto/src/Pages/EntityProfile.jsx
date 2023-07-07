import { memo, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../App";

import CustomButton from "../Components/CustomButton";
import InputForm from "../Components/InputForm";

import "./css/EntityProfile.style.css";

function EntityProfile() {
    const {user, entity} = useContext(UserContext);

	const navigate = useNavigate();

    const { entityCNPJ } = useParams();

    const [entityInfo, setEntityInfo] = useState();
    const [entityDisplay, setEntityDisplay] = useState();

    const [name, setName] = useState("");
    const [socialReason, setSocialReason] = useState("");
    const [CNPJ, setCNPJ] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [secondPhone, setSecondPhone] = useState("");
    
    const [img, setImg] = useState("");
    const [CEP, setCEP] = useState("");
    const [streetName, setStreetName] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    const [complement, setComplement] = useState("");
    
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [referencePoint, setReferencePoint] = useState("");
    const [responsible, setResponsible] = useState("");
    const [position, setPosition] = useState("");

    useEffect(() => {
		async function getEntity() {
			//const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entities/${entityCNPJ}`);

			//if (response.status !== 200) {
			//	const message = `An error occurred: ${response.statusText}`;
			//	alert(message);
			//	return;
			//}

			//const readEntity = await response.json();

			//setEntityInfo(readEntity);
            /*
            setName(readEntity.name);
            setSocialReason(readEntity.socialReason);
            setCNPJ(readEntity.CNPJ);
            setemail(readEntity.email);
            setPhone(readEntity.phone);
            setSecondPhone(readEntity.secondPhone);

            setImg(readEntity.img);
            setCEP(readEntity.CEP);
            setStreetName(readEntity.streetName);
            setAddressNumber(readEntity.addressNumber);
            setComplement(readEntity.complement);

            setDistrict(readEntity.district);
            setState(readEntity.state);
            setCity(readEntity.city);
            setReferencePoint(readEntity.referencePoint);
            setResponsible(readEntity.responsible);
            setPosition(readEntity.position);            
            */
            setEntityInfo({
                name: "nome",
                CNPJ: entityCNPJ,
                streetName: "streetName",
                socialReason: "socialReason",
                img: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?q=10&h=200",
                email:"email",
                phone:"phone",
                secondPhone: "secondPhone",
                CEP: "CEP",
                addressNumber: "AddressNumber",
                complement: "complement",
                district: "district",
                state: "state",
                city: "city",
                referencePoint: "referencePoint",
                responsible: "Responsible",
                position: "position"
            });
		}

		getEntity();
	}, []);

    useEffect(()=>{
        if(entity && user.CNPJ === entityCNPJ){
            //Adiciona a conta no banco de dados
            const patchEntityDB = async () => {
                /*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entity/${entityCNPJ}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        name: name,
                        socialReason: socialReason,
                        email: email,
                        phone: phone,
                        secondPhone: secondPhone,
                        CEP: CEP,
                        streetName: streetName,
                        addressNumber: addressNumber,
                        complement: complement,
                        district: district,
                        state: state,
                        city: city,
                        referencePoint: referencePoint,
                        responsible: responsible,
                        position: position
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                return response;*/
                return {status: 200};
            }

            const handleSubmit = async (e) => {
                e.preventDefault();

                //Adiciona o administrador ao banco de dados
                const response = await patchEntityDB();
                if(response.status === 200){
                    alert("Profile updated");
                }
                else{
                    const message = `An error occurred: ${response.statusText}`;
                    alert(message);
                }
            }

            setEntityDisplay(entityInfo? <>
                <h1>Dados da Entidade</h1>
                <form onSubmit={handleSubmit}>
                    <InputForm setValue={value => {setName(value)}} defaultValue={entityInfo.name}  required>Nome</InputForm>
                    <InputForm setValue={value => {setSocialReason(value)}} defaultValue={entityInfo.socialReason}  required>Razão Social</InputForm>
                    <InputForm setValue={value => {setCNPJ(value)}} defaultValue={entityInfo.CNPJ}  disabled required>CNPJ</InputForm>
                    <InputForm type="email" setValue={value => {setEmail(value)}} defaultValue={entityInfo.email}  required>E-mail</InputForm>
                    <InputForm setValue={value => {setPhone(value)}} defaultValue={entityInfo.phone}  required>Telefone 1</InputForm>
                    <InputForm setValue={value => {setSecondPhone(value)}} defaultValue={entityInfo.secondPhone} >Telefone 2</InputForm>

                    <InputForm setValue={value => {setCEP(value)}} defaultValue={entityInfo.CEP}  required>CEP</InputForm>
                    <InputForm setValue={value => {setStreetName(value)}} defaultValue={entityInfo.streetName}  required>Nome da Rua</InputForm>
                    <InputForm setValue={value => {setAddressNumber(value)}} defaultValue={entityInfo.addressNumber}  required>Número</InputForm>
                    <InputForm setValue={value => {setComplement(value)}} defaultValue={entityInfo.complement} >Complemento</InputForm>

                    <InputForm setValue={value => {setDistrict(value)}} defaultValue={entityInfo.district}  required>Bairro</InputForm>
                    <InputForm setValue={value => {setState(value)}} defaultValue={entityInfo.state}  required>Estado</InputForm>
                    <InputForm setValue={value => {setCity(value)}} defaultValue={entityInfo.city}  required>Cidade</InputForm>
                    <InputForm setValue={value => {setReferencePoint(value)}} defaultValue={entityInfo.referencePoint} >Referência</InputForm>
                    <InputForm setValue={value => {setResponsible(value)}} defaultValue={entityInfo.responsible}  required>Nome do Responsável</InputForm>
                    <InputForm setValue={value => {setPosition(value)}} defaultValue={entityInfo.position}  required>Cargo do responsável</InputForm>
                    <CustomButton submit>SALVAR INFORMAÇÕES</CustomButton>
                </form>
            </> :<></>);
        }

        else{
            setEntityDisplay(entityInfo? <>
                <h1>Dados da entidade</h1>
                <div className="entityImgNameSocialReason">
                    <div className="entityImg">
                        <img src={entityInfo.img} alt={entityInfo.name} />
                    </div>
                    <div className="entitySideImageContainer">
                        <div className="entitySideImageLine">
                            <div className="entitySideImage">
                                <h3>Nome</h3>
                                <input type="text" disabled value={entityInfo.name} />
                            </div>
                            <div className="entitySideImage">
                                <h3>CNPJ</h3>
                                <input type="text" disabled value={entityInfo.CNPJ} />
                            </div>                        
                        </div>
                        <div className="entitySideImageLine">
                            <div className="entitySideImage">
                                <h3>Social Reason</h3>
                                <input type="text" disabled value={entityInfo.socialReason}/>
                            </div>
                            <div className="entitySideImage">
                                <h3>Email</h3>
                                <input type="text" disabled value={entityInfo.email}/>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <h3>Telefones</h3>
                <div className="entityPhones">
                    <div className="entityPhone1">
                        <input type="text" disabled value={entityInfo.phone}/>
                    </div>
                    <div className="entityPhone2">
                        <input type="text" disabled value={entityInfo.secondPhone} />
                    </div>
                </div>
                
                <div className="entityAddressContainer">
                    <div className="entityAddressLine">
                        <div className="entityAddressSideComponent">
                            <h3>CEP</h3>
                            <input type="text" disabled value={entityInfo.CEP} />
                        </div>
                        <div className="entityAddressMiddleComponent">
                            <h3>Nome da rua</h3>
                            <input type="text" disabled value={entityInfo.streetName} />
                        </div>
                        <div className="entityAddressSideComponent">
                            <h3>Número</h3>
                            <input type="text" disabled value={entityInfo.addressNumber} />
                        </div>
                    </div>
                    <div className="entityAddressLine">
                        <div className="entityAddressSideComponent">
                            <h3>Complemento</h3>
                            <input type="text" disabled value={entityInfo.complement} />
                        </div>
                        <div className="entityAddressMiddleComponent">
                            <h3>Cidade</h3>
                            <input type="text" disabled value={entityInfo.city} />
                        </div>
                        <div className="entityAddressSideComponent">
                            <h3>Ponto de referência</h3>
                            <input type="text" disabled value={entityInfo.referencePoint} />
                        </div>
                    </div>
                </div>

                <div className="entityResponsibleLine">
                    <div className="entityResponsibleComponent">
                        <h3>Responsável</h3>
                        <input type="text" disabled value={entityInfo.responsible} />
                    </div>
                    <div className="entityResponsibleComponent">
                        <h3>Posição</h3>
                        <input type="text" disabled value={entityInfo.position} />
                    </div>
                </div>
                
                <CustomButton onClick={()=>{navigate(`/entities/${entityCNPJ}/works`)}}>VER TRABALHOS</CustomButton>
            </> :<></>);
        }
    }, [entityInfo]);

	return(
        <div className="entityProfileContainer">
            {entityDisplay}
        </div>
    );
}

export default memo(EntityProfile);