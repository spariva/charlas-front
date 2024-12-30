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
        </div>
  
      </div>
    );
  }
};

export default Header;
