import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from "./../assets/images/logotipo-positivo.jpg";

const Header = () => {
  return (
    <div className='text-center'>
      <img src={logo} alt="Logo" style={{width: "200px"}} />
    </div>
  );
};

export default Header;
