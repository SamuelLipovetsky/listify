import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "./card.css";
import { GrClose } from "react-icons/gr";
import { setAnimatedCard, remAnimatedCard } from "../../actions/UiActions";
import { remArtistSeed } from "../../actions/FetchActions";
function color(opacity) {
  return "rgba(220,53,69," + opacity + ")";
}

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationSize: 1,
      backgroundColor: color(1),
    };
  }

  mouseEnter() {
    //animation for exclude sign
    //this height is absolute value in pixels
    //it can be absolut because the card size is fixed

    let height = 30;
    let speed = 10;
    for (let i = 0; i < height; i++) {
      setTimeout(() => {
        this.setState({
          animationSize: i,
        });
      }, i * speed);
    }
  }

  render() {
    return (
      <div
        key={this.props.artist.id}
        onClick={() => {
          this.props.remArtistSeed(this.props.artist);
        }}
        onMouseEnter={() => this.mouseEnter()}
        onMouseLeave={() => this.setState({ animationSize: 1 })}
        style={{
          backgroundColor: this.state.backgroundColor,
        }}
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
          <div className=" text-center text-nowrap text-truncate  pb-0 w-100 pl-2 pr-2 pt-2">
            <strong>{this.props.artist.name}</strong>
          </div>
          <div>
            <h3 className="text-center text-top p-0 mb-0 ">
              <GrClose size={this.state.animationSize}></GrClose>
            </h3>
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
  setAnimatedCard,
  remArtistSeed,
  remAnimatedCard,
})(Card);
