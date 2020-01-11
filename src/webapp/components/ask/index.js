import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import URLS from "../../util/urls.js";
import AskQuestionBar from "./AskQuestionBar";
import Login from "../auth/Login.js";
import { updateCallbackUrl } from "../../store/actions";
import {NavLink as Link} from 'react-router-dom';

function AskQuestion(props) {
  const [submitted, setSubmitted] = useState(false);

  

  return !props.user.authenticated ? (
    <h4 style={{ textAlign: "center" }}>
      <Link onClick={props.updateCallbackUrl} to="/login">
        Login
      </Link>{" "}
      to ask a question
    </h4>
  ) : (
    <div style={{ margin: "20px auto", width: "100%" }} id="ask_question_area">
      <div
        className="row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "0 auto"
        }}
      >
        <div className="col-md-4 col-md-push-2  col-sm-12">
          <img
            style={{ width: "100%", maxHeight: "250px" }}
            src={`${URLS.images}/ask_question.svg`}
          />
        </div>
        <div className="col-md-4 col-md-pull-2 col-sm-12">
          <h2 style={{ margin: "10% auto", textAlign: "left" }}>
            Ask Anything!
          </h2>
        </div>
      </div>
      <AskQuestionBar setSubmitted={setSubmitted} submitted={submitted} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCallbackUrl: dispatch(updateCallbackUrl(window.location.pathname))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion);
