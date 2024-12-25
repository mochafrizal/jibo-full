import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import {
    useFetchGetAllPostsQuery,
    useDeletePostMutation,
    useUpdatePostMutation
} from "../../../redux/features/post/postApi";

const PostsManage = () => {
    const navigate = useNavigate();
    const { admin } = useSelector((state) => state.auth);
    const { data: postsData, isLoading: isLoadingPosts, refetch } = useFetchGetAllPostsQuery();
    const [deletePost] = useDeletePostMutation();
    const [updatePost] = useUpdatePostMutation();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        content: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const editorRef = useRef(null);

    // Fungsi untuk decode HTML entities
    const decodeHTML = (html) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = html;
        return textarea.value;
    };

    useEffect(() => {
        if (!admin) {
            navigate('/login');
        }
    }, [admin, navigate]);

    useEffect(() => {
        if (isEditModalOpen && editingPost) {
            try {
                let initialContent;
                try {
                    initialContent = JSON.parse(editingPost.content);
                } catch {
                    initialContent = {
                        blocks: [{
                            type: 'paragraph',
                            data: { text: editingPost.content?.replace(/undefined/g, '') || '' }
                        }]
                    };
                }

                const editor = new EditorJS({
                    holder: 'edit-editorjs',
                    data: initialContent,
                    tools: {
                        header: {
                            class: Header,
                            config: {
                                levels: [1, 2, 3],
                                defaultLevel: 1
                            }
                        },
                        list: {
                            class: List,
                            inlineToolbar: true
                        }
                    },
                    onReady: () => {
                        editorRef.current = editor;
                    },
                });

                return () => {
                    if (editorRef.current) {
                        editorRef.current.destroy();
                        editorRef.current = null;
                    }
                };
            } catch (error) {
                console.error('Error initializing editor:', error);
                setMessage('Error initializing editor');
            }
        }
    }, [isEditModalOpen, editingPost]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(id).unwrap();
                alert('Post deleted successfully');
                refetch();
            } catch (error) {
                console.error('Error deleting post:', error);
                setMessage('Failed to delete post');
            }
        }
    };

    const openEditModal = (post) => {
        setEditingPost(post);
        setEditForm({
            title: post.title,
            content: post.content,
            image: null
        });
        setImagePreview('');
        setIsEditModalOpen(true);
        setMessage('');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setMessage('Image size should be less than 5MB');
                return;
            }
            setEditForm(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!editorRef.current) {
            setMessage('Editor not ready, please wait');
            return;
        }

        try {
            const editorData = await editorRef.current.save();

            const plainText = editorData.blocks
                .map(block => {
                    switch (block.type) {
                        case 'paragraph':
                            return decodeHTML(block.data?.text?.replace(/undefined/g, '').trim() || '');
                        case 'header':
                            return decodeHTML(`${block.data?.text?.trim() || ''}\n`);
                        case 'list':
                            return (block.data?.items || []).map(decodeHTML).join('\n');
                        default:
                            return decodeHTML(block.data?.text?.trim() || '');
                    }
                })
                .filter(text => text.trim() !== '') // Hapus baris kosong
                .join('\n\n');

            if (plainText.trim().length < 5) {
                setMessage('Content must be at least 5 characters long');
                return;
            }

            const formData = new FormData();
            formData.append('title', editForm.title.trim());
            formData.append('content', plainText);

            if (editForm.image) {
                formData.append('image', editForm.image);
            }

            await updatePost({
                id: editingPost._id,
                updatedPost: formData
            }).unwrap();

            alert('Post updated successfully');
            setIsEditModalOpen(false);
            refetch();
        } catch (error) {
            console.error('Error updating post:', error);
            setMessage(
                error.data?.error?.[0]?.msg ||
                error.data?.error ||
                error.message ||
                'Failed to update post'
            );
        }
    };

    if (isLoadingPosts) {
        return <div className="text-center p-8">Loading posts...</div>;
    }

    return (
        <div className="bg-white p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Manage Posts</h2>
                <button
                    onClick={() => navigate('/dashboard/upload-post')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                    Add New Post
                </button>
            </div>

            {message && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-red-700">{message}</p>
                </div>
            )}

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">No</th>
                        <th className="border border-gray-300 px-4 py-2">Title</th>
                        <th className="border border-gray-300 px-4 py-2">Created At</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {postsData?.posts.map((post, index) => (
                        <tr key={post._id}>
                            <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{new Date(post.createdAt).toLocaleDateString()}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button
                                    onClick={() => openEditModal(post)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg p-6 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">Edit Post</h3>
                        {message && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                                <p className="text-red-700">{message}</p>
                            </div>
                        )}
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block font-medium mb-1">Title:</label>
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Content:</label>
                                <div
                                    id="edit-editorjs"
                                    className="border border-gray-300 rounded-lg p-4"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Image:</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-2 max-h-40 rounded"
                                    />
                                ) : editingPost?.image && (
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${editingPost.image}`}
                                        alt="Current"
                                        className="mt-2 max-h-40 rounded"
                                    />
                                )}
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                        } text-white px-4 py-2 rounded`}
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostsManage;
