import React, { Component } from 'react';
import services from '../services/services';

export default class ListadoAlumnos extends Component {
    state = {
        alumnos: []
    };

    // Obtener los alumnos
    getAlumnos = () => {
        services.getAlumnosActivosProfesor().then((response) => {
            const alumnos = response;
            this.setState({
                alumnos: alumnos
            });
        }).catch((error) => {
            console.error("Error al obtener los alumnos:", error);
        });
    };

    // Cambiar el estado de usuario
    toggleEstadoUsuario = (idUsuario, estadoActual) => {
        services.updateEstadoUsuario(idUsuario, !estadoActual).then((response) => {
            console.log("Respuesta al cambiar el estado del usuario:", response);
            this.getAlumnos();
        }).catch((error) => {
            console.error("Error al cambiar el estado del usuario:", error);
        });
    };

    componentDidMount() {
        this.getAlumnos();
    }

    render() {
        const { alumnos } = this.state;

        return (
            <div className="container my-5">
                <h1>Listado de Alumnos</h1>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">Estado usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.length > 0 ? (
                            alumnos.map((alumnoData, index) => (
                                alumnoData.alumnos.map((alumnoData) => {
                                    const estadoUsuario = alumnoData.alumno.estadoUsuario;
                                    return (
                                        <tr key={alumnoData.alumno.idUsuario}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{alumnoData.alumno.usuario}</td>
                                            <td>{alumnoData.alumno.email}</td>
                                            <td>
                                                {/* Mostrar un toggle */}
                                                <input 
                                                    type="checkbox"
                                                    checked={estadoUsuario}
                                                    onChange={() => this.toggleEstadoUsuario(alumnoData.alumno.idUsuario, estadoUsuario)} 
                                                />
                                            </td>
                                        </tr>
                                    );
                                })
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No hay alumnos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
