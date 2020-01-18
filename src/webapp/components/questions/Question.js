import React, { useState, useEffect } from "react";
import Response from "../responses/Response";
import { useDispatch, useSelector } from "react-redux";
import { FaComments as Answers } from "react-icons/fa";
import Loading from "../loading/index.js";
import AnswerQuestionBar from "../answers/AnswerQuestionBar";
import NoResponses from "../responses/NoResponses";
import { sortVotes } from "../../util/index.js";
// const Response = React.lazy(() => import(/* webpackChunkName: "Response" */ '../responses/Response'));
// const AnswerQuestionBar = React.lazy(() => import(/* webpackChunkName: "AnswerQuestionBar" */ '../answers/AnswerQuestionBar'));
// const NoResponses = React.lazy(() => import(/* webpackChunkName: "NoResponses" */ '../responses/NoResponses'));

function DisplayedQuestion(props) {
  let { id, answers, text, refetch } = props;
  const { user, loading } = useSelector(state => state);

  const [responses, updateResponses] = useState(answers.sort(sortVotes));

  if (loading.status) return <Loading message={loading.message} />;

  return (
    <div
      style={{ width: "100%", margin: "0 auto" }}
      className="col-lg-8 col-xs-12 "
    >
      <div className="row" style={{ margin: "0 5px" }}>
        <div
          id={`question-${id}`}
          className="card bg-light"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            padding: "0 5px",
            margin: "5px auto 0px auto",
            width: "100%"
          }}
        >
          <div style={{ width: "80%" }}>{text}</div>
          <div
            style={{
              width: "20%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <h5>
              <Answers /> {responses.length}{" "}
            </h5>
          </div>
        </div>
        <div className="row" style={{ margin: "0 auto", width: "100%" }}>
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            {responses.length > 0 ? (
              responses.map((answer, index) => {
                return (
                  <Response
                    refetch={refetch}
                    answer={answer}
                    qid={id}
                    key={index}
                  />
                );
              })
            ) : (
              <NoResponses />
            )}
          </div>
        </div>
      </div>
      <AnswerQuestionBar refetch={refetch} qid={id} />
    </div>
  );
}

export default DisplayedQuestion;
