import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from './Header';

const HeaderWrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const localStore = useLocalStorage();

    return <Header {...props} navigate={navigate} location={location} localStore={localStore}/>;
};

export default HeaderWrapper;