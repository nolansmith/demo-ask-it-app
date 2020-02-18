import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSignupFormUsername } from "../store/actions";
import { FaUser as UserIcon } from "react-icons/fa";
export default function Username() {
  
  const dispatch = useDispatch();
  return (
    <div className="col-auto">
      <label className="sr-only" htmlFor="_signup_username">
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
          id="_signup_username"
          placeholder="Username"
          onChange={e => dispatch(updateSignupFormUsername(e.target.value))}
        />
      </div>
    </div>
  );
}
