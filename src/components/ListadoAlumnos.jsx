import React, { Component } from 'react';
import services from '../services/services';

export default class ListadoAlumnos extends Component {
    state = {
        alumnos: []
    };

    getAlumnos = () => {
        services.getAlumnosActivosProfesor().then((response) => {
            //console.log(response);
            const alumnos = response;
			//console.log("Alumnos:", alumnos);
            this.setState({
                alumnos: alumnos
            });
        }).catch((error) => {
            console.error("Error al obtener los alumnos:", error);
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
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.length > 0 ? (
                            alumnos.map((alumnoData, index) => (
								alumnoData.alumnos.map((alumnoData, index) => (
                                <tr key={alumnoData.alumno.idUsuario}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{alumnoData.alumno.usuario}</td>
                                    <td>{alumnoData.alumno.email}</td>
                                    <td>{alumnoData.alumno.role}</td>
                                </tr>
                            ))
                        ))) : (
                            <tr>
                                <td colSpan="4" className="text-center">No hay alumnos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
