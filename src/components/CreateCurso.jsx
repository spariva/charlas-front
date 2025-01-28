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

	componentDidMount = () => {
		this.getUsuario();
	}

	render() {
		if (this.state.status) {
			return (<Navigate to="/profile" />)
		} else {
		return (
			<div>
				<h1>Create Curso hay que cambiarlo</h1>
				<form>
					<label>Fecha de presentacion</label>
					<input type='date' ref={this.cajaFechaPresentacion} className='form-control'></input>
					<label className='form-label'>Fecha de cierre</label>
					<input type='date' ref={this.cajaFechaCierre} className='form-control'></input>
					<label>Duración</label>
					<input type='number' ref={this.cajaDuracion} className='form-control'></input>
					<label>Descripcion Modulo</label>
					<input type='text' ref={this.cajaDescripcion} className='form-control'></input>
					<label>Fecha de limite de votacion</label>
					<input type='date' ref={this.cajaLimiteVotacion} className='form-control'></input>
					<button className='btn btn-info' onClick={this.insertRonda}>insertar</button>
				</form>
			</div>
		)
		}
	}
}
