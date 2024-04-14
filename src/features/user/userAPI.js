import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
    'user/login',
    async ({ credentials, csrf }, { rejectWithValue }) => {
        try {
            const res = await axios.postForm(
                'http://localhost:8000/login/',
                credentials,
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
            return rejectWithValue(response.data.message);
        }
    }
);

export const loginWithSession = createAsyncThunk('user/login', async () => {
    try {
        const res = await axios.get('http://localhost:8000/login/', {
            withCredentials: true,
        });

        return res.data;
    } catch (error) {
        console.error(error);
    }
});

export const register = createAsyncThunk(
    'user/register',
    async ({ credentials, csrf }, { rejectWithValue }) => {
        try {
            const res = await axios.postForm(
                'http://localhost:8000/register/',
                credentials,
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

            return rejectWithValue(response.data.message);
        }
    }
);
