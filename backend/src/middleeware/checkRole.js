export const checkRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ error: "Anda tidak memiliki akses untuk melakukan ini" });
        }
        next();
    };
};