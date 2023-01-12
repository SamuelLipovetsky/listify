import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { remTrackSeed } from "../../actions/FetchActions";
import "./card.css";
class Card extends Component {
  render() {
    return (
      <div
        key={this.props.track.id}
        className="col-2 container  border border-dark rounded-lg p-1  whole-card"
      >
        <div className="image-div">
          {this.props.track.album.images.length > 0 ? (
            <img
              className=" rounded-circle border border-dark h-100 w-100"
              src={this.props.track.album.images[0].url}
            />
          ) : (
            <div
              src=""
              style={{ backgroundColor: "white" }}
              className=" rounded-circle border border-dark h-100 w-100"
            />
          )}
        </div>
        <div className="info-div">
          <div className=" font-div-track text-center ">
            <strong className=" text-nowrap text-truncate">
              <p className="m-0 p-0  text-nowrap text-truncate">
                {this.props.track.name}
              </p>
            </strong>
            <small className="text-muted  text-truncate">
              <p className="m-0 p-0">{this.props.track.artists[0].name} </p>
            </small>
          </div>

          <div className=" d-flex  align-items-center button-div">
            <button
              onClick={() => {
                this.props.remTrackSeed(this.props.track);
              }}
              className="btn w-100 h-75  btn-outline-danger text-center text-nowrap text-truncate  align-top p-0"
            >
              remover
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  artists_seeds: state.FetchReducers.artists_seed,
  tracks_seeds: state.FetchReducers.tracks_seed,
});
export default connect(mapStateToProps, { remTrackSeed })(Card);
