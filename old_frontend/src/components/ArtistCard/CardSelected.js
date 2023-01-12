import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  setArtistsSeed,
  setTrackSeed,
  getRecommendations,
} from "../../actions/FetchActions";
import "./card.css";
import { setAnimatedCard } from "../../actions/UiActions";
function color(opacity) {
  return "rgba(40, 167, 69," + opacity + ")";
}
function colorRed(opacity) {
  return "rgba(220,53,69," + opacity + ")";
}
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseIsOver: false,
      opacity: 0,
      backgroundColor: color(0),
      gradient: 0,
    };
  }

  componentDidMount() {
  
    let shouldAnimate = this.props.shouldBeAnimated;
   
    if (shouldAnimate) {
      //animation for background
      this.props.setAnimatedCard(this.props.artist.id);
      let timeoutBackground = 300;
      let FrameTime = 20;
      for (let i = 0; i <= timeoutBackground; i += FrameTime) {
        setTimeout(() => {
          this.setState({
            opacity: i / timeoutBackground,
            backgroundColor: color(i / timeoutBackground),
          });
        }, i);
      }

      //animation for check marck
      //controlOfGradient is increasing the argument in the linear-gradient that controls what % of the div is black
      let controlOfgradient = 200;
      let StepTime = 3;
      for (let i = 0; i < controlOfgradient; i++) {
        setTimeout(() => {
          this.setState({
            gradient: i,
          });
        }, i * StepTime);
      }
    } else {
      this.setState({ opacity: 1, backgroundColor: color(1), gradient: 150 });
    }
  }
  render() {
    return (
      <div
        id="CardSelected"
        key={this.props.artist.id}
        style={{
          backgroundColor: this.state.backgroundColor,
        }}
        className="col-2   border border-dark rounded-lg p-1  whole-card m-0"
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
          <div>
            <div className="text-center text-top p-0 mb-0 ">
              <h3
                className="m-0 p-0 gradient-text mx-auto "
                style={{
                  width: "30%",

                  backgroundImage:
                    `
                linear-gradient(
                90deg,
                  black ` +
                    this.state.gradient +
                    `% , ` +
                    color(0) +
                    this.state.gradient +
                    `% 100% )`,
                }}
              >
                ✔
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  artists_seeds: state.FetchReducers.artists_seed,
  tracks_seeds: state.FetchReducers.tracks_seed,
  animated_card: state.UiReducers.alreadyAnimatedCard,
});
export default connect(mapStateToProps, {
  setArtistsSeed,
  setTrackSeed,
  getRecommendations,
  setAnimatedCard,
})(Card);
