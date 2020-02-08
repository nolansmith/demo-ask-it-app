import React from "react";
import { useSelector } from "react-redux";
import NotLoggedIn from "./NotLoggedIn";
import LogoutPrompt from "./LogoutPrompt";

function Logout(props) {
  //is logged in variables
  //const [userLoggedIn, handleLoggedIn] = useState(props.user.authenticated);
  const user = useSelector(state => state.user);

  if (
    user.authenticated &&
    JSON.parse(localStorage.getItem("_askitapp_user"))
  )
    return <LogoutPrompt />;

  return <NotLoggedIn />;
}

export default Logout;
