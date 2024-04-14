import {
    Avatar,
    Button,
    Chip,
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
            <Chip
                variant='outlined'
                color='primary'
                label={
                    post.type === 'help offer'
                        ? 'Assistance offer'
                        : 'Assistance request'
                }
                sx={{ marginBlockEnd: 2, textTransform: 'capitalize' }}
            />

            <Typography variant='h4' component='h2' gutterBottom>
                {post.title}
            </Typography>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={1}
                mb={2}
                alignItems={{ xs: 'start', md: 'center' }}
            >
                <Typography variant='body1' paragraph>
                    Written by:
                </Typography>
                <Stack direction='row' spacing={1}>
                    <Avatar sx={{ inlineSize: '24px', blockSize: '24px' }} />
                    <Typography variant='body1'>
                        {[
                            post.user.name,
                            post.user.surname,
                            post.user.patronymic,
                        ].join(' ')}
                    </Typography>
                </Stack>
            </Stack>

            <Typography
                variant='body1'
                paragraph
                color='text.secondary'
                gutterBottom
            >
                {post.description}
            </Typography>

            <Button
                variant='outlined'
                color='primary'
                sx={{ marginBlockStart: 3 }}
            >
                Contact
            </Button>
        </article>
    );
};
