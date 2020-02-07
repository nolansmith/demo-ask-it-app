import React from "react";
import Loading from "../loading";
import Error from "../error";
import { useSelector } from "react-redux";

function AppStatusBoundary(props) {
  const { loading, error } = useSelector(state => state);

  if (loading.status)
    return (
      <div style={{  marginTop: "85px" }}>
        {" "}
        <Loading
          message={loading.message}
          image="searching"
          maxHeight="200px"
        />
      </div>
    );
  if (error.status)
    return (
      <div style={{ marginTop: "85px" }}>
        {" "}
        <Error message={error.message} image="found" maxHeight="200px" />
      </div>
    );

  return <> {props.children}</>;
}

export default AppStatusBoundary;
