import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { usePostCommentMutation } from "../../../redux/features/comments/commentApi"
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";

const PostAComments = () => {
    const { id } = useParams();
    const [comment, setComment] = useState('');
    const { user } = useSelector((state) => state.auth);
    // console.log(user)
    const navigate = useNavigate()
    const [postComment] = usePostCommentMutation();
    const { refetch } = useFetchBlogByIdQuery(id, { skip: !id });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login first');
            navigate("/login")
            return;
        }
        const newComment = {
            comment: comment,
            user: user?._id,
            postId: id
        }
        // console.log(newComment)
        try {
            const response = await postComment(newComment).unwrap();
            console.log(response)
            alert('Comment posted successfully');
            setComment('');
            refetch();
        } catch (error) {
            alert('Error posting comment');
        }
    }


    return (
        <div className='mt-8'>
            <h3 className="text-lg font-medium mb-8"> Leave A Commets</h3>
            <form onSubmit={handleSubmit}>
                <textarea name='text'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    cols='30'
                    rows='10'
                    placeholder='write your comment here. . . .'
                    className='w-full bg-bgprimary focus:outline-none p-5'
                />
                <button type='submit' className='w-full bg-primary hover:bg-indigo-600 text-white font-medium py-3 rounded-md'>Submit</button>
            </form>
        </div>
    )
}

export default PostAComments