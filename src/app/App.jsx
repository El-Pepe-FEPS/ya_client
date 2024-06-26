import { useEffect } from 'react';
import { Navbar } from 'components/Navbar';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCsrfToken } from 'features/csrf/csrfAPI';
import { selectUser } from 'features/user/userSlice';
import { loginWithSession } from 'features/user/userAPI';
import { getCookieValue } from 'utils';

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [user] = useSelector(selectUser);

    useEffect(() => {
        dispatch(getCsrfToken());

        const sessionID = getCookieValue('sessionid');
        if (!user && sessionID) {
            dispatch(loginWithSession());
        }
    }, [dispatch, location]);

    return (
        <>
            <Navbar />
            <Container
                sx={{
                    boxSizing: 'border-box',
                    marginBlock: '86px',
                    paddingInline: { xs: '16px', md: '32px' },
                }}
            >
                <Outlet />
            </Container>
        </>
    );
}

export default App;
