import { useSelector, useDispatch } from "react-redux";
import { updateLoginFormSubmitted } from "../store/actions";

export const useSubmit = function() {
  const { submitted } = useSelector(state => state.loginForm);
  const dispatch = useDispatch();

  function submit(e) {
    e.preventDefault();

    dispatch(updateLoginFormSubmitted(true));
  }

  return {submitted, submit}
}
