import React, { Component } from "react";
import services from "../services/services";
import { Navigate } from "react-router-dom";
import Card from "./CardCharla";
import PopupCharla from "./PopupCharla";
import BtnDel from "./BtnDel";
import BtnUpdate from "./BtnUpdate";
import './../assets/css/perfil.css';
import './../assets/css/filtersCharlas.css';

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
		idComentarioSeleccionado: null,
		estadoCharla: [],
		idUsuarioPerfil: null,
		showFormularioRecursos: false,
		recursoSeleccionado: null,
		comentarioEditar: '',
		idComentarioEditar: null,
	};

	async getUsuario() {
		const data = await services.getPerfilUsuario();
		this.setState({ usuario: data.usuario });
		console.log("usuario ", data.usuario);
	}
	getCharlasUser = () => {
		services.getCharlasUsuario().then((res) => {
			console.log("charlas user: ", res);
			const { charlaUpdated } = this.props.location.state || {};
			if (charlaUpdated) {
				// si hay una nueva charla, la sustituimos por la charla en el array cuyo id coincida
				const updatedCharlas = res.map((c) => {
					if (c.charla.idCharla === charlaUpdated.idCharla) {
						return {
							...c,
							charla: {
								...c.charla,
								...charlaUpdated
							}
						};
					}
					return c;
				});
				this.setState({ charlas: updatedCharlas, allCharlas: updatedCharlas });
			} else {
				this.setState({ charlas: res, allCharlas: res });
			}
		}).catch((err) => {
			console.log(err);
		});
	}

	getPerfil = () => {
		services.getPerfilUsuario().then((response) => {
			this.setState({
				idUsuarioPerfil: response.usuario.idUsuario
			})
			console.log("Id usuario " + response.usuario.idUsuario)
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
		console.log(charla.idCharla);
		this.setState({
			idCharlaSeleccionada: charla.idCharla,
			seleccionadaCharla: charla,
			showPopup: true
		});
		services.getCharlaId(charla.idCharla).then((response) => {
			console.log("charla id: " + JSON.stringify(response));

			this.setState({
				comentariosCharla: response.comentarios,
				recursosCharla: response.recursos,
				idUsuarioCharlaSeleccionada: response.charla.idUsuario,
				// idUsuarioComentario: comentariosFiltrados
			});
			console.log("ID CHARLA SELECCIONADA" + this.state.idUsuarioCharlaSeleccionada)
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

	// Función para alternar la visibilidad del formulario para añadir los recursos
	toggleFormularioRecursos = () => {
		this.setState(prevState => ({
			showFormularioRecursos: !prevState.showFormularioRecursos,
		}));
	};

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

	postRecurso = (e, idCharla) => {
		e.preventDefault();
		console.log(idCharla);
		let urlRecurso = this.cajaUrl.current.value;
		let nombreRecurso = this.cajaNombreRecurso.current.value;
		let descripconRecurso = this.cajaDescripcionRecurso.current.value;

		let recurso = {
			"idRecurso": 0,
			"idCharla": idCharla,
			"url": urlRecurso,
			"nombre": nombreRecurso,
			"descripcion": descripconRecurso
		}

		services
			.postRecurso(recurso)
			.then(() => {
				console.log("Recurso añadido");
				return services.getCharlaId(idCharla);
			})
			.then((charlaData) => {
				this.setState({
					recursosCharla: charlaData.recursos,
				});

				this.cajaUrl.current.value = "";
				this.cajaNombreRecurso.current.value = "";
				this.cajaDescripcionRecurso.current.value = "";
			})
			.catch((error) => {
				console.error("Error al añadir el recurso:", error);
			});
		this.toggleFormularioRecursos();
		this.toggleRecursos();
	}

	handleUpdateRecurso = (recurso) => {
		this.setState({
			recursoSeleccionado: recurso,
		});

		this.toggleFormularioRecursos();
	};

	updateRecurso = (e, idRecurso) => {
		e.preventDefault();

		// Recoger los valores del formulario
		let urlRecurso = this.cajaUrl.current.value;
		let nombreRecurso = this.cajaNombreRecurso.current.value;
		let descripcionRecurso = this.cajaDescripcionRecurso.current.value;

		let recurso = {
			idRecurso: idRecurso,
			idCharla: this.state.idCharlaSeleccionada,
			url: urlRecurso,
			nombre: nombreRecurso,
			descripcion: descripcionRecurso,
		};

		// Llamada para actualizar el recurso
		services.updateRecurso(recurso)
			.then(() => {
				console.log("Recurso actualizado");
				// Después de la actualización, puedes recuperar los recursos de la charla
				return services.getCharlaId(this.state.idCharlaSeleccionada);
			})
			.then((charlaData) => {
				this.setState({
					recursosCharla: charlaData.recursos,
					recursoSeleccionado: null,
				});
				this.toggleFormularioRecursos();
			})
			.catch((error) => {
				console.error("Error al actualizar el recurso:", error);
			});
	};

	updateCharla = () => {
		console.log("charla seleccionada: ", this.state.seleccionadaCharla);
		this.handleClosePopup();
		this.props.navigate('/updatecharla', { state: { charla: this.state.seleccionadaCharla } });
	}

	deleteCharla = () => {
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
		this.getPerfil();
		this.getCharlasUser();
		this.getRondas();
	}

	navigateUpdateProfile = () => {
		this.props.navigate('/updateprofile', { state: { usuario: this.state.usuario } });
	};

	cajaUrl = React.createRef();
	cajaNombreRecurso = React.createRef();
	cajaDescripcionRecurso = React.createRef();

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
								{this.state.allCharlas.filter((c) => {
									return c.charla.idEstadoCharla === 1;
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
								border: "2px solid rgb(123, 206, 112)",
								borderRadius: "5px",
								width: "100px",
								backgroundColor: "#b7eab0",
								color: "white"
							}}
						>
							<h3 style={{ margin: "0", fontSize: "24px" }}>
								{this.state.allCharlas.filter((c) => {
									return c.charla.idEstadoCharla === 2;
								}).length}
							</h3>
							<p style={{ margin: "0", fontSize: "14px" }}>
								Aceptadas
							</p>
						</div>
					</div>

					{/* Perfil */}
					<div className="user-profile" style={{ textAlign: "center" }}>
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
						<button className="updateBtn btn btn-outline-dark m-2 mb-3" onClick={this.navigateUpdateProfile}>Editar perfil</button>

						{/* <div
              className="divider"
              style={{
                borderTop: "0.8px solid #a0a0a0",
                width: "100%",
                margin: "10px auto",
                borderRadius: "12px"
              }}
            ></div> */}

						<div>
							{/* Filtro charlas con encabezado desplegable */}
							<div className="row d-flex justify-content-end mt-2">
								<div className="misCharlas" onClick={() => this.setState((prevState) => ({ showCharlas: !prevState.showCharlas }))}>
									<h3 className="misCharlas_title">Mis Charlas</h3>
									<i
										className={`fa-solid ${this.state.showCharlas ? "fa-chevron-up" : "fa-chevron-down"
											}`}
										style={{ fontSize: "1.2rem", color: "#bdbdbd" }}
									></i>
								</div>

								{this.state.showCharlas && (
									<div>
										{/* Controles de filtro */}
										<div className="btnFilters">
											<div className="filters">
												<select
													className="form-select form-select-lg "
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
											<div className="filters">
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
											{this.state.charlas.map((c, index) => {
												return (
													<div
														key={index}
														className="col-12 col-sm-6 col-md-4 mb-4"
														onClick={() => this.handleCardClick(c.charla)}
														style={{ cursor: "pointer" }}
													>
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
										<div className="charla_title">
											<div className="title">
												<h2 className="poiret-one-regular">{this.state.seleccionadaCharla.titulo}</h2>
												<hr className="card_divisor"></hr>
											</div>
											<div className="icon_tiempo">
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
													{/* CUANDO AÑADA LA FUNCION DE AÑADIR RECURSOS, COMPROBAR QUE FUNCIONA ESTE CONDICIONAL 
											() => this.postRecurso(this.state.idCharlaSeleccionada)*/}
													{this.state.idUsuarioPerfil === this.state.idUsuarioCharlaSeleccionada && (
														<button className="comentarios_btn add_recurso" onClick={this.toggleFormularioRecursos}>
															<i className="fa-solid fa-plus icon--white"></i>
														</button>
													)}
												</div>
												{this.state.showFormularioRecursos && (
													<div className="formulario-recurso">
														<form onSubmit={(e) => this.state.recursoSeleccionado ? this.updateRecurso(e, this.state.recursoSeleccionado.idRecurso) : this.postRecurso(e, this.state.idCharlaSeleccionada)}>
															<div className="form-group">
																<input
																	ref={this.cajaUrl}
																	type="url"
																	className="form-control"
																	id="url"
																	placeholder=" "
																	required
																	defaultValue={this.state.recursoSeleccionado ? this.state.recursoSeleccionado.url : ""}
																/>
																<label htmlFor="url" className="floating-label">URL</label>
															</div>
															<div className="form-group">
																<input
																	ref={this.cajaNombreRecurso}
																	type="text"
																	className="form-control"
																	id="nombre"
																	placeholder=" "
																	required
																	defaultValue={this.state.recursoSeleccionado ? this.state.recursoSeleccionado.nombre : ""}
																/>
																<label htmlFor="nombre" className="floating-label">Nombre</label>
															</div>
															<div className="form-group">
																<input
																	ref={this.cajaDescripcionRecurso}
																	type="text"
																	className="form-control"
																	id="descripcion"
																	placeholder=" "
																	required
																	defaultValue={this.state.recursoSeleccionado ? this.state.recursoSeleccionado.descripcion : ""}
																/>
																<label htmlFor="descripcion" className="floating-label">Descripción</label>
															</div>
															<div className="recursosBtn">
																<button type="submit" className="btn btn-primary">{this.state.recursoSeleccionado ? "Actualizar Recurso" : "Añadir Recurso"}</button>
																<button type="button" className="btn btn-secondary" onClick={this.toggleFormularioRecursos}>Cancelar</button>
															</div>
														</form>
													</div>
												)}
											</div>
											{this.state.showRecursos && (
												<div className="recursos_content">
													{this.state.recursosCharla.map((recurso, index) => (
														<div className="rec_elementos" key={index}>
															<a className="recurso_link" href={recurso.url} target="_blank" rel="noreferrer">{recurso.nombre}</a>
															<i class="fa-solid fa-arrow-right icon"></i>
															<span className="recurso_desc">{recurso.descripcion}</span>
															{this.state.idUsuarioPerfil === this.state.idUsuarioCharlaSeleccionada && (
																<div className="btnAcciones">
																	{/* <BtnDel className="btnDel--recurso"  onClick={() => this.deleteRecurso(recurso.idRecurso)}/> */}
																	<BtnUpdate className="btnUpdate--recurso" onClick={() => this.handleUpdateRecurso(recurso)} />
																</div>
															)}
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