import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class TooltipHeader extends Component {

  render() {
    const { perfilUsuario, logout } = this.props;
    const userImage = perfilUsuario.imagen || "path_to_default_image.jpg"; // Imagen de perfil o imagen predeterminada

    return (
      <div className="tooltip-container" style={{ backgroundImage: `url(${userImage})` }}>
        <span className="text"></span>
        <NavLink to="/profile">
          <span className="tooltip1">
            <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 448 512">
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
            </svg>
          </span>
        </NavLink>
        <NavLink to="/createcharla">
          <span className="tooltip2">
            <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 448 512">
              <path fill="#ea8c4d" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
          </span>
        </NavLink>
        <NavLink to="/login">
          <span className="tooltip4" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 512 512">
              <path fill="#b43c3c" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
            </svg>
          </span>
        </NavLink>
      </div>
    );
  }
}
