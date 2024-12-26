import React, { useState, useEffect, useRef } from "react";
import { useCreateAdminMutation } from "../../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";

const AdminRegister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const nameRef = useRef(null);

    const navigate = useNavigate();
    const [registerAdmin, { isLoading }] = useCreateAdminMutation();

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = { name, email, password };

        try {
            const response = await registerAdmin(data).unwrap();
            alert("Admin berhasil didaftarkan.");
            navigate("/login");
        } catch (error) {
            console.error("Gagal mendaftarkan admin:", error);
            setMessage(error.data?.error || "Terjadi kesalahan. Coba lagi.");
        }
    };

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    return (
        <div className="max-w-sm bg-white mx-auto p-8 mt-36 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold pt-5 text-center">Register Admin</h2>
            <form onSubmit={handleRegister} className="space-y-5 max-w-sm mx-auto pt-8">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nama Lengkap
                    </label>
                    <input
                        id="name"
                        type="text"
                        ref={nameRef}
                        className="w-full bg-bgPrimary focus:outline-none focus:ring-2 focus:ring-primary px-5 py-3 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full bg-bgPrimary focus:outline-none focus:ring-2 focus:ring-primary px-5 py-3 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email"
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
                            placeholder="Masukkan password"
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
                    disabled={isLoading}
                    className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md transition duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Mendaftar...
                        </span>
                    ) : (
                        "Daftar"
                    )}
                </button>
            </form>

            <p className="my-5 text-center text-gray-600">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-primary hover:text-indigo-500 font-medium">
                    Masuk disini
                </Link>
            </p>
        </div>
    );
};

export default AdminRegister;