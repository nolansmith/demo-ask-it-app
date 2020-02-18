import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { verifyUserLogin } from "./functions.js";
import {  logoutUser } from "../auth/store/actions";

export default function Validator(props) {
  const { user } = useSelector(state => state);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    async function checkTokenStatus() {
      let lsUser = localStorage.getItem("_askitapp_user");
    
      if (user.authenticated) {
        let { valid } = await verifyUserLogin(user);

        //console.log("token status: ", valid);
        if (!valid) {
          dispatch(logoutUser());
          window.location.href = "/login";
        }
      }
    }

    checkTokenStatus();
  }, [location]);

  return <>{props.children}</>;
}
