import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setAcessToken, getUser } from "../actions/FetchActions";
import DisplayUser from "./DisplayUser";
import ShowResults from "./ShowResults";
import ErroScreen from "./ErroScreen"
class MakeRequest extends Component {
  state = {
    code: null,
  };
  componentDidMount() {
    //starting from anchor point # and getting parameters from url
    var argumentos = "";
    var flag = 0;
    var url = window.location.href;
    for (var letra in url) {
      if (flag == 1) {
        argumentos += url[letra];
      }
      if (url[letra] == "#") {
        flag = 1;
      }
    }
    var params = new URLSearchParams(argumentos);
    var code = params.get("access_token");
    this.props.setAcessToken(code);
    this.props.getUser(code);
  }
  render() {
    if (this.props.error != null) {
      return (<Fragment>
        <ErroScreen></ErroScreen>

      </Fragment>)
    } else {
      return (
        <div className="w-100 ">
          <div className=" border-bottom w-100">
            <div className="container-xl">
              <DisplayUser></DisplayUser>
            </div>
          </div>
          <div className="container-xl mt-5">
            <ShowResults></ShowResults>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  error: state.FetchReducers.error,
  code: state.FetchReducers.code,
  widthOfScreen: state.UiReducers.widthOfScreen,
  widthOfCard: state.UiReducers.widthOfCard,
});
export default connect(mapStateToProps, { setAcessToken, getUser })(
  MakeRequest
);
