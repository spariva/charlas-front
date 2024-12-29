import React, { Component } from 'react'
import services from '../services/services';

export default class CreateRonda extends Component {
	cajaFechaPresentacion = React.createRef();
	cajaFechaCierre = React.createRef();
	cajaDuracion = React.createRef();
	cajaDescripcion = React.createRef();
	cajaLimiteVotacion = React.createRef();

	// state = {
	// 	status: true
	// }

	insertRonda = (e) => {
		e.preventDefault();
		let fechaPresentacion = this.cajaFechaPresentacion.current.value;
		let fechaCierre = this.cajaFechaCierre.current.value;
		let duracion = this.cajaDuracion.current.value;
		let descripcion = this.cajaDescripcion.current.value;
		let cajaLimiteVotacion = this.cajaLimiteVotacion.current.value;
		let ronda = {
			"idRonda": 0,
			"idCursoUsuario": 20,
			"fechaPresentacion": fechaPresentacion,
			"fechaCierre": fechaCierre,
			"duracion": duracion,
			"descripcionModulo": descripcion,
			"fechaLimiteVotacion": cajaLimiteVotacion
		}
		services.createRonda(ronda);
		
	}
	render() {
		// if (this.state.status == true) {
		// 	return (<Navigate to="/" />)
		// } else {
			return (
				<div>
					<h1>CreateRonda</h1>
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
		//}
	}
}
