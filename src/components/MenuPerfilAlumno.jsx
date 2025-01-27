import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../css/stylemenualumno.css';  

export default class MenuPerfilAlumno extends Component {

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
                            <NavLink to="/crearCharla">Crear Charla</NavLink>
                        </nav>
                        <label htmlFor="btn-menu">✖️</label>
                    </div>
                </div>

            </div>
        );
    }
}
