import React from 'react'
import {useSelector} from 'react-redux';
import {NavLink as Link} from 'react-router-dom';
import Message from '../message';

function UserCreatedSucess(props) {

    const {created} = useSelector(state => state.signupForm);

    
    return (
      <Message text="Congrats" image="success">
        {userCreatedSuccess(created.username)}
      </Message>
    );
 

  function userCreatedSuccess(username) {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <h3 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
          User Created!
        </h3>
        <h4 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
          View profile <Link to={`/user/${username}`}>here</Link>
        </h4>
      </div>
    );
  }
    
}

export default UserCreatedSucess;
