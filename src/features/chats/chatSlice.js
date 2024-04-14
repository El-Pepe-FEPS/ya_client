import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getChatList, createChat } from './chatAPI';

const INITIAL_STATE = {
    chats: null,
    error: null,
    pending: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder
            .addCase(getChatList.fulfilled, (state, action) => {
                state.chats = action.payload;
                state.pending = false;
            })
            .addCase(createChat.fulfilled, (state, action) => {
                state.chats.push(action.payload);
                state.pending = false;
            })
            .addMatcher(
                isAnyOf(getChatList.pending, createChat.pending),
                (state) => {
                    state.pending = true;
                }
            )
            .addMatcher(
                isAnyOf(getChatList.rejected, createChat.rejected),
                (state, action) => {
                    state.error = action.payload;
                    state.pending = false;
                }
            );
    },
});

export default chatSlice.reducer;
export const selectChatList = (state) => [
    state.chatReducer.chats,
    state.chatReducer.pending,
];
export const selectSingleChat = (state, chatID) => [
    state.chatReducer.chats?.find((chat) => chat.id === chatID),
    state.chatReducer.pending,
];
