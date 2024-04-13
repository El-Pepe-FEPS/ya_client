import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from 'app/App';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { ProtectedAuth } from 'components/ProtectedAuth';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route
                        path='sign-in'
                        element={
                            <ProtectedAuth>
                                <SignIn />
                            </ProtectedAuth>
                        }
                    />
                    <Route
                        path='sign-up'
                        element={
                            <ProtectedAuth>
                                <SignUp />
                            </ProtectedAuth>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
