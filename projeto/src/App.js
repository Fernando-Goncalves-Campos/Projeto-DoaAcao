import { createContext, useState  } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomePage from "./Pages/WelcomePage.jsx";
import Layout from "./Layout.js";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import SignUpEntity from "./Pages/SignUpEntity.jsx";
import SignUpVolunteer from "./Pages/SignUpVolunteer.jsx";
import VolunteerProfile from "./Pages/VolunteerProfile.jsx";
import EntityProfile from "./Pages/EntityProfile.jsx";
import EntityWorks from "./Pages/EntityWorks.jsx";
import CreateWork from "./Pages/CreateWork.jsx";
import WorkDescription from "./Pages/WorkDescription.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import NoPage from "./Pages/NoPage.jsx";
import SearchPage from "./Pages/SearchPage.jsx";


//Passa as informações do usuário para todas as páginas
export const UserContext = createContext();

//Passa as informações dos filtros para todas as páginas
export const FilterContext = createContext();

function App() {
    //Salva as informações do usuário
    const [user, setUser] = useState({});
    const [logged, setLogged] = useState(false);
    const [entity, setEntity] = useState(false);

    //Salva informações sobre os filtros
    const [filters, setFilters] = useState({
        Causas:{
            name: "causa",
            options: [
                "Causa 1",
                "Causa 2",
                "Causa 3",
                "Causa 4",
                "Causa 5"
            ],
        },
        Habilidades:{
            name: "habilidade",
            options: [
                "Habilidade 1",
                "Habilidade 2",
                "Habilidade 3",
                "Habilidade 4",
                "Habilidade 5"
            ]
        },
        Localidades:{
            name: "localidade",
            options: [
                "São Carlos",
                "Araraquara",
                "Ribeirão Preto",
                "Rio Claro"
            ]
        }
    })

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            logged,
            setLogged,
            entity,
            setEntity,
        }}>
        <FilterContext.Provider value={{filters, setFilters}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<WelcomePage />}/>
                        <Route path="home" element={<Home />}/>
                        
                        <Route path="works" element={<SearchPage />}/>

                        <Route path="login" element={<Login />}/>

                        <Route path="signup">
                            <Route index element={<SignUpVolunteer />}/>
                            <Route path="entity" element={<SignUpEntity />}/>
                        </Route>
                        
                        <Route path="entities/:entityCNPJ">
                            <Route index element={<EntityProfile />}/>
                            
                            <Route path="works">
                                <Route index element={<EntityWorks />}/>
                                <Route path=":workName" element={<WorkDescription />}/>
                            </Route>

                            <Route path="createWork" element={<CreateWork />} />
                        </Route>

                        <Route path="volunteers/:volunteerCPF" element={<VolunteerProfile />}/>

                        <Route path="aboutus" element={<AboutUs />}/>

                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </FilterContext.Provider>
        </UserContext.Provider>
    );	
}

export default App;