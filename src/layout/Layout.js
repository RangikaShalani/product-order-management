
import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/layout.css";

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const login = useSelector((state) => state.ui.login);
    return (
        <div className="layout-container">
            <Navbar onMenuClick={() => setSidebarOpen(true)} />
            <div className="main-content">
                {login && <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />}
                <div className="page-content">{children}</div>
            </div>
        </div>
    );
}
