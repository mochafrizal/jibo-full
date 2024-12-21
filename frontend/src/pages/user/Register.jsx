import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateAdminMutation } from "../../redux/features/auth/authApi"; // Gunakan API base yang benar

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [registerAdmin, { isLoading }] = useCreateAdminMutation();
    const nameRef = useRef(null);
    const navigate = useNavigate();

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
        <div className="max-w-sm bg-white mx-auto p-8 mt-36">
            <h2 className="text-2xl font-semibold pt-1 mb-5">Register Admin</h2>
            <form className="space-y-5" onSubmit={handleRegister}>
                <input
                    type="text"
                    ref={nameRef}
                    className="w-full bg-gray-200 focus:outline-none px-5 py-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    className="w-full bg-gray-200 focus:outline-none px-5 py-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    className="w-full bg-gray-200 focus:outline-none px-5 py-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                {message && <p className="text-red-500">{message}</p>}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded"
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
            <p className="mt-5 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Register;
