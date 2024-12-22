import { createSlice } from "@reduxjs/toolkit";

const isTokenPresentInCookies = () => {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    return !!token;
};
// Fungsi untuk menyimpan token di cookie
const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; SameSite=Strict`;
};

// Fungsi untuk mendapatkan token dari cookie
const getCookie = (name) => {
    const cookieString = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${name}=`));
    return cookieString ? cookieString.split('=')[1] : null;
};

// Fungsi untuk memuat data dari localStorage dan validasi token
const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("auth");
        if (!serializedState) return { user: null, admin: null };
        return JSON.parse(serializedState);
    } catch {
        return { user: null, admin: null };
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
            localStorage.setItem("auth", JSON.stringify(state));
        },
        setAdmin(state, action) {
            state.admin = action.payload.admin;
            state.user = null;
            localStorage.setItem("auth", JSON.stringify(state));
        },
        logout(state) {
            state.user = null;
            state.admin = null;
            localStorage.removeItem("auth");
        },
    },
});

export const { setUser, setAdmin, logout } = authSlice.actions;
export default authSlice.reducer;
