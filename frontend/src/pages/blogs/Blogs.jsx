import React, { useState } from 'react';
import SearchBlog from './searchBlog';
import { useFetchBlogsQuery } from '../../redux/features/blogs/blogsApi';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState({ search: '' });

    // Fetch data using Redux Toolkit
    const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        setQuery({ search });
    };

    return (
        <section id="blog" className="bg-[#f5f5f5] relative overflow-hidden py-16">
            {/* Decorative Borders */}
            <div className="border-x border-[#444] w-4/5 h-full absolute top-0 left-1/2 transform -translate-x-1/2 opacity-20 lg:w-1/2 xl:w-1/3 pointer-events-none"></div>
            <div className="border-l border-[#444] w-full h-full absolute top-0 transform translate-x-1/2 opacity-20 pointer-events-none"></div>

            <div className="container mx-auto">
                {/* Search Blog Component */}
                <div className="mb-12">
                    <SearchBlog
                        search={search}
                        handleSearchChange={handleSearchChange}
                        handleSearch={handleSearch}
                    />
                </div>

                {/* Blog Section Header */}
                <div className="blog__top flex flex-col items-center text-center gap-3 xl:gap-5">
                    <h2 className="text-3xl font-bold">
                        Find new ideas and <br />
                        inspiration in our blog
                    </h2>
                    <h4 className="text-xl text-gray-700">Latest blog posts</h4>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 gap-x-20 gap-y-10 mt-10 lg:grid-cols-2 xl:grid-cols-3 xl:gap-12">
                    {isLoading && <h2 className="text-2xl font-bold text-center">Loading...</h2>}
                    {error && (
                        <div className="text-red-500 text-center col-span-full">
                            {error.toString()}
                        </div>
                    )}

                    {!isLoading && blogs.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">
                            No blogs found.
                        </div>
                    )}

                    {/* Blog Items */}
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="blog__item text-center space-y-5 xl:text-start z-20"
                        >
                            <h2 className="text-[#555] font-bold opacity-50">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </h2>
                            <Link to={`/blogs/${blog._id}`}>
                                <img
                                    src={blog?.coverImg || 'https://via.placeholder.com/300'}
                                    alt={blog?.title || 'Blog Cover'}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </Link>
                            <h4 className="text-black hover:text-blue-600 duration-300 cursor-pointer">
                                {blog.title || 'Untitled Blog'}
                            </h4>
                            <p className="text-gray-600">
                                {blog?.summary || 'No summary available for this blog.'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
