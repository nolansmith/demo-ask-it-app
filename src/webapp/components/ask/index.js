import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { updateCallbackUrl } from "../../store/actions";
import AskQuestion from "./AskQuestion";
import AskQuestionSuccess from "./AskQuestionSuccess";
import AskQuestionAttempt from "./AskQuestionAttempt";

function AskQuestionIndex(props) {
  const dispatch = useDispatch();
  const { user, askForm } = useSelector(state => state);

  if (!user.authenticated)
    return (
      <h4 style={{ textAlign: "center" }}>
        <Link
          onClick={() => dispatch(updateCallbackUrl(window.location.pathname))}
          to="/login"
        >
          Login
        </Link>{" "}
        to ask a question
      </h4>
    );

  if (askForm.submitted && askForm.created) return <AskQuestionSuccess />;

  if (askForm.submitted) return <AskQuestionAttempt />;

  return <AskQuestion />;
}

export default AskQuestionIndex;
