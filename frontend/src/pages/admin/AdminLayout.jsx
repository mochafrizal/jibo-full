import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminNavigation from './AdminNavigation';

const AdminLayout = () => {
    const { admin } = useSelector((state) => state.auth);

    // Cek apakah pengguna adalah admin
    if (!admin) {
        return <Navigate to="/login" replace />;
    }


    return (
        <div className="container mx-auto flex flex-row md:flex-row gap-4 items-start justify-start">
            <header className="lg:w-1/5 sm:w-2/5 w-full">
                <AdminNavigation />
            </header>
            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
