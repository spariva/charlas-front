import React, { Component } from 'react'
import '../css/Login.css' 
import { Navigate } from 'react-router-dom';
import Global from '../Global.js';
import axios from 'axios';

export default class Login extends Component {
  url = Global.api;

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
    password: '',
    token: ''
  }


  render() {
    return (
      <div>
    <div className="parent">
      <div className="isSignDiv ? 'active container' : 'container'"  id="container">
        <div className="form-container sign-up">
          <form onSubmit={this.signUp}>
            <h1>Crear Cuenta</h1>
            <span>Introduzca nombre, mail y tipo de entidad</span>
            <input type="text" name="name" v-model="signUpObj.name" placeholder="Nombre">
            <input type="email" name="email" v-model="signUpObj.email" placeholder="Email">
            <input type="password" name="password" v-model="signUpObj.password" placeholder="Contraseña">
            <button>Crear cuenta</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={this.login}>
            <h1>Iniciar Sesión</h1>
            <span>Introduzca apellido y contraseña</span>
            <input type="text" name="email" v-model="userName" placeholder="Email">
            <input type="password" name="password" v-model="password" placeholder="Contraseña">
            <a href="#">→ ¿Olvidaste la contraseña? ←</a>
            <button >Acceder</button>
            <p v-if="token">{{ token }}</p>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>E V O bank</h1>
              <p>¿Ya tienes una cuenta?</p>
              <button type="button" className="hidden" id="login" @click="swap()">Conectarse</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>E V O bank</h1>
              <p>¿Aún no tienes cuenta?</p>
              <button type="button" className="hidden" id="register" @click="swap()">Crear
                cuenta</button>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    )
  }
}
