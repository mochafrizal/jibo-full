import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchRelatedBlogsQuery } from '../../../redux/features/blogs/blogsApi';

const RelatedBlogs = () => {
    const { id } = useParams();
    const { data: blogs = [], error, isLoading } = useFetchRelatedBlogsQuery(id);

    console.log(blogs);

    return (
        <div>
            <h3 className='text-2xl font-medium pt-8 px-8 pb-5'>Related Blogs</h3>
            <hr />
            {isLoading ? (
                <div className="p-8">Loading...</div>
            ) : error ? (
                <div className="p-8 text-red-500">Error loading related blogs</div>
            ) : blogs.length > 0 ? (
                <div className='space-y-4 mt-5'>
                    {blogs.map((blog) => (
                        <Link
                            key={blog._id}
                            to={`/blogs/${blog._id}`}
                            className='flex flex-col sm:flex-row sm:items-center gap-4 px-2 py-4 m-2 shadow-lg rounded-lg bg-slate-100'>
                            <div className='size-14'>
                                <img
                                    src={blog?.coverImg || "https://via.placeholder.com/150"}
                                    alt="Cover"
                                    className='h-full w-full rounded-full ring-2 ring-blue-700'
                                />
                            </div>
                            <div>
                                <h4 className='font-medium text-[#1E738E]'>
                                    {blog?.title?.substring(0, 50) || "No Title Available"}
                                </h4>
                                <p>
                                    {blog?.description?.substring(0, 50) || "No Description Available"}...
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className='p-8'>No related blogs</div>
            )}
        </div>
    );
};

export default RelatedBlogs;
