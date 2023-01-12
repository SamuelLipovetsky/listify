import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPlaylist,
  createPlaylist,
  remTrackPlaylist,
  getRecommendations,
} from "../actions/FetchActions";

import { playlistSuccess } from "../actions/UiActions";
import Success from "./Cards/SuccessCard";
import Fail from "./Cards/FailCard";
import { BsTrashFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import { GrClose } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
class DisplayRecom extends Component {
  //change the sucess when component Mount
  state = {
    playlistName: "listify",
    sucessDisplay: "block",
    errorDisplay: "none",
    recDisplay: "none",
  };
  componentWillMount() {
    this.props.playlistSuccess(null);
    if (this.props.error != null) {
    }
  }
  onChange = (e) => {
    console.log(e.target.value);
    this.setState({ playlistName: e.target.value });
    console.log(this.state.playlistName);
  };
  changeDisplay = () => {
    if (this.props.artists.length + this.props.tracks.length == 0) {
      return {
        sucessDisplay: "none",
        errorDisplay: "none",
        recDisplay: "none",
        choseOneDisplay: "block",
        // sucessDisplay: "block",
        // errorDisplay: "none",
        // recDisplay: "none",
        // choseOneDisplay: "none",
      };
    }
    if (this.props.sucess == true) {
      return {
        sucessDisplay: "block",
        errorDisplay: "none",
        recDisplay: "none",
        choseOneDisplay: "none",
      };
    }
    if (this.props.sucess == false || this.props.error != null) {
      return {
        sucessDisplay: "none",
        errorDisplay: "block",
        recDisplay: "none",
        choseOneDisplay: "none",
        // sucessDisplay: "block",
        // errorDisplay: "none",
        // recDisplay: "none",
        // choseOneDisplay: "none",
      };
    }
    if (this.props.sucess == null) {
      return {
        sucessDisplay: "none",
        errorDisplay: "none",
        recDisplay: "block",
        choseOneDisplay: "none",
        // sucessDisplay: "block",
        // errorDisplay: "none",
        // recDisplay: "none",
        // choseOneDisplay: "none",
      };
    }
  };
  render() {
    return (
      <Popup
        className="rounded p-0"
        contentStyle={{
          width: "80%",
          height: "80%",
          padding: "0px",
          maxWidth: "1200px",
        }}
        onOpen={() =>
          this.props.getRecommendations(
            this.props.code,
            this.props.artists,
            this.props.tracks,
            this.props.quantity
          )
        }
        trigger={
          <button type="button" className="btn  btn-outline-success">
            <p className="text-center m-0 p-0">Criar!</p>
          </button>
        }
        modal
        position="top left"
      >
        <div className="container-fluid  border border-success m-0 p-0 w-100 h-100 rounded">
          <div
            className="container-fluid m-0 p-0 w-100 h-100"
            style={{ display: this.changeDisplay().sucessDisplay }}
          >
            <Success></Success>
          </div>
          <div
            className="container-fluid m-0 p-0 w-100 h-100"
            style={{ display: this.changeDisplay().errorDisplay }}
          >
            <Fail></Fail>
          </div>
          <div
            className="container m-0 p-0 w-100 h-100"
            style={{
              display: this.changeDisplay().choseOneDisplay,
              background: "#e8e8e8",
            }}
          >
            <div className="row align-items-center w-100 h-100 m-0 p-0">
              <h1 className="text-center w-100 font-weight-light">
                Escolha pelo menos um artista ou uma música antes de criar uma
                playlist.
              </h1>
            </div>
          </div>
          <div
            id="showRec"
            className="container-fluid h-100"
            style={{
              display: this.changeDisplay().recDisplay,
              background: "#e8e8e8",
            }}
          >
            <div
              className="row row-cols-1 row-cols-md-2 pl-1 overflow-auto   "
              style={{ height: "80%" }}
            >
              {this.props.playlists.map((value) => (
                <div
                  className="d-inline-flex p-1 col border-top "
                  style={{ maxHeight: "75px" }}
                >
                  <div
                    style={{
                      minWidth: "60px",
                      maxWidth: "60px",
                      maxHeight: "55px",
                      minHeight: "55px",
                    }}
                  >
                    {value.album.images.length > 0 ? (
                      <img
                        className=" h-100 w-100"
                        src={value.album.images[0].url}
                      />
                    ) : (
                      <img src="" />
                    )}
                  </div>
                  <div
                    className="p-1 text-left text-nowrap text-truncate   w-100 align-bottom"
                    style={{
                      maxHeight: "55px",
                      minHeight: "55px",
                    }}
                  >
                    <blockquote className="blockquote">
                      <p className="mb-0  font-weight-bold ">{value.name}</p>
                      <footer className="font-weight-ligh footer small">
                        {value.artists[0].name}
                      </footer>
                    </blockquote>
                  </div>
                  <div
                    className="mx-auto px-auto"
                    style={{ cursor: "pointer", minWidth: "30px" }}
                    onClick={() => this.props.remTrackPlaylist(value.id)}
                  >
                    <GrClose color="#d40404"></GrClose>
                  </div>
                </div>
              ))}
            </div>
            <div className=" row m-auto " style={{ height: "20%" }}>
              <form
                className="form-inline m-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-group mb-2">
                  <input
                    onChange={(e) => this.onChange(e)}
                    type="text"
                    className="form-control"
                    id="inputPassword2"
                    placeholder="Nome da playlist..."
                  />
                </div>
                
                <button
                  onClick={() =>
                    this.props.createPlaylist(
                      this.props.code,
                      this.props.userId,
                      this.state.playlistName,
                      this.props.playlists
                    )
                  }
                  className="btn form-control btn-outline-success mb-2 "
                >
                  Criar
                </button>
               
              
              </form>
            </div>
          </div>
        </div>
      </Popup>
    );
  }
  // }
}

const mapStateToProps = (state) => ({
  userId: state.FetchReducers.userId,
  code: state.FetchReducers.code,
  playlists: state.FetchReducers.playlists,
  sucess: state.UiReducers.playlistSuccess,
  artists: state.FetchReducers.artists_seed,
  tracks: state.FetchReducers.tracks_seed,
  quantity: state.FetchReducers.quantity_rec,
  error: state.FetchReducers.error,
});
export default connect(mapStateToProps, {
  getPlaylist,
  createPlaylist,
  playlistSuccess,
  remTrackPlaylist,
  getRecommendations,
})(DisplayRecom);
