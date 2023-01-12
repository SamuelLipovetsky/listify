import axios from "axios";
import * as actions from "../../actions/FetchActions";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import moxios from "moxios";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("fetch actions", () => {
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it("addMusicToPlaylist works correctly with spotify api", () => {
    moxios.stubRequest(
      "https://api.spotify.com/v1/playlists/mock_playlist_id/tracks?",
      {
        status: 200,
      }
    );
    const expectedActions = [
      {
        type: "PLAYLIST_SUCCESS",
        success: true,
      },
    ];
    const store = mockStore();
    return store
      .dispatch(
        actions.addMusicToPlaylist(
          "mock_autorization_code",
          "mock_user_id",
          "mock_playlist_id",
          { a: 1, b: 2, c: 3 }
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it("addMusicToPlaylist handles error", () => {
    moxios.stubRequest(
      "https://api.spotify.com/v1/playlists/mock_playlist_id/tracks?",
      {
        status: 401,
        responseText: { error: { status: 401 } },
      }
    );
    const expectedActions = [
      { type: "SET_ERROR", payload: 401 },
      // { type: "PLAYLIST_SUCCESS", success: false },
    ];
    const store = mockStore();
    configureMockStore(middlewares);
    return store
      .dispatch(
        actions.addMusicToPlaylist(
          "mock_autorization_code",
          "mock_user_id",
          "mock_playlist_id",
          { a: 1, b: 2, c: 3 }
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
