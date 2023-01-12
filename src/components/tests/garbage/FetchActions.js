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
  it("getUser fetches successfucely data from api spotify", () => {
    moxios.stubRequest("https://api.spotify.com/v1/me", {
      status: 200,
      responseText: {
        userName: "teste",
        userEmail: "teste",
        userId: "teste",
      },
    });
    const expectedActions = [
      {
        type: "USERINFO",
        payload: {
          userName: "teste",
          userEmail: "teste",
          userId: "teste",
        },
      },
    ];
    const store = mockStore({});
    return store.dispatch(actions.getUser("mock code")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("addMusicToPlaylist works correctly with spotify api", () => {
    moxios.stubRequest("https://api.spotify.com/v1/playlists/*", {
      status: 200,
      responseText: {
        type: "PLAYLIST_SUCCESS",
        success: true,
      },
    });
    const expectedActions = [
      {
        type: "PLAYLIST_SUCCESS",
        success: true,
      },
    ];
    const store = mockStore({});
    return store
      .dispatch(
        actions.addMusicToPlaylist(
          "mock autorization code",
          "mock user id",
          "mock playlist id",
          { a: 1, b: 2, c: 3 }
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it("getUser calls error on spotify 401", () => {
    moxios.stubRequest("https://api.spotify.com/v1/me", {
      status: 401,
      responseText: {
        error: { status: 401, message: "invalid acess token" },
      },
    });
    const expectedActions = [
      {
        type: "SET_ERROR",
        payload: 401,
      },
    ];
    const store = mockStore({});
    return store.dispatch(actions.getUser("mock code")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("setTrackseed calls duplicate on duplicate item", () => {
    const other_tracks = [{ id: 1 }, { id: 2 }];
    const other_artists = [{ id: 3 }, { id: 4 }];
    let track = { id: 1 };
    const store = mockStore({});
    const expectedActions = [
      {
        type: "SET_MESSAGE",
        message: "Essa musica já foi selecionada",
        success: "error",
      },
    ];

    store.dispatch(actions.setTrackSeed(track, other_tracks, other_artists));

    return expect(store.getActions()).toEqual(expectedActions);
  });
  it("setTrackseed adds track without duplicate", () => {
    const other_tracks = [{ id: 1 }, { id: 2 }];
    const other_artists = [{ id: 3 }, { id: 4 }];
    let track = { id: 5 };
    const store = mockStore({});
    const expectedActions = [
      {
        type: "SET_TRACK_SEED",
        payload: { id: 5 },
      },
    ];

    store.dispatch(actions.setTrackSeed(track, other_tracks, other_artists));

    return expect(store.getActions()).toEqual(expectedActions);
  });

  it("setArtistSeed calls duplicate on duplicate item", () => {
    const other_tracks = [{ id: 1 }, { id: 2 }];
    const other_artists = [{ id: 3 }, { id: 4 }];
    let artist = { id: 3 };
    const store = mockStore({});
    const expectedActions = [
      {
        type: "SET_MESSAGE",
        message: "Esse artista já foi escolhido",
        success: "error",
      },
    ];

    store.dispatch(actions.setArtistsSeed(artist, other_artists, other_tracks));

    return expect(store.getActions()).toEqual(expectedActions);
  });
  it("setArtistSeed  adds track without duplicate", () => {
    const other_tracks = [{ id: 1 }, { id: 2 }];
    const other_artists = [{ id: 3 }, { id: 4 }];
    let artist = { id: 5 };
    const store = mockStore({});
    const expectedActions = [{ type: "SET_ARTISTS_SEED", payload: { id: 5 } }];

    store.dispatch(actions.setArtistsSeed(artist, other_artists, other_tracks));

    return expect(store.getActions()).toEqual(expectedActions);
  });
});
