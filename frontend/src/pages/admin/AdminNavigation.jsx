import React from 'react'
import AdminImg from "../../assets/admin.png";
import { NavLink } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';

const AdminNavigation = () => {
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutMutation();

    const handleLogout = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token tidak ditemukan di localStorage");
            return;
        }

        try {
            await logoutUser().unwrap();  // Memanggil API logout
            localStorage.removeItem("token");  // Menghapus token dari localStorage
            localStorage.removeItem("auth");  // Menghapus data autentikasi lain jika ada
            dispatch(logout());  // Menghapus state autentikasi dari Redux

            // Redirect atau logika lain setelah logout
        } catch (error) {
            console.error("Logout gagal:", error);
        }
    };
    return (
        <div className='space-y-5 bg-white p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between'>
            <div className="">
                {/* header part */}
                <div className="mb-5">
                    <img src={AdminImg} alt="" className='size-14' />
                    <p className='font-semibold'>Admin</p>
                </div>
                <hr />
                <ul className='space-y-5 pt-5'>
                    <li>
                        <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}> Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/post-manage" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>Manage post Items</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/product-manage" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>Manage Product Items</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/users" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>Users</NavLink>
                    </li>
                </ul>
            </div>
            <div className="mb-3">
                <hr className='mb-3' />
                <button
                    onClick={handleLogout}
                    className='text-white bg-red-600 font-medium px-5 py-1 rounded-md'>Logout</button>
            </div>
        </div>
    )
}

export default AdminNavigation