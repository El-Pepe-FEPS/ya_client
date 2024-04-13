import React, { useState } from 'react';
import {
    AppBar,
    Container,
    Toolbar,
    Menu,
    MenuItem,
    Typography,
    Box,
    Stack,
    IconButton,
    Link,
} from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isExpanded = Boolean(anchorEl);

    const user = useSelector((state) => state.userReducer.user);

    const open = ({ currentTarget }) => setAnchorEl(currentTarget);
    const close = () => setAnchorEl(null);

    const pages = user
        ? [
              {
                  route: '/',
                  title: 'Home',
              },
              { route: '/profile', title: 'Profile' },
              {
                  route: '/create',
                  title: 'Create Post',
              },
          ]
        : [
              {
                  route: '/',
                  title: 'Home',
              },
              {
                  route: '/sign-in',
                  title: 'Sign In',
              },
              {
                  route: '/sign-up',
                  title: 'Sign Up',
              },
          ];

    return (
        <AppBar
            variant='outlined'
            color='default'
            elevation={0}
            position='fixed'
        >
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h5'
                        component='h1'
                        sx={{ flexGrow: 1 }}
                    >
                        Logo
                    </Typography>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            onClick={open}
                            aria-expanded={isExpanded}
                            aria-controls='menu'
                        >
                            {isExpanded ? (
                                <CloseOutlinedIcon />
                            ) : (
                                <MenuOutlinedIcon />
                            )}
                        </IconButton>
                        <Menu
                            open={isExpanded}
                            anchorEl={anchorEl}
                            onClose={close}
                            keepMounted
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            id='menu'
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index}>
                                    <Link
                                        component={NavLink}
                                        to={page.route}
                                        underline='none'
                                        sx={{
                                            color: 'text.secondary',
                                        }}
                                    >
                                        {page.title}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        {pages.map((page, index) => (
                            <Link
                                component={NavLink}
                                to={page.route}
                                underline='none'
                                key={index}
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover, &:focus': {
                                        color: 'text.primary',
                                    },
                                }}
                            >
                                {page.title}
                            </Link>
                        ))}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
