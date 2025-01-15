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
					<h1>Create charla</h1>
					<form>
						<label>Titulo</label>
						<input type='text' ref={this.cajaTitulo} className='form-control'></input>
						<label className='form-label'>Descripción</label>
						<input type='text' ref={this.cajaDescripcion} className='form-control'></input>
						<label className='form-label'>Duración</label>
						<input type='number' ref={this.cajaDuracion} className='form-control'></input>
						<label className='form-label'>Ronda en la que presentarlo</label>
						<select name="" id="" ref={this.selectRonda} className='form-control'>
							<option value="">--seleccione una ronda--</option>
							{
								this.state.rondas.map((ronda, index) => {
									return (
										<option value={ronda.idRonda} key={index}>
											{ronda.descripcionModulo}
										</option>
									)
								})
							}
						</select>
						<label className='form-label'>Imagen</label>
						<input type='text' ref={this.cajaImagen} className='form-control'></input>
						<br />
						<button className='btn btn-info' onClick={this.insertCharla}>Insertar</button>
					</form>
				</div>
			)
		}
	}
}
