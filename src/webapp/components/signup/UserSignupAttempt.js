import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FIND_USER } from "../../store/graphql/queries";
import { CREATE_NEW_USER } from "../../store/graphql/mutations";
const uuid = require("uuid/v4");
import { useMutation } from "@apollo/react-hooks";
import {
  updateSignupUserCreated,
  updateSignupFormSubmitted,
  setLoading,
  setError
} from "../../store/actions.js";
import client from "../../config/apollo/index";

export default function UserSignupAttempt(props) {
  const { submitted, password, username } = useSelector(
    state => state.signupForm
  );
  const dispatch = useDispatch();

  //GraphQL user creating mutation
  const [createNewUser, newUserObject] = useMutation(CREATE_NEW_USER);

  dispatch(setLoading("Checking for user..."));

  setTimeout(async () => {
    let { data } = await client.query({
      query: FIND_USER,
      variables: { username: username }
    });
    if (data.findUserByUsername) {
      dispatch(setError("User already exists...."));
      dispatch(setLoading());
      dispatch(updateSignupFormSubmitted(false));
      setTimeout(() => dispatch(setError()), 2000);
      return;
    } else {
      dispatch(setLoading());
      //console.log('User can be created!');
      createNewUser({
        variables: {
          user: {
            id: uuid(),
            username: username.toLowerCase(),
            password
          }
        }
      }).then(({ data }) => {
        dispatch(updateSignupFormSubmitted(false));
        dispatch(updateSignupUserCreated(data.createNewUser));
      });
    }
  }, 2000);

  return <></>;
}
