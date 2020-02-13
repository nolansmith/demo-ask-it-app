import React from "react";
import Username from "./Username";
import Password from "./Password";
import Submit from "./Submit";
import Form from "../../forms/index.js";
import { useSubmit } from "./hooks";
import { useSelector } from "react-redux";

function SignUpForm(props) {
  const { submitted, submit } = useSubmit();
  const {options} = useSelector(state => state.signupForm);

  if (submitted) return null;
  
  return (
    <Form submit={submit} {...options}>
      <Username />
      <Password />
      <Submit />
    </Form>
  );
}

export default SignUpForm;
