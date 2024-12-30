import { Component } from "react";
import logo from "./../assets/images/logotipo-positivo.jpg";
import services from '../services/services';
import '../assets/css/header.css';
import TooltipHeader from "./TooltipHeader";
class Header extends Component {

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
    return (
      <div className="container container__header" >
        <div className="header">
          <div className='logo'>
            <img src={logo} alt="Logo" style={{width: "200px"}} />
          </div>
          <TooltipHeader></TooltipHeader>
          {/* <div className="profile">
            <div className="name_user">👋🏻 Hola, {perfilUsuario.nombre}</div>
            <div className="user_photo"><img src="https://www.purina.com.bo/sites/default/files/styles/webp/public/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg.webp?itok=EQBVwxUr" alt="foto de perfil" /></div>
          </div> */}
        </div>
  
      </div>
    );
  }
};

export default Header;
