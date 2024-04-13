import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { login, register } from './userAPI';

const INITIAL_STATE = {
    user: {
        username: null,
        email: null,
        password: null,
    },
    error: null,
    pending: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.pending = false;
            })
            .addMatcher(isAnyOf(login.pending, register.pending), (state) => {
                state.pending = true;
            })
            .addMatcher(
                isAnyOf(login.rejected, register.rejected),
                (state, action) => {
                    state.error = action.payload;
                    state.pending = false;
                }
            );
    },
});

export default userSlice.reducer;
