
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../store/slice/uiSlice';
import MenuIcon from "@mui/icons-material/Menu";
import Swal from 'sweetalert2';
import "../styles/layout.css";

export default function Navbar({ onMenuClick }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    // Detect browser theme on first load
    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDark);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    const login = useSelector((state) => state.ui.login);

    const handleLoginLogout = () => {
        if (login) {
            // Logout action
            Swal.fire({
                title: 'Logout',
                text: 'Are you sure you want to logout?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--danger)',
                cancelButtonColor: '#999',
                confirmButtonText: 'Yes, logout',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(setLogin(false));
                    Swal.fire({
                        title: 'Logged Out',
                        text: 'You have been successfully logged out.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    navigate('/');
                }
            });
        } else {
            // Login action
            Swal.fire({
                title: 'Login Successful',
                text: 'You have been successfully logged in.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            dispatch(setLogin(true));
        }
    };
    return (
        <div className="nav-bar-outer">
            <div className="nav-bar-main">

                <button className="mobile-menu-btn" onClick={onMenuClick}>
                    <MenuIcon />
                </button>
                <Link to="/" className="nav-bar-home"> Home</Link>
                <button
                    onClick={handleLoginLogout}
                    className="login-logout-btn"
                >{login ? "Logout" : "Login"}</button>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="website-theme-btn"
                >
                    🌙

                    {/* {darkMode ? "🌙" : "☀️"} */}

                </button>
            </div>
        </div>

    );
}

