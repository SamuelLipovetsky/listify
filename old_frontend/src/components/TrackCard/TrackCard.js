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
    for (let index = 0; index < this.props.tracks_seeds.length; index++) {
      if (this.props.track.id == this.props.tracks_seeds[index].id) {
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
            track={this.props.track}
            didMouseLeave={() => this.setState({ didMouseLeave: false })}
          ></CardNotSelected>
        ) : (
          <div className="p-0 m-0">
            <div
              className="p-0 m-0"
              style={{ display: this.showRemoveCard().CardRemoveDisplay }}
            >
              <CardRemove track={this.props.track}></CardRemove>
            </div>

            <div
              className="p-0 m-0"
              style={{ display: this.showRemoveCard().CardSelectedDisplay }}
            >
              <CardSelected
                track={this.props.track}
                shouldBeAnimated={this.state.shouldBeAnimated}
              ></CardSelected>
            </div>
          </div>
        )}
      </div>
      // <Fragment>
      //   {this.showSelected() == 0 ? (
      //     <CardNotSelected

      //       setMouseOverFalse={() => this.setMouseOverFalse()}
      //       track={this.props.track}
      //     ></CardNotSelected>
      //   ) : (
      //     <div
      //       className="p-0 m-0"
      //       onMouseOver={() =>
      //         this.setState({
      //           mouseOver: true,
      //         })
      //       }
      //       onMouseEnter={() => this.setState({ mouseEnter: true })}
      //       onMouseLeave={() =>
      //         this.setState({
      //           mouseOver: false,
      //         })
      //       }
      //     >
      //       <div
      //         className="p-0 m-0"
      //         style={{ display: this.showRemoveCard().CardRemoveDisplay }}
      //       >
      //         <CardRemove track={this.props.track}></CardRemove>
      //       </div>
      //       <div
      //         className="p-0 m-0"
      //         style={{ display: this.showRemoveCard().CardSelectedDisplay }}
      //       >
      //         <CardSelected
      //           track={this.props.track}
      //           shouldBeAnimated={this.state.shouldBeAnimated}
      //         ></CardSelected>
      //       </div>
      //     </div>
      //   )}
      // </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  tracks_seeds: state.FetchReducers.tracks_seed,
});
export default connect(mapStateToProps, {
  setArtistsSeed,
  setTrackSeed,
  getRecommendations,
})(Card);
