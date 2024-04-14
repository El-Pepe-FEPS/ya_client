import React from 'react';
import {
    Card,
    CardHeader,
    Avatar,
    Typography,
    CardContent,
    Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const PostExcerpt = ({ id, title, description, category, user }) => {
    return (
        <Card component='article' sx={{ flexBasis: '288px', flexGrow: '1' }}>
            <CardHeader
                component='header'
                avatar={<Avatar src={'https://source.unsplash.com/random'} />}
                title={[user.name, user.surname, user.patronymic].join(' ')}
                subheader={category.title}
            />
            <CardContent>
                <Typography variant='h5' component='h3' gutterBottom>
                    <Link
                        component={RouterLink}
                        to={`/post/${id}`}
                        underline='none'
                        color='inherit'
                    >
                        {title}
                    </Link>
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
