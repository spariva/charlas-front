import React, { Component } from 'react'
import '../assets/css/login.css';
import { Navigate } from 'react-router-dom';
import services from "../services/services";

export default class Login extends Component {

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
    status: false,
    rol: "2",
    usuario: "",
  }


  signUp = (e) => {
    e.preventDefault();
    var userRegister = {
      idUsuario: 0,
      nombre: this.cajaNombreSignup.current.value,
      apellidos: this.cajaApellidosSignup.current.value,
      email: this.cajaEmailSignup.current.value,
      estadoUsuario: true,
      imagen: "stringimagen",
      password: this.cajaPasswordSignup.current.value,
      idRole: this.cajaRolSignup.current.value
    }

    if (this.state.rol === "2") {
      services.signUpAlumno(userRegister, this.cajaIdCursoSignup.current.value)
        .then(res => {
          this.setState({
            isRegistroForm: false,
            status: false
          });
          alert("Usuario registrado correctamente ahora inicie sesión");
        }).catch(err => {
          console.log(err);
          alert("Error al registrar usuario");
        });
    } else if (this.state.rol === "1") {
      console.log("signup profesor");
      services.signUpProfesor(userRegister, "yosoytuprofe")
        .then(res => {
          this.setState({
            isRegistroForm: false,
            status: false
          });
          alert("Usuario registrado correctamente ahora inicie sesión");
        }).catch(err => {
          console.log(err);
          alert("Error al registrar usuario");
        });
    } else {
      console.log("Error registro, rol ni 1, ni 2: ", this.state.rol);
      console.log(this.cajaRolSignup.current.value);
    }
    // services.login(user)
    // .then(res => {
    //   this.setState({ status: true });
    //   console.log("signup token: " + res);
    // }).catch(err => {
    //   console.log(err);
    //   alert("Error de credenciales al registrar usuario");
    // });
  }

  async getUsuario() {
    const data = await services.getPerfilUsuario();
    console.log("data" + data.usuario);
    this.setState({ usuario: data.usuario });
    return data.usuario;
  }

  login = (e) => {
    e.preventDefault();
    var user = {
      userName: this.cajaUserLogin.current.value,
      password: this.cajaPasswordLogin.current.value
    }

    services.login(user)
            .then(res => {
                this.props.onLogin(res); //Esto le pasa el token al padre, que es el Router
                return this.getUsuario();
            })
            .then(profile => {
                this.setState({ status: true });
				localStorage.setItem('userId', profile.idUsuario);
				localStorage.setItem('idRole', profile.idRole);
            })
            .catch(err => {
                console.log(err);
                alert("Error de credenciales");
            });
  }

  swap = () => {
    this.setState({
      isRegistroForm: !this.state.isRegistroForm
    });
  }

  handleRoleChange = (e) => {
    this.setState({ rol: e.target.value });
  }

  render() {
    const { location } = this.props;
    const mensaje = location.state?.mensaje;
    const placeholderCurso = this.state.rol === "2" ? "Curso" : "Key Profesor";

    return (
      <div className="login-parent-container">

        {/* {this.state.status && <Navigate to="/home" />} */}

        {mensaje && (
          <div className="alert alert-danger" role="alert">
            {mensaje}
          </div>
        )}

        <div className={`login-container ${this.state.isRegistroForm ? 'active' : ''}`}>
          <div className={`form-container sign-up ${this.state.isRegistroForm ? '' : 'active'}`}>
            <form onSubmit={this.signUp}>
              <h1>Crear Cuenta</h1>
              <span>Introduzca nombre, apellidos, mail, curso o key</span>
              <div className="d-flex align-items-center gap-3 mt-2">
                <input type="radio" name="rol" id="rol1" value="1" ref={this.cajaRolSignup} onChange={this.handleRoleChange} />
                <label htmlFor="rol1" className='me-4'>Profesor</label>
                <input type="radio" name="rol" id="rol2" value="2" ref={this.cajaRolSignup} onChange={this.handleRoleChange} />
                <label htmlFor="rol2">Alumno</label>
              </div>
              <input type="text" name="name" placeholder="Nombre" ref={this.cajaNombreSignup} />
              <input type="text" name="apellidos" placeholder="Apellidos" ref={this.cajaApellidosSignup} />
              <input type="email" name="email" placeholder="Email" ref={this.cajaEmailSignup} />
              <input type="password" name="password" placeholder="Contraseña" ref={this.cajaPasswordSignup} />
              <input type="number" name="idCurso" placeholder={placeholderCurso} ref={this.cajaIdCursoSignup} />
              <button>Crear cuenta</button>
            </form>
          </div>

          <div className={`form-container sign-in ${this.state.isRegistroForm ? 'active' : ''}`}>
            <form onSubmit={this.login}>
              <h1>Iniciar Sesión {this.props.mensaje}</h1>
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
