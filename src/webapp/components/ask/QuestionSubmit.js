import React from "react";
import { useSelector } from "react-redux";

export default function QuestionSubmit(props) {

    const {question} = useSelector(state => state.askForm);
    const valid = question.length >= 10;
    
  return (
    <>
      <button
        style={{ margin: "10px auto", width: "100%" }}
        className={valid ? "aw-btn" : "aw-btn-disabled"}
        disabled={valid ? false : true}
      >
        Ask!
      </button>
    </>
  );
}
