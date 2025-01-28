import React, { Component } from 'react'
import '../assets/css/menu.css'
import { NavLink } from 'react-router-dom'
import services from '../services/services'

export default class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: props.userId
		};
	}
	logout = () => {
		services.logout();
	}

	render() {
		const userId = localStorage.getItem('userId');
		console.log(userId);

		return (<div className="menu_container">
			{/* <div className="name__page">
				<i className="fab fa-youtube"></i>
				<h4>Charlas front</h4>
			</div> */}
			<div className="menu_items">
				<div className="item">
					<NavLink to="/home" className="link link--home">
					<i className="fa-solid fa-house house_icon"></i>
					{/* <svg className='icon' fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#bdbdbd" stroke-width="1">
							<path d="M31.772 16.043l-15.012-15.724c-0.189-0.197-0.449-0.307-0.721-0.307s-0.533 0.111-0.722 0.307l-15.089 15.724c-0.383 0.398-0.369 1.031 0.029 1.414 0.399 0.382 1.031 0.371 1.414-0.029l1.344-1.401v14.963c0 0.552 0.448 1 1 1h6.986c0.551 0 0.998-0.445 1-0.997l0.031-9.989h7.969v9.986c0 0.552 0.448 1 1 1h6.983c0.552 0 1-0.448 1-1v-14.968l1.343 1.407c0.197 0.204 0.459 0.308 0.722 0.308 0.249 0 0.499-0.092 0.692-0.279 0.398-0.382 0.411-1.015 0.029-1.413zM26.985 14.213v15.776h-4.983v-9.986c0-0.552-0.448-1-1-1h-9.965c-0.551 0-0.998 0.445-1 0.997l-0.031 9.989h-4.989v-15.777c0-0.082-0.013-0.162-0.032-0.239l11.055-11.52 10.982 11.507c-0.021 0.081-0.036 0.165-0.036 0.252z"></path>
						</svg> */}
					</NavLink>
				</div>
				<div className="item">
					<NavLink to="/charlas" className="link">
						<h4 className='poiret-one-regular poiret-one-regular--peq'>Charlas</h4>
					</NavLink>
				</div>
				<div className="item">
					<NavLink to={'/votar'} className="link">
						<h4 className='poiret-one-regular poiret-one-regular--peq'>Votar charlas</h4>
					</NavLink>
				</div>

				{/* <NavLink to="/">
					<div className="option">
						<i className="fas fa-video"></i>
						<h4>Login</h4>
					</div>
				</NavLink> */}
				{/* <NavLink to="/profile">
					<div className="option">
						<i className="fas fa-video"></i>
						<h4>Profile</h4>
					</div>
				</NavLink> */}
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