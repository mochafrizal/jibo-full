import React from 'react'
import { use } from 'react';
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    console.log("State di PrivateRouter:", { user, token });
    console.log("user yg masuk", user);
    // const token = document.cookie;
    const location = useLocation();

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRouter