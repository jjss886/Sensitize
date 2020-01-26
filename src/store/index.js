import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import fbDatabase from "../firebase";

// INITIAL STATE
const initialState = {
  mode: "",
  liveKey: "",
  liveData: {},
  fullData: {},
  activeName: ""
};

// ACTION TYPES
const GET_STATE = "GET_STATE";
const SET_MODE = "SET_MODE";
const SET_LIVE_KEY = "SET_LIVE_KEY";
const SET_LIVE_DATA = "SET_LIVE_DATA";
const SET_FULL_DATA = "SET_FULL_DATA";
const SET_ACTIVE_NAME = "SET_ACTIVE_NAME";

// ACTION CREATORS
export const getState = () => {
  return {
    type: GET_STATE
  };
};

export const setMode = mode => {
  return {
    type: SET_MODE,
    mode
  };
};

export const setLiveKey = key => {
  return {
    type: SET_LIVE_KEY,
    key
  };
};

export const setLiveData = data => {
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

export const setActiveName = name => {
  return {
    type: SET_ACTIVE_NAME,
    name
  };
};

// THUNKY THUNKS
export const getAllState = () => {
  return dispatch => {
    try {
      dispatch(getState());
    } catch (error) {
      console.error("WAH ERROR --", error);
    }
  };
};

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
    case GET_STATE:
      return { ...state };
    case SET_MODE:
      return { ...state, mode: action.mode };
    case SET_LIVE_KEY:
      return { ...state, liveKey: action.key };
    case SET_LIVE_DATA:
      return { ...state, liveData: action.data };
    case SET_FULL_DATA:
      return { ...state, fullData: action.data };
    case SET_ACTIVE_NAME:
      return { ...state, activeName: action.name };
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
