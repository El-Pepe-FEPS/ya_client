import {
    MenuItem,
    Stack,
    TextField,
    Typography,
    Button,
    CircularProgress,
} from '@mui/material';

import { createPost, getCategories } from 'features/post/postAPI';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCsrfToken } from 'features/csrf/csrfSlice';
import { selectUser } from 'features/user/userSlice';
import { toast } from 'react-toastify';

export const CreateHelpRequest = () => {
    const [categories, setCategories] = useState(null);
    const { handleSubmit, control, reset } = useForm({
        defaultValues: { title: '', category: '', description: '' },
    });
    const csrfToken = useSelector(selectCsrfToken);
    const [user, _, pending] = useSelector(selectUser);
    const dispatch = useDispatch();

    const clearFormFields = () =>
        reset({ title: '', category: '', description: '' });

    useEffect(() => {
        getCategories().then((categories) => setCategories(categories));
    }, []);

    if (!categories || pending) return <CircularProgress />;

    return (
        <Stack sx={{ inlineSize: 'max(288px, 35%)', marginInline: 'auto' }}>
            <Typography variant='h4' component='h2' gutterBottom>
                Create a New Assistance Request
            </Typography>
            <Typography variant='body2' paragraph color='text.secondary'>
                Initiate Change: Submit your assistance request here and take
                the first step towards reclaiming hope and rebuilding your life.
            </Typography>
            <form
                action=''
                onSubmit={handleSubmit((data) => {
                    if (data.type === 'help offer' && !user.verified) {
                        toast(
                            "You can't create assistance offer hence you are not volunteer."
                        );
                        return;
                    }

                    dispatch(
                        createPost({
                            data: {
                                title: data.title,
                                type: data.type,
                                category: { title: data.category },
                                description: data.description,
                            },
                            csrf: csrfToken,
                        })
                    );

                    clearFormFields();
                })}
                noValidate
            >
                <Stack spacing={2} mb={4}>
                    <Controller
                        control={control}
                        name='title'
                        rules={{
                            required: {
                                value: true,
                                message: 'This is required field',
                            },
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { invalid },
                            formState: { errors },
                        }) => (
                            <TextField
                                label='Title'
                                onChange={onChange}
                                onBlur={onBlur}
                                error={invalid}
                                helperText={errors.category?.message}
                                value={value}
                                fullWidth
                                required
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.title}
                                    >
                                        {category.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        control={control}
                        name='type'
                        rules={{
                            required: {
                                value: true,
                                message: 'This is required field',
                            },
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { invalid },
                            formState: { errors },
                        }) => (
                            <TextField
                                label='Type'
                                onChange={onChange}
                                onBlur={onBlur}
                                error={invalid}
                                value={value}
                                helperText={errors.type?.message}
                                fullWidth
                                select
                                required
                            >
                                <MenuItem value='help offer'>
                                    Assistance offer
                                </MenuItem>
                                <MenuItem value='help assistance'>
                                    Assistance request
                                </MenuItem>
                            </TextField>
                        )}
                    />
                    <Controller
                        control={control}
                        name='category'
                        rules={{
                            required: {
                                value: true,
                                message: 'This is required field',
                            },
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { invalid },
                            formState: { errors },
                        }) => (
                            <TextField
                                label='Category'
                                onChange={onChange}
                                onBlur={onBlur}
                                error={invalid}
                                value={value}
                                helperText={errors.category?.message}
                                fullWidth
                                select
                                required
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.title}
                                    >
                                        {category.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        control={control}
                        name='description'
                        rules={{
                            required: {
                                value: true,
                                message: 'This is required field',
                            },
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { invalid },
                            formState: { errors },
                        }) => (
                            <TextField
                                label='Description'
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={invalid}
                                helperText={errors.description?.message}
                                fullWidth
                                multiline
                                required
                            />
                        )}
                    />
                </Stack>
                <Stack spacing={2}>
                    <Button variant='outlined' color='primary' type='submit'>
                        Create
                    </Button>
                    <Button
                        variant='outlined'
                        color='error'
                        onClick={clearFormFields}
                    >
                        Reset
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};
