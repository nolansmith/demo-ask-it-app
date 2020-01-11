import React, { Component } from "react";
import { FaCaretUp as UpVote, FaCaretDown as DownVote } from "react-icons/fa";
import {calculateVotes} from '../../util/index';
import {NavLink as Link } from 'react-router-dom';


function ShortAnswer (props) {

   let {id,text,size,limit, QuestionId, votes} = props;

   function TallyVotes() {
       let total = calculateVotes(votes);
       let totalClass= (total === 0) ? 'zeroVotes' : (total > 0) ? 'text-success' : 'text-danger';

       return <h4 className={totalClass}>{total}</h4>

   }
  

    return (
      
        <div className="row" style={{margin: '0 0'}}>
        <div
          id={`answer-${id}`}
          className={(size) ? size + " card bg-light" : "col-lg-8 col-xs-12 card bg-light"}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            padding: "0 5px",
            margin: "5px auto 0px auto",
            width: "100%"
          }}
        >
          <div style={{ width: "100%", margin: "20px auto" }}>
            <Link to={`/question/${QuestionId}#answer-${QuestionId}-${id}`} className="aw-link">
              {(limit) ? text.slice(0,limit) + "..." : text}
            </Link>{" "}
          </div>
          <div
            style={{
              width: "20%",
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
            <TallyVotes />
          </div>
        </div>
        </div>
      
    );
  
}

export default ShortAnswer;
