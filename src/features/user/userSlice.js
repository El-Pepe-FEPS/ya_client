import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { login, register } from './userAPI';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    user: null,
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
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.pending = false;
                state.error = null;
            })
            .addMatcher(isAnyOf(login.pending, register.pending), (state) => {
                state.pending = true;
            })
            .addMatcher(
                isAnyOf(login.rejected, register.rejected),
                (state, action) => {
                    state.error = action.payload;
                    state.pending = false;

                    if (typeof action.payload === 'string') {
                        toast(action.payload);
                    } else {
                        for (let error of action.payload) {
                            toast(error);
                        }
                    }
                }
            );
    },
});

export default userSlice.reducer;
export const selectUser = (state) => [
    state.userReducer.user,
    state.userReducer.error,
    state.userReducer.pending,
];
