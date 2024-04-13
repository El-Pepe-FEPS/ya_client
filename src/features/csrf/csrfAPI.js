import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCsrfToken = createAsyncThunk('csrfToken/get', async () => {
    try {
        const res = await axios.get('http://localhost:8000/csrf/');

        return res.data;
    } catch (error) {
        console.error(error);
    }
});
