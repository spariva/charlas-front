import { Component } from "react";
import services from "../services/services";
import Card from "./CardCharla";

export default class VotarCharlas extends Component {
	state = {
		charlas: [],
		rondas: [],
		rondaSeleccionada: "",
		charlaSeleccionada: "0",
	}

	getCharlasUltimaRonda = () => {
		services.getRondasCurso().then((rondasResponse) => {
			if (rondasResponse.length > 0) {
				const ultimaRonda = rondasResponse[rondasResponse.length - 1];
				services.getCharlasRonda(ultimaRonda.idRonda).then((charlasResponse) => {
					this.setState({
						charlas: charlasResponse,
						rondas: rondasResponse,
						rondaSeleccionada: ultimaRonda.idRonda
					});
					console.log("Charlas de la última ronda:", charlasResponse);
				});
			}
		});
	}

	seleccionarCharla = (idCharla) => {
		console.log("Charla seleccionada:", idCharla);
		this.setState({
			charlaSeleccionada: idCharla
		});
	}

	votarCharlaSeleccionda = () => {
		const userId = localStorage.getItem('userId');
		let idCharla = this.state.charlaSeleccionada;
		
	}

	componentDidMount = () => {
		services.getToken();
		this.getCharlasUltimaRonda();
	}

	render() {
		const userId = localStorage.getItem('userId');
		return (
			<div className="container">
				<h1 className="my-4 text-center">Votar Charlas</h1>
				<p>Usuario ID: {userId}</p>
				<div className="row d-flex flex-wrap justify-content-start">
					{this.state.charlas.map((charla, index) => {
						const isSelected = this.state.charlaSeleccionada === charla.idCharla;
						return (
							<div 
								key={index} 
								className={`col-12 col-sm-6 col-md-4 mb-4 ${isSelected ? 'border border-danger' : ''}`}
								onClick={() => this.seleccionarCharla(charla.idCharla)}
							>
								<Card
									imagen={charla.imagenCharla}
									titulo={charla.titulo}
									descripcion={charla.descripcion}
								/>
							</div>
						);
					})}
				</div>
				<button
					className="btn btn-info"
					onClick={() => this.votarCharlaSeleccionda()}
				>Votar charla seleccionada</button>
			</div>
		)
	}
}
