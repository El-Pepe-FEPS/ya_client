import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from 'app/App';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { CreatePost } from 'pages/CreatePost';
import { Protected } from 'components/Protected';
import { Resources } from 'pages/Resources';
import { Requests } from 'pages/Requests';
import { PostDetails } from 'pages/PostDetails';
import { ChatList } from 'pages/ChatList';
import { Chat } from 'pages/Chat';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='sign-in' element={<SignIn />} />
                    <Route path='sign-up' element={<SignUp />} />
                    <Route index element={<Requests type='help request' />} />
                    <Route
                        path='assistance-offers'
                        element={<Requests type='help offer' />}
                    />
                    <Route path='resources' element={<Resources />} />
                    <Route
                        path='chats'
                        element={
                            <Protected>
                                <ChatList />
                            </Protected>
                        }
                    />
                    <Route
                        path='chats/:chatID'
                        element={
                            <Protected>
                                <Chat />
                            </Protected>
                        }
                    />
                    <Route
                        path='create'
                        element={
                            <Protected>
                                <CreatePost />
                            </Protected>
                        }
                    />
                    <Route path='post/:postID' element={<PostDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
