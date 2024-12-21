import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import { usePostBlogMutation } from '../../../redux/features/blogs/blogsApi';

const AddPost = () => {
    const editorRef = useRef(null);
    const [title, setTitle] = useState('')
    const [coverImg, setCoverImg] = useState('')
    const [category, setCategory] = useState('')
    const [metaDescription, setMetaDescription] = useState('')
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState('')

    const [postBlog, { isLoading }] = usePostBlogMutation();
    const { user } = useSelector((state) => state.auth);


    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                editorRef.current = editor
            },
            autofocus: true,
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: true,
                },
                list: {
                    class: List,
                    inlineToolbar: true,

                }
            }
        })
        return () => {
            editor.destroy();
            editorRef.current = null
        }
    }, [])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const content = await editorRef.current.save()
            const newPost = {
                title,
                coverImg,
                content,
                category,
                description: metaDescription,
                author: user?._id,
                rating,
            }
            const response = await postBlog(newPost).unwrap();
            console.log(response)
            alert('Post posted successfully');
            navigate('/');
        } catch (error) {
            console.log("failed to submit post", error)
            setMessage('Failed to submit post, please try again')
        }
    }

    return (
        <div className='bg-white md:p-8 p-2'>
            <h2 className="text-2xl font-semibold">Create A New Blog Post</h2>
            <form
                onSubmit={handleSubmit}
                className='space-x-5 pt-8'>
                <div className="space-y-4">
                    <label className='font-semibold text-xl'>Blog Title:</label>
                    <input type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full bg-bgprimary inlane-block focus:outline-none px-5 py-3'
                        placeholder='type here ...' required />
                </div>
                {/* blog details */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    {/* left side */}
                    <div className="md:w-2/3 w-full">
                        <p className="font-semibold text-xl mb-5">Content section</p>
                        <p className='text-xs italic'>write your post here</p>
                        <div id="editorjs"></div>
                    </div>
                    {/* right side */}
                    <div className="md:w-1/3 w-full border p-5">
                        <p className="">Choose Blog Format</p>
                        {/* images */}
                        <div className="space-y-4">
                            <label className='font-semibold'>Blog Cover:</label>
                            <input
                                type="text"
                                value={coverImg}
                                onChange={(e) => setCoverImg(e.target.value)}
                                className='w-full bg-bgprimary inlane-block focus:outline-none px-5 py-3'
                                placeholder='https://unsplash.com/image/cover-photo-of-blog1.png...'
                                required />
                        </div>
                        {/* category */}
                        <div className="space-y-4">
                            <label className='font-semibold'>Category :</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full bg-bgprimary inlane-block focus:outline-none px-5 py-3'
                                placeholder="Rooftop/Travel/Nature"
                                required
                            />
                        </div>
                        {/* meta description */}
                        <div className="space-y-4">
                            <label className='font-semibold'>Meta Description:</label>
                            <textarea
                                cols={4}
                                rows={4}
                                type="text"
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                className='w-full bg-bgprimary inlane-block focus:outline-none px-5 py-3'
                                placeholder="write a description here. . ."
                                required
                            />
                        </div>
                        {/* rating */}
                        <div className="space-y-4">
                            <label className='font-semibold'>Rating :</label>
                            <input
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className='w-full bg-bgprimary inlane-block focus:outline-none px-5 py-3'
                                placeholder=""
                                required
                            />
                        </div>
                        {/* author */}
                        <div className="space-y-4">
                            <label className='font-semibold'>Author :</label>
                            <input
                                type="string"
                                value={user.username}
                                onChange={(e) => setRating(e.target.value)}
                                className='w-full bg-bgprimary inlane-block focus:outline-none px-5 py-3'
                                placeholder={`{user.username} {not editable}`}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                {
                    message && <p className='text-red-500'>{message}</p>
                }
                <button type="submit"
                    disabled={isLoading}
                    className='w-full mt-5 bg-primary hover:bg-indigo-600 text-white font-medium py-3 rounded-xl'
                >Add new Blog
                </button>
            </form>
        </div>
    )
}

export default AddPost


