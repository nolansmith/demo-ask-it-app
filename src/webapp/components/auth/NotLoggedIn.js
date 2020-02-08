import React from 'react';
import Message from '../message/index';
import {Link} from 'react-router-dom';

export default function NotLoggedIn() {
    return (
        <>
        <Message image="notloggedin" text="Not Logged In!">
          <h4 style={{ textAlign: "center" }}>
            You can login <Link to="/login">Here</Link>
          </h4>
        </Message></>
      );
}
