import React, { Component } from "react";
import services from "../services/services";
import { Navigate } from "react-router-dom";
import Card from "./CardCharla";
import PopupCharla from "./PopupCharla";
import BtnDel from "./BtnDel";
import BtnUpdate from "./BtnUpdate";

export default class Profile extends Component {
  state = {
    usuario: null,
    updated: false,
    token: true,
    allCharlas: [],
    charlas: [],
    rondas: [],
    estadoSeleccionado: "0",
    rondaSeleccionada: "0",
    showPopup: false,
    seleccionadaCharla: null,
    idCharlaSeleccionada: null,
    comentariosCharla: [],
    recursosCharla: [],
    showRecursos: false,
    idUsuarioCharlaSeleccionada: null,
    idComentarioSeleccionado: null
  };

  async getUsuario() {
    const data = await services.getPerfilUsuario();
    this.setState({ usuario: data.usuario });
    console.log("usuario", data.usuario);
  }

  getCharlasUser = () => {
    services.getCharlasUsuario().then((res) => {
      console.log("charlas user", res);
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


  filterCharlas = () => {
    const { allCharlas, rondaSeleccionada, estadoSeleccionado } = this.state;
    const charlasByRonda = rondaSeleccionada === "0" ? allCharlas : allCharlas.filter((c) => c.charla.idRonda === parseInt(rondaSeleccionada));
    const charlasByEstado = estadoSeleccionado === "0" ? charlasByRonda : charlasByRonda.filter((c) => c.charla.idEstadoCharla === parseInt(estadoSeleccionado));

    this.setState({ charlas: charlasByEstado });
  }

  //? Métodos por separado por si los queremos para otro component */
  // handleRondaChange = (event) => {
  //   const rondaSeleccionada = parseInt(event.target.value);
  //   console.log("charlas state", this.state.allCharlas);

  //   const charlasByRonda = this.state.allCharlas.filter((c) => {
  //     return c.charla.idRonda === rondaSeleccionada;
  //   });

  //   if (rondaSeleccionada === 0) {
  //     this.setState({ charlas: this.state.allCharlas, rondaSeleccionada });
  //   } else {
  //     this.setState({ charlas: charlasByRonda, rondaSeleccionada });
  //     console.log("charlasbyronda", charlasByRonda);
  //   }
  // }

  // handleEstadoChange = (event) => {
  //   const estadoSeleccionado = parseInt(event.target.value);
  //   const charlasByEstado = this.state.allCharlas.filter((c) => {
  //     return c.charla.idEstadoCharla === estadoSeleccionado;
  //   });

  //   if (estadoSeleccionado === 0) {
  //     this.setState({ charlas: this.state.allCharlas, estadoSeleccionado });
  //   } else {
  //     this.setState({ charlas: charlasByEstado, estadoSeleccionado });
  //     console.log("charlasbyestado", charlasByEstado);
  //   }
  // }


  handleCardClick = (charla) => {
    this.setState({
      idCharlaSeleccionada: charla.idCharla,
      seleccionadaCharla: charla,
      showPopup: true
    });
    services.getCharlaId(charla.idCharla).then((response) => {
      // console.log("charla id: " + JSON.stringify(response));
      this.setState({
        comentariosCharla: response.comentarios,
        recursosCharla: response.recursos,
        idUsuarioCharlaSeleccionada: response.charla.idUsuario
      });
    }).catch((error) => {
      console.error("Error fetching charla details:", error);
    });
  }

  handleClosePopup = () => {
    this.setState({
      seleccionadaCharla: null,
      showPopup: false
    });
  }

  updateCharla = () => {
    console.log("charla seleccionada: ", this.state.seleccionadaCharla);
    this.handleClosePopup();
    this.props.navigate('/updatecharla', { state: { charla: this.state.seleccionadaCharla } });
  }

  deleteCharla = () => {
    console.log("idCharla seleccionada: ", this.state.idCharlaSeleccionada);
    services.deleteCharla(this.state.idCharlaSeleccionada).then((response) => {
      this.getCharlasUser();
      this.handleClosePopup();
    }).catch((err) => {
      console.log(err);
    });
  }



  componentDidMount() {
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
    console.log("mounted");
    this.getCharlasUser();
    this.getRondas();
  }

  navigateUpdateProfile = () => {
    this.props.navigate('/updateprofile', { state: { usuario: this.state.usuario } });
  };

  render() {
    const { usuario } = this.state;

    return (
      <div>
        {!this.state.token && <Navigate to="/" state={{ mensaje: "Debes iniciar sesión para acceder a tu perfil" }} />}

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
              <h3 style={{ margin: "0", fontSize: "24px" }}>
                {this.state.allCharlas.filter((c) => {
                  return c.charla.idEstadoCharla === 1;
                }).length}
              </h3>
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
              <h3 style={{ margin: "0", fontSize: "24px" }}>
                {this.state.allCharlas.filter((c) => {
                  return c.charla.idEstadoCharla === 2;
                }).length}
              </h3>
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
                    <div key={index} className="col-12 col-sm-6 col-md-4 mb-4" onClick={() => this.handleCardClick(c.charla)} style={{ cursor: "pointer" }}>
                      <Card
                        imagen={c.charla.imagenCharla}
                        titulo={c.charla.titulo}
                        descripcion={c.charla.descripcion}
                      />
                    </div>
                  );
                })}
              </div>
              {/* Popup para charla seleccionada */}
              <PopupCharla show={this.state.showPopup} onClose={this.handleClosePopup}>
                {this.state.seleccionadaCharla && (
                  <>
                    {/* <div className="charla_estado">
                      <span className="estado" style={{
                        backgroundColor: this.state.seleccionadaCharla.estadoCharla === 'ACEPTADA' ? '#b7eab0' : '#e5a879',
                        color: this.state.seleccionadaCharla.estadoCharla === 'ACEPTADA' ? '#29721f' : '#d57018',
                      }}>{this.state.seleccionadaCharla.estadoCharla}</span>
                    </div> */}
                    <div className="charla_title">
                      <div className="title">
                        <h2 className="poiret-one-regular">{this.state.seleccionadaCharla.titulo}</h2>
                        <hr className="card_divisor"></hr>
                      </div>
                      <div className="icon_tiempo gap-1">
                        <div className="btnAcciones gap-3">
                          <BtnUpdate onClick={this.updateCharla}/>
                          <BtnDel onClick={this.deleteCharla}/>
                        </div>
                        <i className="fa-regular fa-clock icon ms-2"></i>
                        <span className="charla_tiempo">{this.state.seleccionadaCharla.tiempo} min.</span>
                      </div>
                    </div>
                    <div className="charla_image">
                      <img
                        src={this.state.seleccionadaCharla.imagenCharla}
                        alt={this.state.seleccionadaCharla.titulo}
                      />
                      <div className="charla_descripcion">
                        <span className="descripcion">{this.state.seleccionadaCharla.descripcion}</span>
                      </div>
                    </div>
                    <hr />
                    {/* Sección de recursos */}
                    {this.state.recursosCharla.length > 0 && (
                      <div className="recursos">
                        <h3 className="rec_title poiret-one-regular" onClick={this.toggleRecursos}>
                          {this.state.showRecursos ? (
                            <div className="rec_title">
                              <i className="fa-solid fa-chevron-up icon icon_recursos"></i>Recursos
                            </div>
                          ) : (
                            <div className="rec_title">
                              <i className="fa-solid fa-chevron-down icon icon_recursos"></i>Recursos
                            </div>
                          )}
                        </h3>
                        {this.state.showRecursos && (
                          <div className="recursos_content">
                            {this.state.recursosCharla.map((recurso, index) => (
                              <div className="rec_elementos" key={index}>
                                <span className="recurso_desc">{recurso.descripcion}</span>
                                <i className="fa-solid fa-arrow-right icon"></i>
                                <a className="recurso_link" href={recurso.url} target="_blank" rel="noopener noreferrer">{recurso.nombre}</a>
                              </div>
                            ))}
                          </div>
                        )}
                        <hr />
                      </div>
                    )}
                    {/* Sección de comentarios */}
                    <div className="comentarios">
                      <div className="comentarios_title">
                        <span className="comentarios_text">Comentarios</span>
                        <input className="comentarios_input" ref={this.cajaContenido} type="text" placeholder="Agregar nuevo comentario..." />
                        <button onClick={this.postComentario} className="comentarios_btn"><i className="fa-regular fa-paper-plane enviar_comentario icon" ></i></button>
                      </div>
                      <div className="comentarios_content">
                        {this.state.comentariosCharla.map((comentario, index) => {
                          return (
                            <div className="container_comentario" key={index}>
                              <div className="comentario">
                                <span className="comentario_text">{comentario.contenido}</span>
                                <span className="comentario_user">-{comentario.usuario}-</span>
                                {/* boton borrar */}
                                <div className="btnAcciones">
                                  <BtnDel className="btnDel--peq"/>
                                  <BtnUpdate className="btnUpdate--peq" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </PopupCharla>
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