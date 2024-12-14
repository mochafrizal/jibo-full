import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiMenu4Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import avatarImg from '../assets/commentor.png';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineAddchart } from "react-icons/md";
import logoImg from "../../public/jibo-logo.png"

const navLists = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Contact Us', path: '/contact-us' },
];

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleDesktopMenu = () => setIsDesktopMenuOpen(!isDesktopMenuOpen);

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <header className="bg-primary py-4 shadow-md mb-1">
            <nav className="container mx-auto px-5 flex items-center justify-start">
                {/* Logo */}
                <Link to="/" className="w-36 md:w-44 ">
                    <img src={logoImg} alt="Logo" className="h-10" />
                </Link>

                {/* Authentication and Dashboard Buttons */}
                <div className="hidden xl:flex md:flex items-center md:mr-8">
                    {!user && (
                        <NavLink
                            to="/login"
                            title="Login"
                            className="hidden xl:flex justify-centerbg-red-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 items-center gap-2"
                        >
                            <HiOutlineLogin className="text-2xl" />
                        </NavLink>
                    )}
                    {user?.role === "user" && (
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 flex items-center"
                        >
                            <HiOutlineLogout className="text-xl" />

                        </button>
                    )}
                    {user?.role === "admin" && (
                        <Link to="/dashboard" title="Dashboard">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 flex items-center gap-2">
                                <MdOutlineAddchart className="text-xl" />

                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={toggleMobileMenu} className="xl:hidden text-white text-xl sm:text-3xl cursor-pointer z-50">
                    {isMobileMenuOpen ? <IoClose /> : <RiMenu4Fill />}
                </button>

                {/* Desktop Menu Toggle */}
                <button onClick={toggleDesktopMenu} className="hidden xl:block text-white text-xl font-bold sm:text-3xl cursor-pointer">
                    {isDesktopMenuOpen ? <IoClose /> : <RiMenu4Fill />}
                </button>

                {/* Desktop Menu */}
                <div className={`hidden xl:block bg-black absolute duration-500 ${isDesktopMenuOpen ? "top-0" : "-top-full"} left-[30%] shadow-md rounded-md`}>
                    <div className="flex items-center justify-center h-full gap-8 p-4 space-x-20">
                        {navLists.map((list, index) => (
                            <NavLink
                                key={index}
                                to={list.path}
                                className="px-4 py-2 text-gray-100 hover:bg-gray-600  transition rounded-mdcd "
                            >
                                {list.name}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`xl:hidden bg-white absolute top-16 left-0 h-screen w-64 transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:w-1/2`}>
                    <ul className="flex flex-col gap-1">
                        {navLists.map((list, index) => (
                            <li key={index}>
                                <NavLink
                                    to={list.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => isActive ? "block px-4 py-2 text-indigo-100 font-bold bg-gray-100" : "block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"}
                                >
                                    {list.name}
                                </NavLink>
                            </li>
                        ))}

                        {user?.role === "user" && (
                            <li className="flex items-center gap-3 px-4 py-2 border-b">
                                <img src={avatarImg} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-indigo-600" />
                                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                                    Logout
                                </button>
                            </li>
                        )}

                        {!user && (
                            <li className="border-b">
                                <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-indigo-600 font-bold hover:bg-gray-100 transition">
                                    Login
                                </NavLink>
                            </li>
                        )}

                        {user?.role === "admin" && (
                            <li className="flex items-center gap-3 px-4 py-2 border-b">
                                <img src={avatarImg} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-indigo-600" />
                                <Link to="/dashboard">
                                    <button onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                                        Dashboard
                                    </button>
                                </Link>
                                {/* <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                                    Logout
                                </button> */}
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar