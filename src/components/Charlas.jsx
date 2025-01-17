import { Component } from "react";
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
		comentariosCharla: []
	}

	getCharlas = () => {
		services.getCharlasCurso().then((response) => {
			console.log(response);
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

	// getDetallesCharla = () => {
	// 	services.getCharlaId(this.idCharlaSeleccionada).then((response) => {
	// 		this.setState({
	// 			charlas: response
	// 		})
	// 		console.log(this.charlas);
	// 	})
	// }

	// getEstadosCharla = () => {
	// 	services.getEstadoCharla().then((response) => {
	// 		this.setState({
	// 			estadoCharla: response
	// 		})
	// 		console.log("estados charla ", response);
	// 	})
	// }

	componentDidMount = () => {
		services.getToken();
		this.getCharlas();
		this.getRondas();
		// this.getEstadosCharla();
	}

	handleRondaChange = (event) => {
		const rondaSeleccionada = event.target.value;
		services.getCharlasRonda(rondaSeleccionada).then((response) => {
			this.setState({
				charlas: response
			});
			console.log("change charlas ", response);
		})
	}

	//CAMBIAR METODO 
	handleCardClick = (charla) => {
		this.setState({
			idCharlaSeleccionada: charla.idCharla,
			seleccionadaCharla: charla,
			showPopup: true
		});
		console.log("idCharla seleccionada:", charla.idCharla);
		services.getCharlaId(charla.idCharla).then((response) => {
			console.log("Respuesta de charla:", response.comentarios);
			this.setState({
				comentariosCharla: response.comentarios
			});
			console.log(this.state.comentariosCharla);
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

				<h1 className="my-4 text-center">Charlas</h1>

				{/* Fila de charlas */}
				<div className="row d-flex flex-wrap justify-content-start">
					{this.state.charlas.map((charla, index) => {
						return (
							<div key={index} className="col-12 col-sm-6 col-md-4 mb-4"
								//pasar como parametro el id
								onClick={() => this.handleCardClick(charla)}
								style={{ cursor: "pointer" }}>
								<Card
									imagen={charla.imagenCharla}
									titulo={charla.titulo}
									descripcion={charla.descripcion}
								/>
							</div>
						);
					})}
				</div>
				<PopupCharla
					show={this.state.showPopup}
					onClose={this.handleClosePopup}
				>
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
									<i class="fa-regular fa-clock"></i>
									<span className="charla_tiempo">{this.state.seleccionadaCharla.tiempo} min.</span>
								</div>
							</div>
							<div className="charla_image">
								<img
									src={this.state.seleccionadaCharla.imagenCharla}
									alt={this.state.seleccionadaCharla.titulo}
								/>
								<div className="charla_descripcion">
									<span className="descripcion">{this.state.idCharlaSeleccionada.descripcion}</span>
								</div>
							</div>
							<hr />
							<div className="comentarios">
								<div className="comentarios_title">
									<span className="comentarios_text">Comentarios</span>
									<input className="comentarios_input" type="text" placeholder="Agregar nuevo comentario..." />
									<button className="comentarios_btn"><i className="fa-regular fa-paper-plane enviar_comentario"></i></button>
								</div>
								<div className="comentarios_content">
									{this.state.comentariosCharla.map((comentario, index) => {
										return (
											<div className="container_comentario">
												{/* sacar foto perfil user */}
												<div className="comentarios_user"></div>
												<div className="comentario">
													<span key={index}>{comentario.contenido}</span> 
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
