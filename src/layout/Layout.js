
import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/layout.css";

export default function Layout({ children }) {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="page-content">{children}</div>
            </div>
        </div>
    );
}
