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
        >
          <option value="">Ronda</option>
          {rondas.map((ronda, index) => (
            <option key={index} value={ronda.idRonda}>
              {`Ronda ${ronda.idRonda}`}
            </option>
          ))}
        </select>
      </div>
      <div className="filters">
        <select className="form-select" onChange={onEstadoChange}>
          <option value="">Estado</option>
          {estadoCharla.map((estado, index) => (
            <option key={index} value={estado.idEstadoRonda}>
              {estado.estado}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FiltrosCharlas;
