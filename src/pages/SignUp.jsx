import React, { useEffect, useState } from 'react';
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
import { selectCsrfToken } from 'features/csrf/csrfSlice';
import { register } from 'features/user/userAPI';
import { email, fullName, password, phoneNumber } from 'rules/auth';
import { selectUser } from 'features/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const { control, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const csrfToken = useSelector(selectCsrfToken);
    const dispatch = useDispatch();

    const [user] = useSelector(selectUser);
    const navigate = useNavigate();
    const showPasswordChanged = () =>
        setShowPassword((prevState) => !prevState);

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

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
                Create an account
            </Typography>
            <Typography variant='body' color='text.secondary' paragraph>
                Join us today! Create your account by providing some basic
                information to unlock exclusive features and become part of our
                community.
            </Typography>
            <form
                action=''
                onSubmit={handleSubmit((credentials) => {
                    const [name, surname, patronymic] =
                        credentials.full_name.split(' ');
                    dispatch(
                        register({
                            credentials: {
                                name,
                                surname,
                                patronymic,
                                email: credentials.email,
                                password: credentials.password,
                                phone_number: credentials.phone_number,
                            },
                            csrf: csrfToken,
                        })
                    );
                })}
                noValidate
            >
                <Stack spacing={2}>
                    <Controller
                        control={control}
                        name='full_name'
                        rules={fullName}
                        render={({
                            field: { onChange, onBlur },
                            fieldState: { invalid },
                            formState: { errors },
                        }) => (
                            <TextField
                                type='text'
                                label='Full Name'
                                onChange={onChange}
                                onBlur={onBlur}
                                error={invalid}
                                helperText={errors.full_name?.message}
                                autoComplete='full-name'
                                fullWidth
                                required
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='phone_number'
                        rules={phoneNumber}
                        render={({
                            field: { onChange, onBlur },
                            fieldState: { invalid },
                            formState: { errors },
                        }) => (
                            <TextField
                                type='tel'
                                label='Phone Number'
                                onChange={onChange}
                                onBlur={onBlur}
                                error={invalid}
                                helperText={errors.phone_number?.message}
                                autoComplete='tel'
                                fullWidth
                                required
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='email'
                        rules={email}
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
                        rules={password}
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
                                autoComplete='new-password'
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
                        Sign Up
                    </Button>
                </Stack>
            </form>
            <Typography variant='body1' color='text.secondary'>
                Or sign up with
            </Typography>
            <Button variant='outlined' color='primary'>
                Google
            </Button>
        </Stack>
    );
};
