
import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import Home from "./components/Home";
import MakeRequest from "./components/MakeRequests";
// import ShowRec from "./ShowRec";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alert from "./components/Alerts";
// import './App.css';
const alertOptions = {
  timeout: 3000,
  position: "top center",
};
export class App extends Component {
  render() {
    return (
    // <div style={{color:'red'}}>
    //   keeeeek
    // </div>
      <div classname=" m-0 p-0" style={{ height: "100%", width: "100%" }}>
      
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Alert></Alert>
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/(make_requests)/" children={<MakeRequest />} />
              </Switch>
            </Router>
          </AlertProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));


