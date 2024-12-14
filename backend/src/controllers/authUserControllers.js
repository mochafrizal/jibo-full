const User = require('../model/user.model');
const generateToken = require('../middleware/generatetoken');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = new User({ email, password, username });

        await user.save();
        res.status(200).send({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.error("Registration failed", error);
        res.status(500).send({ message: "Registration failed" });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password" });
        }

        const token = await generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: true,
        });
        res.status(200).send({
            message: "User login successfully",
            token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login failed", error);
        res.status(500).send({ message: "Login failed" });
    }
};

// Logout User
exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({ message: "Logout successfully" });
    } catch (error) {
        console.error("Logout failed", error);
        res.status(500).send({ message: "Logout failed" });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "id email role");
        res.status(200).send({
            message: "Found all users",
            users
        });
    } catch (error) {
        console.error("Error fetching users", error);
        res.status(500).send({ message: "Error fetching users" });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user", error);
        res.status(500).send({ message: "Error deleting user" });
    }
};

// Update User Role
exports.updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({
            message: "User role updated successfully",
            user
        });
    } catch (error) {
        console.error("Error updating user role", error);
        res.status(500).send({ message: "Failed to update user role" });
    }
};
