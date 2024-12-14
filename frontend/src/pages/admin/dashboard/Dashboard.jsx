import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiUsers } from 'react-icons/fi'
import { FaBlog, FaRegComment } from 'react-icons/fa'
import { RiAdminLine } from 'react-icons/ri'
import { GoComment } from "react-icons/go";
import { useFetchBlogsQuery } from '../../../redux/features/blogs/blogsApi'
import { useGetCommentsQuery } from '../../../redux/features/comments/commentApi'
import { useGetUserQuery } from '../../../redux/features/auth/authApi'
import BlogsChart from './BlogsChart'

const Dashboard = () => {
    const [query, setQuery] = useState({ search: '', category: '', });
    const { user } = useSelector((state) => state.auth)
    const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query)
    const { data: comments = [] } = useGetCommentsQuery();
    const { data: users = {} } = useGetUserQuery();
    const adminCounts = users.users?.filter(user => user.role === 'admin').length
    const hanyauser = users.users?.filter(user => user.role === 'user').length
    console.log(hanyauser)

    return (
        <>
            {isLoading && (<h2 className='text-2xl font-bold text-center'>Loading...</h2>)}
            <div className="space-y-6">
                <div className="bg-bgprimary p-5">
                    <h1>Hi, {user?.username}</h1>
                    <p>Welcome to your dashboard</p>
                    <p>Here you can manage your posts, and other administrative tasks</p>
                </div>

                {/* card grid */}

                <div className="flex flex-col md:flex-row justify-center gap-8 pt-8">
                    <div className="bg-indigo-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
                        <FiUsers className='size-6 text-indigo-600 ' />
                        <p>{hanyauser} Users</p>
                    </div>
                    <div className="bg-red-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
                        <FaBlog className='size-6 text-red-600 ' />
                        <p>{blogs?.length} Blogs</p>
                    </div>
                    <div className="bg-lime-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
                        <RiAdminLine className='size-6 text-lime-600 ' />
                        <p>{adminCounts} Admin{adminCounts !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="bg-orange-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
                        <GoComment className='size-6 text-orange-600 ' />
                        <p >{comments?.totalComment} Comments</p>
                    </div>
                </div>

                {/* grap and chart */}
                <div className="pt-5 pb-5">
                    <BlogsChart blogs={blogs} />
                </div>
            </div>

        </>
    )
}

export default Dashboard