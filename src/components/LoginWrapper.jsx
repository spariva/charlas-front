import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';

const LoginWrapper = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return <Login {...props} navigate={navigate} location={location} />;
};

export default LoginWrapper;