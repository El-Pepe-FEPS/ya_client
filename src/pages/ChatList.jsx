import {
    Stack,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Avatar,
    IconButton,
    CircularProgress,
    Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
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
        <Stack
            spacing={2}
            sx={{ inlineSize: 'max(288px, 50%)', marginInline: 'auto' }}
        >
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
                    <ListItem
                        secondaryAction={
                            <IconButton color='error'>
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        }
                        divider
                        key={chat.id}
                    >
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText>
                            <Link
                                component={RouterLink}
                                variant='body1'
                                to={`/chats/${chat.id}`}
                                underline='none'
                                display='block'
                            >
                                {getChatName(user, chat.sender, chat.recipient)}
                            </Link>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
};
