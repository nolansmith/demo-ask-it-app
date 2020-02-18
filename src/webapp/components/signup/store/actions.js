/**
 * SIGNUP FORM STATE ACTIONS
 */
import {setLoading, setError, updateCallbackUrl} from '../../../store/actions';

export {setLoading,setError,updateCallbackUrl};

export const updateSignupFormPassword = password => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "UPDATE_SIGNUP_FORM_PASSWORD", password });
  };
  
  export const updateSignupFormUsername = username => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "UPDATE_SIGNUP_FORM_USERNAME", username });
  };
  export const updateSignupFormSubmitted = status => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "UPDATE_SIGNUP_FORM_SUBMITTED", status });
  };
  
  export const updateSignupUserCreated = user => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "UPDATE_SIGNUP_USER_CREATED", user });
  };
  
  export const signupError = message => (dispatch, getState, context) => {
    dispatch(setError(message));
    dispatch(setLoading());
    dispatch(updateSignupFormSubmitted(false));
    dispatch(updateSignupFormPassword(""));
    dispatch(updateSignupFormUsername(""));
    setTimeout(() => {
      dispatch(setError());
    }, 2000);
  
  };