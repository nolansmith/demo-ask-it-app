import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import * as mutations from "../../store/graphql/mutations.js";
import { getRandomUserFromSeedData } from "../../util/index";
import Error from "../error/index.js";

function AskQuestionBar(props) {
  const [myQuestion, setQuestion] = useState("");
  const [valid, setValid] = useState(false);
  const [submitted, setSubmitted] = useState({ status: false });
  const [askQuestion, { data }] = useMutation(mutations.ASK_QUESTION);
  const user = useSelector(state => state.user);
  let stubUser = getRandomUserFromSeedData();

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
      UserId: user.id || stubUser.id,
      text: myQuestion,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    //console.log(stubUser.username, ' submitted question...');
    askQuestion({
      variables: {
        question
      }
    }).then(({ data }) => {
      if (data.askQuestion) {
        setSubmitted({ status: true, id: data.askQuestion.id });
      } else {
        return <Error message="Server Error" />;
      }
    });
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
