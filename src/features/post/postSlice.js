import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createPost, getPostList } from './postAPI';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    posts: null,
    error: null,
    pending: false,
};

const postSlice = createSlice({
    name: 'post',
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder

            .addCase(getPostList.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.pending = false;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
                state.pending = false;
                toast('New post created successfully.');
            })
            .addMatcher(
                isAnyOf(getPostList.pending, createPost.pending),
                (state) => {
                    state.pending = true;
                }
            )
            .addMatcher(
                isAnyOf(getPostList.rejected, createPost.rejected),
                (state, action) => {
                    state.error = action.payload;
                    state.pending = false;
                }
            );
    },
});

export default postSlice.reducer;
export const selectPostList = (state) => [
    state.postReducer.posts,
    state.postReducer.error,
    state.postReducer.pending,
];
export const selectPostsByType = (state, type) => [
    state.postReducer.posts?.filter((post) => post.type === type),
    state.postReducer.error,
    state.postReducer.pending,
];

export const selectSinglePost = (state, postID) => [
    state.postReducer.posts?.find((post) => post.id === postID),
    state.postReducer.error,
    state.postReducer.pending,
];
