import React, { Component } from 'react'
import '../assets/css/menu.css';
import MenuAlumno from './MenuAlumno';
import MenuProfesor from './MenuProfesor';
import MenuAdmin from './MenuAdmin';
import services from '../services/services';

export default class Menu extends Component {
	state = {
		rol: 2,
	}

	async getUsuario() {
		const data = await services.getPerfilUsuario();
		this.setState({ rol: data.usuario.idRole });
	}

	componentDidMount() {
		this.getUsuario();
	}

	render() {
		const { rol } = this.state;
		return (<div className="menu_container ">
			{rol === 1 && <MenuProfesor />}
			{rol === 2 && <MenuAlumno />}
			{rol === 3 && <MenuAdmin />}
		</div>
		)
	}
}