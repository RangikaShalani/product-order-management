import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/error.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-code">404</div>
                <h1>Page Not Found</h1>
                <p>Sorry, the page you're looking for doesn't exist.</p>
                <button className="error-button" onClick={() => navigate('/')}>
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
