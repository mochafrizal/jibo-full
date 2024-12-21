import { Router } from "express";
import 
    { 
     getAllPosts,
     createPost,
     updatePost,
     getPost,
     deletePost
    } from "../controller/postController.js";
import { 
     createPostValidation,
     updatePostValidation,
     result 
    } from "../middleeware/postValidation.js";
import { verifyToken } from "../middleeware/verifficationToken.js";
import { upload } from "../middleeware/uploadPic.js";
import { checkRole } from "../middleeware/checkRole.js";

const postRouter = Router()

postRouter
    .get('/', getAllPosts)
    .post('/', verifyToken, checkRole('admin'), upload.single('image'), createPostValidation, result, createPost);
postRouter
    .put('/:id', verifyToken, checkRole('admin'), upload.single('image'), updatePostValidation, result, updatePost)
    .get('/:id', getPost)
    .delete('/:id', verifyToken, checkRole('admin'), deletePost)

export default postRouter;