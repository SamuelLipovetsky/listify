import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  setArtistsSeed,
  setTrackSeed,
  getRecommendations,
} from "../../actions/FetchActions";
import CardNotSelected from "./CardNotSelected";
import CardSelected from "./CardSelected";
import CardRemove from "./CardRemove";
import "./card.css";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseEnter: false,
      mouseOver: false,
      didMouseLeave: false,
      showSelected: false,
      showRemoveCard: false,
      shouldBeAnimated: true,
    };
  }
  componentWillMount() {
    if (this.showSelectedBool()) {
      this.setState({ didMouseLeave: true, shouldBeAnimated: false });
    }
  }
  showSelectedBool = () => {
    for (let index = 0; index < this.props.artists_seeds.length; index++) {
      if (this.props.artist.id == this.props.artists_seeds[index].id) {
        return true;
      }
    }
    return false;
  };
  showRemoveCard = () => {
    if (
      this.showSelectedBool() == true &&
      this.state.didMouseLeave == true &&
      this.state.showRemoveCard == true
    ) {
      return { CardRemoveDisplay: "block", CardSelectedDisplay: "none" };
    } else return { CardRemoveDisplay: "none", CardSelectedDisplay: "block" };
  };

  onMouseEnter = () => {
    if (this.showSelectedBool() && this.state.didMouseLeave) {
      this.setState({ showRemoveCard: true });
    }
  };
  onMouseLeave = () => {
    if (this.showSelectedBool()) {
      this.setState({ didMouseLeave: true });
      this.setState({ showRemoveCard: false });
    }
  };
  render() {
    return (
      <div
        onMouseLeave={() => this.onMouseLeave()}
        onMouseEnter={() => this.onMouseEnter()}
        className="m-1"
      >
        {this.showSelectedBool() == false ? (
          <CardNotSelected
            artist={this.props.artist}
            didMouseLeave={() => this.setState({ didMouseLeave: false })}
          ></CardNotSelected>
        ) : (
          <div className="p-0 m-0">
            <div
              className="p-0 m-0"
              style={{ display: this.showRemoveCard().CardRemoveDisplay }}
            >
              <CardRemove artist={this.props.artist}
             
              ></CardRemove>
            </div>

            <div
              className="p-0 m-0"
              style={{ display: this.showRemoveCard().CardSelectedDisplay }}
            >
              <CardSelected
                artist={this.props.artist}
                shouldBeAnimated={this.state.shouldBeAnimated}
              ></CardSelected>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  artists_seeds: state.FetchReducers.artists_seed,
  tracks_seeds: state.FetchReducers.tracks_seed,
});
export default connect(mapStateToProps, {
  setArtistsSeed,
  setTrackSeed,
  getRecommendations,
})(Card);
