import React, { Component } from 'react'
import '../assets/css/menu.css'
import { NavLink } from 'react-router-dom'
import Global from '../Global';
import MenuPerfilAlumno from './MenuPerfilAlumno';
import MenuPerfilProfesor from './MenuPerfilProfesor';

export default class Menu extends Component {
	render() {
		return (<div className="menu_container">
			<div className="menu_items">
				{Global.rol === 1 && <MenuProfesor />}
				{Global.rol === 2 && <MenuAlumno />}
				{Global.rol === 3 && <MenuAdmin />}
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
					<NavLink to='/votar' className="link">
						<h4 className='poiret-one-regular poiret-one-regular--peq'>Votar charlas</h4>
					</NavLink>
				</div>
				{/* <NavLink to="/createronda">
					<div className="option">
						<i className="far fa-sticky-note"></i>
						<h4>Crear Ronda</h4>
					</div>
				</NavLink> */}
				{/* <NavLink to="/createcharla">
					<div className="option">
						<i className="far fa-sticky-note"></i>
						<h4>Crear Charla</h4>
					</div>
				</NavLink> */}
				{/* <NavLink to="/" onClick={this.logout}>
					<div className="option">
						<i className="far fa-address-card"></i>
						<h4>Log out</h4>
					</div>
				</NavLink> */}
			</div>
		</div>
		)
	}
}