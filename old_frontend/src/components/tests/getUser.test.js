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
});
