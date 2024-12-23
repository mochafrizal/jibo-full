import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
    const { admin } = useSelector((state) => state.auth); // Ambil admin dari Redux state
    const location = useLocation();

    if (admin) {
        return children; // Berikan akses jika admin valid
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouter;
