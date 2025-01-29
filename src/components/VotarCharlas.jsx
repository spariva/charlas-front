import React, { Component } from "react";
import services from "../services/services";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/votarCharlas.css';

export default class VotarCharlas extends Component {
	state = {
		charlas: [],
		rondas: [],
		rondaSeleccionada: "",
		charlaSeleccionada: "0",
		ultimaRonda: "",
		votosAlumno: [],
		fechaPresentacion: ""
	}

	getVotos = () => {
		let idRonda = this.state.rondaSeleccionada;
		if (!idRonda) {
			console.error("No hay ronda seleccionada");
			return;
		}

		services.getVotosCharlaAlumno(idRonda)
			.then((voto) => {
				console.log("Votos del alumno:", voto.data);

				this.setState({
					votosAlumno: Array.isArray(voto.data) ? voto.data : [],
					charlaSeleccionada: voto.data?.idCharla || "0", // Selecciona la charla votada
				});
			})
			.catch((error) => {
				console.error("Error al obtener los votos:", error);
			});
	};

	getCharlasUltimaRonda = () => {
		services.getRondasCurso()
			.then((rondasResponse) => {
				if (rondasResponse.length > 0) {
					let rondasActivas = rondasResponse.filter(ronda =>
						new Date(ronda.fechaPresentacion) > new Date()
					);

					const ultimaRonda = rondasActivas[rondasActivas.length - 1];

					this.setState({
						charlas: [],
						rondas: rondasActivas,
						rondaSeleccionada: ultimaRonda.idRonda, // Selecciona la última ronda por defecto
						ultimaRonda: ultimaRonda,
						fechaPresentacion: ultimaRonda.fechaPresentacion,
					}, () => {
						this.getCharlasRonda(ultimaRonda.idRonda);
						this.getVotos(); // Llamar a getVotos para sincronizar la charla seleccionada
					});
				}
			})
			.catch((error) => {
				console.error("Error al obtener las rondas:", error);
			});
	};

	getCharlasRonda = (idRonda) => {
		services.getCharlasRonda(idRonda).then((charlasResponse) => {
			this.setState({
				charlas: charlasResponse
			});
			console.log("Charlas de la ronda:", charlasResponse);
		}).catch((error) => {
			console.error("Error al obtener las charlas:", error);
		});
	}

	seleccionarCharla = (idCharla) => {
		this.setState({
			charlaSeleccionada: idCharla
		});
	}

	votarCharlaSeleccionda = async () => {
		const userId = localStorage.getItem('userId');
		const idRole = localStorage.getItem('idRole');
		const idCharla = this.state.charlaSeleccionada;
		const idRonda = this.state.rondaSeleccionada;

		console.log("user: " + userId + ", idCharla: " + idCharla + ", idRonda: " + idRonda);
		let voto = {
			idVoto: 0,
			idCharla: idCharla,
			idUsuario: userId,
			idRonda: idRonda
		}
		if (idCharla === "0") {
			alert("Debe seleccionar una charla");
			return;
		} else {
			services.votarCharla(voto).then((response) => {
				alert("Voto registrado correctamente");
			}).catch((error) => {
				console.error("Error al registrar el voto:", error);
				alert("Error al registrar el voto");
			});
		}
	}

	handleRondaChange = (e) => {
		const rondaSeleccionada = e.target.value;

		// Convertir `rondaSeleccionada` al tipo correcto (por si es número y llega como string)
		const ronda = this.state.rondas.find(r => String(r.idRonda) === String(rondaSeleccionada));

		if (!ronda) {
			console.error("No se encontró la ronda seleccionada en el array de rondas", {
				rondaSeleccionada,
				rondas: this.state.rondas,
			});
		}

		this.setState({
			rondaSeleccionada,
			fechaPresentacion: ronda ? ronda.fechaPresentacion : this.state.fechaPresentacion, // Mantener la fecha anterior si no se encuentra la ronda
		}, () => {
			this.getCharlasRonda(rondaSeleccionada);
			this.getVotos();
		});
	};



	componentDidMount = () => {
		services.getToken();
		this.getVotos();
		this.getCharlasUltimaRonda();
	}

	render() {
		const userId = localStorage.getItem('userId');
		return (
			<div className="container">
				<div className="title">
					<h1 className='poiret-one-regular'>Votar charla</h1>
					<div className="underline"></div>
				</div>
				<div className="mb-3">
					<select
						className="form-select form-select-lg mb-3"
						name="ronda"
						id="ronda"
						onChange={this.handleRondaChange}
						value={this.state.rondaSeleccionada}
					>
						{this.state.rondas.map((ronda, index) => (
							<option key={index} value={ronda.idRonda}>{ronda.descripcionModulo}</option>
						))}
					</select>

					{this.state.fechaPresentacion && (
						<p>Fecha de presentación: {services.formatFecha(this.state.fechaPresentacion)}</p>
					)}
				</div>
				<div className="row d-flex flex-wrap justify-content-start">
					{this.state.charlas.map((charla, index) => {
						const isSelected = this.state.charlaSeleccionada === charla.idCharla;
						const isVoted = Array.isArray(this.state.votosAlumno) ? this.state.votosAlumno.some(voto => voto.idCharla === charla.idCharla) : false;
						return (
							<div
								key={index}
								className={`col-12 col-sm-6 col-md-4 mb-4 `}
								onClick={() => this.seleccionarCharla(charla.idCharla)}
							>

								<div className={`card ${isSelected ? 'selected-charla' : ''} ${isVoted ? 'voted-charla' : ''}`} style={{ width: '300px', height: '400px' }}>
									<img
										src={charla.imagenCharla ? charla.imagenCharla : 'https://as1.ftcdn.net/v2/jpg/05/03/24/40/1000_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'}
										alt={charla.titulo}
										className="imgcharla card-img-top"
										style={{ height: '200px', objectFit: 'cover' }}
									/>
									<div className="card-body">
										<h5 className="card-title">{charla.titulo}</h5>
										<p className="card-text">{charla.descripcion}</p>
										{isVoted && <p className="text-success">Votado</p>}
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="d-flex justify-content-end align-items-center mt-4">
					<button
						className="btn btn-dark"
						onClick={() => this.votarCharlaSeleccionda()}
					>Votar charla seleccionada</button>
				</div>
			</div>
		)
	}
}