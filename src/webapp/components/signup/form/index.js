import React from "react";
import {NavLink as Link} from 'react-router-dom';
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
      <h6 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
        Already a member? <Link to="/login">Log In</Link>
      </h6>
    </Form>
  );
}

export default SignUpForm;
