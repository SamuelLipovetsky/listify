import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setArtistsResults, setTracksResults } from "../actions/FetchActions";
import { displayResults } from "../actions/UiActions";
class SearchForm extends Component {
  state = {
    search: "",
    option: "artist",
    width: null,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //submit state.search into the search endpoint and set state.artist and state.tracks
  //on error -> redirect
  onSubmit = (e) => {
    e.preventDefault();

    let code = this.props.code;
    let q = "q=" + encodeURIComponent(this.state.search);
    //Maybe create an action to make error handle easier
    console.log(e.target.value);
    if (e.target.value == undefined || e.target.value == "") {
      this.props.setArtistsResults([]);
      this.props.setTracksResults([]);
      this.props.displayResults(false);
    } else {
      axios({
        method: "get",
        url: "https://api.spotify.com/v1/search?" + q + "&type=track,artist",
        headers: { Authorization: "Bearer " + code },
      }).then((res) => {
        this.props.setArtistsResults(res.data.artists.items);
        this.props.setTracksResults(res.data.tracks.items);
      });
    }
  };

  //simple on change function
  onChange = (e) => {
    //idk if this is good, semi controled component??? maybe uncontroled is better
    this.setState({ [e.target.name]: e.target.value });
    let code = this.props.code;
    let q = "q=" + encodeURIComponent(e.target.value);
    //Maybe create an action to make error handle easier

    if (e.target.value == "") {
      this.props.setArtistsResults([]);
      this.props.setTracksResults([]);
      this.props.displayResults(false);
    } else {
      this.props.displayResults(true);
      axios({
        method: "get",
        url: "https://api.spotify.com/v1/search?" + q + "&type=track,artist",
        headers: { Authorization: "Bearer " + code },
      }).then((res) => {
        this.props.setArtistsResults(res.data.artists.items);
        this.props.setTracksResults(res.data.tracks.items);
      });
    }
  };

  render() {
    return (
      <div
        style={{
          width: this.props.widthOfSearch,
        }}
      >
        <form onSubmit={this.onSubmit}>
          <div class="  input-group pt-3  w-100">
            <input
              class="form-control  form-control-md"
              type="text"
              name="search"
              value={this.state.search}
              placeholder="Pesquisar..."
              onChange={this.onChange}
            />
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  code: state.FetchReducers.code,
  widthOfSearch: state.UiReducers.WidthOfComponents,
});
export default connect(mapStateToProps, {
  setArtistsResults,
  setTracksResults,
  displayResults,
})(SearchForm);
