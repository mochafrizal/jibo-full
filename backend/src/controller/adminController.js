import Admin from "../model/admin.js";

export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find()
        return res.status(200).json({ admins })
    } catch (error) {
        // throw error to errorHandler
        next(error)
    }
}

export const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin tidak ditemukan' });
        } else {
            return res.status(200).json({ admin })
        }
    } catch (error) {
        next(error)
    }
}

export const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "inputan harus lengkap"
        })
    }
    try {
        const newAdmin = new Admin({ name, email, password })
        const addAdmin = await newAdmin.save()
        return res.status(200).json(addAdmin)
    } catch (error) {
        return res.status(400).json({
            error: "Terjadi kesalahan saat input data",
            detail: error.message
        })
    }
}

export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const updAdmin = await Admin.findOneAndUpdate(
            { _id: id },
            { name, email, password },
            { new: true }
        );
        return res.status(200).json(updAdmin)
    } catch (error) {
        next(error)
    }
}

export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const delAdmin = await Admin.findByIdAndDelete({ _id: id })
        return res.status(200).json({ message: "berhasil menghapus data", delAdmin })
    } catch (error) {
        next(error)
    }
}