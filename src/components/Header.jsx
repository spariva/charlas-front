import { Component } from "react";
import logo from "./../assets/images/logotipo-positivo.jpg";
import services from '../services/services';
import '../assets/css/header.css';
class Header extends Component {

  state = {
    perfilUsuario: []
  }
  componentDidMount() {
    this.getUsuario();
  }

  getUsuario() {
    services.getPerfilUsuario().then((response) => {
      console.log(response);
      this.setState({
        perfilUsuario: response
      })
    })
  }

  render() {
    const { perfilUsuario } = this.state;
    return (
      <div className="container container__header" >
        <div className="header">
          <div className='logo'>
            <img src={logo} alt="Logo" style={{width: "200px"}} />
          </div>
        <div className="profile">
          <div className="name_user">👋🏻 Hola, {perfilUsuario.usuario.nombre}</div>
          <div className="user_photo">{perfilUsuario.usuario.imagen}</div>
        </div>
        </div>
  
      </div>
    );
  }
};

export default Header;
