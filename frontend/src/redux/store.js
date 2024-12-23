import { configureStore } from '@reduxjs/toolkit';
import baseApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import { postApi } from './features/post/postApi';
import productApi from './features/product/productApi';

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware, postApi.middleware, productApi.middleware),
});

export default store;
