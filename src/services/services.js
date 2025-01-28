import Global from "./../Global"
import axios from "axios";

class serviceProfile {
	constructor() {
		this.token = null;
	}

	getToken() {
		if (!this.token) {
			this.token = localStorage.getItem('token');
		}
		return this.token;	
	}

	//* Usuario:
	getPerfilUsuario() {
		return new Promise((resolve) => {
			let usuario = null;
			let request = "api/Usuarios/Perfil";
			let url = Global.api + request;
			this.getToken();

			axios.get(url, {
				headers: {
					'Authorization': 'Bearer ' + this.token
				}
			}).then(response => {
				usuario = response.data;
				resolve(usuario);
			})
		})
	}

	async updatePerfilUsuario(user) {
		let request = "api/usuarios";
		this.getToken();
		let headers = {
			'Authorization': 'Bearer ' + this.token,
			'Content-Type': 'application/json'
		}

		try {
			const response = await axios.put(Global.api + request, user, { headers });
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
	getCharlasRonda(ronda) {
		const request = "api/charlas/charlasronda/" + ronda;
		const url = Global.api + request;
		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	async getCharlasUsuario() {
		let request = "api/charlas/charlasalumno";
		let url = Global.api + request;
		this.getToken();
		let headers = {
			'Authorization': 'Bearer ' + this.token,
			'Content-Type': 'application/json'
		}

		try {
			const response = await axios.get(url, { headers });
			return response.data;
		} catch (error) {
			console.log("error en el service get charlasusuario: " + error);
			throw error;
		}
	}

	async updateCharla(charla){
		let request = "api/charlas/";
		let url = Global.api + request;
		this.getToken();
		let headers = {
			'Authorization': 'Bearer ' + this.token,
			'Content-Type': 'application/json'
		}

		try {
			const response = await axios.put(url, charla, { headers });
			return response.data;
		} catch (error){
			console.log("error en el service update charla: " + error);
			throw error;
		}
	}

	async deleteCharla(id) {
		let request = "api/charlas/" + id;
		let url = Global.api + request;
		this.getToken();
		let headers = {
			'Authorization': 'Bearer ' + this.token,
			'Content-Type': 'application/json'
		}

		try {
			const response = await axios.delete(url, { headers });
			return response.data;
		} catch (error){
			console.log("error en el service delete charla: " + error);	
			throw error;
		}
	}

	//* Estados Charlas (ADMIN)
	getEstadoCharla() {
		const request = "api/estadoscharlas";
		const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then((response => response.data));
	}
	// {
	// 	"idEstadoCharla": 1,
	// 	"estado": "PROPUESTA"
	//   },
	//   {
	// 	"idEstadoCharla": 2,
	// 	"estado": "ACEPTADA"
	//   }

	//* Auth:
	async login(user) {
		let request = "api/auth/login";
		try {
			const response = await axios.post(Global.api + request, user);
			localStorage.setItem('token', response.data.response); 
			Global.rol = response.data.idrole;
			return response.data.response;
		} catch (error) {
			throw error;
		}
	}

	logout() {
		this.token = "";
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('idRole');
	}

	async signUpAlumno(user, curso) {
		let request = "api/usuarios/newalumno/" + curso;
		try {
			const response = await axios.post(Global.api + request, user);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async signUpProfesor(user, key) {
		let request = "api/profesor/newprofesor/" + key;
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
		const request = "api/charlas/charlascurso";
		const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	getCharlasAlumno = () => {
		const request = "/api/charlas/charlasalumno";
		const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	//* Rondas
	getRondas() {
		const request = "api/rondas";
		const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	getRondasCurso = () => {
		const request = "/api/rondas/rondascurso";
		const url = Global.api + request;

		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	getCharlaId = (id) => {
		const request = "/api/charlas/" + id;
		const url = Global.api + request;
		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			},
		}).then(response => response.data);
	}

	votarCharla = (voto) => {
		const request = "/api/Votos";
		const url = Global.api + request;

		return axios.post(url, voto, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			}
		})
	}

	votosAlumno = () => {
		const request = "/api/Votos/VotosAlumno";
		const url = Global.api + request;
		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			}
		})
	}
	
	getAlumnosProfesor = () => {
		const request = "/api/Profesor/AlumnosCursoProfesor"
		const url = Global.api + request;
		return axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			}
		})
	}

	//comentarios
	postComentario = (comentario) => {
		const request = "/api/comentarios";
		const url = Global.api + request;
		return axios.post(url, comentario, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			}
		})
	}

	deleteComentario = (idComentario) => {
		const request = "api/comentarios/" + idComentario;
		const url = Global.api + request;
		return axios.delete(url,
			{
				headers: {
					'Authorization': 'Bearer ' + this.token
				}
			}
		).then((response)=> {
			console.log("comentario eliminado correctamente");
		})
	}

	updateComentario = (comentario) => {
		const request = "api/comentarios";
		const url = Global.api + request;
		return axios.put(url , comentario, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			}
		})
	}

	//añadir recursos a tu charla
	postRecurso = (recurso) => {
		const request = "api/recursos";
		const url = Global.api + request;
		return axios.post(url, recurso, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			}
		})
	}

	updateRecurso = (recurso) => {
		const request = "api/recursos";
		const url = Global.api + request;
		return axios.put(url, recurso, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			}
		})
	}

	deleteRecurso = (idRecurso) => {
		const request = "api/recursos/" + idRecurso;
		const url = Global.api + request;
		return axios.delete(url,
			{
				headers: {
					'Authorization': 'Bearer ' + this.token
				}
			}
		).then(()=> {
			console.log("Recurso eliminado correctamente");
		})
	}
}


const services = new serviceProfile();

export default services;