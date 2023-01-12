import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { remArtistSeed } from "../../actions/FetchActions";
import "./card.css";
class Card extends Component {
  render() {
    return (
      <div
        key={this.props.artist.id}
        className="col-2 container  border border-dark rounded-lg p-1  whole-card"
      >
        <div className="image-div">
          {this.props.artist.images.length > 0 ? (
            <img
              className=" rounded-circle border border-dark h-100 w-100"
              src={this.props.artist.images[0].url}
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
          <div className="font-div text-center text-nowrap text-truncate ">
            <strong>{this.props.artist.name}</strong>
          </div>
          <div className=" d-flex  align-items-end button-div">
            <button
              onClick={() => {
                this.props.remArtistSeed(this.props.artist);
              }}
              className="btn w-100 h-75  btn btn-outline-danger text-center text-nowrap text-truncate  align-top p-0"
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
export default connect(mapStateToProps, { remArtistSeed })(Card);
