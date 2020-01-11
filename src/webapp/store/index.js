import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import reduxThunk from 'redux-thunk';
//import initialState from './initialState';

export default (options) => {

    let middlewares = [];
    //pass redux thunk the apollo client to use in dispatches
    middlewares.push(
        reduxThunk.withExtraArgument({
            ...options.thunk.arguments
        }));

    if (process.env.NODE_ENV !== 'production') {
        //middlewares.push(reduxLogger);
    }

    
    const store = createStore(rootReducer,
        applyMiddleware(...middlewares));
       

    return store

}
    



