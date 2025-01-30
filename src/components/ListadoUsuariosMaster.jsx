import React, { Component } from 'react';
import services from '../services/services';
import "../assets/css/CursosProfesor.css"; // Asegúrate de tener el CSS adecuado
import { Link } from 'react-router-dom';

export default class ListaCursosAdmin extends Component {
    state = {
        cursos: [] // Para almacenar los cursos
    };

    // Obtener los cursos desde el backend
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

    // Cambiar el estado del curso (activo o no)
    toggleEstadoCurso = (idCurso, estadoActual) => {
        // Cambiar el estado local del curso antes de enviar la solicitud
        const nuevosCursos = this.state.cursos.map((curso) => {
            if (curso.idCurso === idCurso) {
                return { ...curso, activo: !estadoActual };  // Invertir el estado del curso en el frontend
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
        this.getCursos();
    }

    render() {
        const { cursos } = this.state;

        return (
            <div className="container my-5">
                <h1 className="text-center">Listado de Cursos</h1>

                {/* Fila de tarjetas de cursos */}
                <div className="row">
                    {cursos.length > 0 ? (
                        cursos.map((curso, index) => (
                            <div className="col-md-4 mb-4" key={curso.idCurso}>
                                <div className="card curso-card">
                                    <div className="card-body">
                                        <h5 className="card-title">{curso.nombre}</h5>
                                        <p className="card-text">Fecha de inicio: {services.formatFecha(curso.fechaInicio)}</p>
                                        <p className="card-text">Fecha de fin: {services.formatFecha(curso.fechaFin)}</p>
                                        <p className="card-text">Alumnos inscritos: {curso.numeroAlumnos}</p>

                                        {/* Checkbox para cambiar el estado del curso */}
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={curso.activo}
                                                onChange={() => this.toggleEstadoCurso(curso.idCurso, curso.activo)}
                                            />
                                            <label className="form-check-label">
                                                Estado: {curso.activo ? "Activo" : "Inactivo"}
                                            </label>
                                        </div>
										<div className="mt-3">
											<Link to={`/alumnos/${curso.idCurso}`} className="btn btn-primary">
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
