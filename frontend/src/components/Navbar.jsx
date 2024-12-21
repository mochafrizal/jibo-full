import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiMenu4Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import avatarImg from '../assets/commentor.png';
// import { useLogoutUserMutation } from '../redux/features/auth/authApi';
// import { logout } from '../redux/features/auth/authSlice';
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineAddchart } from "react-icons/md";
import logoImg from "../../src/assets/jibo-logo.png"

const navLists = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Company', path: '/Company' },
    { name: 'Contact Us', path: '/contact-us' },
];

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
    const { user, admin } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    // const [logoutUser] = useLogoutUserMutation();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleDesktopMenu = () => setIsDesktopMenuOpen(!isDesktopMenuOpen);

    // const handleLogout = async () => {
    //     try {
    //         await logoutUser().unwrap();
    //         dispatch(logout());
    //     } catch (error) {
    //         console.error("Logout failed", error);
    //     }
    // };

    return (
        <header className="md:py-2 md:h-16 sm:h-10 m-2">
            <nav className="container mx-auto md:px-4 flex items-center sm:justify-between md:justify-start xl:space-x-16">
                {/* Logo */}
                <Link to="/" className="w-36 md:w-44 ">
                    <img src={logoImg} alt="Logo" className="h-10" />
                </Link>


                {/* Authentication and Dashboard Buttons */}
                <div className="hidden xl:flex md:flex items-center md:mr-8 gap-4">
                    {!user && !admin && (
                        <NavLink
                            to="/login"
                            title="Login"
                            className={({ isActive }) =>
                                `flex justify-center items-center gap-2 py-2 px-4 rounded-md shadow-md transition duration-200 ${isActive
                                    ? "bg-transparent text-white hover:text-slate-600"
                                    : "bg-transparent text-white hover:text-slate-600"
                                }`
                            }
                        >
                            <HiOutlineLogin className="text-3xl" /> {/* Ikon dengan ukuran yang seragam */}
                        </NavLink>
                    )}
                    {user && (
                        <button
                            // onClick={handleLogout}
                            title="Logout"
                            className="bg-transparent hover:text-red-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 flex items-center gap-2 "
                        >
                            <HiOutlineLogout className="text-3xl" /> {/* Ikon seragam */}
                        </button>
                    )}
                    {admin && (
                        <Link to="/dashboard" title="Dashboard" >
                            <button className="bg-transparent hover:ring-2 ring-slate-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 flex items-center gap-2">
                                <MdOutlineAddchart className="text-3xl" /> {/* Ikon seragam */}
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={toggleMobileMenu} className="xl:hidden text-white text-xl sm:text-3xl cursor-pointer z-50">
                    {isMobileMenuOpen ? <IoClose /> : <RiMenu4Fill />}
                </button>

                {/* Desktop Menu Toggle */}
                <div className="flex text-white justify-start items-center">
                    <button onClick={toggleDesktopMenu} className="hidden xl:block text-white text-xl font-bold sm:text-3xl cursor-pointer">
                        {isDesktopMenuOpen ? <IoClose /> : <RiMenu4Fill />}
                    </button>
                    <div className="tracking-widest font-bold md:block hidden md:ml-48 xl:ml-64 text-xl ">Abadikan Setiap Momen Kebahagian Di Jibo Ulimited</div>

                </div>

                {/* Desktop Menu */}
                <div className={`hidden xl:block bg-white absolute duration-500 ${isDesktopMenuOpen ? "top-1" : "-top-full"} left-[30%] shadow-md rounded-md`}>
                    <div className="flex items-center justify-center h-full p-4 space-x-28 font-bold">
                        {navLists.map((list, index) => (
                            <NavLink
                                key={index}
                                to={list.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "px-5 py-2 text-gray-900 hover:text-gray-300 transition" // Gaya aktif hanya untuk link
                                        : "px-5 py-2 text-red-800 hover:text-gray-300 transition"
                                }
                            >
                                {list.name}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`xl:hidden bg-white absolute top-16 left-0 h-screen w-64 transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:w-1/2 z-50 pointer-events-auto opacity-100`}
                >
                    <ul className="flex flex-col gap-3 my-4">
                        {/* Daftar Navigasi */}
                        {navLists.map((list, index) => (
                            <li key={index}>
                                <NavLink
                                    to={list.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'block px-4 py-3 text-gray-900 font-bold bg-gray-200 rounded-md'
                                            : 'block px-4 py-3 text-gray-600 hover:bg-gray-100 transition rounded-md'
                                    }
                                >
                                    {list.name}
                                </NavLink>
                            </li>
                        ))}

                        {/* Tombol Logout */}
                        {!user && !admin && (
                            <li className="flex items-center gap-3 px-4 py-3 border-b">
                                <img
                                    src={avatarImg}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full border-2 border-indigo-600"
                                />
                                <button
                                    onClick={() => {
                                        // handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 flex items-center gap-2"
                                >
                                    <HiOutlineLogout className="text-3xl" /> Logout
                                </button>
                            </li>
                        )}

                        {/* Tombol Login */}
                        {user && (
                            <li className="border-b">
                                <NavLink
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-gray-600 font-bold hover:bg-gray-100 transition rounded-md"
                                >
                                    <HiOutlineLogin className="text-3xl inline mr-2" /> Login
                                </NavLink>
                            </li>
                        )}

                        {/* Tombol Dashboard (Admin) */}
                        {admin && (
                            <li className="flex items-center gap-3 px-4 py-3 border-b">
                                <img
                                    src={avatarImg}
                                    alt="Admin Avatar"
                                    className="w-8 h-8 rounded-full border-2 border-indigo-600"
                                />
                                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 flex items-center gap-2">
                                        <MdOutlineAddchart className="text-3xl" /> Dashboard
                                    </button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar