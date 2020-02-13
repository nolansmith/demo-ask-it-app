import { useSelector, useDispatch } from "react-redux";
import { updateSignupFormSubmitted } from "../../../store/actions";

export const useSubmit = function() {
  const { submitted } = useSelector(state => state.loginForm);
  const dispatch = useDispatch();

  function submit(e) {
    e.preventDefault();

    dispatch(updateSignupFormSubmitted(true));
  }

  return {submitted, submit}
}
