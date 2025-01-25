import React, { Component } from "react";
import services from "../services/services";
import Card from "./CardCharla";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/votarCharlas.css';

export default class VotarCharlas extends Component {
    state = {
        charlas: [],
        rondas: [],
        rondaSeleccionada: "",
        charlaSeleccionada: "0",
        ultimaRonda: ""
    }

    getCharlasUltimaRonda = () => {
        services.getRondasCurso().then((rondasResponse) => {
            if (rondasResponse.length > 0) {
                
                let rondasActivas = [];
				console.log("Rondas:", rondasResponse);
                rondasResponse.forEach(ronda => {
                    if (new Date(ronda.fechaPresentacion) > new Date()) {
                        rondasActivas.push(ronda);
                    }
                });
				const ultimaRonda = rondasActivas[rondasActivas.length - 1];
                this.setState({
                    charlas: [],
                    rondas: rondasActivas,
                    rondaSeleccionada: ultimaRonda.idRonda,
                    ultimaRonda: ultimaRonda
                });

                services.getCharlasRonda(ultimaRonda.idRonda).then((charlasResponse) => {
                    this.setState({
                        charlas: charlasResponse
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

    votarCharlaSeleccionda = async () => {
        const userId = localStorage.getItem('userId');
		const idRole = localStorage.getItem('idRole');
        const idCharla = this.state.charlaSeleccionada;
        const ultimaRonda = this.state.ultimaRonda.idRonda;
		
        console.log("user: " + userId + ", idCharla: " + idCharla + ", idRonda: " + ultimaRonda);
        let voto = {
            idVoto: 0,
            idCharla: idCharla,
            idUsuario: userId,
            idRonda: ultimaRonda
        }
		if(idCharla === "0"){
			alert("Debe seleccionar una charla");
			return;
		}else {
			if(idRole == 2){
				try {
					const res = await services.votarCharla(voto);
					alert("SU VOTO HA SIDO REGISTRADO" + res);
				} catch (error) {
					alert("No se pueden votar dos charlas de la misma ronda");
				}
			}else{
				alert("Solo pueden votar los alumnos");
				return
			}
		}
		
    }

    handleRondaChange = (e) => {
        const rondaSeleccionada = e.target.value;
        this.setState({ rondaSeleccionada });
        services.getCharlasRonda(rondaSeleccionada).then((charlasResponse) => {
            this.setState({
                charlas: charlasResponse
            });
            console.log("Charlas de la ronda seleccionada:", charlasResponse);
        });
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
                <div className="mb-3">
                    <select 
                        className="form-select form-select-lg mb-3" 
                        name="ronda" 
                        id="ronda" 
                        onChange={this.handleRondaChange} 
                        value={this.state.rondaSeleccionada}
                    >
						{/* <option value={this.state.ultimaRonda}>--seleccione una de las rondas activas--</option> */}
                        {
                            this.state.rondas.map((ronda, index) => {
                                return (
                                    <option key={index} value={ronda.idRonda}>{ronda.descripcionModulo}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="row d-flex flex-wrap justify-content-start">
                    {this.state.charlas.map((charla, index) => {
                        const isSelected = this.state.charlaSeleccionada === charla.idCharla;
                        return (
                            <div 
                                key={index} 
                                className={`col-12 col-sm-6 col-md-4 mb-4 `}
                                onClick={() => this.seleccionarCharla(charla.idCharla)}
                            >
                                <div className={`card ${isSelected ? 'selected-charla' : ''}`} style={{ width: '300px', height: '400px' }}>
									<img
										src={charla.imagenCharla ? charla.imagenCharla : 'https://as1.ftcdn.net/v2/jpg/05/03/24/40/1000_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg' }
										alt={charla.titulo}
										className="imgcharla card-img-top"
										style={{ height: '200px', objectFit: 'cover' }}
									/>
									<div className="card-body">
										<h5 className="card-title">{charla.titulo}</h5>
										<p className="card-text">{charla.descripcion}</p>
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