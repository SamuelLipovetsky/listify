import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import { setMessage } from "../actions/UiActions";
export class AlertsSucess extends Component {
  //this component after an update set the "message" field of the state to null
  //so the next update can triger a rerender of the alert component

  shouldComponentUpdate(prevProps) {
    if (prevProps.message == null) {
      return false;
    } else {
      return true;
    }
  }
  componentDidUpdate() {
    this.props.alert.show(
      <div>
        <div>
          {this.props.success == "success" ? (
            <div className="p-1 text-left text-nowrap text-truncate   w-100 align-bottom">
              adicionado:
            </div>
          ) : (
            <div className="p-1 text-left text-nowrap text-truncate   w-100 align-bottom"></div>
          )}
        </div>
        <div className="p-1 text-left text-nowrap text-truncate   w-100 align-bottom">
          {this.props.message}
        </div>
      </div>,
      { type: this.props.success }
    );
    this.props.setMessage({ message: null, success: true });
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  message: state.UiReducers.alertMessage,
  success: state.UiReducers.success,
});
export default connect(mapStateToProps, { setMessage })(
  withAlert()(AlertsSucess)
);
