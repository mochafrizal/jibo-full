const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    deleteUser,
    updateUserRole
} = require('../controllers/authUserControllers');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUserRole);

module.exports = router;
