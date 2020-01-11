import React, { Component } from 'react';

class NoResponses extends Component {
    render() {
        return (
            <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
      >
        <div
          className="card"
          style={{
            marginLeft: "15px",
            width: "100%",
            backgroundColor: "#D0D0D0",
            display: "flex",
            flexDirection: "row",
            padding: "0 5px"
          }}
        >
         <h6>No responses...</h6>
        </div>
      </div>
        );
    }
}

export default NoResponses;
