import React from "react";
import { useDispatch, useSelector } from "react-redux";
import client from "../../config/apollo/index";
import * as mutations from "../../store/graphql/mutations";
import {
  updateAskFormQuestionCreated,
  resetAskForm,
  setError,
  setLoading
} from "./store/actions";

export default function AskQuestionAttempt(props) {
  const { askForm, user } = useSelector(state => state);
  const dispatch = useDispatch();

  let question = {
    UserId: user.id,
    text: askForm.question,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  dispatch(setLoading("Asking question..."));

  client
    .mutate({
      mutation: mutations.ASK_QUESTION,
      variables: {
        question
      }
    })
    .then(({ data }) => {
      if (data) {
        //console.log("Question submitted ", data);
        setTimeout(() => {
          dispatch(updateAskFormQuestionCreated({ id: data.askQuestion.id }));

          window.open(`/question/${data.askQuestion.id}`);
          dispatch(setLoading());
          dispatch(resetAskForm());
        }, 2000);
        //
      } else {
        dispatch(setError("Server error..."));
        setTimeout(dispatch(setError()), 2000);
      }
    });

  return null;
}
