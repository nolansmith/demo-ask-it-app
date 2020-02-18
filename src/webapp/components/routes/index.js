import React from "react";
import { Switch, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import ErrorBoundary from "../error/ErrorBoundary";
// import FoF from '../404/index.js';
// import Welcome from './Welcome';
// import Login from '../auth/Login';
// import AskQuestionBar from '../questions/AskQuestionBar';
// import LatestQuestions from '../questions/LatestQuestions';
// import SingleQuestion from '../questions/SingleQuestion';
// import AllQuestions from '../questions/AllQuestions';
// import MobileNav from './MobileNav';

const FoF = React.lazy(() =>
  import(/*webpackChunkName: "FoF" */ "../404/index.js")
);

const AskQuestion = React.lazy(() =>
  import(/*webpackChunkName: "AskQuestionBar" */ "../ask/index")
);
const LatestQuestions = React.lazy(() =>
  import(
    /*webpackChunkName: "LatestQuestions" */ "../questions/LatestQuestions"
  )
);
const SingleQuestion = React.lazy(() =>
  import(/*webpackChunkName: "SingleQuestion" */ "../questions/SingleQuestion")
);
const AllQuestions = React.lazy(() =>
  import(/*webpackChunkName: "AllQuestions" */ "../questions/AllQuestions")
);

const Login = React.lazy(() =>
  import(/*webpackChunkName: "Login" */ "../auth/Login")
);

const Logout = React.lazy(() =>
  import(/*webpackChunkName: "Logout" */ "../auth/Logout")
);

const Welcome = React.lazy(() =>
  import(/*webpackChunkName: "Welcome" */ "../primary/Welcome")
);

const SignUp = React.lazy(() =>
  import(/*webpackChunkName: "SignUp" */ "./../signup/")
);

const User = React.lazy(() =>
  import(/* webpackChunkName: "User" */ "../user/")
);

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "Dashboard" */ "../dashboard/")
);

export default function Routes(props) {
  const user = useSelector(state => state.user);
  return (
    <ErrorBoundary>
      <Switch>
        <Route
          exact
          path="/"
          component={user.authenticated ? Dashboard : Welcome}
        />
        <Route path="/latest" component={LatestQuestions} />
        <Route path="/ask" component={AskQuestion} />
        <Route path="/questions" component={AllQuestions} />
        <Route path="/question/:slug" component={SingleQuestion} />
        <Route path="/user/:slug" component={User} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={user.authenticated ? Dashboard : SignUp} />
        <Route component={FoF} />
      </Switch>
    </ErrorBoundary>
  );
}
