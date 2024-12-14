import React from 'react'
import commentIcon from '../../../assets/commentor.png'
import { formatWaktu } from '../../../utility/formatWaktu'
import PostAComments from './PostAComments'
import { useSelector } from 'react-redux'

const CommentCard = ({ comments }) => {
    console.log(comments)
    const user = useSelector((state) => state.auth.user);

    return (
        <div className='my-6 bg-white p-8'>
            <div>
                {
                    comments?.length > 0 ? <div>
                        <h3 className='text-lg font-medium'>All Comment</h3>
                        <div className="">
                            {
                                comments?.map((comment, index) => (
                                    <div className="mt-4" key={index} >
                                        <div className='flex items-center gap-4'>
                                            <img src={commentIcon} alt="" className='h-14' />
                                            <div className="">
                                                <p className='text-lg font-medium underline capitalize underline-offset-4 text-blue-400'>{comment?.user?.name}</p>
                                                <p className='text-[12px] italic'>{formatWaktu(comment?.createdAt)}</p>
                                            </div>
                                        </div>
                                        {/* comment details */}
                                        <div className="text-gray-600 mt-5 border p-8">
                                            <p className='md:w-4/5'>{comment?.comment}</p>
                                        </div>
                                    </div>
                                )
                                )
                            }
                        </div>
                    </div> : <div className='text-lg font-medium'>No Comment Found</div>
                }
            </div>
            {/* commment input */}
            <PostAComments />
        </div>
    )
}

export default CommentCard