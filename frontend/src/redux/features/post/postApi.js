import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jibo-full-backend.vercel.app/';

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    // ... rest of the code stays the same
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
