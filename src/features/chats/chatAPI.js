import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createChat = createAsyncThunk(
    'chat/create',
    async ({ postID, csrf }) => {
        try {
            axios.post(`http://localhost:8000/chat/${postID}/`, null, {
                headers: {
                    'X-CSRFToken': csrf,
                },
                withCredentials: true,
            });
        } catch (error) {
            console.error(error);
        }
    }
);

export const getChatList = createAsyncThunk('chat/get', async ({ csrf }) => {
    try {
        const res = await axios.get('http://localhost:8000/chat/all/', {
            headers: {
                'X-CSRFToken': csrf,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (error) {
        console.error(error);
    }
});

export const getMessageList = async ({ chatID, postID }) => {
    try {
        const res = await axios.get(
            `http://localhost:8000/message/${postID}/${chatID}/`
        );
        return await res.data;
    } catch (error) {
        console.error(error);
    }
};

export const sendMessage = async ({ postID, chatID, content, csrf }) => {
    try {
        const res = await axios.post(
            `http://localhost:8000/message/${postID}/${chatID}/`,
            { content },
            {
                headers: {
                    'X-CSRFToken': csrf,
                },
                withCredentials: true,
            }
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
