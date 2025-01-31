import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Importar Link de React Router
import services from '../services/services';
import "../assets/css/CursosProfesor.css"; // Asegúrate de tener el CSS adecuado

export default class CursosProfesor extends Component {
	state = {
		cursos: [],  // Para almacenar los cursos
		usuario: []  // Para almacenar la información del usuario
	};

	// Obtener los datos del perfil del usuario
	async getUsuario() {
		const data = await services.getPerfilUsuario();
		this.setState({ usuario: data.usuario });
	}

	// Obtener los cursos activos del profesor
	async getCursos() {
		try {
			const response = await services.getCursosActivosProfesor();
			console.log("Respuesta completa de cursos:", response);
			const cursos = response;
			console.log("CURSOS ACTIVOS:", cursos);
			if (Array.isArray(cursos) && cursos.length > 0) {
				const primerCurso = cursos[0];
				if (primerCurso && primerCurso.curso) {
					console.log("Detalles del curso:", primerCurso.curso);
					this.setState({ cursos: cursos });
				} else {
					console.error("El primer curso no tiene detalles.");
				}
			} else {
				console.error("No hay cursos disponibles.");
			}
		} catch (error) {
			console.error("Error al obtener los cursos:", error);
		}
	}

	// Cambiar el estado del curso (activo/inactivo)
	toggleEstadoCurso = (idCurso, estadoActual) => {
		// Cambiar el estado local del curso antes de enviar la solicitud
		const nuevosCursos = this.state.cursos.map((curso) => {
			if (curso.curso.idCurso === idCurso) {
				return { ...curso, curso: { ...curso.curso, activo: !estadoActual } };  // Invertir el estado del curso en el frontend
			}
			return curso;
		});

		// Actualizar el estado local inmediatamente
		this.setState({ cursos: nuevosCursos });

		// Enviar la solicitud al servidor para actualizar el estado en el backend
		services.updateEstadoCurso(idCurso, !estadoActual)
			.then((response) => {
				console.log("Respuesta al cambiar el estado del curso:", response);
				if (response && response.success) {
					// El estado se cambió correctamente, ya hemos actualizado el estado local, no es necesario hacer una nueva consulta.
				} else {
					console.error("Error al cambiar el estado del curso:", response);
				}
			})
			.catch((error) => {
				console.error("Error al cambiar el estado del curso:", error);
				// Si ocurre un error, revertimos el cambio en el frontend
				this.getCursos();  // Revertir la actualización si la solicitud falla
			});
	};

	// Obtener los cursos cuando el componente se monta
	componentDidMount() {
		this.getUsuario();
		this.getCursos();
	}

	render() {
		const { cursos } = this.state;

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
					<h1 className='poiret-one-regular'>Mis cursos activos</h1>
					<div className="underline"></div>
				</div>

				<div className="row">
					{cursos.length > 0 ? (
						cursos.map((cursoData, index) => (
							<div className="col-md-4 mb-4" key={index}>
								<div className="card curso-card">
									<div className="card-body">
										<h5 className="card-title">{cursoData.curso.nombre}</h5>
										<p className="card-text">Fecha de inicio: {services.formatFecha(cursoData.curso.fechaInicio)}</p>
										<p className="card-text">Fecha de fin: {services.formatFecha(cursoData.curso.fechaFin)}</p>
										<p className="card-text">Alumnos inscritos: {cursoData.numeroAlumnos}</p>

										{/* Checkbox para cambiar el estado del curso */}
										<div className="form-check">
											<input
												type="checkbox"
												className="form-check-input"
												checked={cursoData.curso.activo}
												onChange={() => this.toggleEstadoCurso(cursoData.curso.idCurso, cursoData.curso.activo)} // Elimina el evento e
											/>
											<label className="form-check-label">
												Estado: {cursoData.curso.activo ? "Activo" : "Inactivo"}
											</label>
										</div>

										{/* Enlace a los alumnos del curso */}
										<div className="mt-3">
											<Link to={`/alumnosprofe/${cursoData.curso.idCurso}`} className="btn btn-primary">
												Ver Alumnos
											</Link>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-12 text-center">
							<p>No hay cursos disponibles</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}