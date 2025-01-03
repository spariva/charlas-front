import Global from "./../Global"
import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";

class serviceProfile {

	constructor() {
		this.token = null;
	}
	//SE NECESITA TOKEN

	getToken() {
		this.token = localStorage.getItem('token');
	}

	getPerfilUsuario() {
		return new Promise((resolve) => {
			let usuario = null;
			let request = "api/Usuarios/Perfil";
			let url = Global.api + request;
			this.getToken();

			axios.get(url, {
				headers: {
					// TODAVIA NO ESTA IMPLEMENTADA LA FUNCION getToken
					'Authorization': 'Bearer ' + this.token
				}
			}).then(response => {
				usuario = response.data;
				console.log(usuario.usuario);
				resolve(usuario);
			})
		})
	}

	//todas las charlas
	getCharlas() {
		const request = "api/charlas";
		const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	

	//CHARLAS DE UNA RONDA
	getCharlasRonda() {
        const request = "api/charlas/charlasronda/4";
        const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	//get rondas
	getRondas() {
		const request = "api/rondas";
		const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	//get estados de las charlas para filtrar por estado
	getEstadoCharla() {
		const request = "api/estadoscharlas";
		const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then((response => response.data));
	}

	//* Auth:
	async login(user) {
		let request = "api/auth/login";
		try {
			const response = await axios.post(Global.api + request, user);
			localStorage.setItem('token', response.data.response);
			return response.data.response;
		} catch (error) {
			throw error;
		}
	}

	logout() {
		this.token = "";
		localStorage.removeItem('token');
	}

	async signUp(user) {
		let request = "api/usuarios/newalumno/3213";
		//* Esto se sustituira por el curso como parametro en el método.
		try {
			const response = await axios.post(Global.api + request, user);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	//PARA CREAR UNA RONDA TIENES QUE TENER UN TOKEN DE PROFESOR
	createRonda = (ronda) => {
		const request = "api/profesor/createronda";
		const url = Global.api + request;
		return axios.post(url, ronda, {
			headers: {
				'Authorization': `Bearer ${this.token}`,
			},
		}).then((response) => {
			console.log(response);
		})
	};

	createCharla = (charla) => {
		const request = "/api/charlas";
		const url = Global.api + request;

		return axios.post(url, charla, {
			headers: {
				'Authorization': `Bearer ${this.token}`,
			}
		}).then((response) => {
			console.log(response);
		})
	}

	getCharlasCurso = () => {
		const request = "api/Charlas/CharlasCurso";
		const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	getCharlasAlumno = () => {
		const request = "/api/Charlas/CharlasAlumno";
		const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	getRondasCurso = () => {
		const request = "/api/Rondas/RondasCurso";
		const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	getCharlasRonda(ronda) {
		console.log(ronda+ "LLLLLLLLL")
	    const request = "/api/Charlas/CharlasRonda/" + ronda;
	    const url = Global.api + request;
	    return axios.get(url, {
	        headers: {
	            'Authorization': 'Bearer ' + this.token
	        },
	    }).then(response => response.data);
	}
}

const services = new serviceProfile();

export default services;