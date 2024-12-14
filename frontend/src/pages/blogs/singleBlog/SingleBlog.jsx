import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchBlogByIdQuery } from '../../../redux/features/blogs/blogsApi';
import SingleBlogCard from './SingleBlogCard';
import CommentCard from '../comensts/CommentCard';
import RelatedBlogs from './RelatedBlogs';


const SingleBlog = () => {
    const { id } = useParams();
    const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id)
    // console.log(blog);
    return (
        <div className="text-primary container mt-8">
            <div className="">
                {isLoading && <h2 className='text-2xl font-bold text-center'>Loading...</h2>}
                {error && <h2 className='text-2xl font-bold text-center'>somting wrong</h2>}
                {
                    blog?.post && (
                        <div className="flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8">
                            <div className="lg:w-2/3 w-full">
                                <SingleBlogCard blog={blog.post} />
                                <CommentCard comments={blog.comments} />
                            </div>
                            <div className="bg-white lg:w-1/3 w-full">
                                <RelatedBlogs />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SingleBlog