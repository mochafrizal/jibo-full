import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from '../../../redux/features/blogs/blogsApi';

const UpdatePost = () => {
    const { id } = useParams();
    const editorRef = useRef(null);
    const [title, setTitle] = useState('')
    const [coverImg, setCoverImg] = useState('')
    const [category, setCategory] = useState('')
    const [metaDescription, setMetaDescription] = useState('')
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState('')

    const [updateBlog] = useUpdateBlogMutation();
    const { data: blog = {}, error, isLoading, refetch } = useFetchBlogByIdQuery(id);
    const { user } = useSelector((state) => state.auth);


    useEffect(() => {
        if (blog.post && blog.post.content) { // Pastikan data sudah tersedia
            const editor = new EditorJS({
                holder: "editorjs", // Elemen target
                onReady: () => {
                    editorRef.current = editor; // Simpan referensi instance EditorJS
                },
                autofocus: true, // Fokus otomatis saat inisialisasi
                tools: {
                    header: { class: Header, inlineToolbar: true }, // Alat Header
                    list: { class: List, inlineToolbar: true }, // Alat List
                },
                data: blog.post.content, // Data awal editor
            });

            return () => {
                editor.destroy(); // Hapus editor saat komponen unmount
                editorRef.current = null;
            };
        }
    }, [blog.post]);


    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const content = await editorRef.current.save()
    //         const updatedPost = {
    //             title: title || blog?.post.title,
    //             coverImg: coverImg || blog.post.coverImg,
    //             content,
    //             category,
    //             description: metaDescription || blog?.post.description,
    //             author: user?._id,
    //             rating: rating || blog.post.rating
    //         }
    //         // console.log(updatedPost)
    //         const response = await updateBlog({ id, ...updatedPost }).unwrap();
    //         console.log(response)
    //         alert('blog updeted successfully');
    //         refetch()
    //         navigate('/dashboard');

    //     } catch (error) {
    //         console.log("failed to submit post", error)
    //         setMessage('Failed to update post, please try again')
    //     }
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const content = await editorRef.current.save(); // Simpan konten dari EditorJS
            const updatedPost = {
                title: title || blog?.post?.title,
                coverImg: coverImg || blog?.post?.coverImg,
                content,
                category: category || blog?.post?.category,
                description: metaDescription || blog?.post?.description,
                author: user?._id,
                rating: rating || blog?.post?.rating,
            };

            // Kirim request ke server dengan id
            const response = await updateBlog({ id, updatedPost }).unwrap();
            alert("Blog updated successfully");
            refetch();
            navigate("/dashboard");
        } catch (error) {
            console.error("Failed to submit post", error);
            setMessage("Failed to update post, please try again");
        }
    };
    return (
        <div className='bg-white md:p-8 p-2'>
            <h2 className="text-2xl font-semibold">Update Post</h2>
            <form
                onSubmit={handleSubmit}
                className='space-x-5 pt-8'>
                <div className="space-y-4">
                    <label className='font-semibold text-xl'>Blog Title:</label>
                    <input type="text"
                        defaultValue={blog?.post?.title}
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
                        <p className=" font-bold text-xl mb-6">Choose Blog Format :</p>

                        {/* images */}
                        <div className="space-y-4">
                            <label className='font-semibold mb-5 '>Blog Cover:</label>
                            <input
                                type="text"
                                defaultValue={blog?.post?.coverImg}
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
                                defaultValue={blog?.post?.category}
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
                                defaultValue={blog?.post?.description}
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
                                defaultValue={blog?.post?.rating}
                                onChange={(e) => setRating(e.target.value)}
                                className='w-full bg-bgprimary inlane-block focus:outline-none px-5 py-3'
                                required
                            />
                        </div>
                        {/* author */}
                        <div className="space-y-4">
                            <label className='font-semibold'>Author :</label>
                            <input
                                type="string"
                                value={user.username}
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
                >Update Blog
                </button>
            </form>
        </div>
    )
}

export default UpdatePost

// import React, { useRef, useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import EditorJS from "@editorjs/editorjs";
// import List from "@editorjs/list";
// import Header from "@editorjs/header";
// import { useFetchBlogByIdQuery, useUpdateBlogMutation } from "../../../redux/features/blogs/blogsApi";

