import reducer from "../../reducers/UiReducers";

let state = {
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
describe("ui reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it("change playlist succes", () => {
    expect(
      reducer(undefined, {
        type: "PLAYLIST_SUCCESS",
        success: "true",
      })
    ).toEqual({ ...state, playlistSuccess: "true" });
  });
});
