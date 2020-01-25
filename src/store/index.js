import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// INITIAL STATE
const initialState = {
  mode: "",
  dataSet: {},
  fullData: []
};

// ACTION TYPES
const SET_MODE = "SET_MODE";
const SET_DATASET = "SET_DATASET";
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
    type: SET_DATASET,
    data
  };
};

export const setFullData = data => {
  return {
    type: SET_FULL_DATA,
    data
  };
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODE:
      return { ...state, mode: action.mode };
    case SET_DATASET:
      return { ...state, dataSet: action.data };
    case SET_FULL_DATA:
      return { ...state, fullData: [...state.fullData, action.data] };
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
