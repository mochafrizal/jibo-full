import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; // Base URL disesuaikan dengan lingkungan

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL, // Menggunakan variabel BASE_URL
        credentials: 'include', // Untuk cookie lintas asal
    }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        fetchGetAllPosts: builder.query({
            query: () => '/posts',
            providesTags: ['Posts'],
        }),
        fetchGetPostById: builder.query({
            query: (id) => `/posts/${id}`,
        }),
        createPost: builder.mutation({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost,
                formData: true, // Menandakan penggunaan form data (karena ada upload file)
            }),
            invalidatesTags: ['Posts'],
        }),
        updatePost: builder.mutation({
            query: ({ id, updatedPost }) => ({
                url: `/posts/${id}`,
                method: 'PUT',
                body: updatedPost,
                formData: true, // Menandakan penggunaan form data (karena ada upload file)
            }),
            invalidatesTags: ['Posts'],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts'],
        }),
    }),
});

export const {
    useFetchGetAllPostsQuery,
    useFetchGetPostByIdQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postApi;
