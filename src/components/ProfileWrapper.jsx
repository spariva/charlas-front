import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Profile from './Profile';

const ProfileWrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    return <Profile {...props} navigate={navigate} location={location} />;
};

export default ProfileWrapper;