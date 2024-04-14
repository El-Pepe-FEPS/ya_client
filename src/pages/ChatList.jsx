import {
    Paper,
    Stack,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Avatar,
    CircularProgress,
    Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatList } from 'features/chats/chatAPI';
import { selectCsrfToken } from 'features/csrf/csrfSlice';
import { selectChatList } from 'features/chats/chatSlice';
import { selectUser } from 'features/user/userSlice';
import { getChatName } from 'utils';

export const ChatList = () => {
    const csrfToken = useSelector(selectCsrfToken);
    const [chats, chatsPending] = useSelector(selectChatList);
    const [user, userPending] = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/');
        else {
            dispatch(getChatList({ csrf: csrfToken }));
        }
    }, [user]);

    if (chatsPending || userPending)
        return <CircularProgress color='primary' />;

    if (chats?.length === 0)
        return (
            <section>
                <Typography variant='h4' component='h2' gutterBottom>
                    There are no active chats
                </Typography>

                <Typography variant='body1' paragraph>
                    Connect, Share, Heal - Join ongoing conversations, find
                    solidarity, and access real-time support from fellow war
                    victims and volunteers.
                </Typography>
            </section>
        );

    return (
        <Paper
            sx={{
                inlineSize: 'max(288px, 50%)',
                marginInline: 'auto',
                paddingInline: { xs: 1, md: 3 },
                paddingBlock: { xs: 2, md: 4 },
            }}
        >
            <Stack spacing={2}>
                <Box>
                    <Typography variant='h4' component='h2' gutterBottom>
                        Your active chats
                    </Typography>
                    <Typography variant='body1' paragraph>
                        Connect, Share, Heal - Join ongoing conversations, find
                        solidarity, and access real-time support from fellow war
                        victims and volunteers.
                    </Typography>
                </Box>

                <List>
                    {chats?.map((chat) => (
                        <ListItem key={chat.id}>
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Link
                                        component={RouterLink}
                                        variant='body1'
                                        to={`/chats/${chat.id}`}
                                        underline='none'
                                        display='block'
                                        color='inherit'
                                    >
                                        {getChatName(
                                            user,
                                            chat.sender,
                                            chat.recipient
                                        )}
                                    </Link>
                                }
                                secondary={
                                    user.id === chat.sender.id
                                        ? chat.sender.phone_number
                                        : chat.recipient.phone_number
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Stack>
        </Paper>
    );
};
