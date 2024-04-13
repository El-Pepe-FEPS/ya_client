import { configureStore } from '@reduxjs/toolkit';
import csrfTokenReducer from 'features/csrf/csrfSlice';
import postReducer from 'features/post/postSlice';
import userReducer from 'features/user/userSlice';
import logger from 'redux-logger';

export const store = configureStore({
    reducer: {
        csrfTokenReducer,
        userReducer,
        postReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
