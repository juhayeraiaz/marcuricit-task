import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
    return (
        <>
            <div className="scroll-smooth">
                <ToastContainer />
                <Outlet />
            </div>
        </>
    );
};

export default RootLayout;
