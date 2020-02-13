import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginFormUsername } from "../../../store/actions";
import { FaUser as UserIcon } from "react-icons/fa";
export default function Username() {
  const { username } = useSelector(state => state.loginForm);
  const dispatch = useDispatch();
  return (
    <div className="col-auto">
      <label className="sr-only" htmlFor="_login_username">
        Username
      </label>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <UserIcon />
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          id="_login_username"
          placeholder="Username"
          onChange={e => dispatch(updateLoginFormUsername(e.target.value))}
        />
      </div>
    </div>
  );
}
