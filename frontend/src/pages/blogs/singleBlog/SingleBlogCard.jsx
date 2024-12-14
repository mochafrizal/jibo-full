import React from 'react';
import { formatWaktu } from '../../../utility/formatWaktu';
import EditorJSHTML from 'editorjs-html';

const editorJSHtml = EditorJSHTML()
const SingleBlogCard = ({ blog }) => {
    const { title, description, content, coverImg, category, rsting, author, createdAt } = blog || {};
    const htmlContent = editorJSHtml.parse(content).join('');

    return (
        <>
            <div className="bg-white p-8 ">
                {/* blog header */}
                <div className="">
                    <h1 className='md:text-3xl mb-4 text-2xl font-medium text-center'>{title}</h1>
                    {/* todo need to change authore */}
                    <p>{formatWaktu(createdAt)} by <span className='text-blue-300 cursor-pointer'>Admin 1</span></p>
                    <hr className='mb-4 opacity-0' />
                </div>
                <div className="">
                    <img src={coverImg} alt="cover Image" className='w-full md:h-[520px] bg-cover' />
                </div>
                {/* blog details */}
                <div className="mt-8 space-y-4">
                    <div
                        className='space-y-3 editorjsdiv'
                        dangerouslySetInnerHTML={{ __html: htmlContent }} />

                    <div className="">
                        <span className='text-lg font-medium'>Rating: </span>
                        <span>{rsting} (based on 2,370 reviews)</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleBlogCard
