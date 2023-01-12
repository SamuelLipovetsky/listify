const initialState = {
  playlistSuccess: null,
  displayResults: false,
  alertMessage: null,
  success: null,
  widthOfScreen: 1400, 
  numberOfCards: 7,
  widthOfCards: 139,
  WidthOfComponents: 139 * 7,
  alreadyAnimatedCard: [],
};

export default function (state = initialState, action, dispatch) {
  switch (action.type) {
    //in case of success , PlaylistSucess is set to true, but when the component is Unmount this informations is set back to Null
    //the only purpose of this reducer is to change the visibility of an component if the api responds error or success
    case "PLAYLIST_SUCCESS":
      return {
        ...state,
        playlistSuccess: action.success,
      };
    case "DISPLAY_RESULTS":
      return {
        ...state,
        displayResults: action.results,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        alertMessage: action.message,
        success: action.success,
      };
    case "SET_WIDTH_OF_SCREEN":
      return {
        ...state,
        widthOfScreen: action.width,
      };
    case "SET_NUMBER_OF_CARDS":
      return {
        ...state,
        numberOfCards: action.number,
      };
    case "SET_WIDTH_OF_COMPONENTS":
      return {
        ...state,
        WidthOfComponents: action.width,
      };
    // case "SET_ANIMATED_CARD":
    //   return {
    //     ...state,
    //     alreadyAnimatedCard: [...state.alreadyAnimatedCard, action.artist],
    //   };
    // case "REM_ANIMATED_CARD":
    //   return {
    //     ...state,
    //     alreadyAnimatedCard: [
    //       ...state.alreadyAnimatedCard.filter((item) => {
    //         return item != action.artist;
    //       }),
    //     ],
    //   };
    default:
      return state;
  }
}
