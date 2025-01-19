import React, { Component } from "react";
import services from "../services/services";
import Card from "./CardCharla";
import PopupCharla from "./PopupCharla";

class Charlas extends Component {
	state = {
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
		idUsuarioCharlaSeleccionada: null
	}

	getCharlas = () => {
		services.getCharlasCurso().then((response) => {
			this.setState({
				charlas: response
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

	componentDidMount = () => {
		services.getToken();
		this.getCharlas();
		this.getRondas();
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

	// Función para alternar la visibilidad de los recursos
	toggleRecursos = () => {
		this.setState(prevState => ({
			showRecursos: !prevState.showRecursos
		}));
	}

	//agregar comentarios
	//ref para añadir comentarios
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

            // Obtener los comentarios actualizados desde el servidor
            return services.getCharlaId(idCharla);
        })
        .then((charlaData) => {
            console.log("Comentarios actualizados:", charlaData.comentarios);

            // Actualiza el estado con los comentarios completos
            this.setState({
                comentariosCharla: charlaData.comentarios,
            });

            // Limpia el input después de enviar
            this.cajaContenido.current.value = "";
        })
        .catch((error) => {
            console.error("Error al enviar el comentario o actualizar comentarios:", error);
        });
	}

	render() {
		return (
			<div className="container">
				<div className="row d-flex justify-content-end mt-4">
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
										Ronda {ronda.idRonda}
									</option>
								);
							})}
						</select>
					</div>
					<div className="col-6 col-md-3">
						<select className="form-select">
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

				<h1 className="my-4 text-center">Charlas</h1>

				{/* Fila de charlas */}
				<div className="row d-flex flex-wrap justify-content-start">
					{this.state.charlas.map((charla, index) => {
						return (
							<div key={index} className="col-12 col-sm-6 col-md-4 mb-4" onClick={() => this.handleCardClick(charla)} style={{ cursor: "pointer" }}>
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
									<hr className="card_divisor" />
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
													<i class="fa-solid fa-arrow-right icon"></i>
													<a className="recurso_link" href={recurso.url} target="_blank">{recurso.nombre}</a>
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

export default Charlas;
