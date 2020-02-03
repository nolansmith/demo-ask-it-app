import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import {
  FaPhone as Phone,
  FaAsterisk as Password,
  FaUser as User
} from "react-icons/fa";
import client from "../../config/apollo/index.js";
import * as URLS from "../../util/urls";
import Loading from "../loading";
import Message from "../message";
import * as actions from "../../store/graphql/actions";
import { FIND_USER, VERIFY_USER } from "../../store/graphql/queries";
import { loginUser } from "../../store/actions";
import { useQuery } from "@apollo/react-hooks";
import Error from "../error";
import { updateCallbackUrl } from "../../store/actions";

const login = props => {
  //state for if he have a callback url
  const [returnUrl, setReturnUrl] = useState(
    props.callbackUrl ? props.callbackUrl : null
  );
  //loading and errors
  const NOT_LOADING = { status: false, message: "" };
  const NO_ERROR = { status: false, message: "" };
  const [isLoading, setLoad] = useState(NOT_LOADING);
  const [isError, setError] = useState(NO_ERROR);

  //is logged in variables
  const [userLoggedIn, handleLoggedIn] = useState(props.user.authenticated);
  //form variables
  const [username, handleUsername] = useState("");
  const [password, handlePassword] = useState("");

  //GraphQL query to find user
  const findUserObject = useQuery(FIND_USER, {
    variables: { username: username }
  });
 

  if (isLoading.status)
    return (
      <Loading
        message={isLoading.message}
        image="searching"
        maxHeight="200px"
      />
    );
  if (isError.status)
    return <Error message={isError.message} maxHeight="200px" />;

  if (userLoggedIn)
    return (
      <Message text="Congrats" image="success">
        {userLoginSuccess(props.user.username)}
      </Message>
    );

  function handleSubmit(e) {
    e.preventDefault();

    verifyUser(username);
    handleUsername("");
    handlePassword("");
  }

  function userLoginSuccess(username) {
    setTimeout(() => props.updateCallbackUrl(null), 2000);

    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <h3 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
          Logged in!
        </h3>
        {returnUrl ? (
          <h4 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            Return to what you were doing{" "}
            <Link
              onClick={e => props.updateCallbackUrl(null)}
              to={`${returnUrl}`}
            >
              here
            </Link>
          </h4>
        ) : (
          <h4 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            Go To Dashboard <Link to={`/`}>here</Link>
          </h4>
        )}
      </div>
    );
  }

  const verifyUser = username => {
    setLoad({ status: true, message: "Authenticating..." });
    //the GraphQL query for user object we get back
    let { data } = findUserObject;

    setTimeout(() => {
      if (!data.findUserByUsername) {
        setError({ status: true, message: "User not found!" });
        setLoad(NOT_LOADING);
        setTimeout(() => setError(NO_ERROR), 2000);
        return;
      } else {
        //initiate user verification
        client
          .query({
            query: VERIFY_USER,
            variables: { username: username, password: password }
          })
          .then(user => {
            if (!user.data.verifyUser) {
              setError({ status: true, message: "Bad password!" });
              setLoad(NOT_LOADING);
              setTimeout(() => setError(NO_ERROR), 2000);
              return;
            } else {
              //authorized user, give us a token, id, username back
              //more importantly a token
              let authedUser = user.data.verifyUser;
              //now get the votes,answers,and, questions
              let { votes, answers, questions } = data.findUserByUsername;
              let userActivities = Object.assign(
                {},
                { votes, answers, questions }
              );
              //trigger the prop change after logging in
              props.loginUser({
                ...authedUser,
                ...userActivities,
                authenticated: true
              });
              handleLoggedIn(true);
              setLoad(NOT_LOADING);
            }
          });
      }
    }, 2000);
  };

  const readyToSubmit = () => {
    return username.length >= 5 && password.length >= 10;
  };

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

        <form onSubmit={handleSubmit}>
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
                  onChange={e => handleUsername(e.target.value)}
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
                  onChange={e => handlePassword(e.target.value)}
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
};

const mapStateToProps = state => {
  return {
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user)),
    updateCallbackUrl: (url = null) => dispatch(updateCallbackUrl(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(login);
