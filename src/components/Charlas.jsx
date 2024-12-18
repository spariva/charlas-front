import { Component } from "react";
import services from "../services/services";
import Card from "./CardCharla";

class Charlas extends Component {
  state = {
    charlas: []
  }

  componentDidMount = () => {
    services.getCharlas().then((response) => {
      console.log(response);
      this.setState({
        charlas: response
      });
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="my-4 text-center">Charlas</h1>
        <div className="row">
          {this.state.charlas.map((charla, index) => {
            return (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <Card
                  imagen={charla.imagenCharla}
                  titulo={charla.titulo}
                  descripcion={charla.descripcion}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Charlas;
