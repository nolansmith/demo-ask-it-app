import React, { Component } from "react";
// import Response from "../responses/Response";
import { FaComments as Answers } from "react-icons/fa";
import Loading from '../loading/index.js';
// import AnswerQuestionBar from "../answers/AnswerQuestionBar";
// import NoResponses from "../responses/NoResponses";
const Response = React.lazy(() => import(/* webpackChunkName: "Response" */ '../responses/Response'));
const AnswerQuestionBar = React.lazy(() => import(/* webpackChunkName: "AnswerQuestionBar" */ '../answers/AnswerQuestionBar'));
const NoResponses = React.lazy(() => import(/* webpackChunkName: "NoResponses" */ '../responses/NoResponses'));



class DisplayedQuestion extends Component {
  render() {
    return (
      <div style={{ width: '100%', margin: '0 auto' }} className="col-lg-8 col-xs-12 ">
        <React.Suspense fallback={<Loading />}>
          <div className="row" style={{ margin: '0 5px' }}>

            <div
              id={`question-${this.props.qid}`}
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
              <div style={{ width: "80%" }}>{this.props.question}</div>
              <div
                style={{
                  width: "20%",
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <h5>
                  <Answers /> {this.props.answers.length}{" "}
                </h5>
              </div>
            </div>
            <div className="row" style={{ margin: '0 auto', width: '100%' }}>
              <div style={{ width: '100%', display: "flex", flexDirection: "column" }}>
                {this.props.answers.length > 0 ? (
                  this.props.answers.map((answer, index) => {
                    return (
                      <Response
                        qid={this.props.qid}
                        aid={index}
                        response={answer.answer}
                        key={index}
                        votes={answer.votes}
                      />
                    );
                  })
                ) : (
                    <NoResponses />
                  )}
              </div>
            </div>

          </div>
          <AnswerQuestionBar qid={this.props.qid} />
        </React.Suspense>
      </div>


    );
  }
}

export default DisplayedQuestion;
