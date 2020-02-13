import React from "react";
import Message from "../message";
import { logoutUser, setLoading } from "../../store/actions.js";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';

export default function LogoutPrompt() {
  const dispatch = useDispatch();
  return (
    <Message image="loggedout" text="Are you sure?">
      <h4 style={{ textAlign: "center" }}>
        <Link
          onClick={e => {
            
            dispatch(logoutUser());
          }}
          to="#"
        >
          Click Here
        </Link>{" "}
        to Logout
      </h4>
    </Message>
  );
}
