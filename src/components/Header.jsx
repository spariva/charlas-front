import { Component } from "react";
import logo from "./../assets/images/logotipo-positivo.jpg";
import '../assets/css/header.css';
import TooltipHeader from "./TooltipHeader";

class Header extends Component {
  state = {
    tokenAvailable: false,
    token: this.props.useLocalStorage("token", null),
  };

  componentDidMount() {
    this.checkToken();
  }

  // Función para verificar si el token está presente
  checkToken() {
    const toke = localStorage.getItem("token");
    if (toke) {
      this.setState({ tokenAvailable: true, token: toke  }); 
    } else {
      this.setState({ tokenAvailable: false, token: null });
    }
  }

  render() {
    const { tokenAvailable, token } = this.state;
    return (
      <div className="container container__header">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="Logo" style={{ width: "200px" }} />
          </div>
          {/* Mostrar TooltipHeader solo si el token está presente */}
          {tokenAvailable && token && <TooltipHeader />}
        </div>
      </div>
    );
  }
}

export default Header;
