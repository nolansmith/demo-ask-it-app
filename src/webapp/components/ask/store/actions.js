/**
 * 
 * ASK QUESTION FORM STORE ACTIONS
 */
import {setLoading, setError, updateCallbackUrl} from '../../../store/actions';

export {setLoading,setError,updateCallbackUrl};


export const updateAskFormQuestion = question => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "UPDATE_ASK_FORM_QUESTION", question });
  };
  
  export const updateAskFormSubmitted = status => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "UPDATE_ASK_FORM_SUBMITTED", status });
  };
  
  export const updateAskFormQuestionCreated = question => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "UPDATE_ASK_QUESTION_CREATED", question });
  };
  
  export const resetAskForm = () => (
    dispatch,
    getState,
    context
  ) => {
    dispatch({ type: "RESET_ASK_QUESTION_FORM"});
  };