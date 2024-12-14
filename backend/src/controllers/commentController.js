const express = require('express');
const Comment = require('../model/comment.model')

const router = express.Router();

// create a comment
exports.createComment = async (req, res) => {
    try {
        console.log(req.body)
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(200).send({
            message: "comment created successfully",
            Comment: newComment
        })
    } catch (error) {
        console.error("error will posting new comment", error);
        res.status(500).send({ message: "error while posting new comment" });
    }
}

// get all comments
exports.getAllComments = async (req, res) => {
    try {
        const totalComment = await Comment.countDocuments({});
        res.status(200).send({
            message: "total comments count",
            totalComment
        })
    } catch (error) {
        console.error("error will posting getting commad count", error);
        res.status(500).send({ message: "error while posting getting commad count" });
    }
}