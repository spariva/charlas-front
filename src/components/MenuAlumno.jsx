import React, { Component } from 'react'
import '../assets/css/menu.css'
import { NavLink } from 'react-router-dom'

export default class MenuAlumno extends Component {
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
					<NavLink to='/votar' className="link">
						<h4 className='poiret-one-regular poiret-one-regular--peq'>Votar charlas</h4>
					</NavLink>
				</div>
			</div>
		)
	}
}