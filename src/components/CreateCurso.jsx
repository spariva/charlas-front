import React, { Component } from 'react'
import services from '../services/services';
import { Navigate } from 'react-router-dom';

export default class CreateCurso extends Component {
	cajaFechaPresentacion = React.createRef();
	cajaFechaCierre = React.createRef();
	cajaDuracion = React.createRef();
	cajaDescripcion = React.createRef();
	cajaLimiteVotacion = React.createRef();

	state = {
		usuario: null,
		status: false,
		redirectToCharla: false
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
			"idCursoUsuario": this.state.usuario.id,
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

	cancelCreation = () => {
    this.setState({ redirectToCharla: true }); 
  };

	componentDidMount = () => {
		this.getUsuario();
	}

	render() {
		if (this.state.redirectToCharla) {
					return <Navigate to="/charlas" />;
				}
		if (this.state.status) {
			return (<Navigate to="/profile" />)
		} else {
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
					<div className="title">
							<h1 className='poiret-one-regular'>Crear curso</h1>
							<div className="underline"></div>
						</div>
					<div className='form-group'>
						<form>
							<div className="form-group">
								<input type='date' ref={this.cajaFechaPresentacion} className='form-control'></input>
								<label className="floating-label">Fecha de presentacion</label>
							</div>
							<div className="form-group">
								<input type='date' ref={this.cajaFechaCierre} className='form-control'></input>
								<label className="floating-label">Fecha de cierre</label>
							</div>
							<div className="form-group">
								<input type='number' ref={this.cajaDuracion} className='form-control'></input>
								<label className="floating-label">Duración</label>
							</div>
							<div className="form-group">
								<input type='text' ref={this.cajaDescripcion} className='form-control'></input>
								<label className="floating-label">Descripcion Modulo</label>
							</div>
							<div className="form-group">
								<input type='date' ref={this.cajaLimiteVotacion} className='form-control'></input>
								<label className="floating-label">Fecha de limite de votacion</label>
							</div>
							<div className="text-center">
								<button className="updateBtn btn btn-outline-dark" onClick={this.insertRonda}>Crear</button>
								<button className='btnCancelar' onClick={this.cancelCreation}>Cancelar</button>
							</div>						
						</form>
					</div>
				</div>
			)
		}
	}
}
