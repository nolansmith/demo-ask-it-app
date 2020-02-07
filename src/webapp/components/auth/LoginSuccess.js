import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {updateCallbackUrl} from '../../store/actions';
import {NavLink as Link} from 'react-router-dom';


export default function LoginSuccess(props) {
  const { callbackUrl } = useSelector(state => state);
  const dispatch = useDispatch();
  //state for if he have a callback url
  const [returnUrl, setReturnUrl] = useState(callbackUrl ? callbackUrl : null);

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h3 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
        Logged in!
      </h3>
      {returnUrl ? (
        <h4 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
          Return to what you were doing{" "}
          <Link
            onClick={e => dispatch(updateCallbackUrl(null))}
            to={`${returnUrl}`}
          >
            here
          </Link>
        </h4>
      ) : (
        <h4 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
          Go To Dashboard <Link to={`/`}>here</Link>
        </h4>
      )}
      
    </div>
  );
}
