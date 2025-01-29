import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Importar Link de React Router
import services from '../services/services';
import "../assets/css/CursosProfesor.css";

export default class CursosProfesor extends Component {
    state = {
        cursos: [],
        usuario: []
    }

    async getUsuario() {
        const data = await services.getPerfilUsuario();
        this.setState({ usuario: data.usuario });
    }

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

    componentDidMount() {
        this.getUsuario();
        this.getCursos();
    }

    render() {
        const { cursos } = this.state;

        return (
            <div className="container my-5">
                <h1 className="text-center profesor-header">
                    Cursos Activos de {this.state.usuario.nombre} {this.state.usuario.apellidos}
                </h1>
                <div className="row">
                    {cursos.map((cursoData, index) => (
                        <div className="col-md-6 mb-4" key={index}>
                            <Link to={`/alumnos/${cursoData.curso.idCurso}`} className="text-decoration-none">
                                <div className="card curso-card">
                                    <div className="card-body">
                                        <h5 className="card-title">{cursoData.curso.nombre}</h5>
                                        <p className="card-text">Fecha de inicio: {services.formatFecha(cursoData.curso.fechaInicio)}</p>
                                        <p className="card-text">Fecha de fin: {services.formatFecha(cursoData.curso.fechaFin)}</p>
                                        <p className="card-text">Alumnos inscritos: {cursoData.numeroAlumnos}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
