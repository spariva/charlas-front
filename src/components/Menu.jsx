import React, { Component } from 'react'
import '../assets/css/menu.css'
import { NavLink } from 'react-router-dom'
import services from '../services/services'

export default class Menu extends Component {
  render() {
    return (<div className="menu__side">
		<div className="name__page">
			<i className="fab fa-youtube"></i>
			<h4>Charlas front</h4>
		</div>
		<div className="options__menu">
			<NavLink to="/" className="option">
				<i className="fas fa-home"></i>
				<h4>Inicio</h4>
			</NavLink>
			<NavLink to="/login">
				<div className="option">
					<i className="fas fa-video"></i>
					<h4>Login</h4>
				</div>
			</NavLink>
			<NavLink to="/profile">
				<div className="option">
					<i className="fas fa-video"></i>
					<h4>Profile</h4>
				</div>
			</NavLink>
			<NavLink to="/charlas">
			<div className="option">
					<i className="far fa-sticky-note"></i>
					<h4>Charlas</h4>
				</div>
			</NavLink>
			<NavLink to="/createronda">
			<div className="option">
					<i className="far fa-sticky-note"></i>
					<h4>Crear Ronda</h4>
				</div>
			</NavLink>
			<NavLink to="/login">
				<div className="option">
					<i className="far fa-address-card"></i>
					<h4>Log out</h4>
				</div>
			</NavLink>
		</div>
	</div>
    )
  }
}