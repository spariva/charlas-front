import React, { Component } from "react";
import PopupCharla from "./PopupCharla";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/carrusel.css";
import services from "../services/services";
import BtnDel from "./BtnDel";
import BtnUpdate from "./BtnUpdate";

class Home extends Component {
	state = {
		charlas: [],
		rondas: [],
		charlasRonda: [],
		estadoCharla: [],
		charlas: [],
		rondas: [],
		estadoCharla: [],
		rondaSeleccionada: "",
		seleccionadaCharla: null,
		showPopup: false,
		idCharlaSeleccionada: null,
		comentariosCharla: [],
		recursosCharla: [],
		showRecursos: false, // Estado para controlar la visibilidad de los recursos
		idUsuarioCharlaSeleccionada: null,
		//para borrar un comentario
		idComentarioSeleccionado: null,
		idUsuarioPerfil: null,
		showFormularioRecursos: false,
		recursoSeleccionado: null,
		comentarioEditar: '',
		idComentarioEditar: null,
	};

	getCharlas = () => {
		services.getCharlasCurso().then((response) => {
			console.log(response);
			this.setState({
				charlas: response
			});
		});
	};

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
			console.log(response.comentarios)
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

	componentDidMount = () => {
		this.getCharlas();
	};

	render() {
		// Configuración del carrusel con react-slick
		const settings = {
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			arrows: true,
			prevArrow: (
				<button type="button" className="slick-prev">
					{/* <i className="fa-solid fa-arrow-left"></i> */}
				</button>
			),
			nextArrow: (
				<button type="button" className="slick-next">
					{/* <i className="fa-solid fa-arrow-right"></i> */}
				</button>
			),
			responsive: [
				{
					breakpoint: 1000,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		};

		return (
			<div className="home">
				<div className="carousel">
					<Slider {...settings}>
						{this.state.charlas.map((charla, index) => (
							<div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
								<div className="card" style={{ width: '300px', height: '400px' }} onClick={() => this.handleCardClick(charla)}>
									<img
										src={charla.imagenCharla ? charla.imagenCharla : 'https://as1.ftcdn.net/v2/jpg/05/03/24/40/1000_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg' }
										alt={charla.titulo}
										className="imgcharla card-img-top"
										style={{ height: '200px', objectFit: 'cover' }}
									/>
									<div className="card-body">
										<h5 className="card-title">{charla.titulo}</h5>
										<p className="card-text">{charla.descripcion}</p>
									</div>
								</div>
							</div>
						))}
					</Slider>
				</div>
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
												<a className="recurso_link" href={recurso.url} target="_blank">{recurso.nombre}</a>
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
		);
	}
}

export default Home;

