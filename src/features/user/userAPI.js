import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
    'user/login',
    async ({ credentials, csrf }, { rejectWithValue }) => {
        console.error(credentials);
        try {
            const res = await axios.postForm(
                'http://localhost:8000/login/',
                credentials,
                {
                    headers: {
                        'X-CSRFToken': csrf,
                    },
                }
            );

            console.error(res.data);

            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

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
                }
            );

            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
