import { Component } from "react";
import services from "../services/services";
import Card from "./CardCharla";
import PopupCharla from "./PopupCharla";

class Charlas extends Component {
	state = {
		charlas: [],
		rondas: [],
		charlasRonda: [],
		estadoCharla: [],
		rondaSeleccionada: "",
		seleccionadaCharla: null, 
		showPopup: false, 
	}

	getCharlas = () => {
		services.getCharlasCurso().then((response) => {
			console.log(response);
			this.setState({
				charlas: response
			});
		});
	}

	getRondas = () => {
		services.getRondasCurso().then((response) => {
			console.log(response);
			this.setState({
				rondas: response
			});
		});
	}

	getEstadosCharla = () => {
		services.getEstadoCharla().then((response) => {
			console.log(response);
			this.setState({
				estadoCharla: response
			})
		})
	}

	getCharlasRonda = () => {
		services.getCharlasRonda().then((response) => {
			console.log(response);
			this.setState({
				charlasRonda: response
			});
		})
	}

	componentDidMount = () => {
		services.getToken();
		this.getCharlas();
		this.getRondas();
		//this.getEstadosCharla();
	}

	handleRondaChange = (event) => {
		const rondaSeleccionada = event.target.value;
		services.getCharlasRonda(rondaSeleccionada).then((response) => {
			this.setState({
				charlas: response
			});
		})
	}

	handleCardClick = (charla) => {
		this.setState({
			seleccionadaCharla: charla,
			showPopup: true
		});
	}

	handleClosePopup = () => {
		this.setState({
			seleccionadaCharla: null,
			showPopup: false
		});
	}

	render() {
    return (
      <div className="container">
        <h1 className="my-4 text-center">Charlas</h1>
  
        <div className="row d-flex flex-wrap justify-content-start">
          {this.state.charlas.map((charla, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 mb-4"
              onClick={() => this.handleCardClick(charla)}
              style={{ cursor: "pointer" }}
            >
              <Card
                imagen={charla.imagenCharla}
                titulo={charla.titulo}
                descripcion={charla.descripcion}
              />
            </div>
          ))}
        </div>
  
        <div className="row d-flex justify-content-end mt-4">
          <div className="col-6 col-md-3">
            <select
              className="form-select"
              value={this.state.rondaSeleccionada}
              onChange={this.handleRondaChange}
            >
              <option value="">Ronda</option>
              {this.state.rondas.map((ronda, index) => (
                <option key={index} value={ronda.idRonda}>
                  Ronda {ronda.idRonda}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select">
              <option value="">Estado</option>
              {this.state.estadoCharla.map((estado, index) => (
                <option key={index} value={estado.idEstadoRonda}>
                  {estado.estado}
                </option>
              ))}
            </select>
          </div>
        </div>
        <PopupCharla
          show={this.state.showPopup}
          onClose={this.handleClosePopup}
        >
          {this.state.seleccionadaCharla && (
            <>
              <h2>{this.state.seleccionadaCharla.titulo}</h2>
              <img
                src={this.state.seleccionadaCharla.imagenCharla}
                alt={this.state.seleccionadaCharla.titulo}
                className="img-fluid"
              />
              <p>{this.state.seleccionadaCharla.descripcion}</p>
            </>
          )}
        </PopupCharla>
      </div>
    );
  }
  
}

export default Charlas;
