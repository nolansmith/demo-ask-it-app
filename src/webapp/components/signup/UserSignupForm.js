import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSignupFormPassword,
  updateSignupFormSubmitted,
  updateSignupFormUsername
} from "./store/actions.js";

import { FaAsterisk as Password, FaUser as User } from "react-icons/fa";
import * as URLS from "../../util/urls";

function UserSignupForm(props) {
  const dispatch = useDispatch();
  const { username, password  } = useSelector(state => state.signupForm);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(updateSignupFormSubmitted(true));
  }

  const readyToSubmit = () => {
    return username.length >= 5 && password.length >= 10;
  };

  return (
    <div style={{ margin: "20px auto", width: "100%" }} id="user_signup_area">
      <div
        className="row"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "0 auto"
        }}
      >
        <div className="col-md-4 col-md-pull-2 col-sm-12">
          <h2 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            Sign Up!
          </h2>
          <h3 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            (We don't need a lot of info)
          </h3>
        </div>
        <div className="col-md-4 col-md-push-2  col-sm-12">
          <img
            style={{ width: "100%", maxHeight: "250px" }}
            src={`${URLS.images}/signup.svg`}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-col align-items-center">
            <div className="col-auto">
              <label className="sr-only" htmlFor="_signup_username">
                Username
              </label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <User />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="_signup_username"
                  placeholder="Username"
                  onChange={e =>
                    dispatch(updateSignupFormUsername(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="_signup_password">
                Phone
              </label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <Password />
                  </div>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="_signup_password"
                  placeholder="Password (min 10 chars)"
                  onChange={e =>
                    dispatch(updateSignupFormPassword(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="col-auto">
              <button
                style={{ margin: "10px auto", width: "100%" }}
                type="submit"
                className={readyToSubmit() ? "aw-btn" : "aw-btn-disabled"}
                disabled={readyToSubmit() ? false : true}
              >
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSignupForm;
