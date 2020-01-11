import React, {useEffect} from "react";
import { NavLink as Link } from "react-router-dom";
import URLS from "../../util/urls.js";
import {connect} from 'react-redux';
import * as gql from '../../store/graphql/actions.js';

const Welcome = (props) => {
  useEffect(() => {
    
  });

  return (
    <div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#1f2179",
          margin: "0 auto"
        }}
        className="row"
      >
        <div className="col-md-6 col-xs-12">
          <h1 style={{ color: "#887CAF" }}>
            AskIt let's you post questions and get the answers you need quickly!
          </h1>
          <ul className="ul-header-style">
            <li>Stuck on homework?</li>
            <li>Need a push in the right direction?</li>
            <li>Ask a Question!</li>
          </ul>
          <Link to="/ask">
            <button className={"aw-btn"}>Ask Away!</button>
          </Link>
        </div>
        <div className="col-md-6 col-xs-12">
          <img
            style={{ width: "100%", height: "auto" }}
            src={`${URLS.images}/questions.svg`}
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          margin: "0 auto"
        }}
        className="row"
      >
        <div className="col-md-6 col-xs-12">
          <img
            style={{ width: "100%", height: "auto" }}
            src={`${URLS.images}/latest.svg`}
          />
        </div>

        <div className="col-md-6 col-xs-12">
          <h2 style={{ textAlign: "center", margin: "auto" }}>
            Latest Questions
          </h2>
          <h4>Get the Scoop on the Latest Questions Being asked</h4>
          <Link to="/latest">
            <button className={"aw-btn"}>See Latest Questions</button>
          </Link>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          margin: "0 auto"
        }}
        className="row"
      >
        <div className="col-md-6 ">
          <h2 style={{ textAlign: "center", margin: "auto" }}>Help Out</h2>
          <h4>
            Maybe you don't have a question, but let's see if you have an
            answer! Help out users who've been waiting to pick your brain
          </h4>
          <Link to="/questions">
            <button className={"aw-btn"}>Answer Some Questions</button>
          </Link>
        </div>

        <div className="col-md-6 order-first order-md-last">
          <img
            style={{ width: "100%", height: "auto" }}
            src={`${URLS.images}/answer.svg`}
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          margin: "0 auto"
        }}
        className="row"
      >
        <div className="col-md-6 order-first">
          <img
            style={{ width: "100%", height: "auto" }}
            src={`${URLS.images}/sign_up_2.svg`}
          />
        </div>
        <div className="col-md-6 ">
          <h2 style={{ textAlign: "center", margin: "auto" }}>Sign Up</h2>
          <h4>
            Signing Up allows you to track and all your posts as well as connect
            with other members. It also allows you to build a reputation as a
            Great Wise One!
          </h4>
          <Link to="/signup">
            <button className={"aw-btn"}>Sign Up!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: () => dispatch(gql.getAllQuestions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
