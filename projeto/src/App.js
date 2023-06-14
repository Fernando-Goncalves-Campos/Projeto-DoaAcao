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
import WorkDescription from "./Pages/WorkDescription.jsx";
import HelpAndContact from "./Pages/HelpAndContact.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import NoPage from "./Pages/NoPage.jsx";
import SearchPage from "./Pages/SearchPage.jsx";

//Passes all the user information to all pages
export const UserContext = createContext();

function App() {
    //Values that save information about the user
    const [user, setUser] = useState({});
    const [logged, setLogged] = useState(false);
    const [entity, setEntity] = useState(false);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            logged,
            setLogged,
            entity,
            setEntity,
        }}>
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
                        
                        <Route path="entities/:entityName">
                            <Route index element={<EntityProfile />}/>
                            <Route path="works/:workName" element={<WorkDescription />}/>
                        </Route>

                        <Route path="volunteers/:volunteerName" element={<VolunteerProfile />}/>

                        <Route path="help&contact" element={<HelpAndContact />}/>
                        <Route path="aboutus" element={<AboutUs />}/>


                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
        
    );	
}

export default App;