import React from "react";
import Username from "./Username";
import Password from "./Password";
import Submit from "./Submit";
import Form from "../../forms/index.js";
import {NavLink as Link} from 'react-router-dom';
import { useSubmit } from "./hooks";
import { useSelector } from "react-redux";

function LoginForm(props) {
  const { submitted, submit } = useSubmit();
  const { options } = useSelector(state => state.loginForm);

  if (submitted) return null;

  return (
    <Form submit={submit} {...options}>
      <Username />
      <Password />
      <Submit />
      <h6 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
        Not a member? <Link to="/signup">Sign Up</Link>
      </h6>
    </Form>
  );
}

export default LoginForm;
