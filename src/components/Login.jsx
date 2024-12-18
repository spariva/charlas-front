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
    isSignDiv: false,
    signUpObj: {
      name: '',
      email: '',
      password: ''
    },
    userName: '',
    password: ''
  }

  signUp = (e) => {
    e.preventDefault();
    var user = {
      name: this.cajaUserSignup.current.value,
      email: this.cajaEmailSignup.current.value,
      password: this.cajaPasswordSignup.current.value,
      rol: this.cajaRolSignup.current.value
    }

    axios.post(this.url + 'usuarios', user)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('token', res.response);
        this.setState({
          isSignDiv: false
        });
      });
  }

  login = (e) => {
    e.preventDefault();
    var user = {
      email: this.cajaUserLogin.current.value,
      password: this.cajaPasswordLogin.current.value
    }

    axios.post(this.url + 'login', user)
      .then(res => {
        console.log(res.data);
        this.setState({
          token: res.data
        });
      }).catch(err => {
        console.log(err);
      });
  }

  swap = () => {
    this.setState({
      isSignDiv: !this.state.isSignDiv
    });
  }


  render() {
    return (
      <div className="parent">
        <div className="isSignDiv ? 'active container' : 'container'" id="container">
          <div className="form-container sign-up">
            <form onSubmit={this.signUp}>
              <h1>Crear Cuenta</h1>
              <span>Introduzca nombre, mail y tipo de entidad</span>
              <input type="text" name="name" placeholder="Nombre" ref={this.cajaUserSignup} />
              <input type="email" name="email" placeholder="Email" ref={this.cajaEmailSignup} />
              <input type="password" name="password" placeholder="Contraseña" ref={this.cajaPasswordSignup} />
              <button>Crear cuenta</button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form onSubmit={this.login}>
              <h1>Iniciar Sesión</h1>
              <span>Introduzca apellido y contraseña</span>
              <input type="text" name="email" v-model="userName" placeholder="Email" />
              <input type="password" name="password" v-model="password" placeholder="Contraseña" />
              {/* <a href="#">→ ¿Olvidaste la contraseña? ←</a> */}
              <button >Acceder</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>E V O bank</h1>
                <p>¿Ya tienes una cuenta?</p>
                <button type="button" className="hidden" id="login" onClick={this.swap}>Conectarse</button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>E V O bank</h1>
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
