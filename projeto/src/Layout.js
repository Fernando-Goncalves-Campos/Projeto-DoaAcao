import React, { memo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";
import "./Layout.css";

function Layout() {
    let location = useLocation();
    return (
        <div>
            {location.pathname !== "/" ? <NavBar /> : null}
        
            <div id={location.pathname !== "/" ? "contentNav" : "contentWelcome"}>
                <Outlet/>
            </div>

            <Footer />
        </div>
    );
}


export default memo(Layout);