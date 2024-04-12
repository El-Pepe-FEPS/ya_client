import { Navbar } from 'components/Navbar';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

function App() {
    return (
        <>
            <Navbar />
            <Container
                sx={{
                    boxSizing: 'border-box',
                    marginBlock: '86px',
                    paddingInline: { xs: '16px', md: '32px', lg: '64px' },
                }}
            >
                <Outlet />
            </Container>
        </>
    );
}

export default App;
