import { configureStore } from '@reduxjs/toolkit';
import csrfTokenReducer from 'features/csrf/csrfSlice';
import userReducer from 'features/user/userSlice';

export const store = configureStore({
    reducer: {
        csrfTokenReducer,
        userReducer,
    },
});
