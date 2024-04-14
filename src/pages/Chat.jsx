import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { getMessageList, sendMessage } from 'features/chats/chatAPI';
import { selectSingleChat } from 'features/chats/chatSlice';
import { selectCsrfToken } from 'features/csrf/csrfSlice';
import { selectUser } from 'features/user/userSlice';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getChatName } from 'utils';

export const Chat = () => {
    const { chatID } = useParams();
    const [chat, chatPending] = useSelector((state) =>
        selectSingleChat(state, parseInt(chatID))
    );
    const [user, userPending] = useSelector(selectUser);
    const csrfToken = useSelector(selectCsrfToken);
    const { control, handleSubmit } = useForm();
    const [messages, setMessages] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/');
        else {
            getMessageList({ chatID: chatID, postID: chat.post }).then(
                (data) => {
                    setMessages(data);
                }
            );
        }

        setInterval(
            () =>
                getMessageList({ chatID: chatID, postID: chat.post }).then(
                    (data) => {
                        setMessages(data);
                    }
                ),
            30000
        );
    }, [navigate, user]);

    if (chatPending || userPending) return <CircularProgress color='primary' />;

    return (
        <Box>
            <Stack>
                <Typography variant='h4' component='h2'>
                    {getChatName(user, chat.sender, chat.recipient)}
                </Typography>
                {messages?.length === 0 ? (
                    <Typography variant='body1' color='text.secondary'>
                        Nothing yet sended.
                    </Typography>
                ) : (
                    messages?.map((message, index) => (
                        <Stack
                            direction={
                                message.user.phone_number === user.phone_number
                                    ? 'row-reverse'
                                    : 'row'
                            }
                            gap={2}
                            component='article'
                            key={index}
                        >
                            <Avatar />
                            <Stack>
                                <Typography variant='body1' paragraph mb={0}>
                                    {message.user.name +
                                        ' ' +
                                        message.user.surname}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    paragraph
                                    color='text.secondary'
                                >
                                    {message.content}
                                </Typography>
                            </Stack>
                        </Stack>
                    ))
                )}
            </Stack>
            <form
                action=''
                onSubmit={handleSubmit((data) => {
                    sendMessage({
                        postID: chat.post,
                        chatID,
                        content: data.content,
                        csrf: csrfToken,
                    }).then((newMessage) =>
                        setMessages([...messages, newMessage])
                    );
                })}
                noValidate
            >
                <Stack direction='row' spacing={{ xs: 1, md: 2 }}>
                    <Controller
                        control={control}
                        name='content'
                        rules={{
                            required: true,
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { invalid },
                            formState: { errors },
                        }) => (
                            <TextField
                                variant='outlined'
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={invalid}
                                fullWidth
                                required
                            />
                        )}
                    />

                    <Button variant='outlined' type='submit'>
                        Send
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};
