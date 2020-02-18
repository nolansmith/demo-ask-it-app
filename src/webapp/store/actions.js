/**
 * APP-WIDE STORE ACTIONS
 */

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



 /**
   * CALLBACK URL ACTIONS
   */

  export const updateCallbackUrl = (url = null) => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "CALLBACK_URL", url: url });
  };