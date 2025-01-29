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
		</div>
		)
	}
}