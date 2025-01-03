/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Menu from './Menu';
import Profile from './Profile'
import Charlas from './Charlas';
import Header from './Header';
import CreateRonda from './CreateRonda';
import CreateCharla from './CreateCharla';
import NotFound from './NotFound';

export default class Router extends Component {
    render() {

        function CharlasRonda() {
            let {id} = useParams();
            return  (<Charlas id={id} />)
        }

        return (
            <BrowserRouter>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Header /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 p-0">
                            <Menu /> 
                        </div>

                        <div className="col-8">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/charlas" element={<Charlas />} />
                                    <Route path="/charlas/:id" element={<CharlasRonda />} />
									<Route path="/createronda" element={<CreateRonda />} />
									<Route path="/createcharla" element={<CreateCharla />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                        </div>
                        {/* CREAR COMPONENT PARA EL SELECT*/}
                        <div className="col-2">

                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
//hola
