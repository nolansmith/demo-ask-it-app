//lets create an initial or mock state

export const NOT_LOADING = { status: false, message: "" };

export default {
  questions: {
    all: [],
    single: {},
    latest: [],
    asked: {}
  },
  error: {
    status: false,
    message: "An error occurred..."
  },
  loading: NOT_LOADING,
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
  callbackUrl: null
};
