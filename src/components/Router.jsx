/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Home from './Home'


export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                {/* <Menu /> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    {/* <Route path='/equipos/:id' element={<ElementDetalle />} /> */}
                </Routes>
            </BrowserRouter>
        )
    }
}
