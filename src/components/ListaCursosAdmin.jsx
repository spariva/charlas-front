import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import services from '../services/services';
import "../assets/css/CursosProfesor.css"; 

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
          <div
          className="container-fluid scroll-container scroll-container--lg"
          style={{
            maxWidth: "90%",
            padding: "30px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <div className="title">
            <h1 className='poiret-one-regular'>Listado de cursos</h1>
            <div className="underline"></div>
          </div>

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