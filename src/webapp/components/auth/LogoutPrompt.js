import React from "react";
import Message from "../message";
import { logoutUser, setLoading } from "../../store/actions.js";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function LogoutPrompt() {
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <Message image="loggedout" text="Are you sure?">
      <h4 style={{ textAlign: "center" }}>
        <Link
          onClick={e => {
            dispatch(setLoading("Logging out..."));
            dispatch(logoutUser());
            setTimeout(() => {
              dispatch(setLoading());
         
            }, 2000);
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
