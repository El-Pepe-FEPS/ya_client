import { useEffect } from 'react';
import { Navbar } from 'components/Navbar';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCsrfToken } from 'features/csrf/csrfAPI';

function App() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCsrfToken());
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
