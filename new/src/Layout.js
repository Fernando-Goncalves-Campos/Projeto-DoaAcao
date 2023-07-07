import React, { memo } from "react";
import { Outlet, useLocation } from "react-router-dom";

import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";

import "./Layout.css";

function Layout() {
    let location = useLocation();
    return (
        <>
            {location.pathname !== "/" ? <NavBar /> : null}
        
            <div className={location.pathname !== "/" ? "contentNav" : "contentWelcome"}>
                <Outlet/>
            </div>

            <Footer />
        </>
    );
}


export default memo(Layout);