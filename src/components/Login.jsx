import React, { Component } from 'react'
import '../assets/css/login.css';
import { Navigate } from 'react-router-dom';
import Global from '../Global.js';
import axios from 'axios';
import services from "../services/services";

export default class Login extends Component {
  url = Global.api;

  cajaUserLogin = React.createRef();
  cajaPasswordLogin = React.createRef();

  cajaNombreSignup = React.createRef();
  cajaApellidosSignup = React.createRef();
  cajaIdCursoSignup = React.createRef();
  cajaEmailSignup = React.createRef();
  cajaPasswordSignup = React.createRef();
  cajaRolSignup = React.createRef();

  //isRegistroForm: es si el usuario está en el formulario de registro o no. El status es si el usuario está logueado o no.
  state = {
    isRegistroForm: false,
    status: false
  }

  signUp = (e) => {
    e.preventDefault();
    let request = "api/usuarios/newalumno/" + 3213;

    var user = {
      idUsuario: 0,
      nombre: this.cajaNombreSignup.current.value,
      apellidos: this.cajaApellidosSignup.current.value,
      email: this.cajaEmailSignup.current.value,
      estadoUsuario: true,
      imagen: "stringimagen", 
      password: this.cajaPasswordSignup.current.value,
      idRole: 2
    }
    //*Había pensado que el ponerte imagen sea en tu perfil en vez del registro.
    // 1 = admin, 2 = user de momento entiendo que aún no sabemos cómo se gestiona lo de ser profe.

    axios.post(this.url + request, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log("token: " + res.data.response);
        localStorage.setItem('token', res.data.response);
        this.setState({
          isRegistroForm: false,
          status: true
        })
      }).catch(err => {
        console.log(err);
        alert("Error al registrar usuario");
      });;
  }

  login = (e) => {
    e.preventDefault();
    var user = {
      userName: this.cajaUserLogin.current.value,
      password: this.cajaPasswordLogin.current.value
    }

    services.login(user)
      .then(res => {
        this.setState({ status: true });
        console.log("token component: " + res);
      }).catch(err => {
        console.log(err);
      });
  }

  swap = () => {
    this.setState({
      isRegistroForm: !this.state.isRegistroForm
    });
  }


  render() {
    return (
      <div className="login-parent-container">
        {this.state.status === true && <Navigate to="/profile" />}

        <div className={`login-container ${this.state.isRegistroForm ? 'active' : ''}`}>
          <div className={`form-container sign-up ${this.state.isRegistroForm ? '' : 'active'}`}>
            <form onSubmit={this.signUp}>
              <h1>Crear Cuenta</h1>
              <span>Introduzca nombre, apellidos, mail, curso</span>
              <input type="text" name="name" placeholder="Nombre" ref={this.cajaNombreSignup} />
              <input type="text" name="apellidos" placeholder="Apellidos" ref={this.cajaApellidosSignup} />
              <input type="email" name="email" placeholder="Email" ref={this.cajaEmailSignup} />
              <input type="password" name="password" placeholder="Contraseña" ref={this.cajaPasswordSignup} />
              <input type="number" name="idCurso" placeholder="Curso" ref={this.cajaIdCursoSignup} />
              <button>Crear cuenta</button>
            </form>
          </div>

          <div className={`form-container sign-in ${this.state.isRegistroForm ? 'active' : ''}`}>
            <form onSubmit={this.login}>
              <h1>Iniciar Sesión</h1>
              <span>Introduzca email y contraseña</span>
              <input type="text" name="email" placeholder="Email" ref={this.cajaUserLogin} />
              <input type="password" name="password" placeholder="Contraseña" ref={this.cajaPasswordLogin} />
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
