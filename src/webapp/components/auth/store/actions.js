
import {setLoading, setError, updateCallbackUrl} from '../../../store/actions';
import initialState from '../../../store/initialState';

export {setLoading,setError,updateCallbackUrl};
/**
 * LOGIN FORM
 */

export const updateLoginFormPassword = password => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "UPDATE_LOGIN_FORM_PASSWORD", password });
  };
  
  export const updateLoginFormUsername = username => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "UPDATE_LOGIN_FORM_USERNAME", username });
  };
  export const updateLoginFormSubmitted = status => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "UPDATE_LOGIN_FORM_SUBMITTED", status });
  };
  
  export const clearLoginFormValues = () => (dispatch,getState,context) => {
    dispatch({type: "CLEAR_LOGIN_FORM"});
  }
  
  export const loginError = message => (dispatch, getState, context) => {
    dispatch(setError(message));
    dispatch(setLoading());
    dispatch(updateLoginFormSubmitted(false));
    dispatch(updateLoginFormPassword(""));
    dispatch(updateLoginFormUsername(""));
    setTimeout(() => {
      dispatch(setError());
    }, 2000);
  
  };



/**
 * 
 * ACTUAL AUTHENTICATION ACTIONS
 */


  export const loginUser = user => (dispatch, getState, context) => {
    //console.log('DISPATCH FOR NEW USER: ', user);
    dispatch({ type: "UPDATE_USER", user });
    localStorage.removeItem("_askitapp_user");
    localStorage.setItem("_askitapp_user", JSON.stringify(user));
    dispatch(updateLoginFormSubmitted(false));
    dispatch(clearLoginFormValues());
  };
  
  export const updateLoggedInDuration = () => (dispatch, getState, context) => {
    let {duration} = getState().user;
    dispatch({ type: "UPDATE_USER", user: {duration: (duration+2)} });
    
  };
  
  
  export const logoutUser = () => (dispatch, getState, context) => {
    if (localStorage.getItem("_askitapp_user")) {
      //console.log("Removing credentials");
      localStorage.removeItem("_askitapp_user");
    }
   
    dispatch({
      type: "UPDATE_USER",
      user: Object.assign({}, initialState.user, { hasBeenLoggedOut: true })
    });
  };


 