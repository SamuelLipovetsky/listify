import { combineReducers } from "redux";
import FetchReducers from "./FetchReducers";
import UiReducers from "./UiReducers";
export default combineReducers({ FetchReducers, UiReducers });
