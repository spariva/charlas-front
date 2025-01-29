import React, { Component } from 'react'
import '../assets/css/menu.css'
import Global from '../Global';
import MenuAlumno from './MenuAlumno';
import MenuProfesor from './MenuProfesor';
import MenuAdmin from './MenuAdmin';

export default class Menu extends Component {
	render() {
		return (<div className="menu_container ">
			{Global.rol === 1 && <MenuProfesor />}
			{Global.rol === 2 && <MenuAlumno />}
			{Global.rol === 3 && <MenuAdmin />}
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
		)
	}
}