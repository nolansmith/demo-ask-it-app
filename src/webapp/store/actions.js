import initialState from "./initialState";

//some constants
export const NOT_LOADING = { status: false, message: "" };
export const NO_ERROR = { status: false, message: "" };

export const setLoading = (message = "") => (dispatch, getState, context) => {
  let status = true;
  if (message === "") status = false;

  dispatch({
    type: "UPDATE_LOADING",
    loading: { status: status, message: message }
  });
};

export const setError = (message = "") => (dispatch, getState, context) => {
  let status = true;
  if (message === "") status = false;

  dispatch({
    type: "UPDATE_ERROR",
    error: { status: status, message: message }
  });
};

export const loginUser = user => (dispatch, getState, context) => {
  //console.log('DISPATCH FOR NEW USER: ', user);
  dispatch({ type: "UPDATE_USER", user });
  localStorage.removeItem("_askitapp_user");
  localStorage.setItem("_askitapp_user", JSON.stringify(user));
  dispatch(updateLoginFormSubmitted(false));
  dispatch(clearLoginFormValues());
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

export const updateCallbackUrl = (url = null) => (
  dispatch,
  getState,
  context
) => {
  dispatch({ type: "CALLBACK_URL", url: url });
};

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
