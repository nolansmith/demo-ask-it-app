//lets create an initial or mock state

import {NOT_LOADING, NO_ERROR} from './actions.js';

export default {
  questions: {
    all: [],
    single: {},
    latest: [],
    asked: {}
  },
  error: {...NO_ERROR},
  loading: {...NOT_LOADING},
  user: 
  JSON.parse(localStorage.getItem("_askitapp_user")) || {
    username: null,
    authenticated: false,
    token: null,
    questions: null,
    answers: [],
    votes: null,
    id: null,
    hasBeenLoggedOut: false
  },
  callbackUrl: null,
  forms: {
    login: {
      username: "",
      password: "",
      submitted: false
    },
    signup: {
      username: "",
      password: "",
      submitted: false,
      created: false
    }
  }
};
