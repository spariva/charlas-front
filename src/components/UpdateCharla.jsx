import React, { Component } from 'react'
import services from '../services/services'

export default class UpdateCharla extends Component {
  // cajaNombre = React.createRef();
  // cajaApellidos = React.createRef();
  // cajaEmail = React.createRef();
  // cajaPassword = React.createRef(); //getUsuario no devuelve password, por lo que pierdo la contraseña anterior al actulizar.
  // cajaImagen = React.createRef();


  // state = {
  //   usuario: null,
  // };

  // async getUsuario() {
  //   const data = await services.getPerfilUsuario();
  //   this.setState({ usuario: data.usuario });
  // }

  // componentDidMount() {
  //   const { usuario } = this.props.location.state || {};

  //   if (usuario) {
  //     this.setState({ usuario });
  //   } else {
  //     this.getUsuario();
  //   }
  // }

  // guardarCambios = (e) => {
  //   e.preventDefault();

  //   var userUpdated = {
  //     idUsuario: this.state.usuario.idUsuario,
  //     nombre: this.cajaNombre.current.value,
  //     apellidos: this.cajaApellidos.current.value,
  //     email: this.cajaEmail.current.value,
  //     estadoUsuario: this.state.usuario.estadoUsuario,
  //     imagen: this.cajaImagen.current.value,
  //     password: this.cajaPassword.current.value,
  //     idRole: this.state.usuario.idRole
  //   };

  //   const userCombined = { ...this.state.usuario, ...userUpdated };

  //   services.updatePerfilUsuario(userUpdated).then(res => {
  //     console.log(res);
  //   }).catch(err => {
  //     console.log(err);
  //     alert("Error al actualizar usuario");
  //   });

  //   this.props.navigate('/profile', { state: { usuario: userCombined, updated: true } });
  // };

  render() {
    // const { usuario } = this.state;

    return (
      <div>
        {/* Contenedor principal */}
        <div
          className="container-fluid"
          style={{
            maxWidth: "90%",
            margin: "30px auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            position: "relative",
          }}
        >
          {/* Perfil */}
          <div>
            {/* <form className="row g-3" onSubmit={this.guardarCambios}>
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="inputName"
                  defaultValue={usuario?.nombre} ref={this.cajaNombre} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputApellido" className="form-label">Apellidos</label>
                <input type="text" className="form-control" id="inputApellido"
                  defaultValue={usuario?.apellidos} ref={this.cajaApellidos} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail"
                  defaultValue={usuario?.email} ref={this.cajaEmail} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword" className="form-label">Password</label>
                <input type="text" className="form-control" id="inputPassword"
                  defaultValue={usuario?.password} ref={this.cajaPassword} />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputImagen" className="form-label">Imagen de perfil</label>
                <input type="text" className="form-control" id="inputImagen"
                  defaultValue={usuario?.imagen} ref={this.cajaImagen} />
              </div>
            </form> */}
            <div className='text-center'>
              <h1>Update charlas</h1>
              {/* <button className="btn btn-outline-dark mt-3" onClick={this.guardarCambios}>Guardar</button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
