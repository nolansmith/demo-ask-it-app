import React from "react";
import URLS from "../../util/urls.js";


function Message({ image, text, maxHeight, children }) {
  return (
    <div style={{ width: "100%", padding: "0 auto", margin: "0 auto" }}>
      {text ? (
        <h2 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
          {text}
        </h2>
      ) : null}

      {image ? (
        <div style={{ width: "100%", margin: "0 auto" }}>
          <img
            style={{
              width: "100%",
              margin: "10px auto",
              maxHeight: maxHeight ? maxHeight : "200px"
            }}
            src={`${URLS.images}/${image}.svg`}
          />
        </div>
      ) : null}

      {children}
    </div>
  );
}

export default Message;
