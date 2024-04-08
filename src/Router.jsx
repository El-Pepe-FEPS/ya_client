import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from 'app/App';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
            </Routes>
        </BrowserRouter>
    );
};
