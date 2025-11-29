
import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/layout.css";

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="layout-container">
            <Navbar onMenuClick={() => setSidebarOpen(true)} />
            <div className="main-content">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                <div className="page-content">{children}</div>
            </div>
        </div>
    );
}
