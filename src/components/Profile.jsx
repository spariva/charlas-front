import React, { Component } from "react";
import logo from "./../assets/images/logotipo-positivo.jpg";
import services from "../services/services";
import { Navigate } from "react-router-dom";
import Card from "./CardCharla";


export default class Profile extends Component {
  state = {
    usuario: null,
    updated: false,
    token: true,
    charlas: [],
    rondas: [],
    estadoCharla: [],
    rondaSeleccionada: ""
  };

  async getUsuario() {
    const data = await services.getPerfilUsuario();
    this.setState({ usuario: data.usuario });
  }

  getCharlasUser = () => {
    services.getCharlasUsuario().then((res) => {
      console.log(res);
      this.setState({ charlas: res });
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

  handleRondaChange = (event) => {
    const rondaSeleccionada = parseInt(event.target.value);
    console.log("charlas state", this.state.charlas)

    const charlasByRonda = this.state.charlas.filter((c) => {
      return c.charla.idRonda === rondaSeleccionada;
    });

    this.setState({ charlas: charlasByRonda });
    console.log("charlasbyronda", charlasByRonda);
    
  }

  navigateUpdateProfile = () => {
    console.log(this.state.usuario);
    this.props.navigate('/updateprofile', { state: { usuario: this.state.usuario } });
  };

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

  render() {
    const { usuario } = this.state;

    return (
      <div>
        {!this.state.token && <Navigate to="/login" state={{ mensaje: "Debes iniciar sesión para acceder a tu perfil" }} />}
        {/* Logo centrado */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={logo}
            alt="Logo de la página"
            style={{ maxWidth: "150px" }}
          />
        </div>

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
            <button className="btn btn-outline-dark" onClick={this.navigateUpdateProfile}>Editar perfil</button>
            <div
              className="divider"
              style={{
                borderTop: "2px solid black",
                width: "50%",
                margin: "10px auto",
              }}
            ></div>
            <div className="mt-4">
              {/* Rol y curso */}
              <p>
                <strong>Rol:</strong> {usuario?.role || "Cargando..."}
              </p>
              <p>
                <strong>Curso:</strong> {usuario?.curso || "Cargando..."}
              </p>
            </div>
            <div>

              {/* Filtro charlas */}
              <div className="row d-flex justify-content-end mt-4">
                <h2 className="my-4 text-center">Charlas</h2>
                <div className="col-6 col-md-3">
                  <select
                    className="form-select"
                    value={this.state.rondaSeleccionada}
                    onChange={this.handleRondaChange}
                  >
                    <option value="">Ronda</option>
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
                  >
                    <option value="">Estado</option>
                    {this.state.estadoCharla.map((estado, index) => {
                      return (
                        <option key={index} value={estado.idEstadoRonda}>
                          {estado.estado}
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
