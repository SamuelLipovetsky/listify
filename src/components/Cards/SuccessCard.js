import React, { Component } from "react";
import { connect } from "react-redux";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

class Success extends Component {
  state = {
    // url="./make_requests/#access_token=" + this.props.code +"&token_type=Bearer&expires_in=3600",
    backgroundColor: "#1c1a1a",
    brilho: "100%",
  };
  onMouseEnter = () => {
    this.setState({
      backgroundColor: "#293029",
      brilho: "110%",
    });
  };
  onMouseLeave = () => {
    this.setState({
      backgroundColor: "#1c1a1a",
      brilho: "80%",
    });
  };
  handleClick = () => {
    window.open(this.props.url);
  };
  render() {
    return (
      <div
        style={{ backgroundColor: "green", width: "100%", height: "100%" }}
        className="d-flex  justify-content-center align-items-center"
      >
        <div class="d-flex flex-column align-items-center ">
          <h1 className="font-weight-light mb-2 text-center">
            Playlist criada com sucesso !
          </h1>

          <div
            onClick={() => this.handleClick()}
            onMouseEnter={() => this.onMouseEnter()}
            onMouseLeave={() => this.onMouseLeave()}
            className="rounded  m-5 p-2"
            style={{
              cursor: "pointer",
              background: this.state.backgroundColor,
              width: "200px",
              height: "300px",
            }}
          >
            <div className="w-100 ">
              {this.props.info.images.length > 0 ? (
                <img
                  style={{
                    width: "100%",
                    filter: "brightness(" + this.state.brilho + ")",
                  }}
                  className=" h-100 w-100"
                  src={this.props.info.images[0].url}
                />
              ) : (
                <div
                  src=""
                  style={{ backgroundColor: "white" }}
                  className="  h-100 w-100"
                />
              )}
            </div>
            <div className="w-100 mt-2 mb-0">
              <p
                className="font-weight-light mb-0 text-truncate"
                style={{ fontSize: "2em", color: "white" }}
              >
                {this.props.info.name}
              </p>
            </div>
            <div className="w-100    d-flex justify-content-end">
              <IconContext.Provider value={{ color: "green" }}>
                <div className="">
                  <AiOutlinePlayCircle size={45}></AiOutlinePlayCircle>
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <h1 className="font-weight-light mb-2 text-center">
            Clique na playlist e escute no Spotify
          </h1>
          <a
            style={{ fontSize: "1.5em", color: "#293029" }}
            className="font-weight-light mb-2 text-center link-dark"
            href={
              "./make_requests/#access_token=" +
              this.props.code +
              "&token_type=Bearer&expires_in=3600"
            }
          >
            Ou clique aqui e faça uma nova playlist
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.FetchReducers.userId,
  url: state.FetchReducers.playlist_url,
  info: state.FetchReducers.playlist_info,
  code: state.FetchReducers.code,
});
export default connect(mapStateToProps)(Success);
