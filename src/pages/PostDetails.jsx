import {
    Avatar,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';
import { selectSinglePost } from 'features/post/postSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const PostDetails = () => {
    const { postID } = useParams();
    const [post, error, pending] = useSelector((state) =>
        selectSinglePost(state, parseInt(postID))
    );

    if (pending) return <CircularProgress color='primary' />;

    return (
        <article>
            <Typography variant='h4' component='h2' gutterBottom>
                {post.title}
            </Typography>
            <Stack direction='row' spacing={1} mb={2} alignItems='center'>
                <Typography variant='body1' paragraph>
                    Written by:
                </Typography>
                <Avatar sx={{ inlineSize: '24px', blockSize: '24px' }} />
                <Typography variant='body1'>
                    {[
                        post.user.name,
                        post.user.surname,
                        post.user.patronymic,
                    ].join(' ')}
                </Typography>
            </Stack>

            <Typography
                variant='body1'
                paragraph
                color='text.secondary'
                gutterBottom
            >
                {post.description}
            </Typography>

            <Stack direction='row' spacing={4}>
                <Button variant='outlined' color='primary'>
                    Contact
                </Button>
            </Stack>
        </article>
    );
};
