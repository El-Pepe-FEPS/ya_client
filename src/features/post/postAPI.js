import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPostList = createAsyncThunk(
    'post/get',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('http://localhost:8000/post/all');

            return res.data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response.data);
        }
    }
);

export const createPost = createAsyncThunk(
    'post/create',
    async ({ data, csrf }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                'http://localhost:8000/post/create',
                data,
                {
                    headers: {
                        'X-CSRFToken': csrf,
                    },
                    withCredentials: true,
                }
            );

            return res.data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response.data);
        }
    }
);

export const getCategories = async () => {
    try {
        const res = await axios.get('http://localhost:8000/category/');

        return res.data;
    } catch (error) {
        console.error(error);
    }
};
