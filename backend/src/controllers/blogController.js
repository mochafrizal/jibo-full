const express = require('express');
const Blog = require('../model/blog.model');
const Comment = require('../model/comment.model');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

// create a blog post
exports.createBlog = verifyToken, isAdmin, async (req, res) => {
    try {
        // console.log("Blog data from api :", req.body)
        const newPost = new Blog({ ...req.body, author: req.userId }); // todo : use author : req.userId, when you have token veriyfy
        await newPost.save();
        res.status(201).send({
            message: "post created successfully",
            post: newPost
        });
    } catch (error) {
        console.log("error creating post", error);
        res.status(500).send({ message: "error creating post" });
    }
};

// get all blogs
exports.getAllBlog = async (req, res) => {
    try {

        const { search, category, location } = req.query;
        console.log(search);

        let query = {};
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                ],
            };
        }

        if (category) {
            query = {
                ...query,
                category
            }
        }

        if (location) {
            query = {
                ...query,
                location
            }
        }

        const post = await Blog.find(query).populate('author', 'email').sort({ createdAt: -1 });
        res.status(200).send(post)

    } catch (error) {
        console.log("error creating posts", error);
        res.status(500).send({ message: "error creating posts" });
    }
}

// get single blog
exports.getSingleBlog = async (req, res) => {
    try {
        // console.log(req.params.id);
        const postId = req.params.id
        const post = await Blog.findById(postId);
        if (!post) {
            return res.status(404).send({ message: "post not found" });
        }
        // gabungan blog dan comments
        const comments = await Comment.find({ postId: postId })
            .populate('user', 'username email');;
        //TODO: WITH ALSO FETCH THE COMMENTS RELATED TO THE POST 
        res.status(200).send({
            post, comments
        });


    } catch (error) {
        console.log("error fetching singel post", error);
        res.status(500).send({ message: "error fetching singel post" });
    }
};
exports.updateBlog = verifyToken, isAdmin, async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Blog.findByIdAndUpdate(
            postId,
            { ...req.body },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send({
            message: "Post updated successfully",
            post: updatedPost,
        });
    } catch (error) {
        console.error("Error updating post", error);
        res.status(500).send({ message: "Error updating post" });
    }
};

// delate a blog post
exports.deleteBlog = verifyToken, isAdmin, async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Blog.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).send({ message: "post not found" });
        }
        // delete all comments related to the post
        await Comment.deleteMany({ postId: postId });
        res.status(200).send({
            message: "post deleted successfully ",
            post
        });

    } catch (error) {
        console.log("error delete post", error);
        res.status(500).send({ message: "error delete post" });
    }

};

// related post
exports.relatedPost = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ message: "post id required" });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).send({ message: "Blog not found" });
        }

        // Membuat regex berdasarkan judul blog
        const titleRegex = new RegExp(blog.title.split(" ").join("|"), "i");

        const relatedQuery = {
            _id: { $ne: id },  // exclude the current blog by id
            title: { $regex: titleRegex }
        };

        const relatedPost = await Blog.find(relatedQuery);
        res.status(200).send(relatedPost);

    } catch (error) {
        console.log("Error fetching related post:", error);
        res.status(500).send({ message: "Error fetching related post" });
    }
};



