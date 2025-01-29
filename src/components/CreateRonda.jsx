import React, { Component } from 'react'
import services from '../services/services';
import { Navigate } from 'react-router-dom';

export default class CreateRonda extends Component {
	cajaFechaPresentacion = React.createRef();
	cajaFechaCierre = React.createRef();
	cajaDuracion = React.createRef();
	cajaDescripcion = React.createRef();
	cajaLimiteVotacion = React.createRef();

	state = {
		usuario: null,
		status: false
	};

	async getUsuario() {
		const data = await services.getPerfilUsuario();
		this.setState({ usuario: data.usuario });
	}

	insertRonda = async (e) => {
		e.preventDefault();
		let fechaPresentacion = this.cajaFechaPresentacion.current.value;
		let fechaCierre = this.cajaFechaCierre.current.value;
		let duracion = this.cajaDuracion.current.value;
		let descripcion = this.cajaDescripcion.current.value;
		let cajaLimiteVotacion = this.cajaLimiteVotacion.current.value;

		let ronda = {
			"idRonda": 0,
			"idCursoUsuario": this.state.usuario.idCursoUsuario,
			"fechaPresentacion": fechaPresentacion,
			"fechaCierre": fechaCierre,
			"duracion": duracion,
			"descripcionModulo": descripcion,
			"fechaLimiteVotacion": cajaLimiteVotacion
		}

		try {
			await services.createRonda(ronda);
			console.log("Ronda insertada con éxito!");
			this.setState({ status: true });
		} catch (error) {
			console.error("Error al insertar la ronda:", error);
			alert("Ha habido un error al crear la ronda");
		}
	}

	componentDidMount = () => {
		this.getUsuario();
	}

	render() {
		if (this.state.status) {
			return (<Navigate to="/profile" />)
		} else {
			return (
				<div>
					{/* Contenedor principal con estilo de tarjeta */}
					<div
						className="container-fluid"
						style={{
							maxWidth: "90%",
							margin: "30px auto",
							padding: "30px",  // Un poco más de padding para espacio alrededor
							borderRadius: "10px",
							backgroundColor: "#fff",  // Fondo blanco
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",  // Sombra sutil
							position: "relative",
						}}
					>
						<div className="title">
							<h1 className='poiret-one-regular'>Crear ronda</h1>
							<div className="underline"></div>
						</div>							<form>
							<div className="form-group">
								<input
									type="date"
									ref={this.cajaFechaPresentacion}
									className="form-control"
									placeholder=" "
								/>
								<label htmlFor="inputFechaPresentacion" className="floating-label">Fecha de presentación</label>
							</div>

							<div className="form-group">
								<input
									type="date"
									ref={this.cajaFechaCierre}
									className="form-control"
									placeholder=" "
								/>
								<label htmlFor="inputFechaCierre" className="floating-label">Fecha de cierre</label>
							</div>

							<div className="form-group">
								<input
									type="number"
									ref={this.cajaDuracion}
									className="form-control"
									placeholder=" "
								/>
								<label htmlFor="inputDuracion" className="floating-label">Duración</label>
							</div>

							<div className="form-group">
								<input
									type="text"
									ref={this.cajaDescripcion}
									className="form-control"
									placeholder=" "
								/>
								<label htmlFor="inputDescripcion" className="floating-label">Descripción del Módulo</label>
							</div>

							<div className="form-group">
								<input
									type="date"
									ref={this.cajaLimiteVotacion}
									className="form-control"
									placeholder=" "
								/>
								<label htmlFor="inputLimiteVotacion" className="floating-label">Fecha de límite de votación</label>
							</div>

							<div className="text-center">
								<button className="btn btn-info mt-3" onClick={this.insertRonda}>Insertar</button>
							</div>
						</form>
					</div>
				</div>
			);
		}
	}
}
