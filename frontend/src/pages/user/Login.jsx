import React, { useState, useEffect, useRef } from "react";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setAdmin } from "../../redux/features/auth/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading: loginLoading }] = useLoginMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(""); // Reset pesan error

        try {
            const response = await login({ email, password }).unwrap();
            console.log("Login response:", response);

            const { token, admin, user } = response;

            // Update Redux state dan otomatis menyimpan ke localStorage dan cookie
            if (admin) {
                dispatch(setAdmin({
                    admin,
                    token
                }));
                navigate("/dashboard");
            } else if (user) {
                dispatch(setUser({
                    user,
                    token
                }));
                navigate("/");
            }

        } catch (error) {
            console.error("Login error:", error);

            // Tangani berbagai jenis error
            if (error.status === 401) {
                setMessage("Email atau password salah");
            } else if (error.status === 400) {
                setMessage(error.data?.error || "Data yang dimasukkan tidak valid");
            } else if (error.status === 404) {
                setMessage("User tidak ditemukan");
            } else {
                setMessage("Terjadi kesalahan. Silakan coba lagi nanti");
            }
        }
    };

    useEffect(() => {
        // Focus pada input email saat komponen dimuat
        emailRef.current?.focus();
    }, []);

    return (
        <div className="max-w-sm bg-white mx-auto p-8 mt-36 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold pt-5 text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        ref={emailRef}
                        className="w-full bg-bgPrimary focus:outline-none focus:ring-2 focus:ring-primary px-5 py-3 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email Anda"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-bgPrimary focus:outline-none focus:ring-2 focus:ring-primary px-5 py-3 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password Anda"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? "Sembunyikan" : "Tampilkan"}
                        </button>
                    </div>
                </div>

                {message && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md transition duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loginLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sedang masuk...
                        </span>
                    ) : (
                        "Masuk"
                    )}
                </button>
            </form>

            <p className="my-5 text-center text-gray-600">
                Belum punya akun?{" "}
                <Link to="/register" className="text-primary hover:text-indigo-500 font-medium">
                    Daftar disini
                </Link>
            </p>
        </div>
    );
};

export default Login;