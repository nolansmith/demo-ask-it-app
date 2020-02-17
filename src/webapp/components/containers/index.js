import React from "react";

export default function Container(props) {
  return (
    <div style={{ margin: "20px auto", width: "100%" }} id={props.id}>
      <div style={{ width: "100%", padding: "0 auto", margin: "0 auto" }}>
        <h2 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
          {props.header ? props.header : "A Page"}
        </h2>
      </div>
      {props.children}
    </div>
  );
}
