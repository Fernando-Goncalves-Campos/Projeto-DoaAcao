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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<WelcomePage />}/>
                    <Route path="home" element={<Home />}/>
                    
                    <Route path="login" element={<Login />}/>

                    <Route path="signup">
                        <Route index element={SignUpVolunteer}/>
                        <Route path="entity" element={SignUpEntity}/>
                    </Route>
                    
                    <Route path="entity/:entityName">
                        <Route index element={<EntityProfile />}/>
                        <Route path="workdescription/:workName" element={<WorkDescription />}/>
                    </Route>

                    <Route path="volunteer/:volunteerName" element={<VolunteerProfile />}/>

                    <Route path="help&contact" element={<HelpAndContact />}/>
                    <Route path="aboutus" element={<AboutUs />}/>


                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );	
}

const NoPage = () => {
	return <h1 id="Erro">404</h1>;
};

export default App;