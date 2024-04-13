import { Stack } from '@mui/material';
import React from 'react';
import { PostExcerpt } from './PostExcerpt';

export const PublicationList = ({ publications }) => {
    return (
        <Stack direction='row' gap={{ xs: 3, md: 2 }} sx={{ flexWrap: 'wrap' }}>
            {publications.map((publication, index) => (
                <PostExcerpt {...publication} key={index} />
            ))}
        </Stack>
    );
};
