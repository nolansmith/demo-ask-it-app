import React, { useEffect, useState } from "react";
import { FaCaretUp as UpVote, FaCaretDown as DownVote } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ADD_VOTE } from "../../store/graphql/mutations";
import { FIND_USER } from "../../store/graphql/queries";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { calculateVotes,  } from "../../util/index";
import { NavLink as Link } from "react-router-dom";
import {loginUser} from '../auth/store/actions';


function Response(props) {
  /** redux hooks */
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);

  /** vote mutation for GraphQL */
  const [addVote, addVoteData] = useMutation(ADD_VOTE);

  /* findUserObject via GraphQL if user is logged in */
  const { data, refetch, loading } = useQuery(FIND_USER, {
    variables: { username: userState.username }
  });

  /* Variables */

  if (loading) return "...";
  let { qid, answer } = props;
  let { text, id, user, votes } = answer;

  //run through vote calculation function
  //this arranges the votes
  votes = calculateVotes(votes);

  /* see if this answer is votable whether the user is either a.) logged in or b.) has voted on it or not */
  const canVoteOnThis = action => {
    if (userState.authenticated === true) {
      //either user has voted on it or can vote on it
      if (
        userState.votes.filter(function(v) {
          return v.AnswerId === id;
        }).length !== 0
      ) {
        return {
          status: false,
          className: "fa-disabled",
          title: "You have already voted on this"
        };
      } else {
        return { status: true, className: "", title: `Vote this ${action}` };
      }
    } else {
      return {
        status: false,
        className: "fa-disabled",
        title: `Login to ${action}-vote this`
      };
    }
  };

  function handleVote(action) {
    let vote = {
      AnswerId: id,
      QuestionId: qid,
      UserId: userState.id,
      action: action
    };
    //console.log(vote);
    addVote({
      variables: {
        vote: vote
      }
    }).then(({ data }) => {
      //console.log('Vote returned: ', data.addVote);
      let newVotes = [...userState.votes];
      newVotes.push(data.addVote);
      let updatedUser = Object.assign({}, { ...userState, votes: newVotes });
      dispatch(loginUser(updatedUser));
      //the response list refresh function
      props.refetch();
      //then the individual response refetch function
    });
  }

  return (
    <div
      id={`answer-${qid}-${id}`}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        minWidth: "100%"
      }}
    >
      <div
        className="card"
        style={{
          marginLeft: "15px",
          width: "100%",
          backgroundColor: "#D0D0D0 ",
          display: "flex",
          flexDirection: "row",
          padding: "0 5px 0 0"
        }}
      >
        <div
          style={{
            backgroundColor: "#1f2179"
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <div style={{ margin: "0 auto", width: "100%" }}>
              <a
                onClick={e => {
                  e.preventDefault();
                  canVoteOnThis("up").status ? handleVote("up") : null;
                }}
                href="#"
                className="text-success"
                style={{ width: "100%", margin: "0 auto" }}
                title={canVoteOnThis("up").title}
              >
                <UpVote className={canVoteOnThis("up").className} size="50" />
              </a>
            </div>
            <div style={{ margin: "0 auto", width: "100%" }}>
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  margin: "0 auto"
                }}
                className="text-white"
              >
                {votes}
              </p>
            </div>
            <div style={{ margin: "0 auto", width: "100%" }}>
              {" "}
              <a
                onClick={e => {
                  e.preventDefault();
                  canVoteOnThis("down").status ? handleVote("down") : null;
                }}
                href="#"
                className="text-danger"
                title={canVoteOnThis("down").title}
              >
                <DownVote
                  size="50"
                  className={canVoteOnThis("down").className}
                />
              </a>
            </div>
          </div>
        </div>
        <div style={{ width: "85%", padding: "10px 10px" }}>
          <div>{text}</div>
          <div>
            <li>
              <Link
                
                to={`/user/${user.username}`}
              >
                {user.username}
              </Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Response;
