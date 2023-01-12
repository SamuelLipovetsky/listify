import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../actions/FetchActions";
class MakeRequest extends Component {
  render() {
    return (
      <div className="container  w-100">
        <div className="container">
          <div
            className="row"
            style={{
              width: this.props.widthOfSearch,
            }}
          >
            <div className="col m-0 p-0">
              <p
                className="font-italic p-0 m-0 "
                style={{ fontSize: "2em", fontFamily: "Monaco" }}
              >
                {" "}
                Listify
              </p>
            </div>
            <div className="col m-0">
              <p
                className="font-italic p-0 m-0 text-right"
                style={{ fontSize: "1.5em" }}
              >
                Olá,{" " +this.props.user}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  code: state.FetchReducers.code,
  user: state.FetchReducers.userName,
  email: state.FetchReducers.userEmail,
  widthOfSearch: state.UiReducers.WidthOfComponents,
});
export default connect(mapStateToProps, { getUser })(MakeRequest);
