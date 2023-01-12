import React, { Component } from "react";
import { connect } from "react-redux";
import "./logo.css";
import Logo from "./Logo.js";
const client_id = "ddda1eb78e79438ea6a89a58bfbdcdc5";
const redirect_uri = "http://localhost:3000/make_requests/";
// const redirect_uri = "https://listi-fy.herokuapp.com/make_requests/";
const scope =
  "user-read-email+" +
  "user-read-private+" +
  "playlist-modify-public+" +
  "playlist-read-private+" +
  "playlist-read-collaborative";
// import Logo from "./logo.svg";

// import Logo from "../../static/frontend/logo.svg";
class Home extends Component {
  state = {
    cFill: "#ffffff",
    cStroke: "#000000",
    tFill: "#000000",
    tStroke: "#000000",
  };
  in = () => {
    this.setState({
      cFill: "#1DB954",
      tFill: "#FFFFFF",
      tStroke: "#FFFFFF",
      cStroke: "#1DB954",
    });
  };
  out = () => {
    this.setState({
      cFill: "#ffffff",
      tFill: "#000000",
      tStroke: "#000000",
      cStroke: "#000000",
    });
  };
  render() {
    return (
      <div className="h-100 d-flex align-items-center w-100 mx-auto ">
        <div className="container mx-auto  pb-5">
          <div className="row h-50">
            <div className="col-6 mx-auto col-md-4  order-md-2">
              <Logo props={this.state}></Logo>
            </div>
            <div className="col-md-7 text-md-left order-md-1  pr-md-5">
              <h1 style={{ fontSize: "3em" }}>
                Crie playlists no Spotify de forma rápida
              </h1>
              <h2
                className="mb-2 font-weight-light"
                style={{ fontSize: "1.9em" }}
              >
                Escolha 5 músicas ou artistas e o Listify cria uma playlist para
                você baseada nessas escolhas.O Listify usa o API do Spotify e
                não guarda seus dados ou suas credenciais :)
              </h2>
              <a
                onMouseEnter={() => this.in()}
                onMouseLeave={() => this.out()}
                href={
                  "https://accounts.spotify.com/authorize?client_id=" +
                  client_id +
                  "&redirect_uri=" +
                  redirect_uri +
                  "&scope=" +
                  scope +
                  "&response_type=token"
                }
                type="button"
                class="btn     custom-btn mt-3 w-100"
              >
                Fazer login !
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  code: state,
});
export default connect(mapStateToProps)(Home);
