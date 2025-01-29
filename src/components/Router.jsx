import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import ProfileWrapper from './ProfileWrapper';
import Charlas from './Charlas';
import Header from './Header';
import CreateRonda from './CreateRonda';
import CreateCharla from './CreateCharla';
import NotFound from './NotFound';
import UpdateProfileWrapper from './UpdateProfileWrapper';
import LoginWrapper from './LoginWrapper';
import VotarCharlas from './VotarCharlas';
import UpdateCharlaWrapper from './UpdateCharlaWrapper';
import CursosProfesor from './CursosProfesor';
import CreateCurso from './CreateCurso';
import ListadoAlumnos from './ListadoAlumnos';
export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    this.setState({ token });
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ token: null });
  };

  onLogin = (token) => {
    //No lo guardo en el localStorage porque ya lo hace el servicio
    this.setState({ token: token });
  };

  render() {
    const LoginElement = () => {
      return (<LoginWrapper onLogin={this.onLogin} />)
    }

    const { token } = this.state;

    function CharlasRonda() {
      let { id } = useParams();
      return (<Charlas id={id} />)
    }

    return (
      <BrowserRouter>
        {!token && <Navigate to="/" />}

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {token && <Header onLogout={this.handleLogout} />}
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 p-0">
              {token && <Menu />}
            </div>

            <div className="col-8">
              <Routes>
                <>
                  <Route path="/" element={<LoginElement />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<ProfileWrapper />} />
                  <Route path="/updateprofile" element={<UpdateProfileWrapper />} />
                  <Route path="/charlas" element={<Charlas />} />
                  <Route path="/charlas/:id" element={<CharlasRonda />} />
                  <Route path="/updatecharla" element={<UpdateCharlaWrapper />} />
                  <Route path="/createronda" element={<CreateRonda />} />
                  <Route path="/createronda" element={<CreateCurso />} />
                  <Route path="/createcharla" element={<CreateCharla />} />
                  <Route path="/votar" element={<VotarCharlas />} />
                  <Route path="/alumnos/:idCurso" element={<ListadoAlumnos />} />
				  <Route path="/alumnos" element={<ListadoAlumnos />} />
				  <Route path="/cursos" element={<CursosProfesor />} />
                  <Route path="*" element={<NotFound />} />
                </>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
