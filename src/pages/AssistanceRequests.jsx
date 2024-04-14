import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Pagination, Stack, Typography } from '@mui/material';
import { PublicationList } from 'components/PublicationList';
import { selectPostsByType } from 'features/post/postSlice';

export const AssistanceRequests = () => {
    const [posts, _, pending] = useSelector((state) =>
        selectPostsByType(state, 'help assistance')
    );
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const pageChanged = (_, newPage) => setCurrentPage(newPage);

    if (pending) return <CircularProgress color='primary' />;

    if (posts?.length === 0)
        return (
            <section>
                <Typography variant='h4' component='h2' gutterBottom>
                    All assistance requests
                </Typography>
                <Typography variant='body' paragraph color='text.secondary'>
                    There are nothing yet posted.
                </Typography>
            </section>
        );

    return (
        <section>
            <Stack spacing={4}>
                <Stack
                    direction='row'
                    spacing={4}
                    justifyContent='space-between'
                >
                    <Typography
                        variant='h4'
                        component='h2'
                        gutterBottom
                        sx={{ textTransform: 'capitalize' }}
                    >
                        All assistance requests
                    </Typography>
                </Stack>

                <PublicationList
                    publications={posts.slice(
                        indexOfFirstPost,
                        indexOfLastPost
                    )}
                />
                {posts?.length > postsPerPage && (
                    <Pagination
                        count={Math.ceil(posts.length / postsPerPage)}
                        color='primary'
                        sx={{ alignSelf: 'center' }}
                        onChange={pageChanged}
                    />
                )}
            </Stack>
        </section>
    );
};
