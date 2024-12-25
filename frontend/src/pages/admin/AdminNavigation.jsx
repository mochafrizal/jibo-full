import React from 'react'
import AdminImg from "../../assets/admin.png";
import { NavLink } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';

const AdminNavigation = () => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const authData = JSON.parse(localStorage.getItem("auth"));

            if (!authData?.token) {
                console.error("Token tidak ditemukan");
                return;
            }

            // Kirim permintaan logout dengan token di header Authorization
            await logoutUser({
                token: authData.token, // jika API meminta token sebagai parameter body, perhatikan dokumentasi API
            }).unwrap();

            // Jika logout berhasil, hapus data autentikasi
            localStorage.removeItem("auth");
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dispatch(logout());

            // Redirect ke halaman login
            window.location.href = '/login';
        } catch (error) {
            // Tampilkan pesan kesalahan
            console.error("Logout gagal:", error?.data?.details || error?.message || "Kesalahan tidak diketahui");
        }
    };



    return (
        <div className='space-y-5 bg-white p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between'>
            <div className="">

                <div className="mb-5">
                    <img src={AdminImg} alt="" className='size-14' />
                    <p className='font-semibold'>Admin</p>
                </div>
                <hr />
                <ul className='space-y-5 pt-5'>
                    <li>
                        <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}> Dashboard</NavLink>
                    </li>
                    <hr className='mb-3' />
                    <li>
                        <NavLink to="/dashboard/post-manage" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>Manage post Items</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/product-manage" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>Manage Product Items</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-user" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>manage Users & Admins</NavLink>
                    </li>
                </ul>
            </div>
            <div className="mb-3">
                <hr className='mb-3 bg-red-700' />
                <button
                    onClick={handleLogout}
                    className='text-white bg-red-600 font-medium px-5 py-1 rounded-md'>Logout</button>
            </div>
        </div>
    )
}

export default AdminNavigation