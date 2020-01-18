import React from "react";

const Routes = React.lazy(() =>
  import(/*webpackChunkName: "Routes"*/ "../routes/index.js")
);

import Loading from "../loading/index.js";

function Main(props) {
  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        width: "100% !important",
        marginTop: "85px",
        minHeight: "100vh"
      }}
    >
      <React.Suspense fallback={<Loading />}>
        <Routes />
      </React.Suspense>
    </div>
  );
}

export default Main;
