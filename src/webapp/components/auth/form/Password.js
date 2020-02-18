import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginFormPassword } from "../store/actions";
import { FaAsterisk as PasswordIcon } from "react-icons/fa";
export default function Password() {
  const { password } = useSelector(state => state.loginForm);
  const dispatch = useDispatch();
  return (
    <div className="col-auto">
      <label className="sr-only" htmlFor="_login_password">
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
          id="_login_password"
          placeholder="Password"
          onChange={e => dispatch(updateLoginFormPassword(e.target.value))}
        />
      </div>
    </div>
  );
}
