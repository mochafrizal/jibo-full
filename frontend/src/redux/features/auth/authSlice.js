import { createSlice } from "@reduxjs/toolkit";

// Fungsi untuk menyimpan data di cookie
const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; SameSite=Strict`;
};

// Fungsi untuk mendapatkan data dari cookie
const getCookie = (name) => {
    const cookieString = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${name}=`));
    return cookieString ? cookieString.split('=')[1] : null;
};

// Fungsi untuk memuat data dari localStorage
const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("auth");
        if (!serializedState) return { user: null, admin: null, token: null };
        return JSON.parse(serializedState);
    } catch {
        return { user: null, admin: null, token: null };
    }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.admin = null;
            state.token = action.payload.token || null; // Simpan token jika ada
            localStorage.setItem("auth", JSON.stringify(state));
            setCookie("token", state.token, 7); // Simpan token di cookie
        },
        setAdmin(state, action) {
            state.admin = action.payload.admin;
            state.user = null;
            state.token = action.payload.token || null; // Simpan token jika ada
            localStorage.setItem("auth", JSON.stringify(state));
            setCookie("token", state.token, 7); // Simpan token di cookie
        },
        logout(state) {
            state.user = null;
            state.admin = null;
            state.token = null;
            localStorage.removeItem("auth");
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        },
    },
});

export const { setUser, setAdmin, logout } = authSlice.actions;
export default authSlice.reducer;
