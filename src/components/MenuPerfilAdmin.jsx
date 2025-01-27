import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/stylemenualumno.css';  

export default class MenuPerfilAdmin extends Component {

    render() {
        return (
            <div>
                {/* Encabezado */}
                <header className="header">
                    <div className="container">
                        <div className="btn-menu">
                            <label htmlFor="btn-menu">☰</label>
                        </div>
                    </div>
                </header>

                {/* Menú lateral */}
                <input type="checkbox" id="btn-menu" />
                <div className="container-menu">
                    <div className="cont-menu">
                        <nav>
                            <NavLink to="/charlas">Home</NavLink>
                            <NavLink to="/perfil">Perfil</NavLink>
                            <NavLink to="/calendario">Calendario</NavLink>
                            <NavLink to="/crearProfesor">Crear Profesor</NavLink>
                            <NavLink to="/crearAlumno">Crear Alumno</NavLink>
                            <NavLink to="/crearCharla">Crear Charla</NavLink>
                            <NavLink to="/crearRonda">Crear Ronda</NavLink>
                            <NavLink to="/editarUsuario">Editar Usuario</NavLink>
                            <NavLink to="/editarCharla">Editar Charla</NavLink>
                        </nav>
                        <label htmlFor="btn-menu">✖️</label>
                    </div>
                </div>

            </div>
        );
    }
}
