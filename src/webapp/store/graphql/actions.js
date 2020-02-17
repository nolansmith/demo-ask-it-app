/**
 * Original implementation of GraphQL and Redux
 * Current implementation uses GraphQL/Apollo Hooks inside of each component instead
 * NOTE: This is technical debt at this point but can be revisited if you'd like
 */

import * as queries from "./queries";
import * as mutations from "./mutations";
import {setError, setLoading} from '../actions';

export const setGraphQLError = error => (dispatch, getState, context) => {
  dispatch(setError(error));
  dispatch(setLoading());
  setTimeout(() => {
    dispatch(setError());
  }, 2000);
};

export const updateQuestions = questions => (
  dispatch,
  getState,
  { client }
) => {
  dispatch({ type: "UPDATE_QUESTIONS", questions: questions });
};

/* updaters for UI load/error status */
export const updateError = (status = false, message = "No Error") => {
  return { type: "ERROR_MESSAGE", status: status, message: message };
};

export const updateLoading = (status = false, message = "Not Loading...") => {
  //console.log('should Update Loading with ', status);
  return { type: "UPDATE_LOAD_STATUS", status: status, message: message };
};

export const getAllQuestions = () => (dispatch, getState, { client }) => {
  dispatch(updateError());
  dispatch(updateLoading(true, "Loading From Server..."));

  client
    .query({ query: queries.GET_ALL_QUESTIONS })
    .then(({ error, data, loading }) => {
      //console.log('ReduxGQL: ', data);
      if (!loading) {
        dispatch({ type: "GET_ALL_QUESTIONS", questions: data.questions });

        dispatch(updateLoading(false));
      }

      if (error || !data.questions) {
        dispatch({ type: "GET_ALL_QUESTIONS", questions: null });
        dispatch(updateLoading(false));
        dispatch(updateError(true, "Server error..."));
      }
    });
};

export const getLatestQuestions = () => (dispatch, getState, { client }) => {
  dispatch(updateError());
  dispatch(updateLoading(true, "Loading Latest Questions..."));

  client
    .query({ query: queries.GET_LATEST_QUESTIONS })
    .then(({ error, data, loading }) => {
      //console.log('ReduxGQL: ', data);
      if (!loading) {
        dispatch({
          type: "GET_LATEST_QUESTIONS",
          questions: data.getLatestQuestions
        });
        dispatch(updateLoading(false));
      }

      if (error || !data.getLatestQuestions) {
        dispatch({ type: "GET_LATEST_QUESTIONS", questions: null });
        dispatch(updateLoading(false));
        dispatch(updateError(true, "Server error..."));
      }
    });
};

export const resetQuestions = () => (dispatch, getState, { client }) => {
  dispatch(updateError());
  dispatch(updateLoading());
  dispatch({ type: "GET_ALL_QUESTIONS", questions: [] });
};

export const getSingleQuestion = id => (dispatch, getState, { client }) => {
  dispatch(updateError());

  dispatch(updateLoading(true, "Finding Question..."));

  client
    .query({ query: queries.GET_SINGLE_QUESTION(id) })
    .then(({ error, data, loading }) => {
      if (!loading) {
        let { findQuestionById } = data;
        if (!findQuestionById) {
          //dispatch({ type: "GET_SINGLE_QUESTION", question: {id: 9999, text: "Sorry, couldn't find that question", answers: []} });
          dispatch({ type: "GET_SINGLE_QUESTION", question: null });
          dispatch(updateError(true, "Couldn't find that question"));
          dispatch(updateLoading(false));
        } else {
          dispatch({ type: "GET_SINGLE_QUESTION", question: findQuestionById });
          dispatch(updateLoading(false));
        }
      }

      if (error) {
        dispatch({ type: "GET_SINGLE_QUESTION", question: null });
        dispatch(updateLoading());
        dispatch(updateError(true, "Server error..."));
      }
    });
};

/**
 *
 * Voting actions
 */

export const addVote = vote => (dispatch, getState, { client }) => {
  dispatch(updateError());

  dispatch(updateLoading(true, "Finding Question..."));

  client
    .mutate({
      mutation: mutations.ADD_VOTE,
      variables: {
        vote: vote
      }
    })
    .then(({ loading, error, data, errors }) => {
      if (!loading) {
        //if we add a vote it means we're on the single question
        //so reload the single question
        // dispatch(updateLoading());

        //dispatch(getSingleQuestion(vote.QuestionId));
        console.log(data.addVote);
      }

      if (error || errors) {
        dispatch(updateLoading());
        dispatch(updateError(true, "Server error..."));
      }
    });
};

export const addNewUser = user => (dispatch, getState, { client }) => {
  dispatch(updateLoading(true, "Querying Server..."));

  client
    .query({ query: queries.FIND_USER(user.username) })
    .then(({ loading, data, error }) => {
      console.log(data);

      let userFound = data.findUserByUsername;

      if (!loading) {
        console.log(userFound === null ? "No user found" : userFound);
        // setTimeout(dispatch(updateLoading()), 3000);
        dispatch(updateLoading());
      }

      if (error) {
        dispatch(updateLoading());
        dispatch(updateError(true, "Server Error..."));
      }
    })
    .catch(data => console.log(data));
};

/**
 * Mutation actions
 */

export const askQuestion = question => (dispatch, getState, { client }) => {
  dispatch(updateError());
  dispatch(updateLoading(true, "Asking question..."));

  client
    .mutate({
      mutation: mutations.ASK_QUESTION,
      variables: {
        question: question
      }
    })
    .then(({ error, data, loading }) => {
      if (!loading) {
        //console.log("Received: ", data.askQuestion);
        dispatch({
          type: "UPDATE_QUESTIONS",
          questions: { asked: { id: data.askQuestion.id } }
        });
        dispatch(updateLoading());
      }

      if (error) {
        dispatch(updateError(true, "Server error..."));
        dispatch(updateLoading());
      }
    });
}; //askQuestion
