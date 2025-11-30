import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginError from './LoginError';

const ProtectedRoute = ({ element }) => {
    const login = useSelector((state) => state.ui.login);

    if (!login) {
        return <LoginError />;
    }

    return element;
};

export default ProtectedRoute;
