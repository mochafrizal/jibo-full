import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import { useCreatePostMutation } from "../../../redux/features/post/postApi";

const UploadPost = () => {
    const editorRef = useRef(null);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [postBlog] = useCreatePostMutation();
    const { admin } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Convert plain text to EditorJS blocks format
    const convertTextToBlocks = (text) => {
        const paragraphs = text.split('\n\n');
        return paragraphs.map((paragraph, index) => ({
            id: `block-${index}`,
            type: 'paragraph',
            data: {
                text: paragraph.replace(/\n/g, '<br>')
            }
        }));
    };

    useEffect(() => {
        if (!admin) {
            navigate('/login');
            return;
        }

        // Initialize Editor
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                editorRef.current = editor;
            },
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
            data: {
                time: new Date().getTime(),
                blocks: [
                    {
                        id: 'initial-block',
                        type: 'paragraph',
                        data: {
                            text: ''
                        }
                    }
                ],
                version: "2.30.7"
            },
            placeholder: 'Start writing your post...'
        });

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [admin, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrorMessage('Image size should be less than 5MB');
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            if (!title.trim()) {
                throw new Error('Title is required');
            }

            if (!editorRef.current) {
                throw new Error('Editor is not ready yet');
            }

            if (!image) {
                throw new Error('Image is required');
            }

            const editorData = await editorRef.current.save();

            // Ensure content is in the correct format
            let contentToSend;
            if (editorData.blocks.length === 0) {
                throw new Error('Content cannot be empty');
            }

            // Convert the blocks to plain text for storage
            const plainText = editorData.blocks
                .map(block => {
                    switch (block.type) {
                        case 'paragraph':
                            return block.data.text.replace(/<br>/g, '\n');
                        case 'header':
                            return `${block.data.text}\n`;
                        case 'list':
                            return block.data.items.join('\n');
                        default:
                            return block.data.text || '';
                    }
                })
                .join('\n\n');

            const formData = new FormData();
            formData.append('title', title.trim());
            formData.append('content', plainText);
            formData.append('image', image);

            await postBlog(formData).unwrap();
            alert('Post created successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating post:', error);
            setErrorMessage(
                error.data?.error?.[0]?.msg ||
                error.data?.error ||
                error.message ||
                'Failed to create post. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white md:p-8 p-2">
            <h2 className="text-2xl font-semibold mb-6">Create A New Blog Post</h2>

            {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-red-700">{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <label className="block font-semibold text-lg">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 px-4 py-2"
                        placeholder="Enter post title..."
                        required
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                        <label className="block font-semibold text-lg mb-4">Content</label>
                        <div
                            id="editorjs"
                            className="border border-gray-300 rounded-lg min-h-[400px] p-4"
                        />
                    </div>

                    <div className="md:w-1/3 space-y-6">
                        <div>
                            <label className="block font-semibold text-lg mb-2">Featured Image</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="w-full border border-gray-300 rounded-lg p-2"
                                required
                            />
                            {imagePreview && (
                                <div className="mt-4">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-w-full h-auto rounded-lg"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold text-lg mb-2">Author</label>
                            <input
                                type="text"
                                value={admin?.username || 'Anonymous'}
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2"
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${isSubmitting
                        ? 'bg-blue-400'
                        : 'bg-blue-600 hover:bg-blue-700'
                        } text-white font-medium py-3 rounded-lg transition duration-200`}
                >
                    {isSubmitting ? 'Creating Post...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default UploadPost;