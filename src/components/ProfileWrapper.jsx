import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login';

const LoginWrapper = (props) => {
  const location = useLocation();

  return <Login {...props} location={location} />;
};

export default LoginWrapper;