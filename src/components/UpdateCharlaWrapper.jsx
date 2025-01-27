import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UpdateCharla from './UpdateCharla';

const UpdateCharlaWrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    return <UpdateCharla {...props} location={location} navigate={navigate} />;
};

export default UpdateCharlaWrapper;