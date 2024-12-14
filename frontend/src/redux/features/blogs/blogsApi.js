import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        credential: 'include'
    }),
    tagTypes: ['Blogs'],
    endpoints: (builder) => (
        {
            fetchBlogs: builder.query({
                query: ({ search = '', category = '', location = '' }) =>
                    `/blogs?search=${search}&category=${category}&location=${location}`,
                providesTags: ['Blogs']
            }),

            fetchBlogById: builder.query({
                query: (id) => `/blogs/${id}`
            }),

            fetchRelatedBlogs: builder.query({
                query: (id) => `/blogs/related/${id}`
            }),

            postBlog: builder.mutation({
                query: (newBlog) => ({
                    url: `/blogs/create-post`,
                    method: 'POST',
                    body: newBlog,
                    credentials: 'include'
                }),
                invalidatesTags: ['Blogs']
            }),

            // updateBlog: builder.mutation({
            //     query: (id, ...rest) => ({
            //         url: `/blogs/update-post/${id}`,
            //         method: 'PATCH',
            //         body: rest,
            //         credentials: 'include',
            //     }),
            //     invalidatesTags: (result, post, { id }) => [{ type: 'Blogs', id }],
            // }),
            updateBlog: builder.mutation({
                query: ({ id, updatedPost }) => ({
                    url: `/blogs/update-post/${id}`, // Pastikan ID adalah string
                    method: "PATCH",
                    body: updatedPost, // Kirim body yang benar
                    credentials: "include",
                }),
                invalidatesTags: (result, post, { id }) => [{ type: "Blogs", id }],
            }),

            deleteBlog: builder.mutation({
                query: (id) => ({
                    url: `/blogs/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                }),
                invalidatesTags: (result, post, { id }) => [{ type: 'Blogs', id }],
            })
        }),
})

export const {
    useFetchBlogsQuery,
    useFetchBlogByIdQuery,
    useFetchRelatedBlogsQuery,
    usePostBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation
} = blogApi;