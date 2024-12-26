import { logout } from '../redux/features/auth/authSlice';

export const handleLogout = async (logoutMutation, dispatch) => {
    try {
        // Ambil data auth dari localStorage
        const authData = JSON.parse(localStorage.getItem("auth"));

        // Pastikan token ada dan dalam format yang benar
        if (!authData?.admin?.token && !authData?.user?.token) {
            console.error("Token tidak ditemukan");
            // Tetap lakukan logout lokal jika token tidak ada
            localStorage.removeItem("auth");
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dispatch(logout());
            window.location.href = '/';
            return;
        }

        // Ambil token yang benar berdasarkan role
        const token = authData?.admin?.token || authData?.user?.token;

        // Panggil mutation dengan header Authorization yang benar
        await logoutMutation({
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).unwrap();

        // Hapus data autentikasi lokal
        localStorage.removeItem("auth");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        dispatch(logout());

        // Redirect ke halaman login
        window.location.href = '/login';
    } catch (error) {
        console.error("Logout gagal:", error?.data?.message || error?.message || "Kesalahan tidak diketahui");

        // Jika token malformed, tetap lakukan logout lokal
        if (error?.data?.message?.includes('malformed')) {
            localStorage.removeItem("auth");
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dispatch(logout());
            window.location.href = '/login';
        }
    }
};