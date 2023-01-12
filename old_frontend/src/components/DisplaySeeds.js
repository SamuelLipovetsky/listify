import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  remArtistSeed,
  remTrackSeed,
  getRecommendations,
} from "../actions/FetchActions";

import Popup from "reactjs-popup";
import ArtistSeedCard from "./ArtistCard/CardSeed";
import TrackSeedCard from "./TrackCard/CardSeed";
class DisplaySeeds extends Component {
  render() {
    return (
      <Popup
        contentStyle={{
          width: "80%",
          height: "90%",
          maxWidth: "750px",
          maxHeight: "650px",
          overflowY: "auto",
        }}
        trigger={
          <button type="button" className="btn  btn-outline-success ">
            <p className="text-center m-0 p-0">Ver escolhidos</p>
          </button>
        }
        modal
        position="top left"
      >
        <div className="container h-100">
          <div className="row  h-50" style={{ minHeight: "300px" }}>
            <div className="container h-100 border-bottom">
              <div className="row  pl-3 pr-3 pt-3 " style={{ height: "10%" }}>
                <p className="font-weight-bold m-0">Artistas escolhidos :</p>
              </div>
              <div
                className="row  p-3 flex-nowrap  "
                style={{
                  overflowX: "auto",
                  overflowY: "clip",
                  minHeight: "90%",
                }}
              >
                {this.props.artists
                  .slice(0, Math.min(5, this.props.artists.length))
                  .map((value) => (
                    <div
                      className="col-2 m-1 p-1 "
                      style={{
                        minWidth: "130px",
                        maxWidth: "130px",
                        height: "200px",
                      }}
                    >
                      <ArtistSeedCard artist={value}></ArtistSeedCard>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="row  h-50" style={{ minHeight: "300px" }}>
            <div className="container h-100">
              <div className="row  p-3 " style={{ height: "10%" }}>
                <p className="font-weight-bold m-0">Músicas escolhidas :</p>
              </div>
              <div
                className="row  p-3 flex-nowrap  "
                style={{
                  overflowX: "auto",
                  overflowY: "clip",
                  minHeight: "90%",
                }}
              >
                {this.props.tracks
                  .slice(0, Math.min(5, this.props.tracks.length))
                  .map((value) => (
                    <div
                      className="col-2 m-1 p-1 "
                      style={{ minWidth: "130px", maxWidth: "130px" }}
                    >
                      <TrackSeedCard track={value}></TrackSeedCard>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Popup>
    );
  }
}
const mapStateToProps = (state) => ({
  code: state.FetchReducers.code,
  artists: state.FetchReducers.artists_seed,
  tracks: state.FetchReducers.tracks_seed,
  playlists: state.FetchReducers.playlists,
  quantity: state.FetchReducers.quantity_rec,
});
export default connect(mapStateToProps, {
  remArtistSeed,
  remTrackSeed,

  getRecommendations,
})(DisplaySeeds);
