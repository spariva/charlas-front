import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

//* Para poder usar un navigate del profile al update profile sin que tenga que volver a renderizar el componente. 

const ProfileWrapper = (props) => {
    const navigate = useNavigate();

    return <Profile {...props} navigate={navigate} />;
};

export default ProfileWrapper;