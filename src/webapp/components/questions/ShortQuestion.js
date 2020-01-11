import React, { Component } from "react";
import { FaComments as Answers } from "react-icons/fa";
import {NavLink as Link } from 'react-router-dom';


function ShortQuestion ({id,text,answers, size, limit}) {
  
    

    return (
      
        <div className="row" style={{margin: '0 0'}}>
        <div
          id={`question-${id}`}
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
            <Link to={`/question/${id}`} className="aw-link">
              {(limit) ? text.slice(0,limit) + "..." : text}
            </Link>{" "}
          </div>
          <div
            style={{
              width: "20%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <h5>
              <Answers /> {answers.length}{" "}
            </h5>
          </div>
        </div>
        </div>
      
    );
  
}

export default ShortQuestion;
