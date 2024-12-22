// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCreateAdminMutation } from "../../redux/features/auth/authApi";

// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [message, setMessage] = useState("");  // State untuk menampilkan pesan error atau sukses
//     const [registerAdmin, { isLoading }] = useCreateAdminMutation();  // Menggunakan hook dari RTK Query
//     const nameRef = useRef(null);  // Ref untuk fokus pada input name pertama kali
//     const navigate = useNavigate();  // Untuk melakukan navigasi ke halaman lain

//     const validateInputs = () => {
//         // Validasi nama
//         if (!name.trim()) {
//             setMessage("Name field is required.");
//             return false;
//         }
//         if (typeof name !== 'string') {
//             setMessage("Name field must be a string.");
//             return false;
//         }

//         // Validasi email
//         if (!email.trim()) {
//             setMessage("Email field is required.");
//             return false;
//         }
//         if (typeof email !== 'string') {
//             setMessage("Email field must be a string.");
//             return false;
//         }
//         const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         if (!emailPattern.test(email)) {
//             setMessage("Provide valid email.");
//             return false;
//         }

//         // Validasi password
//         if (!password.trim()) {
//             setMessage("Password field is required.");
//             return false;
//         }
//         if (password.length < 5) {
//             setMessage("Password should be at least 5 characters.");
//             return false;
//         }

//         // Jika semua validasi lolos
//         setMessage("");  // Reset pesan error
//         return true;
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();  // Menghentikan aksi default form

//         // Validasi input terlebih dahulu
//         if (!validateInputs()) {
//             return;  // Tidak melanjutkan jika validasi gagal
//         }

//         const data = { name, email, password };

//         try {
//             // Melakukan mutasi untuk mendaftarkan admin
//             const response = await registerAdmin(data).unwrap();

//             // Memeriksa apakah ada properti 'message' dalam respons
//             if (response && response.message) {
//                 alert(response.message);  // Menampilkan alert sukses
//                 navigate("/login");  // Navigasi ke halaman login setelah sukses
//             }
//         } catch (error) {
//             // Menangani kesalahan saat mendaftar
//             console.error("Gagal mendaftarkan admin:", error);

//             // Menampilkan pesan error berdasarkan jenis kesalahan yang terjadi
//             if (error?.data?.error) {
//                 setMessage(error.data.error);  // Menampilkan pesan error dari backend
//             } else if (error?.message) {
//                 setMessage(error.message);  // Menampilkan pesan error umum
//             } else {
//                 setMessage("Terjadi kesalahan. Coba lagi.");  // Pesan error default
//             }
//         }
//     };

//     // Fokus pada input name saat pertama kali komponen dimuat
//     useEffect(() => {
//         nameRef.current.focus();
//     }, []);

//     return (
//         <div className="max-w-sm bg-white mx-auto p-8 mt-36">
//             <h2 className="text-2xl font-semibold pt-1 mb-5">Register Admin</h2>
//             <form className="space-y-5" onSubmit={handleRegister}>
//                 {/* Input untuk nama admin */}
//                 <input
//                     type="text"
//                     ref={nameRef}
//                     className="w-full bg-gray-200 focus:outline-none px-5 py-3"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}  // Menangani perubahan input
//                     placeholder="Name"
//                     required
//                 />
//                 {/* Input untuk email admin */}
//                 <input
//                     type="email"
//                     className="w-full bg-gray-200 focus:outline-none px-5 py-3"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}  // Menangani perubahan input
//                     placeholder="Email"
//                     required
//                 />
//                 {/* Input untuk password admin */}
//                 <input
//                     type="password"
//                     className="w-full bg-gray-200 focus:outline-none px-5 py-3"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}  // Menangani perubahan input
//                     placeholder="Password"
//                     required
//                 />
//                 {/* Menampilkan pesan kesalahan jika ada */}
//                 {message && <p className="text-red-500">{message}</p>}
//                 {/* Tombol untuk mendaftar */}
//                 <button
//                     type="submit"
//                     disabled={isLoading}  // Menonaktifkan tombol saat sedang loading
//                     className="w-full bg-blue-600 text-white py-3 rounded"
//                 >
//                     {isLoading ? "Registering..." : "Register"}  {/* Menampilkan status tombol */}
//                 </button>
//             </form>
//             <p className="mt-5 text-center">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-blue-500">
//                     Login
//                 </Link>
//             </p>
//         </div>
//     );
// };

// export default Register;

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
