import React, { Component } from "react";
import services from "../services/services";
import Card from "./CardCharla";
import PopupCharla from "./PopupCharla";
import BtnDel from "./BtnDel";
import BtnUpdate from "./BtnUpdate";

class Charlas extends Component {

	state = {
		allCharlas: [],
		charlas: [],
		rondas: [],
		rondaSeleccionada: "0",
		estadoSeleccionado: "0",
		seleccionadaCharla: null,
		showPopup: false,
		idCharlaSeleccionada: null,
		comentariosCharla: [],
		recursosCharla: [],
		showRecursos: false,
		idUsuarioCharlaSeleccionada: null,
		idComentarioSeleccionado: null,
		idUsuarioPerfil: null,
		showFormularioRecursos: false,
		recursoSeleccionado: null,
		comentarioEditar: '',
		idComentarioEditar: null,
	}

	//llamar al usuario getperfil
	getPerfil = () => {
		services.getPerfilUsuario().then((response) => {
			this.setState({
				idUsuarioPerfil: response.usuario.idUsuario
			})
		})
	}
	getCharlas = () => {
		services.getCharlasCurso().then((response) => {
			this.setState({
				charlas: response, allCharlas: response
			});
		});
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

		const charlasByRonda = rondaSeleccionada === "0" ? allCharlas : allCharlas.filter((c) => c.idRonda === parseInt(rondaSeleccionada));

		const charlasByEstado = estadoSeleccionado === "0" ? charlasByRonda : charlasByRonda.filter((c) => c.idEstadoCharla === parseInt(estadoSeleccionado));
		console.log(charlasByEstado);

		this.setState({ charlas: charlasByEstado });
	}

	componentDidMount = () => {
		services.getToken();
		this.getCharlas();
		this.getRondas();
		this.getPerfil();
	}

	handleRondaChange = (event) => {
		const rondaSeleccionada = event.target.value;
		services.getCharlasRonda(rondaSeleccionada).then((response) => {
			this.setState({
				charlas: response
			});
		});
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
				// idUsuarioComentario: comentariosFiltrados
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

	// Función para alternar la visibilidad del formulario para añadir los recursos
	toggleFormularioRecursos = () => {
		this.setState(prevState => ({
			showFormularioRecursos: !prevState.showFormularioRecursos,
		}));
	};

	cancelFormRecursos = () => {
		if (this.state.recursoSeleccionado) {
			this.setState({
				recursoSeleccionado: null,
			});
		}
		this.toggleFormularioRecursos();
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
				return services.getCharlaId(idCharla);
			})
			.then((charlaData) => {
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
		this.setState({
			comentarioEditar: comentario.contenido,
			idComentarioEditar: comentario.idComentario,
		});
	};

	handleComentarioAction = (e) => {
		e.preventDefault();
		if (this.state.idComentarioEditar) {
			this.updateComentario(e);
		} else {
			this.postComentario(e);
		}
	};

	updateComentario = (e) => {
		e.preventDefault();
		let comentarioText = this.state.comentarioEditar;
		let idComentario = this.state.idComentarioEditar;

		let comentario = {
			"idComentario": idComentario,
			"idCharla": this.state.idCharlaSeleccionada,
			"idUsuario": this.state.idUsuarioPerfil,
			"contenido": comentarioText,
			"fecha": new Date(),
		};

		services.updateComentario(comentario)
			.then(() => {
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
				return services.getCharlaId(this.state.idCharlaSeleccionada);
			})
			.then((charlaData) => {
				this.setState({
					recursosCharla: charlaData.recursos,
					recursoSeleccionado: null,
				});
				this.toggleFormularioRecursos();
				this.toggleRecursos();
			})
			.catch((error) => {
				console.error("Error al actualizar el recurso:", error);
			});
	};



	// deleteRecurso = (idRecurso) => {
	// 	services.deleteRecurso(idRecurso)
	// 		.then(() => {
	// 			return services.getCharlaId(this.state.idCharlaSeleccionada);
	// 		})
	// 		.then((charlaData) => {
	// 			this.setState({
	// 				recursosCharla: charlaData.recursos,
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.error(`Error al eliminar recurso con ID ${idRecurso}:`, error);
	// 		});
	// };


	cajaUrl = React.createRef();
	cajaNombreRecurso = React.createRef();
	cajaDescripcionRecurso = React.createRef();

	render() {
		return (
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
				<div className="charlasFilters">
					<div className="title">
						<h1 className='poiret-one-regular'>Charlas</h1>
						<div className="underline"></div>
					</div>
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
				</div>

				{/* Fila de charlas */}
				<div className="row d-flex flex-wrap justify-content-start">
					{this.state.charlas.map((charla, index) => {
						return (
							<div key={index} className="col-8 col-sm-6 col-md-4 mb-4" onClick={() => this.handleCardClick(charla)} style={{ cursor: "pointer" }}>
								<Card
									imagen={charla.imagenCharla}
									titulo={charla.titulo}
									descripcion={charla.descripcion}
								/>
							</div>
						);
					})}
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
							{/* Sección para añadir tu primer recurso si es tu charla */}
							{this.state.recursosCharla.length === 0 && this.state.idUsuarioPerfil === this.state.idUsuarioCharlaSeleccionada && (<div className="recursos">
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
										<button className="comentarios_btn add_recurso" onClick={this.toggleFormularioRecursos}>
											<i className="fa-solid fa-plus icon--white"></i>
										</button>
									</div>
									{this.state.showFormularioRecursos && (
										<div className="formulario-recurso">
											<form onSubmit={(e) => this.postRecurso(e, this.state.idCharlaSeleccionada)}>
												<div className="form-group">
													<input
														ref={this.cajaUrl}
														type="url"
														className="form-control"
														id="url"
														placeholder=" "
														required
														defaultValue={""}
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
														defaultValue={""}
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
														defaultValue={""}
													/>
													<label htmlFor="descripcion" className="floating-label">Descripción</label>
												</div>
												<div className="recursosBtn">
													<button type="submit" className="btn btn-primary">Añadir Recurso</button>
													<button type="button" className="btn btn-secondary" onClick={this.cancelFormRecursos}>Cancelar</button>
												</div>
											</form>
										</div>
									)}
								</div>
							</div>)}
							{/* Sección de recursos */}
							{this.state.recursosCharla.length > 0 && (
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
														<button type="button" className="btn btn-secondary" onClick={this.cancelFormRecursos}>Cancelar</button>
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
													<i className="fa-solid fa-arrow-right icon"></i>
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
							)}
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

export default Charlas;
