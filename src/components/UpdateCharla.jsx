import React, { Component } from 'react'
import services from '../services/services'

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

  charla = {
    "descripcion": "descripcion",
    "estadoCharla": "PROPUESTA",
    "fechaPropuesta": "2025-01-30T22:41:00",
    "idCharla": 83,
    "idCurso": 3213,
    "idEstadoCharla": 1,
    "idRonda": 10,
    "idUsuario": 18,
    "imagenCharla": "https://avatars.githubusercontent.com/u/110998002?v=4",
    "nombreCurso": "Master Desarrollo Cloud",
    "tiempo": 30,
    "titulo": "Titulo charla",
    "usuario": "Maki Spariva Mirón Olona"
  }


  // async getcharla() {
  //   const data = await services.getPerfilcharla();
  //   this.setState({ charla: data.charla });
  // }

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
      "tiempo": this.cajaTiempo.current.value,
      "fechaPropuesta": this.cajaFecha.current.value,
      "idUsuario": this.state.charla.idUsuario,
      "idEstadoCharla": this.state.charla.idEstadoCharla,
      "idRonda": this.cajaRonda.current.value,
      "imagenCharla": this.cajaImagen.current.value
    }

    // const userCombined = { ...this.state.charla, ...charlaUpdated };
    
    services.updateCharla(charlaUpdated).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
      alert("Error al actualizar charla");
    });

    //*TODO: pasar de vuelta la charla para que cambie sus datos dentro dela array de charlas this.props.navigate('/profile', { state: { charla: userCombined, updated: true } });
    this.props.navigate('/profile');
  };

  render() {
    const { charla } = this.state;

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
          {/* UpdateCharla */}
          <div>
            <h1 className='text-center mb-4'>Editar charla:</h1>
            <form className="row g-3" onSubmit={this.guardarCambios}>
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">Título</label>
                <input type="text" className="form-control" id="inputName"
                  defaultValue={charla?.titulo} ref={this.cajaTitulo} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDescripcion" className="form-label">Descripcion</label>
                <input type="text" className="form-control" id="inputDescripcion"
                  defaultValue={charla?.descripcion} ref={this.cajaDescripcion} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail" className="form-label">Tiempo</label>
                <input type="number" className="form-control" id="inputEmail"
                  defaultValue={charla?.tiempo} ref={this.cajaTiempo} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword" className="form-label">Fecha</label>
                <input type="datetime-local" className="form-control" id="inputPassword"
                  defaultValue={charla?.password} ref={this.cajaFecha} />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputImagen" className="form-label">Ronda</label>
                <input type="text" className="form-control" id="inputImagen"
                  defaultValue={charla?.idRonda} ref={this.cajaRonda} />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputImagen" className="form-label">Imagen de perfil</label>
                <input type="text" className="form-control" id="inputImagen"
                  defaultValue={charla?.imagen} ref={this.cajaImagen} />
              </div>
            </form>
            <div className='text-center'>
              <button className="btn btn-outline-dark mt-4" onClick={this.guardarCambios}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
