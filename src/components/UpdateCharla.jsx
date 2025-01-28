import React, { Component } from 'react'
import services from '../services/services'
import './../assets/css/updateProfile.css'

export default class UpdateCharla extends Component {
  cajaTitulo = React.createRef();
  cajaDescripcion = React.createRef();
  cajaTiempo = React.createRef();
  cajaFecha = React.createRef();
  cajaRonda = React.createRef();
  cajaImagen = React.createRef();

  state = {
    charla: null,
  };

  componentDidMount() {
    const { charla } = this.props.location.state || {};

    if (charla) {
      this.setState({ charla });
    } else {
      console.log("No se ha encontrado la charla");
    }
  }

  guardarCambios = (e) => {
    e.preventDefault();

    var charlaUpdated =
    {
      "idCharla": this.state.charla.idCharla,
      "titulo": this.cajaTitulo.current.value,
      "descripcion": this.cajaDescripcion.current.value,
      "tiempo": parseInt(this.cajaTiempo.current.value),
      "fechaPropuesta": this.cajaFecha.current.value,
      "idUsuario": this.state.charla.idUsuario,
      "idEstadoCharla": this.state.charla.idEstadoCharla,
      "idRonda": parseInt(this.cajaRonda.current.value),
      "imagenCharla": this.cajaImagen.current.value
    };
    const charlaCombined = { ...this.state.charla, ...charlaUpdated };

    services.updateCharla(charlaUpdated).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
      alert("Error al actualizar charla");
    });

    this.props.navigate('/profile', { state: { charlaUpdated: charlaCombined } });
  };

  render() {
    const { charla } = this.state;

    return (
      <div>
        {/* Contenedor principal */}
        <div
          className="container-fluid container_updateCharla"
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
          {/* Título */}
          <div className="title">
            <h1 className="poiret-one-regular">Editar charla</h1>
            <div className="underline"></div>
          </div>

          {/* Formulario */}
          <form className="row g-3" onSubmit={this.guardarCambios}>
            {/* Campo Título */}
            <div className="form-group col-md-6">                <input
                  type="text"
                  className="form-control"
                  id="inputTitulo"
                  defaultValue={charla?.titulo}
                  ref={this.cajaTitulo}
                  placeholder=" "
                />
                <label htmlFor="inputTitulo" className="floating-label">
                  Título
                </label>
            </div>

            {/* Campo Descripción */}
            <div className="form-group col-md-6">                <input
                  type="text"
                  className="form-control"
                  id="inputDescripcion"
                  defaultValue={charla?.descripcion}
                  ref={this.cajaDescripcion}
                  placeholder=" "
                />
                <label htmlFor="inputDescripcion" className="floating-label">
                  Descripción
                </label>
            </div>

            {/* Campo Tiempo */}
            <div className="form-group col-md-6">                <input
                  type="number"
                  className="form-control"
                  id="inputTiempo"
                  defaultValue={charla?.tiempo}
                  ref={this.cajaTiempo}
                  placeholder=" "
                />
                <label htmlFor="inputTiempo" className="floating-label">
                  Tiempo
                </label>
            </div>

            {/* Campo Fecha */}
            <div className="form-group col-md-6">                <input
                  type="datetime-local"
                  className="form-control"
                  id="inputFecha"
                  defaultValue={charla?.fechaPropuesta}
                  ref={this.cajaFecha}
                  placeholder=" "
                />
                <label htmlFor="inputFecha" className="floating-label">
                  Fecha
                </label>
            </div>

            {/* Campo Ronda */}
            <div className="form-group col-md-12">                <input
                  type="text"
                  className="form-control"
                  id="inputRonda"
                  defaultValue={charla?.idRonda}
                  ref={this.cajaRonda}
                  placeholder=" "
                />
                <label htmlFor="inputRonda" className="floating-label">
                  Ronda
                </label>
            </div>

            {/* Campo Imagen */}
            <div className="form-group col-md-12">                <input
                  type="text"
                  className="form-control"
                  id="inputImagen"
                  defaultValue={charla?.imagenCharla}
                  ref={this.cajaImagen}
                  placeholder=" "
                />
                <label htmlFor="inputImagen" className="floating-label">
                  Imagen de perfil
                </label>
            </div>

            {/* Botón Guardar */}
            <div className="text-center mt-3">
              <button type="submit" className="updateBtn btn btn-outline-dark">
                Guardar
              </button>
              <button className='btnCancelar' onClick={() => this.props.navigate(`/charla/${this.state.charla.idCharla}`, { state: { charla: this.state.charla } })}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
