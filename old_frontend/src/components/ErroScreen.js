import React, { Component } from "react";
import { connect } from "react-redux";
class ErroScreen extends Component {
    render() {
        return (
            <div className="h-100 d-flex align-items-center w-100 mx-auto ">
                <div className="container mx-auto  pb-5">
                    <div className="row h-50">
                        <div className="col-6 mx-auto col-md-4  order-md-2">
                            <h1
                                style={{ fontSize: "10em" }}>
                                {this.props.error}
                            </h1>

                        </div>
                        <div className="col-md-7 text-md-left order-md-1  pr-md-5 d-flex align-items-center text-center">
                            <div className="d-block">
                            <h1 style={{ fontSize: "2.5em" }}>
                                Parece que algo deu errado :(
                            </h1>
                            <h2
                                className="mb-2 font-weight-light"
                                style={{ fontSize: "1.9em" }}
                            >
                                <a href="../">clique aqui e tente novamente</a>
                            </h2>
                            </div>
                           

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => ({
    // erro: state.fetchReducers.error
    error: state.FetchReducers.error,
});
export default connect(mapStateToProps)(ErroScreen);
