import React, { Component } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./Home";
import Menu from "./Menu";
import ProfileWrapper from "./ProfileWrapper";
import Charlas from "./Charlas";
import Header from "./Header";
import CreateRonda from "./CreateRonda";
import CreateCharla from "./CreateCharla";
import NotFound from "./NotFound";
import UpdateProfileWrapper from "./UpdateProfileWrapper";
import LoginWrapper from "./LoginWrapper";
import VotarCharlas from "./VotarCharlas";
import UpdateCharlaWrapper from "./UpdateCharlaWrapper";
import CursosProfesor from "./CursosProfesor";
import CreateCurso from "./CreateCurso";
import CreateBtnCharla from "./CreateBtnCharla";
import ListadoAlumnos from "./ListadoAlumnos";
import ListaCursosAdmin from "./ListaCursosAdmin";
import VotacionProfesor from "./VotacionProfesor";
import RondasProfe from "./RondasProfe";
import ListadoAlumnosProfe from "./ListadoAlumnosProfe";

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      rol: 1
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ token });
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ token: null, rol: 1 });
  };

  onLogin = (token) => {
    this.setState({ token: token });
  };

  getRol = (rol) => {
    this.setState({ rol: rol });
  }

  

  render() {
    const { token, rol } = this.state;

    const LoginElement = () => <LoginWrapper onLogin={this.onLogin} />;

    const CharlasRonda = () => {
      let { id } = useParams();
      return <Charlas id={id} />;
    };

    return (
      <BrowserRouter>
        {/* {console.log("el token del render: ", this.state.token)} */}
        {/* {!token && console.log("el token del navigate: ", this.state.token) && <Navigate to="/login" />} */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {token && <Header onLogout={this.handleLogout} />}
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 p-0">
              {token && <Menu onRol={this.getRol}/>}
            </div>
            <div className="col-md-8">
              <Routes>
                <Route path="/" element={<LoginElement />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<LoginElement />} />
                <Route path="/profile" element={<ProfileWrapper />} />
                <Route path="/updateprofile" element={<UpdateProfileWrapper />} />
                <Route path="/charlas" element={<Charlas />} />
                <Route path="/charlas/:id" element={<CharlasRonda />} />
                <Route path="/updatecharla" element={<UpdateCharlaWrapper />} />
                <Route path="/createronda" element={<CreateRonda />} />
                <Route path="/createcharla" element={<CreateCharla />} />
                <Route path="/votar" element={<VotarCharlas />} />
                <Route path="/votacion" element={<VotacionProfesor />} />
                <Route path="/cursos" element={<CursosProfesor />} />
                <Route path="/createcurso" element={<CreateCurso />} />
				        <Route path="/listaCursos" element={<ListaCursosAdmin />} />
				        <Route path="/alumnos/:id" element={<ListadoAlumnos />} />
				        <Route path="/alumnosprofe/:id" element={<ListadoAlumnosProfe />} />
                <Route path="/rondasprofe" element={<RondasProfe />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <div className="col-2 colBtnActions">
              {rol === 2 && <CreateBtnCharla />}
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
