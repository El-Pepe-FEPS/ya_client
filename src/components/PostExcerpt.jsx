import React from 'react';
import {
    Card,
    CardHeader,
    Avatar,
    Typography,
    CardContent,
} from '@mui/material';

export const PostExcerpt = ({ id, title, description, category, user }) => {
    return (
        <Card component='article' sx={{ flexBasis: '288px', flexGrow: '1' }}>
            <CardHeader
                component='header'
                avatar={<Avatar src={'https://source.unsplash.com/random'} />}
                title={'Travis Scott'}
                subheader={category.title}
            />
            <CardContent>
                <Typography variant='h5' component='h3' gutterBottom>
                    {title}
                </Typography>
                <Typography
                    variant='body1'
                    color='textSecondary'
                    paragraph
                    sx={{ margin: 0 }}
                >
                    {description.length > 100
                        ? `${description.slice(0, 100)}...`
                        : description}
                </Typography>
            </CardContent>
        </Card>
    );
};
