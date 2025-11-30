import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginError.css';

const LoginError = () => {
    const navigate = useNavigate();

    return (
        <div className="login-error-container">
            <div className="login-error-content">
                <div className="error-icon">🔒</div>
                <h1>Access Restricted</h1>
                <p>Please log in first to access this page</p>
                <div className="error-message">
                    <span>You need to authenticate to view this content</span>
                </div>
                <div className="error-buttons">
                    <button className="login-btn" onClick={() => navigate('/')}>
                        Go to Login
                    </button>
                    <button className="home-btn" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginError;
