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
