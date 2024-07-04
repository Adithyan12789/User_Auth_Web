import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice.js';
import { apiSlice } from './Slices/apiSlice.js';
import adminAuthSlice from './Slices/adminAuthSlice.js';

const store = configureStore ({
    reducer: {
        auth: authReducer,
        adminAuth: adminAuthSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;