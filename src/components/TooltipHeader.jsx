import React, { Component } from 'react';
import services from '../services/services';

export default class TooltipHeader extends Component {
  state = {
    perfilUsuario: []
  }
  componentDidMount() {
    this.getUsuario();
  }

  getUsuario() {
    services.getPerfilUsuario().then((response) => {
      console.log("AQUIII" + response.usuario.nombre);
      this.setState({
        perfilUsuario: response.usuario
      })
    })
  }

  render() {
    const { perfilUsuario } = this.state;
    const userImage = perfilUsuario.imagen;

    return (
      <div className="tooltip-container" style={{ backgroundImage: `url(${userImage})` }}>
        <span className="text">
        </span>
        <span className="tooltip1">
          <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 448 512">
            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
          </svg>
        </span>
        <span className="tooltip2">
          <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 448 512">
            <path fill="#b43c3c" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
        </span>
        <span className="tooltip4">
          <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 512 512">
            <path fill="#ea8c4d" d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9l.3-.5z" />
          </svg>
        </span>
        <span className="tooltip9"> </span>
      </div>
    );
  }
}

