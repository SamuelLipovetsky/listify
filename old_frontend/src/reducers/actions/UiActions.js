import axios from "axios";

//this action will take care of error in many cases, like error on playlist creation, playlist music addition, and expiration of token from implicit grant
//maybe create more especific errors handlers later
export const playlistSuccess = (value) => (dispatch) => {
  dispatch({
    type: "PLAYLIST_SUCCESS",
    success: value,
  });
};
//this is just to display or not display the results of an search, maybe later can also take care of displaying some kinda of error message on search
export const displayResults = (value) => (dispatch) => {
  dispatch({
    type: "DISPLAY_RESULTS",
    results: value,
  });
};
export const setMessage = (value) => (dispatch) => {
  dispatch({
    type: "SET_MESSAGE",
    message: value.message,
    success: value.success,
  });
};
export const setWidthOfScreen = (value) => (dispatch) => {
  dispatch({
    type: "SET_WIDTH_OF_SCREEN",
    width: value,
  });
};
export const setNumberOfCards = (widthOfScreen, widthOfCards) => (dispatch) => {
  let numberOfCards = Math.floor(widthOfScreen / widthOfCards);
  dispatch({
    type: "SET_NUMBER_OF_CARDS",
    number: numberOfCards,
  });
};
export const setWidthOfComponents = (widthOfCards, numberOfCards) => (
  dispatch
) => {
  let widthOfComp = numberOfCards * widthOfCards;

  dispatch({
    type: "SET_WIDTH_OF_COMPONENTS",
    width: widthOfComp,
  });
};

export const setAnimatedCard = (artist) => (dispatch) => {
  dispatch({
    type: "SET_ANIMATED_CARD",
    artist: artist,
  });
};

export const remAnimatedCard = (artist) => (dispatch) => {
  dispatch({
    type: "REM_ANIMATED_CARD",
    artist: artist,
  });
};
