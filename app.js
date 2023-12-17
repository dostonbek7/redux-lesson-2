const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const applyMiddleWare = redux.applyMiddleware
const logger = require('redux-logger').createLogger()
const reduxLogger = applyMiddleWare(logger)


//store
const initilaStore = {
  lavash: 20,
  shaurma: 10,
};
//action creator

const LAVASH_DECREASE = "LAVASH_DECREASE";
const LAVASH_INCREASE = "LAVASH_INCREASE";

const SHAURMA_DECREASE = "SHAURMA_DECREASE";
const SHAURMA_INCREASE = "SHAURMA_INCREASE";

function LavashDecrese(qty) {
  return { type: LAVASH_DECREASE, payload: qty };
}
function LavashIncrese(qty) {
  return { type: LAVASH_INCREASE, payload: qty };
}
function ShaurmaDecrese(qty) {
  return { type: SHAURMA_DECREASE, payload: qty };
}
function ShaurmaIncrease(qty) {
  return { type: SHAURMA_INCREASE, payload: qty };
}

//combineReducers
const rootReducer = combineReducers({
  lavash: lavashReducer,
  shaurma: shaurmaReducer,
});

function lavashReducer(state = initilaStore, action) {
  const { type, payload } = action;
  switch (type) {
    case LAVASH_INCREASE:
      return { ...state, lavash: state.lavash + payload };
    case LAVASH_DECREASE:
      return { ...state, lavash: state.lavash - payload };
    default:
      return state;
  }
}
function shaurmaReducer(state = initilaStore, action) {
  const { type, payload } = action;
  switch (type) {
    case SHAURMA_INCREASE:
      return { ...state, shaurma: state.lavash + payload };
    case SHAURMA_DECREASE:
      return { ...state, shaurma: state.lavash - payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer, reduxLogger);

const unsubscribe = store.subscribe(() =>
  console.log("Update state:", store.getState())
);
const actions = bindActionCreators(
  { LavashDecrese, LavashIncrese, ShaurmaDecrese, ShaurmaIncrease },
  store.dispatch
);

actions.LavashDecrese(5);
actions.ShaurmaIncrease(5);

unsubscribe();
