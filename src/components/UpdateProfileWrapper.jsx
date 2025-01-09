import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';

const UpdateProfileWrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    return <UpdateProfile {...props} location={location} navigate={navigate} />;
};

export default UpdateProfileWrapper;