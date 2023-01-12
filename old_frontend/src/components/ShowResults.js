import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  setArtistsSeed,
  setTrackSeed,
  getRecommendations,
} from "../actions/FetchActions";
import {
  setWidthOfScreen,
  setNumberOfCards,
  setWidthOfComponents,
} from "../actions/UiActions";
import SearchForm from "./SearchForm";
import DisplayRecom from "./DisplayRecom";
import DisplaySeeds from "./DisplaySeeds";
import ArtistCard from "./ArtistCard/ArtistCard";
import TrackCard from "./TrackCard/TrackCard";
class ShowResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 780,
    };
    this.handleResize = this.handleResize.bind(this);
  }
  handleResize = (e) => {
    let element = document.getElementById("result");

    this.props.setWidthOfScreen(element.clientWidth);
    this.props.setNumberOfCards(element.clientWidth, this.props.widthOfCards);
    this.props.setWidthOfComponents(
      this.props.widthOfCards,
      this.props.numberOfCards
    );
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    let element = document.getElementById("result");
    this.props.setWidthOfScreen(element.clientWidth);
    this.props.setNumberOfCards(element.clientWidth, this.props.widthOfCards);
    this.props.setWidthOfComponents(
      this.props.widthOfCards,
      this.props.numberOfCards
    );
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  style = () => {
    if (this.props.results == true) {
      return "block";
    }
    if (this.props.results == false) {
      return "none";
    }
  };

  render() {
    return (
      <div className="container h-100 " id="result">
        <div className="row">
          <div
            className="container border-bottom pb-3"
            style={{ borderColor: "a#9c2bb" }}
          >
            <div className="row">
              <div className="col">
                <SearchForm></SearchForm>
              </div>
            </div>
            <div className="row pt-1 pb-1 no-gutters">
              <div className="col ">
                <div
                  className="btn-group "
                  role="group"
                  style={{ height: "35px" }}
                >
                  <DisplayRecom></DisplayRecom>

                  <DisplaySeeds></DisplaySeeds>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row  m-0 p-0" style={{ display: this.style() }}>
          <div className="  container overflow-scroll m-0 p-0">
            <div>
              <p className="font-weight-bold m-0">Artistas :</p>
            </div>
            <div className="row m-0" style={{ minHeight: "200px" }}>
              {this.props.artists
                .slice(0, this.props.numberOfCards)
                .map((artist) => (
                  <ArtistCard artist={artist}></ArtistCard>
                ))}
            </div>
            <div>
              {" "}
              <p className="font-weight-bold m-0">Músicas :</p>
            </div>
            <div className="row m-0" style={{ minHeight: "200px" }}>
              {this.props.tracks
                .slice(0, this.props.numberOfCards)
                .map((track) => (
                  <TrackCard track={track}></TrackCard>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  code: state.FetchReducers.code,
  artists: state.FetchReducers.artists_results,
  tracks: state.FetchReducers.tracks_results,
  results: state.UiReducers.displayResults,
  artists_seeds: state.FetchReducers.artists_seed,
  tracks_seeds: state.FetchReducers.tracks_seed,
  userId: state.FetchReducers.userId,
  numberOfCards: state.UiReducers.numberOfCards,
  widthOfCards: state.UiReducers.widthOfCards,
});
export default connect(mapStateToProps, {
  setArtistsSeed,
  setTrackSeed,
  getRecommendations,
  setWidthOfScreen,
  setNumberOfCards,
  setWidthOfComponents,
})(ShowResults);