// const UpdatePost = () => {
//     const { id } = useParams(); // Mengambil parameter ID dari URL
//     const editorRef = useRef(null);
//     const [title, setTitle] = useState("");
//     const [coverImg, setCoverImg] = useState("");
//     const [category, setCategory] = useState("");
//     const [metaDescription, setMetaDescription] = useState("");
//     const [rating, setRating] = useState(0);
//     const [message, setMessage] = useState("");

//     const [updateBlog] = useUpdateBlogMutation();
//     const { data: blog = {}, error, isLoading, refetch } = useFetchBlogByIdQuery(id); // Ambil blog berdasarkan ID
//     const { user } = useSelector((state) => state.auth);

//     useEffect(() => {
//         if (blog.post) {
//             const editor = new EditorJS({
//                 holder: "editorjs",
//                 onReady: () => {
//                     editorRef.current = editor;
//                 },
//                 autofocus: true,
//                 tools: {
//                     header: {
//                         class: Header,
//                         inlineToolbar: true,
//                     },
//                     list: {
//                         class: List,
//                         inlineToolbar: true,
//                     },
//                 },
//                 data: blog.post.content || { blocks: [] },
//             });

//             return () => {
//                 editor.destroy();
//                 editorRef.current = null;
//             };
//         }
//     }, [blog]);

//     const navigate = useNavigate();

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const content = await editorRef.current.save(); // Simpan konten dari EditorJS
//         const updatedPost = {
//             title: title || blog?.post?.title,
//             coverImg: coverImg || blog?.post?.coverImg,
//             content,
//             category: category || blog?.post?.category,
//             description: metaDescription || blog?.post?.description,
//             author: user?._id,
//             rating: rating || blog?.post?.rating,
//         };

//         // Kirim request ke server dengan id
//         const response = await updateBlog({ id, updatedPost }).unwrap();
//         alert("Blog updated successfully");
//         refetch();
//         navigate("/dashboard");
//     } catch (error) {
//         console.error("Failed to submit post", error);
//         setMessage("Failed to update post, please try again");
//     }
// };

//     return (
//         <div className="bg-white md:p-8 p-2">
//             <h2 className="text-2xl font-semibold">Update Post</h2>
//             <form onSubmit={handleSubmit} className="space-x-5 pt-8">
//                 <div className="space-y-4">
//                     <label className="font-semibold text-xl">Blog Title:</label>
//                     <input
//                         type="text"
//                         defaultValue={blog?.post?.title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         className="w-full bg-bgprimary inline-block focus:outline-none px-5 py-3"
//                         placeholder="type here ..."
//                         required
//                     />
//                 </div>
//                 <div className="flex flex-col md:flex-row justify-between items-start gap-4">
//                     <div className="md:w-2/3 w-full">
//                         <p className="font-semibold text-xl mb-5">Content section</p>
//                         <p className="text-xs italic">write your post here</p>
//                         <div id="editorjs"></div>
//                     </div>
//                     <div className="md:w-1/3 w-full border p-5">
//                         <p className="font-bold text-xl mb-6">Blog Details:</p>
//                         <input
//                             type="text"
//                             defaultValue={blog?.post?.coverImg}
//                             onChange={(e) => setCoverImg(e.target.value)}
//                             className="w-full bg-bgprimary inline-block focus:outline-none px-5 py-3"
//                             placeholder="Cover Image URL"
//                             required
//                         />
//                         <input
//                             type="text"
//                             defaultValue={blog?.post?.category}
//                             onChange={(e) => setCategory(e.target.value)}
//                             className="w-full bg-bgprimary inline-block focus:outline-none px-5 py-3"
//                             placeholder="Category"
//                             required
//                         />
//                         <textarea
//                             cols={4}
//                             rows={4}
//                             defaultValue={blog?.post?.description}
//                             onChange={(e) => setMetaDescription(e.target.value)}
//                             className="w-full bg-bgprimary inline-block focus:outline-none px-5 py-3"
//                             placeholder="Meta Description"
//                             required
//                         />
//                         <input
//                             type="number"
//                             defaultValue={blog?.post?.rating}
//                             onChange={(e) => setRating(e.target.value)}
//                             className="w-full bg-bgprimary inline-block focus:outline-none px-5 py-3"
//                             required
//                         />
//                     </div>
//                 </div>
//                 {message && <p className="text-red-500">{message}</p>}
//                 <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full mt-5 bg-primary hover:bg-indigo-600 text-white font-medium py-3 rounded-xl"
//                 >
//                     Update Blog
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UpdatePost;
