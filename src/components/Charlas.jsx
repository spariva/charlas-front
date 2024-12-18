import { Component } from "react";
import services from "../services/services";
import Card from "./CardCharla";

class Charlas extends Component {
  state = {
    charlas: [],
    rondas: [],
    charlasRonda: []
  }
  getCharlas = () => {
    services.getCharlas().then((response) => {
      console.log(response);
      this.setState({
        charlas: response
      });
    });
  }

  getRondas = () => {
    services.getRondas().then((response) => {
      console.log(response);
      this.setState({
        rondas: response
      });
    });
  }
  // getCharlasRonda = () => {
  //   services.getCharlasRonda().then((response) => {
  //     console.log(response);
  //     this.setState({
  //       charlasRonda: response
  //     });
  //   })
  // }

  componentDidMount = () => {
    this.getCharlas();
    this.getRondas();
  }

  render() {
    return (
      <div className="container">
        <h1 className="my-4 text-center">Charlas</h1>

        {/* Fila de charlas */}
        <div className="row d-flex flex-wrap justify-content-start">
          {this.state.charlas.map((charla, index) => {
            return (
              <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
                <Card
                  imagen={charla.imagenCharla}
                  titulo={charla.titulo}
                  descripcion={charla.descripcion}
                />
              </div>
            );
          })}
        </div>

        <div className="row d-flex justify-content-end mt-4">
          <div className="col-12 col-md-3">
            <select
              value={this.state.selectedRonda}
              onChange={this.handleRondaChange}
              className="form-select"
            >
              <option value="">Selecciona Ronda</option>
              {this.state.rondas.map((ronda, index) => {
                return (
                  <option key={index} value={ronda.idRonda}>
                    Ronda {ronda.idRonda}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default Charlas;
