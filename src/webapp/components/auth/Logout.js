import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Message from "../message";
import { logoutUser } from "../../store/actions.js";
import { Link } from "react-router-dom";
import Loading from "../loading";
import Error from "../error";

function Logout(props) {

  //loading and errors
  const NOT_LOADING = { status: false, message: "" };
  const NO_ERROR = { status: false, message: "" };
  const [isLoading, setLoad] = useState(NOT_LOADING);
  const [isError, setError] = useState(NO_ERROR);
  //is logged in variables
  const [userLoggedIn, handleLoggedIn] = useState(props.user.authenticated);

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

  if (userLoggedIn === true) {

    return (
      <Message image="loggedout" text="Are you sure?">
        <h4 style={{ textAlign: "center" }}>
          <Link onClick={(e) => {
            setLoad({ status: true, message: "Logging Out..." })
            setTimeout(() => {
              //handleLoggedIn(false);
              props.logoutUser();
              window.location.reload();
            },2000)
          }
          } to="#">Click Here</Link> to Logout
    </h4>
      </Message>
    )

  } else {
    return (
      <Message image="notloggedin" text="Not Logged In!">
        <h4 style={{ textAlign: "center" }}>
          You can login <Link to="/login">Here</Link>
        </h4>
      </Message>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
