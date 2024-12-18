import React, { Component } from 'react'
import '../css/login.css';
import { Navigate } from 'react-router-dom';
import Global from '../Global.js';
import axios from 'axios';

export default class Login extends Component {
  url = Global.api;
  //falta curso y gestionar el rol

  cajaUserLogin = React.createRef();
  cajaPasswordLogin = React.createRef();

  cajaUserSignup = React.createRef();
  cajaEmailSignup = React.createRef();
  cajaPasswordSignup = React.createRef();
  cajaRolSignup = React.createRef();

  state = {
    isRegistroForm: false,
    status: false,
    signUpObj: {
      name: '',
      email: '',
      password: ''
    },
    loginObj: {
      name: '',
      password: ''
    }
  }

  signUp = (e) => {
    e.preventDefault();
    let request = "api/usuarios/newalumno/";

    var user = {
      idUsuario: 0,
      nombre: this.cajaUserSignup.current.value,
      apellidos: "string prueba",
      email: this.cajaEmailSignup.current.value,
      estadoUsuario: true,
      imagen: "string imagen",
      password: this.cajaPasswordSignup.current.value,
      idRole: 2 
    }
    //* 1 = admin, 2 = user de momento entiendo que aún no sabemos cómo se gestiona lo de ser profe.

    axios.post(this.url + request, user)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('token', res.response);
        this.setState({
          isRegistroForm: false,
          status: true
        }).catch(err => {
          console.log(err);
        });
      });
  }

  login = (e) => {
    e.preventDefault();

    let request = "api/auth/login";

    var user = {
      userName: this.cajaUserLogin.current.value,
      password: this.cajaPasswordLogin.current.value
    }

    axios.post(this.url + request, user)
      .then(res => {
        console.log(res.response);
        localStorage.setItem('token', res.response);
        this.setState({ status: true });
      }).catch(err => {
        console.log(err);
      });
  }

  swap = () => {
    this.setState({
      isRegistroForm: !this.state.isRegistroForm
    });
    console.log(this.state.isRegistroForm);
  }


  render() {
    return (
      <div className="login-container">
        {this.state.status === true && <Navigate to="/" />}

        <div className={`container ${this.state.isRegistroForm ? 'active' : ''}`}>
          <div className={`form-container sign-up ${this.state.isRegistroForm ? '' : 'active'}`}>
            <form onSubmit={this.signUp}>
              <h1>Crear Cuenta</h1>
              <span>Introduzca nombre, mail y tipo de entidad</span>
              <input type="text" name="name" placeholder="Nombre" ref={this.cajaUserSignup} />
              <input type="email" name="email" placeholder="Email" ref={this.cajaEmailSignup} />
              <input type="password" name="password" placeholder="Contraseña" ref={this.cajaPasswordSignup} />
              <button>Crear cuenta</button>
            </form>
          </div>

          <div className={`form-container sign-in ${this.state.isRegistroForm ? 'active' : ''}`}>
            <form onSubmit={this.login}>
              <h1>Iniciar Sesión</h1>
              <span>Introduzca apellido y contraseña</span>
              <input type="text" name="email" placeholder="Email" ref={this.cajaUserLogin}/>
              <input type="password" name="password" placeholder="Contraseña" ref={this.cajaPasswordLogin}/>
              {/* <a href="#">→ ¿Olvidaste la contraseña? ←</a> */}
              <button >Acceder</button>
            </form>
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Charlas Tajamar</h1>
                <p>¿Ya tienes una cuenta?</p>
                <button type="button" className="hidden" id="login" onClick={this.swap}>Conectarse</button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Charlas Tajamar</h1>
                <p>¿Aún no tienes cuenta?</p>
                <button type="button" className="hidden" id="register" onClick={this.swap}>Crear
                  cuenta</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
