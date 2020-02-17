//lets create an initial or mock state

import { NOT_LOADING, NO_ERROR } from "./actions.js";

export default {
  questions: {
    all: [],
    single: {},
    latest: [],
    asked: {}
  },
  error: { ...NO_ERROR },
  loading: { ...NOT_LOADING },
  user: JSON.parse(localStorage.getItem("_askitapp_user")) || {
    username: null,
    authenticated: false,
    token: null,
    questions: null,
    answers: [],
    votes: null,
    id: null,
    hasBeenLoggedOut: false,
    expiredToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vbGFuIiwic2FsdCI6IjY3ODA4MWU5LWVhYzctNDk1NS04ZjU3LTkyMzZjNDhmMGQ2ZSIsInRpbWUiOiIyLzEzLzIwMjAiLCJpYXQiOjE1ODE2MTc5MTksImV4cCI6MTU4MTYxNzkzNH0.FumDTeR1z6Qo6cnQYUvdpoI3TgT7fs_8wSJ9k6O6wss",
    blacklistedToken: ""
  },
  callbackUrl: null,
  forms: {
    login: {
      username: "",
      password: "",
      submitted: false,
      options: {
        image: "login",
        header: "Login!",
        subHeader: "(With your OWN info)"
      }
    },
    signup: {
      username: "",
      password: "",
      submitted: false,
      created: false,
      options: {
        image: "signup",
        header: "Sign Up!",
        subHeader: "(To get involved)"
      }
    },
    ask: {
      question: "",
      submitted: false,
      created: false,
      options: {
        id: '_ask_question',
        image: "ask_question",
        header: "Ask Anything!",
        subHeader: "(No really)"
      }
    }
  }
};
