import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/admin", // Sesuaikan URL backend Anda
        credentials: 'include',

        endpoints: (builder) => ({
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
        }),
    }),
});

export const {
    useLoginMutation,
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
