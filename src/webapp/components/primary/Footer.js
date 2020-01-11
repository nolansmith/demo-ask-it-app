import React, { Component } from "react";
import {
  FaTwitter as Twitter,
  FaInstagram as Instagram,
  FaFacebookMessenger as Facebook
} from "react-icons/fa";

class Footer extends Component {
  render() {
    return (
      <div>
        <div
          className="d-flex"
          style={{
            backgroundColor: "#1f2179",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px auto 0px auto"
          }}
        >
          <div
            className="row d-flex"
            style={{
              width: "100%",
              margin: "15px auto",
              justifyContent: "space-around"
            }}
          >
            <h2 className="aw-footer-text">
              <Twitter />
            </h2>
            <h2 className="aw-footer-text">
              <Facebook />
            </h2>
            <h2 className="aw-footer-text">
              <Instagram />
            </h2>
          </div>
          <div className="d-flex">
            <h6 className="text-white">
              © Copyright 2019. All rights reserved.
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
