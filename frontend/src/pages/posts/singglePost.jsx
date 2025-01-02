import React from 'react';
import { useFetchGetPostByIdQuery } from '../../redux/features/post/postApi';
import { useParams } from 'react-router-dom';

const SingglePost = () => {
    const { id } = useParams();
    const { data: response, error, isLoading } = useFetchGetPostByIdQuery(id);

    // Pastikan post data ada dan valid
    const post = response?.post;

    // Fungsi untuk memvalidasi dan mendapatkan URL gambar
    const getImageUrl = (image) => {
        if (!image) return 'https://via.placeholder.com/1200x600?text=No+Image';

        try {
            return `https://jibo-full-backend.vercel.app/uploads/${image}`;
        } catch (err) {
            console.error('Error generating image URL:', err);
            return 'https://via.placeholder.com/1200x600?text=Error+Loading+Image';
        }
    };
    console.log(post)
    // Fungsi untuk memformat tanggal dengan penanganan error
    const formatDate = (dateString) => {
        try {
            if (!dateString) return 'Date not available';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid Date';
            return date.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (err) {
            console.error('Error formatting date:', err);
            return 'Date not available';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
                <div className="container mx-auto flex justify-center items-center min-h-[50vh]">
                    <div className="text-white text-xl">Loading post details...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
                <div className="container mx-auto flex justify-center items-center min-h-[50vh]">
                    <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
                        {error?.data?.message || 'Failed to load post. Please try again later.'}
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
                <div className="container mx-auto flex justify-center items-center min-h-[50vh]">
                    <div className="text-gray-400">Post not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 px-6">
            <div className="container mx-auto max-w-4xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {post.title || 'Untitled Post'}
                    </h1>
                    <p className="text-gray-400">
                        Published on {formatDate(post.createdAt)}
                    </p>
                </div>

                {/* Image Section dengan error handling */}
                <div className="relative h-[500px] rounded-xl overflow-hidden mb-8 shadow-2xl">
                    <div className="w-full h-full bg-gray-800">
                        <img
                            src={getImageUrl(post.image)}
                            alt={post.title || 'Post Cover'}
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = 'https://via.placeholder.com/1200x600?text=Error+Loading+Image';
                            }}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
                    {/* Author Info if available */}
                    {post.author && (
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                                <span className="text-xl text-white">
                                    {(post.author.name || 'A')[0].toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-white font-medium">
                                    {post.author.name || 'Anonymous'}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {post.author.role || 'Author'}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {post.content || 'No content available for this post.'}
                        </div>
                    </div>

                    {/* Tags Section */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <h4 className="text-white font-medium mb-3">Tags:</h4>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingglePost;