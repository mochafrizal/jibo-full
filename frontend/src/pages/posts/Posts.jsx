import React, { useState } from 'react';
import { useFetchGetAllPostsQuery } from '../../redux/features/post/postApi';
import { Link } from 'react-router-dom';

const Posts = () => {
    const { data, error, isLoading } = useFetchGetAllPostsQuery();
    const posts = data?.posts || [];

    const getImageUrl = (image) => {
        return `http://localhost:3000/uploads/${image}`; // URL backend untuk gambar
    };

    return (
        <section
            id="post"
            className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden py-28 px-6"
        >
            {/* Decorative Borders */}
            <div className="border-x border-[#444] w-4/5 h-full absolute top-0 left-1/2 transform -translate-x-1/2 opacity-20 lg:w-1/2 xl:w-1/3 pointer-events-none"></div>
            <div className="border-l border-[#444] w-full h-full absolute top-0 transform translate-x-1/2 opacity-20 pointer-events-none"></div>

            <div className="container mx-auto">
                {/* Search Post Component */}
                <div className="mb-8">
                    {/* Add your search component here if needed */}
                </div>

                {/* Post Section Header */}
                <div className="post__top flex flex-col items-center text-center gap-3 xl:gap-5">
                    <h2 className="text-4xl font-extrabold text-white">
                        Discover New Stories & <br />
                        Ideas in Our Posts
                    </h2>
                    <h4 className="text-xl text-gray-400">Latest Posts</h4>
                </div>

                {/* Post Grid */}
                <div className="grid grid-cols-1 gap-10 mt-16 md:grid-cols-2 lg:grid-cols-3">
                    {isLoading && <h2 className="text-2xl font-bold text-center text-white">Loading...</h2>}
                    {error && (
                        <div className="text-red-500 text-center col-span-full">
                            {error?.data?.message || 'Something went wrong. Please try again later.'}
                        </div>
                    )}
                    {!isLoading && posts.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">No posts found.</div>
                    )}

                    {/* Post Items */}
                    {posts.map((post) => (
                        <div key={post._id} className="post__item relative overflow-hidden rounded-lg shadow-lg group">
                            {/* Background Image */}
                            <img
                                src={
                                    post?.image
                                        ? getImageUrl(post.image)
                                        : 'https://via.placeholder.com/300?text=No+Image'
                                }
                                alt={post?.title || 'Post Cover'}
                                onError={(e) => {
                                    console.error(`Failed to load image for ${post.title}`, e);
                                    e.target.src = 'https://via.placeholder.com/300?text=No+Image';
                                }}
                                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                            {/* Text Content */}
                            <div
                                className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 
                        translate-y-10 group-hover:translate-y-0 transition-all duration-500 ease-in-out"
                            >
                                <h2 className="text-sm text-gray-300 font-light">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </h2>
                                <Link to={`/posts/${post._id}`}>
                                    <h4 className="mt-2 text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                                        {post.title || 'Untitled Post'}
                                    </h4>
                                </Link>
                                <p className="mt-2 text-gray-300 text-sm line-clamp-3">
                                    {post?.content?.slice(0, 100) || 'No content available for this post.'}...
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default Posts;
