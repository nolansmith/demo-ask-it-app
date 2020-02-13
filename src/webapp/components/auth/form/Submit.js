import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Submit(props) {
  const { username, password } = useSelector(state => state.loginForm);

  const readyToSubmit = () => {
    return username.length >= 5 && password.length >= 10;
  };
  return (
    <div className="col-auto">
      <button
        style={{ margin: "10px auto", width: "100%" }}
        type="submit"
        className={readyToSubmit() ? "aw-btn" : "aw-btn-disabled"}
        disabled={readyToSubmit() ? false : true}
      >
        Login
      </button>
    </div>
  );
}
