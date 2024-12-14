const isAdmin = (req, res, next) => {
    if (req.role !== "admin") {
        return res.status(403).send({ success: false, message: "access denied, plase login as admin" });
    }
    next();
}

module.exports = isAdmin