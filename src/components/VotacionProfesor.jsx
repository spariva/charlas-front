import React, { Component } from 'react';
import services from "../services/services";
import Card from "./CardCharla";
import PopupCharla from "./PopupCharla";
import BtnDel from "./BtnDel";
import BtnUpdate from "./BtnUpdate";
import './../assets/css/perfil.css';

export default class votacionProfesor extends Component {
  state = {
    usuario: null,
    updated: false,
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
    idComentarioSeleccionado: null,
    idUsuarioPerfil: null,
    recursoSeleccionado: null,
    comentarioEditar: '',
    idComentarioEditar: null,
    votos: [],
    votosCharla: 0
  };

  async getUsuario() {
    const data = await services.getPerfilUsuario();
    this.setState({ usuario: data.usuario });
  }

  getCharlasCurso = () => {
    services.getCharlasCurso().then((res) => {
      console.log("charlas votacion curso: ", res);
      this.setState({ charlas: res, allCharlas: res });
    }).catch((err) => {
      console.log(err);
    });
  }

  getPerfil = () => {
    services.getPerfilUsuario().then((response) => {
      this.setState({
        idUsuarioPerfil: response.usuario.idUsuario
      })
    })
  }

  getRondas = () => {
    services.getRondasCurso().then((response) => {
      this.setState({
        rondas: response
      });
    });
  }

  handleFilterChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.filterCharlas);
  }


  filterCharlas = () => {
    const { allCharlas, rondaSeleccionada, estadoSeleccionado } = this.state;
    const charlasByRonda = rondaSeleccionada === "0" ? allCharlas : allCharlas.filter((charla) => charla.idRonda === parseInt(rondaSeleccionada));
    const charlasByEstado = estadoSeleccionado === "0" ? charlasByRonda : charlasByRonda.filter((charla) => charla.idEstadoCharla === parseInt(estadoSeleccionado));

    this.setState({ charlas: charlasByEstado });
    this.getVotosRondas();
  }

  getVotosRondas = () => {
    services.getVotosRonda(this.state.rondaSeleccionada).then(res =>{
      console.log("votosRondas ", res);
      this.setState({ votos: res })
    }).catch(err => {
      console.log(err);
    })
  }

  getVotosCharla = () => {
    services.getVotosCharla(this.state.idCharlaSeleccionada).then(res =>{
      console.log("votos charla ", res);
      this.setState({ votosCharla: res.votos })
    }).catch(err => {
      console.log(err);
    })
  }


  handleCardClick = (charla) => {
    this.setState({
      idCharlaSeleccionada: charla.idCharla,
      seleccionadaCharla: charla,
      showPopup: true
    });
    services.getCharlaId(charla.idCharla).then((response) => {
      this.setState({
        comentariosCharla: response.comentarios,
        recursosCharla: response.recursos,
        idUsuarioCharlaSeleccionada: response.charla.idUsuario,
      });
    })
  }

  handleClosePopup = () => {
    this.setState({
      seleccionadaCharla: null,
      showPopup: false
    });
  }

  // Función para alternar la visibilidad de los recursos
  toggleRecursos = () => {
    this.setState(prevState => ({
      showRecursos: !prevState.showRecursos
    }));
  }

  cajaContenido = React.createRef();

  postComentario = (e) => {
    e.preventDefault();
    let comentarioText = this.cajaContenido.current.value;
    let idCharla = this.state.idCharlaSeleccionada;
    let idUsuario = this.state.idUsuarioCharlaSeleccionada;
    let date = new Date();
    let comentario = {
      "idComentario": 0,
      "idCharla": idCharla,
      "idUsuario": idUsuario,
      "contenido": comentarioText,
      "fecha": date
    }

    services
      .postComentario(comentario)
      .then(() => {
        console.log("Comentario agregado");
        return services.getCharlaId(idCharla);
      })
      .then((charlaData) => {
        console.log("Comentarios actualizados:", charlaData.comentarios);

        this.setState({
          comentariosCharla: charlaData.comentarios,
        });

        this.cajaContenido.current.value = "";
      })
      .catch((error) => {
        console.error("Error al enviar el comentario o actualizar comentarios:", error);
      });
  }
  //borrar un comentario
  deleteComentario = (idComentario) => {
    services
      .deleteComentario(idComentario)
      .then(() => {
        console.log(`Comentario con ID ${idComentario} eliminado`);
        return services.getCharlaId(this.state.idCharlaSeleccionada);
      })
      .then((charlaData) => {
        this.setState({
          comentariosCharla: charlaData.comentarios,
        });
      })
      .catch((error) => {
        console.error(`Error al eliminar comentario con ID ${idComentario}:`, error);
      });
  }

  handleEditComentario = (comentario) => {
    console.log(comentario);
    this.setState({
      comentarioEditar: comentario.contenido,
      idComentarioEditar: comentario.idComentario,
    });
  };

  handleComentarioAction = (e) => {
    e.preventDefault();
    // Si estamos editando un comentario
    if (this.state.idComentarioEditar) {
      this.updateComentario(e);
      //si vamos a añadir un comentario
    } else {
      this.postComentario(e);
    }
  };

  updateComentario = (e) => {
    e.preventDefault();
    let comentarioText = this.state.comentarioEditar;
    let idComentario = this.state.idComentarioEditar;

    let comentario = {
      idComentario: idComentario,
      "idCharla": this.state.idCharlaSeleccionada,
      "idUsuario": this.state.idUsuarioPerfil,
      "contenido": comentarioText,
      "fecha": new Date(),
    };

    services.updateComentario(comentario)
      .then(() => {
        console.log("Comentario actualizado");
        return services.getCharlaId(this.state.idCharlaSeleccionada);
      })
      .then((charlaData) => {
        this.setState({
          comentariosCharla: charlaData.comentarios,
          comentarioEditar: "",  // Limpiar el campo de edición
          idComentarioEditar: null,
        });
      })
      .catch((error) => {
        console.error("Error al actualizar el comentario:", error);
      });
  };

  updateEstadoCharla = () => {
    let estado = this.state.seleccionadaCharla.idEstado === 1 ? 2 : 1;
    console.log("id y estado", this.state.idCharlaSeleccionada, estado);
    services.updateEstadoCharla(this.state.idCharlaSeleccionada, estado).then((response) => {
      console.log("charla actualizada: ", response);
      this.setState({
        votosCharla: response
      });
    }).catch((err) => {
      console.log("error del update estado charla; ", err);
    });
  }

  componentDidMount() {
    this.getPerfil();
    this.getCharlasCurso();
    this.getRondas();
  }

  render() {
    return (
      <div>
        {/* Contenedor principal */}
        <div
          className="container-fluid"
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
          {/* Tarjetas de estadísticas */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              display: "flex",
              gap: "10px",
            }}
          >
            <div
              className="info-box"
              style={{
                textAlign: "center",
                padding: "10px",
                border: "2px solid rgb(226, 132, 60)",
                borderRadius: "5px",
                width: "100px",
                backgroundColor: "#e5a879",
                color: "white"
              }}
            >
              <h3 style={{ margin: "0", fontSize: "24px" }}>
                {this.state.charlas.filter((charla) => {
                  return charla.idEstadoCharla === 1;
                }).length}
              </h3>
              <p style={{ margin: "0", fontSize: "14px" }}>
                Propuestas
              </p>
            </div>
            <div
              className="info-box"
              style={{
                textAlign: "center",
                padding: "10px",
                border: "2px solid rgb(29, 96, 190)",
                borderRadius: "5px",
                width: "100px",
                backgroundColor: "rgb(66, 155, 227)",
                color: "white"
              }}
            >
              <h3 style={{ margin: "0", fontSize: "24px" }}>
                {this.state.votos.votoscompletados ?? 0}  
              </h3>
              <p style={{ margin: "0", fontSize: "14px" }}>
                Votos
              </p>
            </div>
            <div
              className="info-box"
              style={{
                textAlign: "center",
                padding: "10px",
                border: "2px solid rgb(103, 176, 94)",
                borderRadius: "5px",
                width: "100px",
                backgroundColor: "rgb(132, 203, 123)",
                color: "white"
              }}
            >
              <h3 style={{ margin: "0", fontSize: "24px" }}>
                {this.state.charlas.filter((charla) => {
                  return charla.idEstadoCharla === 2;
                }).length}
              </h3>
              <p style={{ margin: "0", fontSize: "14px" }}>
                Aceptadas
              </p>
            </div>
          </div>

          <div>
            {/* Filtro charlas con encabezado desplegable */}
            <div className="row d-flex justify-content-end mt-2">
              <div className="misCharlas" onClick={() => this.setState((prevState) => ({ showCharlas: !prevState.showCharlas }))}>
                <h3 className="misCharlas_title">Charlas</h3>
                <i
                  className={`fa-solid ${this.state.showCharlas ? "fa-chevron-up" : "fa-chevron-down"
                    }`}
                  style={{ fontSize: "1.2rem", color: "#bdbdbd" }}
                ></i>
              </div>

              {this.state.showCharlas && (
                <div>
                  {/* Controles de filtro */}
                  <div className="row d-flex justify-content-end mt-2">
                    <div className="col-6 col-md-3">
                      <select
                        className="form-select"
                        name="rondaSeleccionada"
                        value={this.state.rondaSeleccionada}
                        onChange={this.handleFilterChange}
                      >
                        <option value="0">Ronda</option>
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
                        <option value="0">Estado</option>
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

                  {/* Contenido de las tarjetas */}
                  <div className="row d-flex flex-wrap justify-content-start">
                    {this.state.charlas.map((charla, index) => {
                      return (
                        <div
                          key={index}
                          className="col-12 col-sm-6 col-md-4 mb-4"
                          onClick={() => this.handleCardClick(charla)}
                          style={{ cursor: "pointer" }}
                        >
                          <Card
                            imagen={charla.imagenCharla}
                            titulo={charla.titulo}
                            descripcion={charla.descripcion}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Popup para charla seleccionada */}
            <PopupCharla show={this.state.showPopup} onClose={this.handleClosePopup}>
              {this.state.seleccionadaCharla && (
                <>
                  <div className="charla_estado">
                    <span className="estado" style={{
                      backgroundColor: this.state.seleccionadaCharla.estadoCharla === 'ACEPTADA' ? '#b7eab0' : '#e5a879',
                      color: this.state.seleccionadaCharla.estadoCharla === 'ACEPTADA' ? '#29721f' : '#d57018',
                    }}>{this.state.seleccionadaCharla.estadoCharla}</span>
                  </div>
                   {/* Tarjetas de estadísticas */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "8%",
              display: "flex",
              gap: "12px",
            }}
          >
            <div
              className="info-box"
              style={{
                textAlign: "center",
                padding: "5px",
                border: "2px solid rgb(29, 96, 190)",
                borderRadius: "5px",
                width: "100px",
                backgroundColor: "rgb(66, 155, 227)",
                color: "white",
                gap: "2 px",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "24px" }}>
                {this.state.votosCharla}  
              </h3>
              <p style={{ margin: "0", fontSize: "14px" }}>
                Votos
              </p>
            </div>
            <button className='btn btn-outline-success' onClick={this.updateEstadoCharla}>ACEPTAR!! </button>
          </div>
                  <div className="charla_title">
                    <div className="title">
                      <h2 className="poiret-one-regular">{this.state.seleccionadaCharla.titulo}</h2>
                      <hr className="card_divisor"></hr>
                    </div>
                    <div className="icon_tiempo me-4">
                      <i className="fa-regular fa-clock icon"></i>
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
                  <div className="recursos">
                    <div className="recu_title">
                      <div className="recursosElements">
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

                      </div>
                    </div>
                    {this.state.showRecursos && (
                      <div className="recursos_content">
                        {this.state.recursosCharla.map((recurso, index) => (
                          <div className="rec_elementos" key={index}>
                            <a className="recurso_link" href={recurso.url} target="_blank" rel="noreferrer">{recurso.nombre}</a>
                            <i class="fa-solid fa-arrow-right icon"></i>
                            <span className="recurso_desc">{recurso.descripcion}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <hr />
                  </div>
                  {/* Sección de comentarios */}
                  <div className="comentarios">
                    <div className="comentarios_title">
                      <span className="comentarios_text">Comentarios</span>
                      <input className="comentarios_input" ref={this.cajaContenido} type="text" placeholder="Agregar nuevo comentario..." value={this.state.comentarioEditar || ""} // Vinculamos el valor del input al estado comentarioEditar
                        onChange={(e) => this.setState({ comentarioEditar: e.target.value })} />
                      <button onClick={(e) => this.handleComentarioAction(e)} className="comentarios_btn"><i className="fa-regular fa-paper-plane enviar_comentario icon" ></i></button>
                    </div>
                    <div className="comentarios_content">
                      {this.state.comentariosCharla.map((comentario, index) => {
                        return (
                          <div key={index} className="container_comentario">
                            <div className="comentario">
                              <span className="comentario_text">{comentario.contenido}</span>
                              <span className="comentario_user">-{comentario.usuario}-</span>
                              {comentario.idUsuario === this.state.idUsuarioPerfil && (
                                <div className="btnAcciones">
                                  <BtnDel
                                    className="btnDel--peq"
                                    onClick={() => this.deleteComentario(comentario.idComentario)}
                                  />
                                  <BtnUpdate className="btnUpdate--peq" onClick={() => this.handleEditComentario(comentario)} />
                                </div>
                              )}
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
      </div >
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