import React, { Component } from 'react'
import services from '../services/services'
import './../assets/css/updateProfile.css'

export default class UpdateProfile extends Component {
  cajaNombre = React.createRef();
  cajaApellidos = React.createRef();
  cajaEmail = React.createRef();
  cajaPassword = React.createRef(); //getUsuario no devuelve password, por lo que pierdo la contraseña anterior al actulizar.
  cajaImagen = React.createRef();


  state = {
    usuario: null,
  };

  async getUsuario() {
    const data = await services.getPerfilUsuario();
    this.setState({ usuario: data.usuario });
  }

  componentDidMount() {
    const { usuario } = this.props.location.state || {};

    if (usuario) {
      this.setState({ usuario });
    } else {
      this.getUsuario();
    }
  }

  guardarCambios = (e) => {
    e.preventDefault();

    var userUpdated = {
      idUsuario: this.state.usuario.idUsuario,
      nombre: this.cajaNombre.current.value,
      apellidos: this.cajaApellidos.current.value,
      email: this.cajaEmail.current.value,
      estadoUsuario: this.state.usuario.estadoUsuario,
      imagen: this.cajaImagen.current.value,
      password: this.cajaPassword.current.value,
      idRole: this.state.usuario.idRole
    };

    const userCombined = { ...this.state.usuario, ...userUpdated };

    services.updatePerfilUsuario(userUpdated).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
      alert("Error al actualizar usuario");
    });

    this.props.navigate('/profile', { state: { usuario: userCombined, updated: true } });
  };

  render() {
    const { usuario } = this.state;

    return (
      <div>
        {/* Contenedor principal */}
        <div
          className="container-fluid container_updateProfile"
          style={{
            maxWidth: "90%",
            margin: "30px auto",
            padding: "30px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          {/* Perfil */}
          <div className="title">
            <h1 className='poiret-one-regular'>Editar Perfil</h1>
            <div className="underline"></div>
          </div>
          <div>
            <form className="row g-3" onSubmit={this.guardarCambios}>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="inputName"
                  defaultValue={usuario?.nombre} ref={this.cajaNombre} placeholder=" " />
                <label htmlFor="inputName" className="floating-label">Nombre</label>
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="inputApellido"
                  defaultValue={usuario?.apellidos} ref={this.cajaApellidos} placeholder=" " />
                <label htmlFor="inputApellido" className="floating-label">Apellidos</label>
              </div>
              <div className="form-group col-md-6">
                <input type="email" className="form-control" id="inputEmail"
                  defaultValue={usuario?.email} ref={this.cajaEmail} placeholder=" " />
                <label htmlFor="inputEmail" className="floating-label">Email</label>
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="inputPassword"
                  defaultValue={usuario?.password} ref={this.cajaPassword} placeholder=" " />
                <label htmlFor="inputPassword" className="floating-label">Password</label>
              </div>
              <div className="form-group col-md-12">
                <input type="text" className="form-control" id="inputImagen"
                  defaultValue={usuario?.imagen} ref={this.cajaImagen} placeholder=" " />
                <label htmlFor="inputImagen" className="floating-label">Imagen de perfil</label>
              </div>
            </form>
            <div className="text-center">
              <button className="btn btn-outline-dark mt-3" onClick={this.guardarCambios}>Guardar</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
