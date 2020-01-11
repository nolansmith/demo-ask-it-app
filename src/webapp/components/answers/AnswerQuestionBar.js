import React, { useState } from "react";
import { connect } from "react-redux";
import {useMutation} from '@apollo/react-hooks';
import {ANSWER_QUESTION} from '../../store/graphql/mutations';
import {getRandomUserFromSeedData} from '../../util/index';
import {Link} from 'react-router-dom';
import {updateCallbackUrl} from '../../store/actions';


function AnswerQuestionBar(props)  {
 
  const [myAnswer, setAnswer] = useState("");
  const [valid, setValid] = useState(false);
  const [answerQuestion, {data}] = useMutation(ANSWER_QUESTION);
  let stubUser = getRandomUserFromSeedData();
  //graphql refetch from parent
  let {refetch} = props;
  
  function checkValid(value) {
    setAnswer(value);
    if (value.length >= 10) {
      setValid(true);
    } else {
      setValid(false);
    }
  }

  function reset() {
    setAnswer("");
    setValid(false);
  }


 function handleSubmit(e) {
    e.preventDefault();
    let answer = {UserId: props.user.id || stubUser.id, QuestionId: props.qid, text: myAnswer};
    answerQuestion({variables: {
      answer: answer
    }}).then((a) => {
      //console.log(a);
      reset();
      refetch();
    })
  }

  function handleBlur(e) {
    e.target.value = "";
  }


    return (!props.user.authenticated) ? <h4 style={{textAlign: 'center'}}><Link onClick={props.updateCallback} to="/login">Login</Link> to answer</h4> : (
      <div style={{ margin: "20px auto", width: "100%" }}>
        <div
          className="col-md-6 col-xs-10 form-group"
          style={{ width: "100%", padding: "0 auto", margin: "0 auto" }} >
          <form onSubmit={handleSubmit}>
            <textarea
              className="form-control"
              type="text"
              placeholder="Give us your answer...(min: 10, max: 250)"
              onChange={(e) => checkValid(e.target.value)}
              onBlur={handleBlur}
              maxLength="250" />
            <button
              style={{ margin: "10px auto", width: "100%" }}
              className={valid ? "aw-btn" : "aw-btn-disabled"}
              disabled={valid ? false : true}>
              Answer
            </button>
          </form>
        </div>
      </div>
    );
  
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCallback: () => dispatch(updateCallbackUrl(window.location.pathname))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerQuestionBar);
