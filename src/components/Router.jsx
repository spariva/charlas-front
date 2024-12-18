/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Menu from './Menu';
import Profile from './Profile'
import Charlas from './Charlas';
import Header from './Header';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Menu />
                <div style={{ marginLeft: '250px', padding: '20px' }}>
                    {/* METER UN CONTAINER PARA ESTRUCTURAR TODA LA WEB CON EL GRID */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
                        <Route path="/charlas" element={<Charlas />} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}
