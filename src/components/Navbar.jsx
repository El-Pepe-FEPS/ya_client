import React, { useState } from 'react';
import {
    AppBar,
    Container,
    Toolbar,
    Menu,
    MenuItem,
    Box,
    Stack,
    IconButton,
    Link,
    Avatar,
} from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from 'assets/logo.png';

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
              {
                  route: '/assistance-offers',
                  title: 'Assistance Offers',
              },
              {
                  route: '/resources',
                  title: 'Resources',
              },
              {
                  route: '/chats',
                  title: 'Chats',
              },
              {
                  route: '/create',
                  title: 'Create Post',
              },

              { route: '/profile', title: 'Profile' },
          ]
        : [
              {
                  route: '/',
                  title: 'Home',
              },
              {
                  route: '/assistance-offers',
                  title: 'Assistance Offers',
              },
              {
                  route: '/resources',
                  title: 'Resources',
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
                    <Box sx={{ flexGrow: 1 }}>
                        <Avatar
                            src={logo}
                            sx={{
                                inlineSize: { xs: '48px', md: '64px' },
                                blockSize: { xs: '48px', md: '64px' },
                            }}
                        />
                    </Box>
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
