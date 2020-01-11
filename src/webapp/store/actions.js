import initialState from "./initialState";

export const loginUser = user => (dispatch, getState, context) => {
  //console.log('DISPATCH FOR NEW USER: ', user);
  dispatch({ type: "UPDATE_USER", user });
  localStorage.removeItem("_askitapp_user");
  localStorage.setItem("_askitapp_user", JSON.stringify(user));
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

export const setLoading = (payload = { status: false, message: "" }) => (
  dispatch,
  getState,
  context
) => {
  dispatch({
    type: "UPDATE_LOAD_STATUS",
    status: payload.status,
    message: payload.message
  });
};
