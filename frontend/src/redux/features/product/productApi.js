import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; // URL backend Anda

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        // Mendapatkan semua produk
        fetchGetAllProducts: builder.query({
            query: () => '/product', // Sesuaikan endpoint dengan backend Anda
        }),
        // Mendapatkan detail produk
        fetchGetProduct: builder.query({
            query: (id) => `/product/${id}`,
        }),
        // Menambahkan produk baru
        createProduct: builder.mutation({
            query: (formData) => ({
                url: '/product',
                method: 'POST',
                body: formData,
            }),
        }),
        // Mengupdate produk
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/product/${id}`,
                method: 'PUT',
                body: formData,
            }),
        }),
        // Menghapus produk
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useFetchGetAllProductsQuery,
    useFetchGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;

export default productApi;
