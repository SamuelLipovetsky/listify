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
});
