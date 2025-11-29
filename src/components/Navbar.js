
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from 'lucide-react';
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/layout.css";

export default function Navbar({ onMenuClick }) {
    // State to track current theme
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
        <div className="nav-bar-outer">
            <div className="nav-bar-main">

                <button className="mobile-menu-btn" onClick={onMenuClick}>
                    <MenuIcon />
                </button>
                <Link to="/" className="nav-bar-home"> Home</Link>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="website-theme-btn"
                >
                    {darkMode ? <Moon /> : <Sun />}
                </button>
            </div>
        </div>

    );
}

