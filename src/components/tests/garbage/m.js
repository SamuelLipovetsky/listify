import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
Enzyme.configure({ adapter: new Adapter() });
import Home from "../../Home";
import { shallow } from "enzyme";
import Logo from "../../Logo";
import { Provider } from "react-redux";
// import Adapter from "enzyme-adapter-react-16";
const middlewares = [];
const mockStore = configureStore(middlewares);

describe("<MyComponent />", () => {
  const initialState = {};
  const store = mockStore(initialState);
  it("renders three <Foo /> components", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Home></Home>
      </Provider>
    );
    expect(wrapper.contains(<Logo></Logo>).to.equal(true));
  });
});
