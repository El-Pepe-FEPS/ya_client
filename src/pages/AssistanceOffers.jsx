import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Pagination, Stack, Typography } from '@mui/material';
import { PublicationList } from 'components/PublicationList';

export const AssistanceOffers = () => {
    const [helpRequests, error, pending] = useSelector((state) =>[
        state.postReducer.posts?.filter((post) => post.type === 'help offer'),
        state.postReducer.error,
        state.postReducer.pending,
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const pageChanged = (_, newPage) => setCurrentPage(newPage);

    if (pending) return <CircularProgress color='primary' />;

    if (helpRequests?.length === 0)
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
                    <Typography variant='h4' component='h2' gutterBottom>
                        All help requests
                    </Typography>
                </Stack>

                <PublicationList
                    publications={helpRequests.slice(
                        indexOfFirstPost,
                        indexOfLastPost
                    )}
                />
                {helpRequests?.length > postsPerPage && (
                    <Pagination
                        count={Math.ceil(helpRequests.length / postsPerPage)}
                        color='primary'
                        sx={{ alignSelf: 'center' }}
                        onChange={pageChanged}
                    />
                )}
            </Stack>
        </section>
    );
};
