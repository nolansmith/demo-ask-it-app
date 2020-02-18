import React from "react";
import { connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { logoutUser } from "./store/actions";

function LogStatus(props) {
  return (
    <React.Fragment>
      {props.user.authenticated ? (
        <Link
         
          to="/logout"
          className=" nav-link text-white logged-in"
        >
          Log Out
        </Link>
      ) : (
        <Link to="/login" className=" nav-link logged-out">
          Log In
        </Link>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogStatus);
