import React, { Component } from "react";
import services from "../services/services";

export default class RondasProfe extends Component {
  state = {
    rondas: [],
  };

  getRondas = () => {
    services.getRondasProfesor().then((response) => {
      this.setState({
        rondas: response.data
      });
      console.log(response.data);
    });
  };


  componentDidMount = () => {
    this.getRondas();
  };

  render() {
    return (
      <div>
        <div
          className="container-fluid container_updateProfile"
          style={{
            maxWidth: "90%",
            margin: "30px auto",
            padding: "30px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <div className="title text-center mb-4">
            <h1 className="poiret-one-regular">Rondas del curso</h1>
            <div className="underline"></div>
          </div>
          <div className="row d-flex flex-wrap justify-content-start scroll-container">
            {this.state.rondas.map((ronda, index) => {
              return (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 mb-4 "
                  style={{ cursor: "pointer" }}
                >
                  <div className="card curso-card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-primary">{ronda.descripcionModulo}</h5>
                      <p className="card-text mb-2">
                        <strong>Fecha de presentación:</strong> {services.formatFecha(ronda.fechaPresentacion)}
                      </p>
                      <p className="card-text mb-2">
                        <strong>Fecha de cierre:</strong> {services.formatFecha(ronda.fechaCierre)}
                      </p>
                      <p className="card-text">
                        <strong>Fecha límite de votación:</strong> {services.formatFecha(ronda.fechaLimiteVotacion)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
