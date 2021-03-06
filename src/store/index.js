import { createStore, applyMiddleware } from "redux";
// eslint-disable-next-line
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import fbDatabase from "../firebase";

// INITIAL STATE
const initialState = {
  mode: "",
  chartType: "",
  liveKey: "",
  liveData: {},
  fullData: {},
  activeName: ""
};

// ACTION TYPES
const SET_MODE = "SET_MODE";
const SET_CHART_TYPE = "SET_CHART_TYPE";
const SET_LIVE_KEY = "SET_LIVE_KEY";
const SET_LIVE_DATA = "SET_LIVE_DATA";
const SET_FULL_DATA = "SET_FULL_DATA";
const SET_ACTIVE_NAME = "SET_ACTIVE_NAME";

// ACTION CREATORS
export const setMode = mode => {
  return {
    type: SET_MODE,
    mode
  };
};

export const setChartType = chartType => {
  return {
    type: SET_CHART_TYPE,
    chartType
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
export const getFullData = () => {
  return dispatch => {
    try {
      const data = fbDatabase.ref().child("data");
      data.on("value", snap => {
        if (snap.val()) dispatch(setFullData(snap.val()));
      });
    } catch (error) {
      console.error("WAH ERROR --", error);
    }
  };
};

export const addDataSet = newFullData => {
  return dispatch => {
    try {
      const uploadTask = fbDatabase.ref().child("data");
      uploadTask.push(newFullData);
      uploadTask.on("value", snap => {
        const keys = Object.keys(snap.val());
        dispatch(setLiveData(newFullData));
        dispatch(setLiveKey(keys[keys.length - 1]));
        dispatch(setFullData(snap.val()));
      });
    } catch (error) {
      console.error("WAH ERROR --", error);
    }
  };
};

export const pullLiveKey = () => {
  return dispatch => {
    try {
      const data = fbDatabase.ref().child("data");
      data.on("value", snap => {
        if (snap.val()) {
          const lastKey = Object.keys(snap.val()).slice(-1)[0];
          dispatch(setLiveKey(lastKey));
        }
      });
    } catch (error) {
      console.error("WAH ERROR --", error);
    }
  };
};

export const addDataPoint = (key, curData, newData) => {
  return dispatch => {
    try {
      const newDataSet = [...curData, newData],
        allData = fbDatabase.ref().child("data"),
        singleData = allData.child(key);

      singleData.set(newDataSet);

      allData.on("value", snap => {
        dispatch(setFullData(snap.val()));
      });
      singleData.on("value", snap => {
        dispatch(setLiveData(snap.val()));
        dispatch(setLiveKey(snap.key));
      });
    } catch (error) {
      console.error("WAH ERROR --", error);
    }
  };
};

export const removeDataPoint = (key, newData) => {
  return dispatch => {
    try {
      const allData = fbDatabase.ref().child("data"),
        singleData = allData.child(key);

      singleData.set(newData);

      allData.on("value", snap => {
        dispatch(setFullData(snap.val()));
      });
      singleData.on("value", snap => {
        dispatch(setLiveData(snap.val()));
        dispatch(setLiveKey(snap.key));
      });
    } catch (error) {
      console.error("WAH ERROR --", error);
    }
  };
};

export const removeDataSet = key => {
  return dispatch => {
    try {
      const allData = fbDatabase.ref().child("data"),
        singleData = allData.child(key);

      singleData.remove();
      allData.on("value", snap => {
        const keys = Object.keys(snap.val()),
          lastKey = keys[keys.length - 1];

        dispatch(setLiveKey(lastKey));
        dispatch(setLiveData(snap.val()[lastKey]));
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
    case SET_CHART_TYPE:
      return { ...state, chartType: action.chartType };
    case SET_LIVE_KEY:
      return { ...state, liveKey: action.key };
    case SET_LIVE_DATA:
      return { ...state, liveData: action.data };
    case SET_FULL_DATA:
      return { ...state, fullData: action.data };
    case SET_ACTIVE_NAME:
      const newName = state.activeName === action.name ? "" : action.name;
      return { ...state, activeName: newName };
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  // applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  applyMiddleware(thunkMiddleware)
);

const store = createStore(reducer, middleware);

export default store;
