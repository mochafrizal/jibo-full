const express = require('express');
const {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    relatedPost
} = require('../controllers/blogController');

const router = express.Router();
router.post('/create-post', createBlog);
router.get('/', getAllBlog);
router.get('/:id', getSingleBlog);
router.put('/update-post/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.get('/related/:id', relatedPost);

module.exports = router;