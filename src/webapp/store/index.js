import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import reduxThunk from "redux-thunk";
import options from "./options";


//import initialState from './initialState';

let middlewares = [];

if (process.env.NODE_ENV !== "production") {
  //middlewares.push(reduxLogger);
}


//pass redux thunk the apollo client to use in dispatches
middlewares.push(
    reduxThunk.withExtraArgument({
      ...options.thunk.arguments
    })
  );
  
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
