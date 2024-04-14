import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from 'app/App';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Home } from 'pages/Home';
import { CreateHelpRequest } from 'pages/CreatePost';
import { AssistanceOffers } from 'pages/AssistanceOffers';
import { Protected } from 'components/Protected';
import { Resources } from 'pages/Resources';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='sign-in' element={<SignIn />} />
                    <Route path='sign-up' element={<SignUp />} />
                    <Route path='assistance-offers' element={<AssistanceOffers />} />
                    <Route path='resources' element={<Resources />} />
                    <Route
                        path='create'
                        element={
                            <Protected>
                                <CreateHelpRequest />
                            </Protected>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
