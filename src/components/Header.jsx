import { Component } from "react";
import logo from "./../assets/images/logotipo-positivo.jpg";
import services from '../services/services';
import '../assets/css/header.css';
import TooltipHeader from "./TooltipHeader";

class Header extends Component {
  state = {
    tokenAvailable: false,
  };

  componentDidMount() {
    this.checkToken();
  }

  // Función para verificar si el token está presente
  checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ tokenAvailable: true }); 
    } else {
      this.setState({ tokenAvailable: false });
    }
  }

  render() {
    const { tokenAvailable } = this.state;
    return (
      <div className="container container__header">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="Logo" style={{ width: "200px" }} />
          </div>
          {/* Mostrar TooltipHeader solo si el token está presente */}
          {tokenAvailable && <TooltipHeader />}
        </div>
      </div>
    );
  }
}

export default Header;
