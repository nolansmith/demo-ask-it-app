import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setError,
  loginError,
  loginUser,
  
} from "./store/actions";
import axios from "axios";
import client from "../../config/apollo/index";
import { FIND_USER } from "../../store/graphql/queries";

const LoginAttempt = props => {
  const { username, password, submitted } = useSelector(
    state => state.loginForm
  );

  const dispatch = useDispatch();

  dispatch(setLoading("Authenticating"));

  setTimeout(async () => {
    let loginRequest;
    let loginURL =
      process.env.NODE_ENV === "production"
        ? "/login"
        : process.env.SERVER_DEVELOPMENT_URL + "/login";

    try {
      loginRequest = await axios.post(loginURL, {
        username,
        password
      });
    } catch (ex) {
      dispatch(loginError("Error connecting to server"));

      return null;
    }

    let { data } = loginRequest;

    if (data.loginError) {
      dispatch(loginError(data.loginError));
      return;
    }

    //create authenticated user object with username and token
    let authedUser = Object.assign({}, { ...data });
    //get the user data from graphql
    let authedUserData = await client.query({
      query: FIND_USER,
      variables: { username: username }
    });
 
    //add the users activities into an object
    let {
      id,
      votes,
      answers,
      questions
    } = authedUserData.data.findUserByUsername;

    let userActivities = Object.assign({}, { id, votes, answers, questions });
    //trigger the prop change after logging in
    let userToPutIntoState = {
      ...authedUser,
      ...userActivities,
      authenticated: true,
      duration: 0
    };

    dispatch(loginUser(userToPutIntoState));

    dispatch(setLoading());
  }, 2000);

  return <></>;
};

export default LoginAttempt;
