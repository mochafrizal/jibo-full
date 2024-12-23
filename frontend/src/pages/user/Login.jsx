// import React, { useState, useEffect, useRef } from 'react';
// import { useLoginMutation } from '../../redux/features/auth/authApi'; // Gunakan endpoint login baru
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUser, setAdmin } from '../../redux/features/auth/authSlice'; // Tambahkan setAdmin untuk admin

// // Fungsi untuk menyimpan token di cookie
// const setCookie = (name, value, days) => {
//     const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
//     document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; SameSite=Strict`;
// };

// // Fungsi untuk menyimpan token di localStorage
// const setLocalStorage = (name, value) => {
//     localStorage.setItem(name, value);
// };

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();
//     const emailRef = useRef(null);

//     const [login, { isLoading: loginLoading }] = useLoginMutation(); // Endpoint login baru

//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         const data = {
//             email,
//             password,
//         };

//         try {
//             const response = await login(data).unwrap(); // Gunakan endpoint login baru
//             console.log(response);

//             // Cek apakah yang login adalah admin atau user
//             const { token, admin, user } = response;

//             // Simpan token di cookies (contoh: berlaku selama 7 hari)
//             setCookie('token', token, 7);

//             // Simpan token di localStorage
//             setLocalStorage('token', token);

//             // Set state untuk admin atau user di Redux
//             if (admin) {
//                 dispatch(setAdmin({ admin })); // Set state untuk admin
//             } else if (user) {
//                 dispatch(setUser({ user })); // Set state untuk user
//             }

//             alert('Login successful');
//             navigate('/'); // Arahkan ke halaman utama setelah login
//         } catch (err) {
//             console.error(err);
//             setMessage("Invalid email or password. Please try again.");
//         }
//     };

//     useEffect(() => {
//         emailRef.current.focus();
//     }, []);

//     return (
//         <div className="max-w-sm bg-white mx-auto p-8 mt-36">
//             <h2 className="text-2xl font-semibold pt-5">Please login</h2>
//             <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
//                 <input
//                     type="text"
//                     ref={emailRef}
//                     className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />

//                 <input
//                     type="password"
//                     className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                 />
//                 {message && <p className="text-red-500">{message}</p> /* Display error message */}
//                 <button
//                     type="submit"
//                     disabled={loginLoading}
//                     className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
//                 >
//                     {loginLoading ? 'Logging in...' : 'Login'}
//                 </button>
//             </form>

//             <p className="my-5 text-center">
//                 Don't have an account?{' '}
//                 <Link to="/register" className="text-red-700 italic">
//                     Register
//                 </Link>{' '}
//                 here.
//             </p>
//         </div>
//     );
// };

// export default Login;


import React, { useState, useEffect, useRef } from "react";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setAdmin } from "../../redux/features/auth/authSlice";

// Fungsi untuk menyimpan token di cookie
const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; SameSite=Strict`;
};

// Fungsi untuk menyimpan token di localStorage
const setLocalStorage = (name, value) => {
    localStorage.setItem(name, value);
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Untuk toggle password visibility
    const emailRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading: loginLoading }] = useLoginMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = { email, password };

        try {
            const response = await login(credentials).unwrap();
            console.log("Login response:", response);

            const { token, admin, user } = response;

            // Simpan token di cookie dan localStorage
            setCookie("token", token, 7);
            setLocalStorage("token", token);

            // Update Redux state
            if (admin) {
                dispatch(setAdmin({ admin }));
            } else if (user) {
                dispatch(setUser({ user }));
            }

            // Arahkan pengguna ke dashboard atau halaman utama
            navigate(admin ? "/dashboard" : "/");
        } catch (error) {
            console.error("Login error:", error);

            // Tangani pesan error spesifik
            if (error.status === 401) {
                setMessage("Invalid email or password. Please try again.");
            } else {
                setMessage("Something went wrong. Please try again later.");
            }
        }
    };

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <div className="max-w-sm bg-white mx-auto p-8 mt-36">
            <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
            <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
                <input
                    type="email"
                    ref={emailRef}
                    className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-3 text-gray-500"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                {message && <p className="text-red-500">{message}</p>}
                <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
                >
                    {loginLoading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p className="my-5 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-red-700 italic">
                    Register
                </Link>{" "}
                here.
            </p>
        </div>
    );
};

export default Login;

