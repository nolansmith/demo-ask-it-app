import React from "react";
import { useSelector } from "react-redux";

import UserSignupAttempt from "./UserSignupAttempt";
import UserCreatedSuccess from "./UserCreatedSucess";
import UserSignupForm from "./UserSignupForm";

const SignUp = props => {
  const { submitted, created } = useSelector(state => state.signupForm);

  if (submitted) return <UserSignupAttempt />;
  if (created) return <UserCreatedSuccess />;

  return <UserSignupForm />;
};

export default SignUp;
