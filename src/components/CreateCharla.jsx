import React, { Component } from 'react'
import services from '../services/services';
import { Navigate } from 'react-router-dom';

export default class CreateCharla extends Component {
	cajaTitulo = React.createRef();
	cajaDescripcion = React.createRef();
	cajaDuracion = React.createRef();
	selectRonda = React.createRef();
	cajaImagen = React.createRef();

	state = {
		usuario: null,
		rondas: [],
		status: false
	};

	async getUsuario() {
		const data = await services.getPerfilUsuario();
		this.setState({ usuario: data.usuario });
	}

	getRondas = () => {
		services.getRondasCurso().then((response) => {
			console.log(response);
			this.setState({
				rondas: response
			});
		});
	}

	insertCharla = async (e) => {
		e.preventDefault();
		let titulo = this.cajaTitulo.current.value;
		let duracion = this.cajaDuracion.current.value;
		let descripcion = this.cajaDescripcion.current.value;
		console.log(descripcion);
		let ronda = this.selectRonda.current.value;
		let image = this.cajaImagen.current.value;
		let date = new Date();
		let charla = {
			"idCharla": 0,
			"titulo": titulo,
			"descripcion": descripcion,
			"tiempo": duracion,
			"fechaPropuesta": date,
			"idUsuario": this.state.usuario.idUsuario,
			"idEstadoCharla": 1,
			"idRonda": ronda,
			"imagenCharla": image
		}
		try {
			await services.createCharla(charla);
			console.log("Charla insertada con éxito!");
			this.setState({ status: true });
		} catch (error) {
			console.error("Error al insertar la charla:", error);
			alert("Ha habido un error al crear la charla");
		}
	}

	componentDidMount = () => {
		this.getUsuario();
		this.getRondas();
	}

	render() {
		if (this.state.status == true) {
			return (<Navigate to="/home" />)
		} else {
			return (
				<div>
					{/* Contenedor principal con estilo de tarjeta */}
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
						<div className="title">
							<h1 className='poiret-one-regular'>Crear charla</h1>
							<div className="underline"></div>
						</div>						
						<form>
							<div className="form-group">
								<input
									type="text"
									ref={this.cajaTitulo}
									className="form-control"
									placeholder=" "
								/>
								<label htmlFor="inputTitulo" className="floating-label">Título</label>
							</div>

							<div className="form-group">
								<input
									type="text"
									ref={this.cajaDescripcion}
									className="form-control"
									placeholder=" "
								/>
								<label htmlFor="inputDescripcion" className="floating-label">Descripción</label>
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
								<select
									ref={this.selectRonda}
									className="form-control"
									placeholder=" "
								>
									<option value="">--seleccione una ronda--</option>
									{this.state.rondas.map((ronda, index) => (
										<option value={ronda.idRonda} key={index}>
											{ronda.descripcionModulo}
										</option>
									))}
								</select>
								<label htmlFor="selectRonda" className="floating-label">Ronda en la que presentarlo</label>
							</div>

							<div className="form-group">
								<input
									type="text"
									ref={this.cajaImagen}
									className="form-control"
									placeholder=" "
								/>
								<label htmlFor="inputImagen" className="floating-label">Imagen</label>
							</div>
							<div className="text-center">
								<button className="updateBtn btn btn-outline-dark" onClick={this.insertCharla}>Crear</button>
									<button className='btnCancelar' onClick={<Navigate to={'/charlas'} />}>Cancelar</button>
							</div>
						</form>
					</div>
				</div>
			);
		}
	}
}
