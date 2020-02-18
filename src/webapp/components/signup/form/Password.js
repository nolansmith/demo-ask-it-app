import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSignupFormPassword } from "../store/actions";
import { FaAsterisk as PasswordIcon } from "react-icons/fa";
export default function Password() {
  
  const dispatch = useDispatch();
  return (
    <div className="col-auto">
      <label className="sr-only" htmlFor="_signup_password">
        Password
      </label>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <PasswordIcon />
          </div>
        </div>
        <input
          type="password"
          className="form-control"
          id="_signup_password"
          placeholder="Password"
          onChange={e => dispatch(updateSignupFormPassword(e.target.value))}
        />
      </div>
    </div>
  );
}
