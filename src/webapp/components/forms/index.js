import React from "react";
import * as URLS from "../../util/urls";
export default function StandardForm(props) {
  return (
    <div style={{ margin: "20px auto", width: "100%" }} id={props.id || '_aFormName'}>
      <div
        className="row"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "0 auto"
        }}
      >
        <div className="col-md-4 col-md-pull-2 col-sm-12">
          <h2 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            {props.header}
          </h2>
          <h3 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            {props.subHeader}
          </h3>
        </div>
        <div className="col-md-4 col-md-push-2  col-sm-12">
          <img
            style={{ width: "100%", maxHeight: "250px" }}
            src={`${URLS.images}/${props.image || 'searching'}.svg`}
          />
        </div>

        <form
          onSubmit={props.submit}
        >
          <div className="form-col align-items-center">
              {props.children}
          </div>
        </form>
      </div>
    </div>
  );
}
