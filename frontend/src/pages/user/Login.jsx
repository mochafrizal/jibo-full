/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from 'react';
import { useLoginMutation } from '../../redux/features/auth/authApi'; // Gunakan endpoint login baru
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setAdmin } from '../../redux/features/auth/authSlice'; // Tambahkan setAdmin untuk admin

const Login = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const emailRef = useRef(null);

    const [login, { isLoading: loginLoading }] = useLoginMutation(); // Endpoint login baru

    const navigate = useNavigate();

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     const data = {
    //         email,
    //         password,
    //     };

    //     try {
    //         const response = await login(data).unwrap(); // Gunakan endpoint login baru
    //         console.log("AKUN", response);

    //         // Cek apakah yang login adalah admin atau user
    //         const { token, admin, user } = response;

    //         if (admin) {
    //             dispatch(setAdmin({ admin })); // Set state untuk admin
    //         } else if (user) {
    //             dispatch(setUser({ user })); // Set state untuk user
    //         }

    //         alert('Login successful');
    //         navigate('/dashboard'); // Arahkan ke halaman utama setelah login
    //     } catch (err) {
    //         console.error(err);
    //         setMessage("Invalid email or password. Please try again.");
    //     }
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { email, password };

        try {
            const response = await login(data).unwrap();
            console.log("Login response:", response);

            const { token, admin, user } = response;

            if (admin) {
                dispatch(setAuth({ user: admin, token })); // Jika admin login
            } else if (user) {
                dispatch(setAuth({ user, token })); // Jika user login
            }

            alert("Login successful");
            navigate("/dashboard"); // Arahkan ke dashboard
        } catch (error) {
            console.error("Login failed:", error);
            setMessage("Invalid email or password. Please try again.");
        }
    };

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <div className="max-w-sm bg-white mx-auto p-8 mt-36">
            <h2 className="text-2xl font-semibold pt-5">Please login</h2>
            <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
                <input
                    type="text"
                    ref={emailRef}
                    className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />

                <input
                    type="password"
                    className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                {message && <p className="text-red-500">{message}</p> /* Display error message */}
                <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
                >
                    {loginLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p className="my-5 text-center">
                Don't have an account?{' '}
                <Link to="/register" className="text-red-700 italic">
                    Register
                </Link>{' '}
                here.
            </p>
        </div>
    );
};

export default Login;
