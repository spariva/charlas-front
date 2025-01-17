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
    window.addEventListener('storage', this.handleStorageChange);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange);
  }

  handleStorageChange = (event) => {
    if (event.key === 'token') {
      console.log("handle", event.newValue);
      this.checkToken();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const isTokenAvailable = !!localStorage.getItem("token");
    if (isTokenAvailable !== this.state.tokenAvailable) {
      console.log("Token has changed", isTokenAvailable);
      this.setState({ tokenAvailable: isTokenAvailable });
    }
  }

  // Función para verificar si el token está presente
  checkToken() {
    const token = localStorage.getItem("token");
    console.log("Token", !!token);
    this.setState({ tokenAvailable: !!token });
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
