import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const RootLayout = () => {
    return (
        <>
            <div className="scroll-smooth">
                <Navbar />
                <Outlet />
            </div>
        </>
    );
};

export default RootLayout;
