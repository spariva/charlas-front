/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Menu from './Menu';
import Profile from './Profile'

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                {/* Incluye el menú como un elemento fijo */}
                <Menu />
                <div style={{ marginLeft: '250px', padding: '20px' }}>
                    {/* Contenedor para el contenido principal */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}
