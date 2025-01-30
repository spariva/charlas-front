import React, { Component } from 'react'
import '../assets/css/menu.css'
import { NavLink } from 'react-router-dom'

export default class MenuProfesor extends Component {
	render() {
		return (
			<div className="menu_items">
				<div className="item">
					<NavLink to="/home" className="link link--home">
						<i className="fa-solid fa-house house_icon"></i>
					</NavLink>
				</div>
				<div className="item">
					<NavLink to="/charlas" className="link">
						<h4 className='poiret-one-regular poiret-one-regular--peq'>Charlas</h4>
					</NavLink>
				</div>
				<div className="item">
					<NavLink to='/votacion' className="link">
						<h4 className='poiret-one-regular poiret-one-regular--peq'>Votación</h4>
					</NavLink>
				</div>
				<div className="item">
					<NavLink to='/cursos' className="link">
						<h4 className='poiret-one-regular poiret-one-regular--peq'>Cursos</h4>
					</NavLink>
				</div>
				<div className="item">
					<NavLink to='/createcurso' className="link">
						<h4 className='poiret-one-regular poiret-one-regular--peq'>Crear Curso</h4>
					</NavLink>
				</div>
				<div className="item">
					<NavLink to='/createronda' className="link">
						<h4 className='poiret-one-regular poiret-one-regular--peq'>Crear Ronda</h4>
					</NavLink>
				</div>
			</div>
		)
	}
}