import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import fbDatabase from "../firebase";

// INITIAL STATE
const initialState = {
  mode: "",
  liveData: {},
  fullData: {}
};

// ACTION TYPES
const SET_MODE = "SET_MODE";
const SET_LIVE_DATA = "SET_LIVE_DATA";
const SET_FULL_DATA = "SET_FULL_DATA";

// ACTION CREATORS
export const setType = mode => {
  return {
    type: SET_MODE,
    mode
  };
};

export const setData = data => {
  return {
    type: SET_LIVE_DATA,
    data
  };
};

export const setFullData = data => {
  return {
    type: SET_FULL_DATA,
    data
  };
};

// THUNKY THUNKS
export const getFullData = () => {
  return async dispatch => {
    try {
      const data = fbDatabase.ref().child("data");
      data.on("value", snap => {
        dispatch(setFullData(snap.val()));
      });
    } catch (error) {
      console.error("WAH ERROR --", error);
    }
  };
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODE:
      return { ...state, mode: action.mode };
    case SET_LIVE_DATA:
      return { ...state, liveData: action.data };
    case SET_FULL_DATA:
      return { ...state, fullData: action.data };
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
