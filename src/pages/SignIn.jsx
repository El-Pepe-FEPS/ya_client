import React, { useState } from 'react';
import {
    Typography,
    Stack,
    TextField,
    Button,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'features/user/userAPI';
import { selectCsrfToken } from 'features/csrf/csrfSlice';

export const SignIn = () => {
    const { control, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const csrfToken = useSelector(selectCsrfToken);
    const dispatch = useDispatch();

    const showPasswordChanged = () =>
        setShowPassword((prevState) => !prevState);

    return (
        <Stack
            spacing={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 4 }}
            sx={{ inlineSize: 'max(288px, 29.296%)', marginInline: 'auto' }}
        >
            <Typography
                variant='h4'
                component='h2'
                sx={{ textTransform: 'capitalize' }}
            >
                Sign in to your account
            </Typography>
            <Typography variant='body' color='text.secondary' paragraph>
                Welcome back! Sign in to your account using your email and
                password to access your profile and continue where you left off
            </Typography>
            <form
                action=''
                onSubmit={handleSubmit((credentials) =>
                    dispatch(login({ credentials, csrf: csrfToken }))
                )}
                noValidate
            >
                <Stack spacing={2}>
                    <Controller
                        control={control}
                        name='email'
                        rules={{
                            required: {
                                value: true,
                                message: 'This is required field.',
                            },
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: 'Invalid email address.',
                            },
                        }}
                        render={({
                            field: { onChange, onBlur },
                            fieldState: { invalid },
                            formState: { errors },
                        }) => (
                            <TextField
                                type='Email'
                                label='Email'
                                onChange={onChange}
                                onBlur={onBlur}
                                error={invalid}
                                helperText={errors.email?.message}
                                autoComplete='email'
                                fullWidth
                                required
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='password'
                        rules={{
                            required: {
                                value: true,
                                message: 'This is required field.',
                            },
                        }}
                        render={({
                            field: { onChange, onBlur },
                            fieldState: { invalid },
                            formState: { errors },
                        }) => (
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                label='Password'
                                onChange={onChange}
                                onBlur={onBlur}
                                error={invalid}
                                helperText={errors.password?.message}
                                autoComplete='current-password'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                size='small'
                                                onClick={showPasswordChanged}
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffOutlinedIcon />
                                                ) : (
                                                    <VisibilityOutlinedIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                                required
                            />
                        )}
                    />
                    <Button
                        type='submit'
                        variant='outlined'
                        color='success'
                        fullWidth
                    >
                        Sign In
                    </Button>
                </Stack>
            </form>
            <Typography variant='body1' color='text.secondary'>
                Or sign in with
            </Typography>
            <Button variant='outlined' color='primary'>
                Google
            </Button>
        </Stack>
    );
};
