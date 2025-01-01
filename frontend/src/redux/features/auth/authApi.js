import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        // Login
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Logout
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // ambil token dari localStorage
                },
            }),
        }),

        // Admin endpoints
        getAdmins: builder.query({
            query: () => '/admin',
        }),
        getAdmin: builder.query({
            query: (id) => `/admin/${id}`,
        }),
        createAdmin: builder.mutation({
            query: (newAdmin) => ({
                url: '/admin',
                method: 'POST',
                body: newAdmin,
            }),
        }),
        updateAdmin: builder.mutation({
            query: ({ id, ...updateData }) => ({
                url: `/admin/${id}`,
                method: 'PUT',
                body: updateData,
            }),
        }),
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
        }),

        // User endpoints
        getUsers: builder.query({
            query: () => '/user',
        }),
        getUser: builder.query({
            query: (id) => `/user/${id}`,
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: '/user',
                method: 'POST',
                body: newUser,
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, ...updateData }) => ({
                url: `/user/${id}`,
                method: 'PUT',
                body: updateData,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useGetAdminsQuery,
    useGetAdminQuery,
    useCreateAdminMutation,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
    useGetUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = baseApi;

export default baseApi;
