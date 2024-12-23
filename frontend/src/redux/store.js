import { configureStore } from '@reduxjs/toolkit';
import baseApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import { postApi } from './features/post/postApi';

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware, postApi.middleware),
});

export default store;
