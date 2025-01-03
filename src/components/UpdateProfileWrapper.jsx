import React from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';

const UpdateProfileWrapper = (props) => {
    const navigate = useNavigate();

    return <UpdateProfile {...props} navigate={navigate} />;
};

export default UpdateProfileWrapper;