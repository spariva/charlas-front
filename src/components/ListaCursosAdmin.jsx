import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Importar Link de React Router
import services from '../services/services';
import "../assets/css/CursosProfesor.css"; // Asegúrate de tener el CSS adecuado

export default class ListaCursosAdmin extends Component {
    state = {
        cursos: []
    };

    // Obtener los cursos
    getCursos = async () => {
        try {
            const cursos = await services.getCursosAdmin();
            console.log("Cursos:", cursos);
            this.setState({ cursos });
        } catch (error) {
            console.error("Error al obtener los cursos:", error);
        }
    };

    componentDidMount() {
        this.getCursos();
    }

    render() {
        const { cursos } = this.state;

        return (
            <div className="container my-5">
                <h1 className="text-center profesor-header">Listado de Cursos</h1>

                <div className="row">
                    {cursos.length > 0 ? (
                        cursos.map((curso, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card curso-card">
                                    <div className="card-body">
                                        <h5 className="card-title">{curso.nombre}</h5>
                                        <p className="card-text">Fecha de inicio: {services.formatFecha(curso.fechaInicio)}</p>
                                        <p className="card-text">Fecha de fin: {services.formatFecha(curso.fechaFin)}</p>
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