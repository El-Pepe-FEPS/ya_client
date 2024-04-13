import React from 'react';
import { Card, CardHeader, Avatar, Typography, CardContent } from '@mui/material';

export const HelpRequest =
    ({
        title = 'Title',
        body = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dicta ut soluta, nostrum repellendus impedit! Iste, similique, eos, eum sed inventore perspiciatis laboriosam nobis rem ducimus voluptatem temporibus vero laudantium?",
        // user = 'Yura' 
    }) => {
        return (
            <Card>
                <CardHeader
                    avatar={<Avatar src={'https://source.unsplash.com/random'} />}
                    title={'Travis Scott'}
                    subheader={'travis_scott@gmail.com'}
                />
                <CardContent>
                    <Typography variant="h5" component="h3">
                        {title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {body.length > 100 ? `${body.slice(0, 100)}...` : body}
                    </Typography>
                </CardContent>
            </Card>
        );
    };