// src/components/AdminNavigation.jsx
import React from 'react'
import AdminImg from "../../assets/admin.png";
import { NavLink } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../utility/handleLogout';

const AdminNavigation = () => {
    const dispatch = useDispatch();
    const [logoutMutation] = useLogoutMutation();

    const onLogoutClick = () => {
        handleLogout(logoutMutation, dispatch);
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
                        <NavLink to="/dashboard/manage-user" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>Manage Users & Admins</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/admin-register" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>Register Admin</NavLink>
                    </li>
                </ul>
            </div>
            <div className="mb-3">
                <hr className='mb-3 bg-red-700' />
                <button
                    onClick={onLogoutClick}
                    className='text-white bg-red-600 font-medium px-5 py-1 rounded-md'>Logout</button>
            </div>
        </div>
    )
}

export default AdminNavigation