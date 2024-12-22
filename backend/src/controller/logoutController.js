import Jwt from "jsonwebtoken";
import User from "../model/user.js";
import Admin from "../model/admin.js";

export const logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header Authorization

        if (!token) {
            return res.status(400).json({
                error: "Token tidak ditemukan",
            });
        }

        try {
            // Verifikasi token dengan secret key
            const decoded = Jwt.verify(token, process.env.SECRET);

            // Hapus token dari database berdasarkan role
            if (decoded.role === "admin") {
                await Admin.updateOne({ _id: decoded.userId }, { $unset: { token: "" } });
            } else if (decoded.role === "user") {
                await User.updateOne({ _id: decoded.userId }, { $unset: { token: "" } });
            }

            return res.status(200).json({
                message: "Berhasil logout",
            });
        } catch (error) {
            // Jika token sudah kadaluarsa
            if (error.name === "TokenExpiredError") {
                return res.status(200).json({
                    message: "Berhasil logout",
                });
            }
            console.error("Error decoding JWT:", error);
            return res.status(500).json({
                error: "Terjadi kesalahan saat memverifikasi token.",
                details: error.message,
            });
        }
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            error: "Terjadi kesalahan server.",
            details: error.message,
        });
    }
};
