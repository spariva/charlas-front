import Global from "./../Global"
import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";

class serviceProfile {

	constructor() {
		this.token = null;
	}

	getToken() {
		this.token = localStorage.getItem('token');
	}

	//* Usuario:
	getPerfilUsuario() {
		return new Promise((resolve) => {
			let usuario = null;
			let request = "api/Usuarios/Perfil";
			let url = Global.api + request;
			this.getToken();
			console.log(this.token);

			axios.get(url, {
				headers: {
					'Authorization': 'Bearer ' + this.token
				}
			}).then(response => {
				usuario = response.data;
				console.log(usuario.usuario);
				resolve(usuario);
			})
		})
	}

	async updatePerfilUsuario(user) {
		let request = "api/usuarios";
		let headers= {
			'Authorization': 'Bearer ' + this.token
		}
		try {
			const response = await axios.put(Global.api + request, headers, user);
			return response;
		} catch (error) {
			console.log("error en el service update user: " + error);
			throw error;
		}
	}

	//*Charlas
	//todas las charlas
	getCharlas() {
		const request = "api/charlas";
		const url = Global.api + request;
		this.getToken();

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => {
			console.log(response.data);
			return response.data
		}
		);
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
		//* TODO: Esto se sustituira por el curso como parametro en el método.
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

	//filtrar charlas por ronda
	// getCharlasRonda() {
	//     const request = "api/charlas/charlasronda/" + this.props.id;
	//     const url = Global.api + request;
	//     return axios.get(url, {
	//         headers: {
	//             'Authorization': 'Bearer ' + 'mNXdhWThMZGFLYy9oZStxYllCVTZaTnVjTm9iYjJFdEZ5ME4rUXJNck9tSjQzNFpsMWxWYUpKUE9VRitkS3JBQlo5dlZYZkxMK1dubTIxcGFOZEV1dUhNMzlzRUM3SW1uIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFETUlOSVNUUkFET1IiLCJQUk9GRVNPUiIsIkFMVU1OTyJdLCJuYmYiOjE3MzQ1NTA2ODMsImV4cCI6MTczNDU2NTA4MywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAzMi8iLCJhdWQiOiJBcGlDaGFybGFzVGVjbmljYXNDb3JlT0F1dGgifQ.qWHLQqnLx62aOSWH0teC_KasXL7rBa7AMRRmI5SVxfk'
	//         },
	//     }).then(response => response.data);
	// }
}

const services = new serviceProfile();

export default services;