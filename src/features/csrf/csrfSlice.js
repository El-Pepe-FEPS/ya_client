import { createSlice } from '@reduxjs/toolkit';
import { getCsrfToken } from './csrfAPI';

const INITIAL_STATE = { token: null };

const csrfSlice = createSlice({
    name: 'csrfToken',
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder.addCase(getCsrfToken.fulfilled, (state, action) => {
            state.token = action.payload;
        });
    },
});

export default csrfSlice.reducer;
export const selectCsrfToken = (state) => state.csrfTokenReducer.token;
