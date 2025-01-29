import React from "react";
import './../assets/css/filtersCharlas.css';

const FiltrosCharlas = ({ rondas, estadoCharla, rondaSeleccionada, onRondaChange, onEstadoChange }) => {
  return (
    <div className="btnFilters">
      <div className="filters">
        <select
          className="form-select"
          value={rondaSeleccionada}
          onChange={onRondaChange}
          disabled={rondas.length === 0}
        >
          <option value="">Ronda</option>
          {rondas.length > 0 ? (
            rondas.map((ronda, index) => (
              <option key={index} value={ronda.idRonda}>
                {`Ronda ${ronda.descripcionModulo}`}
              </option>
            ))
          ) : (
            <option disabled>No hay rondas disponibles</option>
          )}
        </select>
      </div>
      <div className="filters">
        <select className="form-select" onChange={onEstadoChange}>
          <option value="">Estado</option>
          {estadosCharla.map((estado, index) => (
            <option key={index} value={estado.idEstadoRonda}>
              {estado.estado}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const estadosCharla = [
  {
    "idEstadoCharla": 1,
    "estado": "PROPUESTA"
  },
  {
    "idEstadoCharla": 2,
    "estado": "ACEPTADA"
  }
];

export default FiltrosCharlas;
