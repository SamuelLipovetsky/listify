import React, { Component } from "react";

class Fail extends Component {
  render() {
    return (
      <div
        className="container m-0 p-0 w-100 h-100"
        style={{
          background: "#c49f9f",
        }}
      >
        <div className="row align-items-center w-100 h-100 m-0 p-0">
          <h1 className="text-center w-100 font-weight-light">
            Parece que algo deu errado :(
          </h1>
          <h1 className="text-center w-100 font-weight-light">
            <a href="/home" style={{ fontSize: "large" }}>
              Clique aqui pare reiniciar a pagina{" "}
            </a>
          </h1>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  code: state,
});
export default Fail;
