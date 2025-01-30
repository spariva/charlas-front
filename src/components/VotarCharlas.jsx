import React, { Component } from "react";
import services from "../services/services";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/votarCharlas.css';
import './../assets/css/charlas.css';
import Swal from 'sweetalert2';

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
		console.log(this.state.charlaSeleccionada);
	};

	formatFecha = (fecha) => {
		if (!fecha) return "";
		const date = new Date(fecha);
		return new Intl.DateTimeFormat("es-ES", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		}).format(date);
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
		const charlaYaVotada = this.state.charlaSeleccionada;
		if (charlaYaVotada) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Ya has votado por esta charla. No puedes cambiar tu voto.',
				confirmButtonText: 'Entendido',
				confirmButtonColor: '#3085d6', 
				background: '#f8d7da', 
				color: '#721c24', 
				timer: 3000, 
			});
			return;
		}
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
			<div
				className="container-fluid"
				style={{
					maxWidth: "90%",
					padding: "30px",
					borderRadius: "10px",
					backgroundColor: "#fff",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					position: "relative",
				}}
			>
				<div className="title">
					<h1 className='poiret-one-regular'>Votar charla</h1>
					<div className="underline"></div>
				</div>
				<div className="btnFilters--votar">
					<div className="filters">
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
					</div>
					{this.state.fechaPresentacion && (
						<p className="fecha-presentacion">
							<i className="fa-regular fa-calendar-days icon"></i>
							<span>Fecha de presentación:</span> {this.formatFecha(this.state.fechaPresentacion)}
						</p>
					)}

				</div>
				<div className="row d-flex flex-wrap justify-content-start scroll-container">
					{this.state.charlas.map((charla, index) => {
						const isSelected = this.state.charlaSeleccionada === charla.idCharla;
						return (
							<div
								key={index}
								className="col-12 col-sm-6 col-md-4 mb-4"
								onClick={() => this.seleccionarCharla(charla.idCharla)}
							>
								<div className={`card h-100 ${isSelected ? 'voted-charla' : ''}`}>
									<img
										src={charla.imagenCharla || 'https://as1.ftcdn.net/v2/jpg/05/03/24/40/1000_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'}
										alt={charla.titulo}
										className="card-img-top"
									/>
									<div className="card-body d-flex flex-column">
										<h5 className="card-title">{charla.titulo}</h5>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<button
					className="btnVotar group"
					onClick={() => this.votarCharlaSeleccionda()}
				>
					<i className="fa-solid fa-check icon--white"></i>
					<span className="tooltip">Votar charla</span>
				</button>
			</div>
		)
	}
}