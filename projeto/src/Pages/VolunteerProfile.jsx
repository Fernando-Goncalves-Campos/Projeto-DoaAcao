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
			//const response = await fetch(`http://${process.env.REACT_APP_API_URL}/volunteers/${volunteersCPF}`);

			//if (response.status !== 200) {
			//	const message = `An error occurred: ${response.statusText}`;
			//	alert(message);
			//	return;
			//}

			//const readVolunteer = await response.json();

			//setVolunteer(readVolunteer);
            /*
            setName(readVolunteer.name);
            setBirthday(readVolunteer.birthday);
            setCPF(readVolunteer.CPF);
            setemail(readVolunteer.email);
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
            */
            setVolunteerInfo({
                name: "nome",
                birthday: "01/01/1991",
                CNPJ: volunteerCPF,
                streetName: "streetName",
                reason: "reason",
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
                reasons: ["causa 2", "causa 3", "causa 4"],
                skills: ["habilidade 1", "habilidade 5"]
            });
            setReasons(["causa 2", "causa 3", "causa 4"]);
            setSkills(["habilidade 1", "habilidade 5"]);
		}

		getVolunteer();
	}, []);

    useEffect(()=>{
        if(volunteerInfo){
            if(!entity && user.CPF === volunteerCPF){
                //Adiciona a conta no banco de dados
                const patchVolunteerDB = async () => {
                    /*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/volunteers/${volunteerCPF}`, {
                        method: "PATCH",
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

                    return response;*/
                    return {status: 200};
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
                        <InputForm setValue={value => {setName(value)}} defaultValue={volunteerInfo.name}  required>Nome</InputForm>
                        <InputForm type="date" setValue={value => {setBirthday(value)}} defaultValue={volunteerInfo.birthday}  required>Data de nascimento</InputForm>
                        <InputForm setValue={value => {setCPF(value)}} defaultValue={volunteerInfo.CPF}  disabled required>CPF</InputForm>
                        <InputForm type="email" setValue={value => {setEmail(value)}} defaultValue={volunteerInfo.email}  required>E-mail</InputForm>
                        <InputForm setValue={value => {setPhone(value)}} defaultValue={volunteerInfo.phone}  required>Telefone 1</InputForm>
                        <InputForm setValue={value => {setSecondPhone(value)}} defaultValue={volunteerInfo.secondPhone} >Telefone 2</InputForm>

                        <InputForm setValue={value => {setCEP(value)}} defaultValue={volunteerInfo.CEP}  required>CEP</InputForm>
                        <InputForm setValue={value => {setStreetName(value)}} defaultValue={volunteerInfo.streetName}  required>Nome da Rua</InputForm>
                        <InputForm setValue={value => {setAddressNumber(value)}} defaultValue={volunteerInfo.addressNumber}  required>Número</InputForm>
                        <InputForm setValue={value => {setComplement(value)}} defaultValue={volunteerInfo.complement} >Complemento</InputForm>

                        <InputForm setValue={value => {setDistrict(value)}} defaultValue={volunteerInfo.district}  required>Bairro</InputForm>
                        <InputForm setValue={value => {setState(value)}} defaultValue={volunteerInfo.state}  required>Estado</InputForm>
                        <InputForm setValue={value => {setCity(value)}} defaultValue={volunteerInfo.city}  required>Cidade</InputForm>
                        <InputForm setValue={value => {setReferencePoint(value)}} defaultValue={volunteerInfo.referencePoint} >Referência</InputForm>
                        
                        <ChoosePreferences filter={filters.Causas} preferences={reasons} setPreferences={(value) => {setReasons(value)}} max={3}>Causas</ChoosePreferences>
                        <ChoosePreferences filter={filters.Habilidades} preferences={skills} setPreferences={(value) => {setSkills(value)}} max={3}>Habilidades</ChoosePreferences>

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