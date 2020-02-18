import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import * as mutations from "../../store/graphql/mutations.js";
import client from '../../config/apollo/index';
import { setError, setLoading } from "./store/actions.js";


function AskQuestionBar(props) {


  const dispatch = useDispatch();
  

  function checkValid(question) {
    if (question.length >= 10) {
      setValid(true);
    } else {
      setValid(false);
    }
  }

  function handleQuestionSubmit(e) {
    e.preventDefault();

    let question = {
      UserId: user.id,
      text: myQuestion,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    dispatch(setLoading("Asking question..."));

    client.mutate({
      mutation: mutations.ASK_QUESTION,
      variables: {
        question
      }
    }).then(({data}) => {
      if (data) {
        console.log('Question submitted ', data);
        setTimeout(() => {
          setSubmitted({ status: true, id: data.askQuestion.id });
          dispatch(setLoading());
        },2000)
        //
      } else {
        dispatch(setError("Server error..."));
        setTimeout(dispatch(setError()), 2000);
      }

    })

  }

  return (
    <div
      className="col-md-6 col-xs-10 form-group"
      style={{ width: "100%", padding: "0 auto", margin: "20px auto" }}
    >
      {submitted.status === true ? (
        <h4 style={{ textAlign: "center" }}>
          Good Question! See it{" "}
          <Link className="aw-link" to={`/question/${submitted.id}`}>
            Here
          </Link>
        </h4>
      ) : (
        <form onSubmit={handleQuestionSubmit}>
          <textarea
            className="form-control"
            type="text"
            id="ask_question_text"
            placeholder="What do you wanna know? (min: 10, max: 100)"
            maxLength="100"
            onChange={e => {
              setQuestion(e.target.value);
              checkValid(e.target.value);
            }}
          />
          <button
            style={{ margin: "10px auto", width: "100%" }}
            className={valid ? "aw-btn" : "aw-btn-disabled"}
            disabled={valid ? false : true}
          >
            Ask!
          </button>
        </form>
      )}
    </div>
  );
}


export default AskQuestionBar;
