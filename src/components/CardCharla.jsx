import React from 'react';

const Card = ({ imagen, titulo, descripcion }) => {
  return (
    <div className="card h-100">
      <img src={imagen} className="card-img-top" alt="..." />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{descripcion}</p>

      </div>
    </div>
  );
}

export default Card;
