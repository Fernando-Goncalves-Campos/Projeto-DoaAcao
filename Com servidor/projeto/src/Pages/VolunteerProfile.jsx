import { memo, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserContext, FilterContext } from "../App";

import CustomButton from "../Components/CustomButton";
import InputForm from "../Components/InputForm";
import ChoosePreferences from "../Components/ChoosePreferences";

import "./css/VolunteerProfile.style.css";

function VolunteerProfile() {
    const {user, entity} = useContext(UserContext);
    const {filters} = useContext(FilterContext);

    const { volunteerCPF } = useParams();

    const [volunteerInfo, setVolunteerInfo] = useState();
    const [volunteerDisplay, setVolunteerDisplay] = useState();

    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [CPF, setCPF] = useState("");
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

    const [reasons, setReasons] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
		async function getVolunteer() {
			const response = await fetch(`http://${process.env.REACT_APP_API_URL}/volunteers/${volunteerCPF}`);

			if (response.status !== 200) {
				const message = `An error occurred: ${response.statusText}`;
				alert(message);
				return;
			}

			const readVolunteer = await response.json();

			setVolunteerInfo(readVolunteer);

            setName(readVolunteer.name);
            setBirthday(readVolunteer.birthday);
            setCPF(readVolunteer.CPF);
            setEmail(readVolunteer.email);
            setPhone(readVolunteer.phone);
            setSecondPhone(readVolunteer.secondPhone);

            setImg(readVolunteer.img);
            setCEP(readVolunteer.CEP);
            setStreetName(readVolunteer.streetName);
            setAddressNumber(readVolunteer.addressNumber);
            setComplement(readVolunteer.complement);

            setDistrict(readVolunteer.district);
            setState(readVolunteer.state);
            setCity(readVolunteer.city);
            setReferencePoint(readVolunteer.referencePoint);
            
            setReasons(readVolunteer.reasons);
            setSkills(readVolunteer.skills);
		}

		getVolunteer();
	}, []);

    useEffect(()=>{
        if(volunteerInfo){
            if(!entity && user.CPF === volunteerCPF){
                //Adiciona a conta no banco de dados
                const patchVolunteerDB = async () => {
                    const response = await fetch(`http://${process.env.REACT_APP_API_URL}/volunteers/${volunteerCPF}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            name: name,
                            birthday: birthday,
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
                            reasons: reasons,
                            skills: skills
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    return response;
                }

                const handleSubmit = async (e) => {
                    e.preventDefault();

                    //Adiciona o administrador ao banco de dados
                    const response = await patchVolunteerDB();
                    if(response.status === 200){
                        alert("Profile updated");
                    }
                    else{
                        const message = `An error occurred: ${response.statusText}`;
                        alert(message);
                    }
                }

                setVolunteerDisplay(<>
                    <h1>Seus Dados</h1>
                    <form onSubmit={handleSubmit}>
                        <h1>Seus Dados</h1>
                        <div className="volunteerImgNameSocialReason">
                            <div className="volunteerImg">
                                <img src={volunteerInfo.img} alt={volunteerInfo.name} />
                            </div>
                            <div className="volunteerSideImageContainer">
                                <div className="volunteerSideImageLine">
                                    <div className="volunteerSideImage">
                                        <h3>Nome</h3>
                                        <InputForm setValue={value => {setName(value)}} defaultValue={volunteerInfo.name}  required>Nome</InputForm>
                                    </div>
                                    <div className="volunteerSideImage">
                                        <h3>CPF</h3>
                                        <InputForm setValue={value => {setCPF(value)}} defaultValue={volunteerInfo.CPF}  disabled required>CPF</InputForm>
                                    </div>                        
                                </div>
                                <div className="volunteerSideImageLine">
                                    <div className="volunteerSideImage">
                                        <h3>Email</h3>
                                        <InputForm type="email" setValue={value => {setEmail(value)}} defaultValue={volunteerInfo.email}  required>E-mail</InputForm>
                                    </div>
                                    <div className="volunteerSideImage">
                                        <h3>Data de nascimento</h3>
                                        <InputForm type="date" setValue={value => {setBirthday(value)}} defaultValue={volunteerInfo.birthday}  required>Data de nascimento</InputForm>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <h3>Telefones</h3>
                        <div className="volunteerPhones">
                            <div className="volunteerPhone1">
                                <InputForm setValue={value => {setPhone(value)}} defaultValue={volunteerInfo.phone}  required>Telefone 1</InputForm>
                            </div>
                            <div className="volunteerPhone2">
                                <InputForm setValue={value => {setSecondPhone(value)}} defaultValue={volunteerInfo.secondPhone} >Telefone 2</InputForm>
                            </div>
                        </div>
                        
                        <div className="volunteerAddressContainer">
                            <div className="volunteerAddressLine">
                                <div className="volunteerAddressSideComponent">
                                    <h3>CEP</h3>
                                    <InputForm setValue={value => {setCEP(value)}} defaultValue={volunteerInfo.CEP}  required>CEP</InputForm>
                                </div>
                                <div className="volunteerAddressMiddleComponent">
                                    <h3>Nome da rua</h3>
                                    <InputForm setValue={value => {setStreetName(value)}} defaultValue={volunteerInfo.streetName}  required>Nome da Rua</InputForm>
                                </div>
                                <div className="volunteerAddressSideComponent">
                                    <h3>Número</h3>
                                    <InputForm setValue={value => {setAddressNumber(value)}} defaultValue={volunteerInfo.addressNumber}  required>Número</InputForm>
                                </div>
                            </div>
                            <div className="volunteerAddressLine">
                                <div className="volunteerAddressSideComponent">
                                    <h3>Complemento</h3>
                                    <InputForm setValue={value => {setComplement(value)}} defaultValue={volunteerInfo.complement} >Complemento</InputForm>
                                </div>
                                <div className="volunteerAddressMiddleComponent">
                                    <h3>Cidade</h3>
                                    <InputForm setValue={value => {setCity(value)}} defaultValue={volunteerInfo.city}  required>Cidade</InputForm>
                                </div>
                                <div className="volunteerAddressSideComponent">
                                    <h3>Ponto de referência</h3>
                                    <InputForm setValue={value => {setReferencePoint(value)}} defaultValue={volunteerInfo.referencePoint} >Referência</InputForm>
                                </div>
                            </div>
                            <div className="volunteerAddressLine">
                                <div className="volunteerResponsibleComponent">
                                    <h3>Bairro</h3>
                                    <InputForm setValue={value => {setDistrict(value)}} defaultValue={volunteerInfo.district}  required>Bairro</InputForm>
                                </div>
                                <div className="volunteerResponsibleComponent">
                                    <h3>Estado</h3>
                                    <InputForm setValue={value => {setState(value)}} defaultValue={volunteerInfo.state}  required>Estado</InputForm>
                                </div>
                            </div>
                        </div>

                        <div className="volunteerResponsibleLine">
                            <div className="volunteerResponsibleComponent">
                                <h3>Causas (Máx 3)</h3>
                                <ChoosePreferences filter={filters.Causas} preferences={reasons} setPreferences={(value) => {setReasons(value)}} max={3}>Causas</ChoosePreferences>
                            </div>
                            <div className="volunteerResponsibleComponent">
                                <h3>Habilidades (Máx 3)</h3>
                                <ChoosePreferences filter={filters.Habilidades} preferences={skills} setPreferences={(value) => {setSkills(value)}} max={3}>Habilidades</ChoosePreferences>
                            </div>
                        </div>
                        <CustomButton submit>SALVAR INFORMAÇÕES</CustomButton>
                    </form>
                </>);
            }

            else{
                setVolunteerDisplay(<>
                    <h1>Seus Dados</h1>
                    <div className="volunteerImgNameSocialReason">
                        <div className="volunteerImg">
                            <img src={volunteerInfo.img} alt={volunteerInfo.name} />
                        </div>
                        <div className="volunteerSideImageContainer">
                            <div className="volunteerSideImageLine">
                                <div className="volunteerSideImage">
                                    <h3>Nome</h3>
                                    <input type="text" disabled value={volunteerInfo.name} />
                                </div>
                                <div className="volunteerSideImage">
                                    <h3>CPF</h3>
                                    <input type="text" disabled value={volunteerInfo.CPF} />
                                </div>                        
                            </div>
                            <div className="volunteerSideImageLine">
                                <div className="volunteerSideImage">
                                    <h3>Email</h3>
                                    <input type="text" disabled value={volunteerInfo.email}/>
                                </div>
                                <div className="volunteerSideImage">
                                    <h3>Data de nascimento</h3>
                                    <input type="text" disabled value={volunteerInfo.birthday}/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <h3>Telefones</h3>
                    <div className="volunteerPhones">
                        <div className="volunteerPhone1">
                            <input type="text" disabled value={volunteerInfo.phone}/>
                        </div>
                        <div className="volunteerPhone2">
                            <input type="text" disabled value={volunteerInfo.secondPhone} />
                        </div>
                    </div>
                    
                    <div className="volunteerAddressContainer">
                        <div className="volunteerAddressLine">
                            <div className="volunteerAddressSideComponent">
                                <h3>CEP</h3>
                                <input type="text" disabled value={volunteerInfo.CEP} />
                            </div>
                            <div className="volunteerAddressMiddleComponent">
                                <h3>Nome da rua</h3>
                                <input type="text" disabled value={volunteerInfo.streetName} />
                            </div>
                            <div className="volunteerAddressSideComponent">
                                <h3>Número</h3>
                                <input type="text" disabled value={volunteerInfo.addressNumber} />
                            </div>
                        </div>
                        <div className="volunteerAddressLine">
                            <div className="volunteerAddressSideComponent">
                                <h3>Complemento</h3>
                                <input type="text" disabled value={volunteerInfo.complement} />
                            </div>
                            <div className="volunteerAddressMiddleComponent">
                                <h3>Cidade</h3>
                                <input type="text" disabled value={volunteerInfo.city} />
                            </div>
                            <div className="volunteerAddressSideComponent">
                                <h3>Ponto de referência</h3>
                                <input type="text" disabled value={volunteerInfo.referencePoint} />
                            </div>
                        </div>
                        <div className="volunteerAddressLine">
                            <div className="volunteerResponsibleComponent">
                                <h3>Bairro</h3>
                                <input type="text" disabled value={volunteerInfo.district} />
                            </div>
                            <div className="volunteerResponsibleComponent">
                                <h3>Estado</h3>
                                <input type="text" disabled value={volunteerInfo.state} /> 
                            </div>
                        </div>
                    </div>

                    <div className="volunteerResponsibleLine">
                        <div className="volunteerResponsibleComponent">
                            <h3>Causas</h3>
                            <input type="text" disabled value={volunteerInfo.reasons.map(reason => {
                                return " " + reason
                            })} />
                        </div>
                        <div className="volunteerResponsibleComponent">
                            <h3>Habilidades</h3>
                            <input type="text" disabled value={volunteerInfo.skills.map(skill => {
                                return " " + skill
                            })} />
                        </div>
                    </div>
                </>);
            }
        }
        
    }, [volunteerInfo, skills, reasons]);

	return(
        <div className="volunteerProfileContainer">
            {volunteerDisplay}
        </div>
    );
}

export default memo(VolunteerProfile);