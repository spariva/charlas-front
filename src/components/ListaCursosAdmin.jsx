import React, { Component } from 'react';
import services from '../services/services';

export default class ListaCursosAdmin extends Component {
	state = {
		cursos: []
	};

	// Obtener los alumnos
	getCursos = () => {
		services.getCursosAdmin().then((response) => {
			const cursos = response;
			console.log("Cursos:", cursos);
			this.setState({
				cursos: cursos
			});
		}).catch((error) => {
			console.error("Error al obtener los cursos:", error);
		});
	};

	// Cambiar el estado de usuario
	toggleEstadoUsuario = (idUsuario, estadoActual) => {
		services.updateEstadoUsuario(idUsuario, !estadoActual).then((response) => {
			console.log("Respuesta al cambiar el estado del usuario:", response);
			this.getCursos();
		}).catch((error) => {
			console.error("Error al cambiar el estado del usuario:", error);
		});
	};

	componentDidMount() {
		this.getCursos();
	}

	render() {
		const { cursos } = this.state;

		return (
			<div className="container my-5">
				<h1>Listado de Alumnos</h1>

				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Nombre</th>
							<th scope="col">Fecha inicio</th>
							<th scope="col">Fecha fin</th>
						</tr>
					</thead>
					<tbody>
						{cursos.length > 0 ? (
							cursos.map((curso, index) => (
								//console.log("alumnoData:", curso);
								<tr key={curso.idCurso}>
									<th scope="row">{index + 1}</th>
									<td>{curso.nombre}</td>
									<td>{services.formatFecha(curso.fechaInicio)}</td>
									<td>{services.formatFecha(curso.fechaFin)}</td>
									{/* <td>
										<input
											type="checkbox"
											checked={estadoUsuario}
										//onChange={() => this.toggleEstadoUsuario(alumnoData.alumno.idUsuario, estadoUsuario)}
										/>
									</td> */}
								</tr>

							))
						) : (
							<tr>
								<td colSpan="5" className="text-center">No hay cursos disponibles</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}
