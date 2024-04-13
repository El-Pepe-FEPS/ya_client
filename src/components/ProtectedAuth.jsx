import { useEffect } from 'react';
import { selectUser } from 'features/user/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ProtectedAuth = ({ children }) => {
    const [user] = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    return children;
};
