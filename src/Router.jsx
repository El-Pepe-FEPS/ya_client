import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from 'app/App';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Home } from 'pages/Home';
import { CreateHelpRequest } from 'pages/CreatePost';
import { Protected } from 'components/Protected';
import { AssistanceRequests } from 'pages/AssistanceRequests';
import { PostDetails } from 'pages/PostDetails';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route
                        path='/assistance-requests'
                        element={<AssistanceRequests />}
                    />
                    <Route path='sign-in' element={<SignIn />} />
                    <Route path='sign-up' element={<SignUp />} />
                    <Route
                        path='create'
                        element={
                            <Protected>
                                <CreateHelpRequest />
                            </Protected>
                        }
                    />
                    <Route path='post/:postID' element={<PostDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
