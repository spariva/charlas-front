import React, { Component } from "react";
import services from "../services/services";
import { Navigate } from "react-router-dom";
import Card from "./CardCharla";

export default class Profile extends Component {
  state = {
    usuario: null,
    updated: false,
    token: true,
    allCharlas: [],
    charlas: [],
    rondas: [],
    estadoSeleccionado: "",
    rondaSeleccionada: ""
  };

  async getUsuario() {
    const data = await services.getPerfilUsuario();
    this.setState({ usuario: data.usuario });
  }

  getCharlasUser = () => {
    services.getCharlasUsuario().then((res) => {
      console.log(res);
      this.setState({ charlas: res, allCharlas: res });
    }).catch((err) => {
      console.log(err);
    });
  }

  getRondas = () => {
    services.getRondasCurso().then((response) => {
      this.setState({
        rondas: response
      });
      console.log("rondas", response);
    });
  }

  handleFilterChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.filterCharlas);
  }

  //! Ahora mismo no funciona bien el combo de ronda y estado, y por separado sí */
  filterCharlas = () => {
    const { allCharlas, rondaSeleccionada, estadoSeleccionado } = this.state;

    const charlasByRonda = rondaSeleccionada === "0"
      ? allCharlas
      : allCharlas.filter((c) => c.charla.idRonda === parseInt(rondaSeleccionada));

    const charlasByEstado = estadoSeleccionado === "0"
      ? charlasByRonda
      : charlasByRonda.filter((c) => c.charla.idEstadoCharla === parseInt(estadoSeleccionado));

    this.setState({ charlas: charlasByEstado });
  }

  handleRondaChange = (event) => {
    const rondaSeleccionada = parseInt(event.target.value);
    console.log("charlas state", this.state.allCharlas);

    const charlasByRonda = this.state.allCharlas.filter((c) => {
      return c.charla.idRonda === rondaSeleccionada;
    });

    if (rondaSeleccionada === 0) {
      this.setState({ charlas: this.state.allCharlas, rondaSeleccionada });
    } else {
      this.setState({ charlas: charlasByRonda, rondaSeleccionada });
      console.log("charlasbyronda", charlasByRonda);
    }
  }

  handleEstadoChange = (event) => {
    const estadoSeleccionado = parseInt(event.target.value);
    const charlasByEstado = this.state.allCharlas.filter((c) => {
      return c.charla.idEstadoCharla === estadoSeleccionado;
    });

    if (estadoSeleccionado === 0) {
      this.setState({ charlas: this.state.allCharlas, estadoSeleccionado });
    } else {
      this.setState({ charlas: charlasByEstado, estadoSeleccionado });
      console.log("charlasbyestado", charlasByEstado);
    }
  }

  componentDidMount() {
    //Si no hay token te redirige al login con un mensaje
    if (!localStorage.getItem("token")) {
      this.setState({ token: false });
      return;
    }

    const { usuario, updated } = this.props.location.state || {};
    if (usuario) {
      this.setState({ usuario, updated });
    } else {
      this.getUsuario();
    }

    this.getCharlasUser();
    this.getRondas();
  }

  navigateUpdateProfile = () => {
    console.log(this.state.usuario);
    this.props.navigate('/updateprofile', { state: { usuario: this.state.usuario } });
  };

  render() {
    const { usuario } = this.state;
    return (
      <div>
        {!this.state.token && <Navigate to="/login" state={{ mensaje: "Debes iniciar sesión para acceder a tu perfil" }} />}

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
          {/* Tarjetas de estadísticas */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              display: "flex",
              gap: "15px",
            }}
          >
            <div
              className="info-box"
              style={{
                textAlign: "center",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                width: "100px",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "24px" }}>3</h3>
              <p style={{ margin: "0", fontSize: "14px", color: "gray" }}>
                Propuestas
              </p>
            </div>
            <div
              className="info-box"
              style={{
                textAlign: "center",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                width: "100px",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "24px" }}>1</h3>
              <p style={{ margin: "0", fontSize: "14px", color: "gray" }}>
                Aceptadas
              </p>
            </div>
          </div>

          {/* Perfil */}
          <div style={{ textAlign: "center" }}>
            {/* Imagen de perfil */}
            <img
              src={usuario?.imagen || "https://th.bing.com/th?id=OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH&w=255&h=245&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}
              alt="Foto de perfil"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            {/* Nombre del usuario */}
            <h2 className="fw-bold">{usuario?.nombre || "Cargando..."}</h2>
            {/* Email del usuario */}
            <p className="text-muted">{usuario?.email || "Cargando..."}</p>
            <div className="mt-4">
              {/* Rol y curso */}
              <p>
                <strong>Rol:</strong> {usuario?.role || "Cargando..."}
              </p>
              <p>
                <strong>Curso:</strong> {usuario?.curso || "Cargando..."}
              </p>
            </div>
            <button className="btn btn-outline-dark m-2 mb-3" onClick={this.navigateUpdateProfile}>Editar perfil</button>

            <div
              className="divider"
              style={{
                borderTop: "2px solid black",
                width: "50%",
                margin: "10px auto",
              }}
            ></div>

            <div>

              {/* Filtro charlas */}
              <div className="row d-flex justify-content-end mt-2">
                <h2 className="my-4 text-center">Mis charlas:</h2>
                <div className="col-6 col-md-3">
                  <select
                    className="form-select"
                    name="rondaSeleccionada"
                    value={this.state.rondaSeleccionada}
                    onChange={this.handleFilterChange}
                  >
                    <option value="0">Todas las rondas</option>
                    {this.state.rondas.map((ronda, index) => {
                      return (
                        <option key={index} value={ronda.idRonda}>
                          Ronda {ronda.descripcionModulo}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <select
                    className="form-select"
                    name="estadoSeleccionado"
                    value={this.state.estadoSeleccionado}
                    onChange={this.handleFilterChange}
                  >
                    <option value="0">Cualquier estado</option>
                    {estadosCharla.map((e, index) => {
                      return (
                        <option key={index} value={e.idEstadoCharla}>
                          {e.estado}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Fila de charlas */}

              <div className="row d-flex flex-wrap justify-content-start">
                {this.state.charlas.map((c, index) => {
                  return (
                    <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
                      <Card
                        imagen={c.charla.imagenCharla}
                        titulo={c.charla.titulo}
                        descripcion={c.charla.descripcion}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const estadosCharla = [
  {
    "idEstadoCharla": 1,
    "estado": "PROPUESTA"
  },
  {
    "idEstadoCharla": 2,
    "estado": "ACEPTADA"
  }
];