import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from 'app/App';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Home } from 'pages/Home';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='sign-in' element={<SignIn />} />
                    <Route path='sign-up' element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
