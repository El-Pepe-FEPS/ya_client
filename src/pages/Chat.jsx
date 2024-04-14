import {
    Avatar,
    Paper,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
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
    const { control, handleSubmit, reset } = useForm({ content: '' });
    const [messages, setMessages] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/');

        const intervalCall = setInterval(
            getMessageList({
                chatID: chatID,
                postID: chat.post,
            })
                .then((data) => setMessages(data))
                .catch((error) => console.error(error)),
            30000
        );

        return () => clearInterval(intervalCall);
    }, [chat, chatID, user]);

    if (chatPending || userPending) return <CircularProgress color='primary' />;

    return (
        <Paper
            sx={{
                inlineSize: 'max(288px, 60%)',
                marginInline: 'auto',
                paddingInline: { xs: 1, md: 3 },
                paddingBlock: { xs: 2, md: 4 },
            }}
        >
            <Stack direction='row' alignItems='center'>
                <Typography variant='h5' paragraph gutterBottom>
                    Chatting with:{' '}
                    {getChatName(user, chat.sender, chat.recipient)}
                </Typography>
            </Stack>

            <List sx={{ maxBlockSize: '420px', overflowY: 'auto' }}>
                {messages?.length === 0 ? (
                    <Typography variant='body1' color='text.secondary'>
                        Nothing yet sended.
                    </Typography>
                ) : (
                    messages?.map((message, index) => (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    message.user.name +
                                    ' ' +
                                    message.user.surname
                                }
                                secondary={message.content}
                            />
                        </ListItem>
                    ))
                )}
            </List>
            <form
                action=''
                onSubmit={handleSubmit((data) => {
                    sendMessage({
                        postID: chat.post,
                        chatID,
                        content: data.content,
                        csrf: csrfToken,
                    }).then((newMessage) => {
                        setMessages([...messages, newMessage]);
                        reset({ content: '' });
                    });
                })}
                noValidate
            >
                <Stack direction='row' gap={{ xs: 1, md: 2 }}>
                    <Controller
                        control={control}
                        name='content'
                        rules={{
                            required: true,
                            maxLength: 100,
                        }}
                        render={({
                            field: { onChange, onBlur },
                            fieldState: { invalid },
                        }) => (
                            <TextField
                                variant='outlined'
                                onChange={onChange}
                                onBlur={onBlur}
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
        </Paper>
    );
};
