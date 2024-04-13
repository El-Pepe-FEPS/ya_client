import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { Router } from 'Router';
import { store } from 'app/store';
import { Provider } from 'react-redux';
import { getCsrfToken } from 'features/csrf/csrfAPI';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(getCsrfToken());

root.render(
    <React.StrictMode>
        <CssBaseline>
            <Provider store={store}>
                <Router />
            </Provider>
        </CssBaseline>
    </React.StrictMode>
);
