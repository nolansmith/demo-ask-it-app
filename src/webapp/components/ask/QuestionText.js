import React from "react";
import { updateAskFormQuestion } from "./store/actions";
import {useDispatch} from 'react-redux';

export default function QuestionText(props) {

    const dispatch = useDispatch();
  return (
    <>
      <textarea
        className="form-control"
        type="text"
        id="ask_question_text"
        placeholder="What do you wanna know? (min: 10, max: 100)"
        maxLength="100"
        onChange={e => {
          dispatch(updateAskFormQuestion(e.target.value));
        }}
      />
    </>
  );
}
