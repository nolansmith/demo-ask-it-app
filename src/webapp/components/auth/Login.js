import React, { useState } from "react";

import Loading from "../loading";
import Message from "../message";
import Error from "../error";

//other login components
import LoginForm from "./LoginForm";
import LoginAttempt from "./LoginAttempt";
import LoginSuccess from "./LoginSuccess";

import { useSelector, useDispatch } from "react-redux";

import {updateCallbackUrl} from '../../store/actions';

const Login = props => {
  //access our redux functionality
  const { loading, error, user } = useSelector(state => state);
  const {submitted } = useSelector(state => state.loginForm);
  const dispatch = useDispatch();


  if (loading.status === true)
    return (
      <Loading message={loading.message} image="searching" maxHeight="200px" />
    );

  if (error.status === true) return <Error message={error.message} maxHeight="200px" />;

  if (user.authenticated === true)
    return (
      <Message text="Congrats" image="success">
        <LoginSuccess>
          {setTimeout(() => dispatch(updateCallbackUrl(null)), 2000)}
        </LoginSuccess>
      </Message>
    );

  if (submitted === true) {
    return <LoginAttempt  />;
  }

  return <LoginForm  />;
};

export default Login;
