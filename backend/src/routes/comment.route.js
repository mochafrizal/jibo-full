const express = require('express');
const {
    createComment,
    getAllComments
} = require('../controllers/commentController');

const router = express.Router();

router.post('/post-comment', createComment);
router.get('/total-comments', getAllComments);

module.exports = router;