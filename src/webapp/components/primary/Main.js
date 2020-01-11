import React from "react";
import { Route, Switch } from "react-router-dom";
import Loading from '../loading/index.js';
import Footer from "./Footer.js";
import {useSelector} from 'react-redux';

// import FoF from '../404/index.js';
// import Welcome from './Welcome';
// import Login from '../auth/Login';
// import AskQuestionBar from '../questions/AskQuestionBar';
// import LatestQuestions from '../questions/LatestQuestions';
// import SingleQuestion from '../questions/SingleQuestion';
// import AllQuestions from '../questions/AllQuestions';
// import MobileNav from './MobileNav';



const Header = React.lazy(
  () => import(/*webpackChunkName: "Header" */'./Header'));

const FoF = React.lazy(
  () => import(/*webpackChunkName: "FoF" */'../404/index.js'));

const AskQuestion = React.lazy(
  () => import(/*webpackChunkName: "AskQuestionBar" */'../ask/index'));
const LatestQuestions = React.lazy(
  () => import(/*webpackChunkName: "LatestQuestions" */'../questions/LatestQuestions'));
const SingleQuestion = React.lazy(
  () => import(/*webpackChunkName: "SingleQuestion" */'../questions/SingleQuestion'));
const AllQuestions = React.lazy(
  () => import(/*webpackChunkName: "AllQuestions" */'../questions/AllQuestions'));

const Login = React.lazy(
  () => import(/*webpackChunkName: "Login" */'../auth/Login'));

const Logout = React.lazy(
  () => import(/*webpackChunkName: "Logout" */'../auth/Logout'));

const Welcome = React.lazy(
  () => import(/*webpackChunkName: "Welcome" */'./Welcome'));

const SignUp = React.lazy(() => import(/*webpackChunkName: "SignUp" */'./../signup/'));

const MobileNav = React.lazy(() => import(/* webpackChunkName: "MobileNav" */ "./MobileNav"));

const User = React.lazy(() => import(/* webpackChunkName: "User" */ "../user/"));

const Dashboard = React.lazy(() => import(/* webpackChunkName: "Dashboard" */ "../dashboard/"));


function Main(props) {
  const user = useSelector(state => state.user);

  return (

    <React.Suspense fallback={<Loading />}>
      

      <div
        style={{
          backgroundColor: "#F5F5F5",
          width: "100% !important",
          marginTop: "85px",
          minHeight: "100vh"
        }}
      >


        <Header />
        <MobileNav />
        <Switch>

          <Route exact path="/" component={(user.authenticated) ? Dashboard : Welcome} />
          <Route path="/latest" component={LatestQuestions} />
          <Route path="/ask" component={AskQuestion} />
          <Route path="/questions" component={AllQuestions} />
          <Route path="/question/:slug" component={SingleQuestion} />
          <Route path="/user/:slug" component={User} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={SignUp} />
          <Route component={FoF} />

        </Switch>
        </div >
        <Footer />

      </React.Suspense>
    
  );
}


// const mapStateToProps = state => {
//   return {
//     questions: state.questions
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {};
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Main);

export default Main;