import React from "react";
import * as URLS from "../../util/urls";
import { NavLink as Link } from "react-router-dom";
import { FaAsterisk as Password, FaUser as User } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLoginFormPassword,
  updateLoginFormUsername,
  updateLoginFormSubmitted
} from "../../store/actions";

function LoginForm(props) {
  const { username, password, submitted } = useSelector(state => state.loginForm);
  const dispatch = useDispatch();
  
  

  const readyToSubmit = () => {
    return username.length >= 5 && password.length >= 10;
  };
  if (submitted) return null;

  return (
    <div style={{ margin: "20px auto", width: "100%" }} id="user_login_area">
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
            Login!
          </h2>
          <h3 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            (If you want to)
          </h3>
        </div>
        <div className="col-md-4 col-md-push-2  col-sm-12">
          <img
            style={{ width: "100%", maxHeight: "250px" }}
            src={`${URLS.images}/login.svg`}
          />
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            //console.log('Submitting ', username, ' - ', password)
            dispatch(updateLoginFormSubmitted(true));
          }}
        >
          <div className="form-col align-items-center">
            <div className="col-auto">
              <label className="sr-only" htmlFor="_login_username">
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
                  id="_login_username"
                  placeholder="Username"
                  onChange={e =>
                    dispatch(updateLoginFormUsername(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="_login_password">
                Password
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
                  id="_login_password"
                  placeholder="Password"
                  onChange={e =>
                    dispatch(updateLoginFormPassword(e.target.value))
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
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      <h6 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
        Not a member? <Link to="/signup">Sign Up</Link>
      </h6>
    </div>
  );
}

export default LoginForm;
