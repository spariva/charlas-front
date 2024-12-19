import { Component } from "react";
import services from "../services/services";
import Card from "./CardCharla";

class Charlas extends Component {
  state = {
    charlas: [],
    rondas: [],
    charlasRonda: [],
    estadoCharla: []
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

  getEstadosCharla = () => {
    services.getEstadoCharla().then((response) => {
      console.log(response);
      this.setState({
        estadoCharla: response
      })
    })
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
    this.getEstadosCharla();
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
          <div className="col-6 col-md-3">
            <select
              className="form-select"
            >
              <option value="">Ronda</option>
              {this.state.rondas.map((ronda, index) => {
                return (
                  <option key={index} value={ronda.idRonda}>
                    Ronda {ronda.idRonda}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select
              className="form-select"
            >
              <option value="">Estado</option>
              {this.state.estadoCharla.map((estado, index) => {
                return (
                  <option key={index} value={estado.idEstadoRonda}>
                    {estado.estado}
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
