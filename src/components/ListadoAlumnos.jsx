import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import services from '../services/services';
import Global from '../Global';
import axios from 'axios';

const ListadoAlumnos = () => {
    const { id } = useParams();  // Obtener el ID de la ruta
    const [alumnos, setAlumnos] = useState([]);  // Aseguramos que es un array vacío por defecto
    
    // Obtener el idRole de localStorage
    const idRole = localStorage.getItem('idRole');  // Asumiendo que el idRole está guardado en localStorage

    // Mostrar el id de la ruta y el idRole de localStorage
    useEffect(() => {
        console.log("ID de la ruta:", id);
        console.log("idRole de localStorage:", idRole);

        // Llamar a la función correspondiente según el idRole
        if (idRole === '3') {
            getUsuariosCurso(id);  // Si idRole es 3, se llama a getUsuariosCurso
        } else {
            getAlumnos();  // Si no, se llama a getAlumnosActivosProfesor
        }
    }, [id, idRole]);

    // Obtener los alumnos
    const getAlumnos = () => {
        services.getAlumnosActivosProfesor().then((response) => {
            const alumnos = response || [];  // Aseguramos que sea un array
            setAlumnos(alumnos);  // Guardamos la respuesta en el estado 'alumnos'
        }).catch((error) => {
            console.error("Error al obtener los alumnos:", error);
        });
    };

    // Obtener los usuarios del curso, si el idRole es 3
    const getUsuariosCurso = (idCurso) => {
        const request = "/api/Usuarios/UsuariosCurso/" + idCurso;
        const url = Global.api + request;  // Usando la URL base de Global.js
        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')  // Suponiendo que el token está en localStorage
            }
        })
        .then((response) => {
            const usuariosCurso = response.data || [];  // Aseguramos que sea un array
            setAlumnos(usuariosCurso);  // Guardamos la respuesta en el estado 'alumnos'
        })
        .catch((error) => {
            console.error("Error al obtener los usuarios del curso:", error);
        });
    };

    // Cambiar el estado de usuario
    const toggleEstadoUsuario = (idUsuario, estadoActual) => {
        services.updateEstadoUsuario(idUsuario, !estadoActual).then((response) => {
            console.log("Respuesta al cambiar el estado del usuario:", response);
            if (idRole === '3') {
                getUsuariosCurso(id);  // Si idRole es 3, recargar los usuarios del curso
            } else {
                getAlumnos();  // De lo contrario, recargar los alumnos
            }
        }).catch((error) => {
            console.error("Error al cambiar el estado del usuario:", error);
        });
    };

    return (
        <div className="container my-5">
            <h1>Listado de Alumnos</h1>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
						<th scope="col">Rol</th>
                        <th scope="col">Estado usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(alumnos) && alumnos.length > 0 ? (
                        alumnos.map((alumnoData, index) => {
                            const estadoUsuario = alumnoData.estadoUsuario;  // Aseguramos que accedemos a las propiedades correctas
                            return (
                                <tr key={alumnoData.idUsuario}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{alumnoData.usuario}</td>
                                    <td>{alumnoData.email}</td>
									<td>{alumnoData.role}</td>
                                    <td>
                                        <input 
                                            type="checkbox"
                                            checked={estadoUsuario}
                                            onChange={() => toggleEstadoUsuario(alumnoData.idUsuario, estadoUsuario)} 
                                        />
                                    </td>
                                </tr>
                            );
                        })
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

export default ListadoAlumnos;
