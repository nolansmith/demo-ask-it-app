import { combineReducers } from "redux";
import initialState from "./initialState";
import { sortVotes } from "../util/index.js";
import * as gql from "./graphql/actions";

export const preSortInitialVotes = function(arr) {
  for (let i in arr) {
    arr[i]["answers"].sort(sortVotes);
  }

  return arr;
};

/**
 * Questions reducers
 *
 */
export const askQuestionReducer = (
  state = initialState.questions.asked,
  action
) => {
  switch (action.type) {
    case "ASKED_QUESTION_ID":
      return action.question.id;
    case "ASKED_QUESTION":
      return action.question;
    default:
      return state;
  }
};

export const latestQuestionsReducer = (
  state = initialState.questions.latest,
  action
) => {
  switch (action.type) {
    case "GET_LATEST_QUESTIONS":
      return action.questions;
    default:
      return state;
  }
};

export const allQuestionsReducer = (
  state = initialState.questions.all,
  action
) => {
  switch (action.type) {
    case "GET_ALL_QUESTIONS":
      return action.questions;
    default:
      return state;
  }
};

export const singleQuestionReducer = (
  state = initialState.questions.single,
  action
) => {
  switch (action.type) {
    case "GET_SINGLE_QUESTION":
      return Object.assign({}, { ...action.question });
    default:
      return state;
  }
};

export const questionsReducer = (state = initialState.questions, action) => {
  switch (action.type) {
    case "UPDATE_QUESTIONS":
      return Object.assign({}, { ...state }, action.questions);
    default:
      return state;
  }
};

/**
 *
 * LOGIN REDUCERS
 */

export const loggedInReducer = function(state = false, action) {
  switch (action.type) {
    case "LOG_IN":
      return true;
    case "LOG_OUT":
      return false;
    default:
      return state;
  }
};

export const loggedUserReducer = function(state = {}, action) {
  switch (action.type) {
    case "LOG_IN_USER":
      return { username: action.username, timeIn: action.timeIn };
    case "LOG_OUT_USER":
      return state;
    default:
      return state;
  }
};

/**
 * UI Status Reducers
 */
export const loadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
    case "UPDATE_LOADING":
      return { ...action.loading };
    default:
      return state;
  }
};

export const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case "UPDATE_ERROR":
      return { ...action.error };
    default:
      return state;
  }
};

export const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return Object.assign({}, { ...state }, action.user);
    default:
      return state;
  }
};

export const callbackUrlReducer = (
  state = initialState.callbackUrl,
  action
) => {
  switch (action.type) {
    case "CALLBACK_URL":
      return action.url;
    default:
      return state;
  }
};

export const loginFormReducer = (state = initialState.forms.login, action) => {
  switch (action.type) {
    case "UPDATE_LOGIN_FORM_USERNAME":
      return { ...state, ...action };
    case "UPDATE_LOGIN_FORM_PASSWORD":
      return { ...state, ...action };
    case "UPDATE_LOGIN_FORM_SUBMITTED":
      return { ...state, submitted: action.status };
    default:
      return state;
  }
};

export const signupFormReducer = (state = initialState.forms.signup, action) => {
  switch (action.type) {
    case "UPDATE_SIGNUP_FORM_USERNAME":
      return { ...state, ...action };
    case "UPDATE_SIGNUP_FORM_PASSWORD":
      return { ...state, ...action };
    case "UPDATE_SIGNUP_FORM_SUBMITTED":
      return { ...state, submitted: action.status };
    case "UPDATE_SIGNUP_USER_CREATED":
      return { ...state, created: {...action.user} };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  questions: questionsReducer,
  user: userReducer,
  loading: loadingReducer,
  error: errorReducer,
  callbackUrl: callbackUrlReducer,
  loginForm: loginFormReducer,
  signupForm: signupFormReducer,
});

export default rootReducer;
