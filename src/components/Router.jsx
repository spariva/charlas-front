/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Menu from './Menu';
// import Profile from './Profile'
import ProfileWrapper from './ProfileWrapper';
import Charlas from './Charlas';
import Header from './Header';
import CreateRonda from './CreateRonda';
import CreateCharla from './CreateCharla';
import NotFound from './NotFound';
import UpdateProfileWrapper from './UpdateProfileWrapper';
import LoginWrapper from './LoginWrapper';
import VotarCharlas from './VotarCharlas';

export default class Router extends Component {

  //todo: SOLUCIONAR QUE NO APAREZCA NADA AL INICIAR SESION -> REEDIRIGE A /PROFILE
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

  render() {
    const { token } = this.state;

        function CharlasRonda() {
            let {id} = useParams();
            return  (<Charlas id={id} />)
        }

        return (
            <BrowserRouter>
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
                    <Route path="/" element={<LoginWrapper />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<ProfileWrapper />} />
                    <Route path="/updateprofile" element={<UpdateProfileWrapper />} />
                    <Route path="/charlas" element={<Charlas />} />
                    <Route path="/charlas/:id" element={<CharlasRonda />} />
                    <Route path="/createronda" element={<CreateRonda />} />
                    <Route path="/createcharla" element={<CreateCharla />} />
                    <Route path="/votar" element={<VotarCharlas />} />
                    <Route path="*" element={<NotFound />} />
                  </>
              </Routes>
            </div>
            <div className="col-2">

            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
